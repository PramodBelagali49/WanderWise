const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/review");
const Listing = require("../models/listing");
const {reviewSchema}=require("../Joi_Schema.js");

// SERVER SIDE VALIDATION FOR REVIEW
const validateReview=(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

// REVIEWS POST ROUTE
router.post("/", validateReview , wrapAsync(async(req,resp)=>{    // vallidateReview as middleware for server side validation
    let {id}=req.params;    // here the id from req.params is being fetched from parent route for reviews in app.js ( bcz of {mergeParams:true} )
            // OR 
    // let id=req.params.id;

    console.log("listing id: ",id);
    let listing=await Listing.findById(id);
    console.log("listing data from review ",listing);
    console.log("review req body ",req.body);
    let newReview=new Review(req.body.review);
    listing.reviews.push(newReview);

    let res=await newReview.save();
    console.log("New review: ",res);
    await listing.save();

    req.flash("success","New review added!!");
    resp.redirect(`/listings/${id}`);
}))

// REVIEWS DELETE ROUTE
router.delete("/:reviewId",wrapAsync(async(req,resp)=>{
    let {id,reviewId}=req.params;

    let res1=await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});  // pull operator to delete a review from reviews array
    let res2=await Review.findByIdAndDelete(reviewId);

    console.log("Review deleted: ",res1,res2);

    req.flash("success","Review Deleted!!");
    resp.redirect(`/listings/${id}`);
}))

module.exports=router;