const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.postReviewCtrlr=async(req,resp)=>{   
    let {id}=req.params;    // here the id from req.params is being fetched from parent route for reviews in reviwsRoutes.js ( bcz of "const router=express.Router({mergeParams:true})" )
            // OR 
    // let id=req.params.id;

    console.log("listing id: ",id);
    let listing=await Listing.findById(id);
    console.log("listing data from review ",listing);
    console.log("review req body ",req.body);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    console.log("newReview: ",newReview);
    listing.reviews.push(newReview);

    let res=await newReview.save();
    console.log("New review: ",res);
    await listing.save();

    req.flash("success","New review added!!");
    resp.redirect(`/listings/${id}`);
};

module.exports.deleteReviewCtrlr=async(req,resp)=>{
    let {id,reviewId}=req.params;

    let res1=await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});  // pull operator to delete a review from reviews array
    let res2=await Review.findByIdAndDelete(reviewId);

    console.log("Review deleted: ",res1,res2);

    req.flash("success","Review Deleted!!");
    resp.redirect(`/listings/${id}`);
};