const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const { showListingCtrlr, newListingCtrlr, editListingFormCtrlr, updateListingCtrlr, deleteListingCtrlr, indexListingsCtrlr } = require("../controllers/listingCtrlrs.js");


// Display form for new listing input
router.get("/new" , isLoggedIn , (req,resp)=>{
    resp.render("./listings/newListing.ejs");
})

router
    .route("/:id")
    .get(wrapAsync(showListingCtrlr))    // show route
    .patch(isLoggedIn , isOwner , wrapAsync(updateListingCtrlr))  // UPDATE ROUTE 
    .delete(isLoggedIn , isOwner , wrapAsync(deleteListingCtrlr))  // DELETE ROUTE

router
    .route("/")
    .post(validateListing , isLoggedIn , wrapAsync(newListingCtrlr))    // CREATE NEW LISTING ROUTE 
    .get(wrapAsync(indexListingsCtrlr))     // INDEX ROUTE

// EDIT ROUTE
router.get("/:id/edit" , isLoggedIn , isOwner , wrapAsync(editListingFormCtrlr));

module.exports=router;
