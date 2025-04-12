const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
// const ExpressError=require("../utils/ExpressError.js");
// const Listing=require("../models/listing.js");
// const {listingSchema}=require("../Joi_Schema.js");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const { showListingCtrlr, newListingCtrlr, editListingFormCtrlr, updateListingCtrlr, deleteListingCtrlr, indexListingsCtrlr } = require("../controllers/listingCtrlrs.js");


// DELETE ROUTE     (btn in showListing.ejs) 
router.delete("/:id", isLoggedIn , isOwner , wrapAsync(deleteListingCtrlr));

// UPDATE ROUTE 
router.patch("/:id" , isLoggedIn , isOwner , wrapAsync(updateListingCtrlr));

// EDIT ROUTE     (btn in showListing.ejs)
router.get("/:id/edit" , isLoggedIn , isOwner , wrapAsync(editListingFormCtrlr));

// CREATE NEW LISTING ROUTE 
router.post("/", validateListing , isLoggedIn , wrapAsync(newListingCtrlr));

// Display form for new listing input
router.get("/new" , isLoggedIn , (req,resp)=>{
    resp.render("./listings/newListing.ejs");
})

// SHOW ROUTE 
router.get("/:id",wrapAsync(showListingCtrlr));

// INDEX ROUTE
router.get("/", wrapAsync(indexListingsCtrlr));

module.exports=router;
