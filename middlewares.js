const { listingSchema, reviewSchema } = require("./Joi_Schema");
const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn=(req,resp,next)=>{
    // console.log("req.user(in middleware.js): " , req.user);
    // console.log(req);
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in");
        return resp.redirect("/login");
    }
   // console.log("req.user(in middleware.js) after login: ",req.user);
    next();
};

module.exports.saveRedirectUrl=(req,resp,next)=>{
    if(req.session.redirectUrl){
        resp.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,resp,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(resp.locals.currUser._id)){
        req.flash("error","You don't have permission to modify/delete the Listing !!");
        return resp.redirect(`/listings/${id}`);      // return is IMPORTANT here
    }
    next();
}

module.exports.isAuthor = async(req,resp,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author._id.equals(resp.locals.currUser._id)){
        req.flash("error","You don't have permission to modify/delete the Review !!");
        return resp.redirect(`/listings/${id}`);      // return is IMPORTANT here
    }
    next();
}


// SERVER SIDE VALIDATION FOR LISTING
module.exports.validateListing=(req,resp,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};


// SERVER SIDE VALIDATION FOR REVIEW
module.exports.validateReview=(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};