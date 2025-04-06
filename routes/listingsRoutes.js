const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const {listingSchema}=require("../Joi_Schema.js");


// SERVER SIDE VALIDATION FOR LISTING
const validateListing=(req,resp,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

// DELETE ROUTE     (btn in showListing.ejs) 
router.delete("/:id",wrapAsync(async(req,resp)=>{
    let {id}=req.params;
    const deleted=await Listing.findByIdAndDelete(id,{new:true});
    // console.log("DELETED LISTING: ",deleted);
    resp.redirect("/listings");
}))

// UPDATE ROUTE 
router.patch("/:id",wrapAsync(async(req,resp)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Invalid data for listing");
    }
    let {id}=req.params;
    console.log("id received from edit page: ",id);
    console.log("Request body: ",req.body);
    let updatedListing={...req.body.listing};
    const updated= await Listing.findByIdAndUpdate(id,updatedListing,{new:true});
    console.log("UPDATED DATA: ",updated);
    resp.redirect(`/listings/${id}`)
}))

// EDIT ROUTE     (btn in showListing.ejs)
router.get("/:id/edit",wrapAsync(async(req,resp)=>{
    let {id}=req.params;
    let listingData=await Listing.findById(id);
    console.log("EDIT LISTING DATA: ",listingData);
    resp.render("./listings/editListing.ejs",({listingData:listingData}));
}))

// CREATE NEW LISTING ROUTE 
router.post("/", validateListing , wrapAsync(async (req,resp,next)=>{   // validateListing as middleware for server side validation
    // console.log(req.body);

    let result=listingSchema.validate(req.body);                   // SERVER SIDE VALIDATION USING JOI PACKAGE
    // console.log(result.error)
    if(result.error){
        throw new ExpressError(400,result.error); 
    }

    let listing=req.body;
    const newListing=new Listing(listing);
    const addedListing = await newListing.save();
    // console.log("New listing added: ",addedListing);
    resp.redirect("/listings");
}))

// Display form for new listing input
router.get("/new",(req,resp)=>{
    resp.render("./listings/newListing.ejs");
})

// SHOW ROUTE 
router.get("/:id",wrapAsync(async(req,resp)=>{
    let {id}=req.params;
    let listingData=await Listing.findById(id).populate("reviews");  // populate to get details of the reviews
    console.log("SHOW LISTING DATA: ",listingData);
    resp.render("./listings/showListing.ejs",{listingData:listingData});
}))

// INDEX ROUTE
router.get("/", wrapAsync(async (req,resp)=>{
    let allListings=await Listing.find({});
    // console.log(allListings);
    resp.render("./listings/index.ejs",{allListings:allListings});
}))

module.exports=router;
