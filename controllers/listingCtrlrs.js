const { listingSchema } = require("../Joi_Schema");
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");


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
    if(!listingData){
        req.flash("error","Requested listing does not exist");
        resp.redirect("/listings");
    }else{
        // console.log("SHOW LISTING DATA: ",listingData);
        resp.render("./listings/showListing.ejs",{listingData:listingData});
    }
};


// To create a new Listing
module.exports.newListingCtrlr=async (req,resp,next)=>{   // validateListing as middleware for server side validation
    console.log("req.body:(in new listing route)",req.body);

    let result=listingSchema.validate(req.body);                   // SERVER SIDE VALIDATION USING JOI PACKAGE
    // console.log(result.error)
    if(result.error){
        throw new ExpressError(400,result.error); 
    }

    let listing=req.body;
    const newListing=new Listing(listing);
    console.log("newListing object before saving: ",newListing);
    newListing.owner=req.user._id;
    const addedListing = await newListing.save();
    console.log("addedListing object after saving: ",addedListing);
    // console.log("New listing added: ",addedListing);

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
        resp.render("./listings/editListing.ejs",({listingData:listingData}));
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
    console.log("UPDATED DATA: ",updated);
    req.flash("success","Listing Updated !");
    resp.redirect(`/listings/${id}`);
};


// Delete listing
module.exports.deleteListingCtrlr=async(req,resp)=>{
    let {id}=req.params;
    const deleted=await Listing.findByIdAndDelete(id,{new:true});
    // console.log("DELETED LISTING: ",deleted);

    req.flash("success","Listing deleted !!");
    resp.redirect("/listings");
};

