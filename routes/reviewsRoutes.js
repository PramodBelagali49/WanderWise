const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
// const Review = require("../models/review");
// const Listing = require("../models/listing");
// const {reviewSchema}=require("../Joi_Schema.js");
const { isLoggedIn, isAuthor, validateReview } = require("../middlewares.js");
const { postReviewCtrlr, deleteReviewCtrlr } = require("../controllers/reviewCtrlrs.js");

// REVIEWS POST ROUTE
router.post("/",isLoggedIn,validateReview,wrapAsync(postReviewCtrlr))  // vallidateReview as middleware for server side validation

// REVIEWS DELETE ROUTE
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(deleteReviewCtrlr));

module.exports=router;