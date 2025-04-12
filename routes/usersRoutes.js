const express=require("express");
// const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");
const { signupUserCtrlr, loginUserCtrlr } = require("../controllers/userCtrlrs");
const router=express.Router();

router.get("/signup",(req,resp)=>{
    resp.render("users/signupForm.ejs");
})

router.post("/signup",wrapAsync(signupUserCtrlr));

router.get("/login",(req,resp)=>{
    resp.render("users/loginForm.ejs");
})

router.post("/login" , saveRedirectUrl , passport.authenticate("local",{failureRedirect:"/login" , failureFlash:true}) , loginUserCtrlr);

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