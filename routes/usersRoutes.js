const express=require("express");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");
const { signupUserCtrlr, loginUserCtrlr } = require("../controllers/userCtrlrs");
const router=express.Router();

router
    .route("/signup")
    .get((req,resp)=>{
        resp.render("users/signupForm.ejs");
    })
    .post(wrapAsync(signupUserCtrlr));

router
    .route("/login")
    .get((req,resp)=>{
        resp.render("users/loginForm.ejs");
    })
    .post(saveRedirectUrl , passport.authenticate("local",{failureRedirect:"/login" , failureFlash:true}) , loginUserCtrlr);

router.get("/logout",(req,resp,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out now");
        resp.redirect("/listings");
    })
})

module.exports=router;