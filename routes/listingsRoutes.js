const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const { showListingCtrlr, newListingCtrlr, editListingFormCtrlr, updateListingCtrlr, deleteListingCtrlr, indexListingsCtrlr } = require("../controllers/listingCtrlrs.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload=multer({storage});

// Display form for new listing input
router.get("/listings/new" , isLoggedIn , (req,resp)=>{
    resp.render("./listings/newListing.ejs");
})

// SINGLE LISTING  
router
    .route("/listings/:id")
    .get(wrapAsync(showListingCtrlr))    // show route
    .patch(isLoggedIn, isOwner, upload.single("listing[image[filename]]"), wrapAsync(updateListingCtrlr))  // UPDATE ROUTE 
    .delete(isLoggedIn, isOwner, wrapAsync(deleteListingCtrlr))  // DELETE ROUTE


// ALL LISTINGS (post a listing)
router
    .route("/listings")
    .get(wrapAsync(indexListingsCtrlr))     // INDEX ROUTE
    .post(isLoggedIn, upload.single("image[filename]"), validateListing, wrapAsync(newListingCtrlr))   // CREATE NEW LISTING ROUTE  (validateListing as middleware for server side validation)
                // for multer-storage-cloudinary
    // .post(upload.single("image[filename]"),(req,resp)=>{
    //     // resp.file(req.file.path);
    //     console.log(req.file.path,".....",req.file.filename)
    // })

// EDIT ROUTE
router.get("/listings/:id/edit" , isLoggedIn , isOwner , wrapAsync(editListingFormCtrlr));

module.exports=router;
