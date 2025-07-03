const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isAuthor, validateReview } = require("../middlewares.js");
const { postReviewCtrlr, deleteReviewCtrlr } = require("../controllers/reviewCtrlrs.js");

// REVIEWS POST ROUTE
router.post("/",isLoggedIn,validateReview,wrapAsync(postReviewCtrlr))  // validateReview as middleware for server side validation


// REVIEWS GET ROUTE (basically the showListing page)
// {this path not necessary tho}
// {needed when somehow you are adding a review without logging in ; and you submit review,it asks you to login , after login it would give "page not found" error}
// {bcz the request was earlier being made to /listings/id/reviews for which there was no get request, that's why this one}
// YOU CAN COMPLETELY IGNORE IT

router.get("/:reviewId",(req,resp)=>{
    let {id}=req.params;
    resp.redirect(`/listings/${id}`);
})

// router.get("/",(req,resp)=>{
//     let {id}=req.params;
//     resp.redirect(`/listings/${id}`);
// })


// REVIEWS DELETE ROUTE
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(deleteReviewCtrlr));

module.exports=router;
