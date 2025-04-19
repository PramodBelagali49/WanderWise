const { listingSchema } = require("../Joi_Schema");
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

// for map-box;
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mapToken=process.env.MAP_BOX_TOKEN;
// const geocodingClient = mbxGeocoding({ accessToken: mapToken});


// To Show all Listings
module.exports.indexListingsCtrlr=async (req,resp)=>{
    let allListings=await Listing.find({});
    // console.log(allListings);
    // console.log("req.user(in listingsRoutes.js) after login: ",req.user);
    resp.render("./listings/index.ejs",{allListings:allListings});
};

// To show a Listing
module.exports.showListingCtrlr=async(req,resp)=>{
    let {id}=req.params;
    let listingData=await Listing.findById(id)
                .populate({
                    path:"reviews",
                    populate:{
                        path:"author"
                    }
                })        // populate to get details of the reviews
                .populate("owner")
    console.log("listingData in showListing: ",listingData);

                    // TRYING TO SHOW THE ALREADY EXISTING LOCATIONS ON MAP 
    // let response=await geocodingClient.forwardGeocode({
    //     query: listingData.location ,
    //     limit: 1
    // })
    // .send();
    // let coordinates=response.body.features[0].geometry.coordinates;
    // let lng=coordinates[0];
    // let lat=coordinates[1];

    // mapboxgl.accessToken = mapToken;

    // const map = new mapboxgl.Map({
    //     container: 'map',
    //     // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    //     style: 'mapbox://styles/mapbox/streets-v12',
    //     center: listingData.geometry.coordinates,     // JSON.parse converts the coordinates string to array or object
    //     zoom: 6
    // });


    if(!listingData){
        req.flash("error","Requested listing does not exist");
        resp.redirect("/listings");
    }else{
        // console.log("SHOW LISTING DATA: ",listingData);
        resp.render("./listings/showListing.ejs",{listingData:listingData});
    }
};


// To create a new Listing
module.exports.newListingCtrlr=async (req,resp,next)=>{   
    let result=listingSchema.validate(req.body);                   // SERVER SIDE VALIDATION USING JOI PACKAGE
    if(result.error){
        throw new ExpressError(400,result.error); 
    }
    // resp.send(req.file);
    let listing=req.body;
    const newListing=new Listing(listing);
    // console.log("newListing object before saving: ",newListing);
    newListing.owner=req.user._id;
    if(req.file){
        let url=req.file.path;
        let filename=req.file.filename;
        newListing.image={url,filename};
    }
    
    // Mapbox-API for geocoding the location
    // let response=await geocodingClient.forwardGeocode({
    //     query: req.body.location ,
    //     limit: 1
    // })
    // .send();
    // newListing.geometry=response.body.features[0].geometry;

    const addedListing = await newListing.save();
    console.log("New listing added: ",addedListing);
    
    req.flash("success","New Listing Added!!");
    resp.redirect("/listings");
};


// Edit Listing form render
module.exports.editListingFormCtrlr=async(req,resp)=>{
    let {id}=req.params;
    let listingData=await Listing.findById(id);

    if(!listingData){
        req.flash("error","Requested listing does not exist");
        resp.redirect("/listings");
    }else{
        console.log("EDIT LISTING DATA: ",listingData);
        let originalImageUrl=listingData.image.url;
        originalImageUrl = originalImageUrl.replace("/upload","/upload/h_300,w_250");
        // console.log("originalImageUrl: ",originalImageUrl);
        resp.render("./listings/editListing.ejs",{listingData,originalImageUrl});
    }
};


// Update Listing
module.exports.updateListingCtrlr=async(req,resp)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Invalid data for listing");
    }
    let {id}=req.params;
    // console.log("id received from edit page: ",id);
    console.log("Request body: ",req.body);
    let updatedListing={...req.body.listing};
    const updated= await Listing.findByIdAndUpdate(id,updatedListing,{new:true});
    if(req.file){
        let url=req.file.path;
        let filename=req.file.filename;
        updated.image={url,filename};
        await updated.save();
    }
    console.log("UPDATED DATA: ",updated);
    req.flash("success","Listing Updated !");
    resp.redirect(`/listings/${id}`);
};


// Delete Listing
module.exports.deleteListingCtrlr=async(req,resp)=>{
    let {id}=req.params;
    const deleted=await Listing.findByIdAndDelete(id,{new:true});
    // console.log("DELETED LISTING: ",deleted);
 
    req.flash("success","Listing deleted !!");
    resp.redirect("/listings");
};


// Show Category Listings
module.exports.categoryListingsCtrlr=async(req,resp)=>{
    // console.log(req.query.categoryVal);
    let {categoryVal}=req.query;    // from form data in index.ejs
    let categoryListings=await Listing.find({category:categoryVal});
    // console.log(categoryListings);
    resp.render("./listings/categoryListings.ejs",{categoryListings});
};


// Search Listing
module.exports.searchListingCtrlr=async(req,resp)=>{
    // console.log("req.body: ",req.body);
    let searchTerm=req.body.searchTerm;
    // console.log("search term: ",searchTerm);
    let regexp=new RegExp(escapeRegex(searchTerm),'i');
    // console.log("regexp: ",regexp);

    let allListings=await Listing.find({
        $or:[
            {location:regexp},
            {title:regexp},
            {country:regexp},
            {description:regexp},
            {category:regexp}
        ]
    });
    // console.log("allListings in Search route: ",allListings);
    resp.render("./listings/index.ejs",{allListings,searchTerm});
};
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"); // Escape special regex characters
}
