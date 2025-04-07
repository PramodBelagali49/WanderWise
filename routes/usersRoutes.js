const express=require("express");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const router=express.Router();

router.get("/signup",(req,resp)=>{
    resp.render("users/signupForm.ejs");
})

router.post("/signup",wrapAsync(async(req,resp)=>{
    try{
        let {username,email,password}=req.body;
        let newUser=new User({
            username:username,
            email:email                                      
        })
        let registeredUser=await User.register(newUser,password);
        console.log("registeredUser: ",registeredUser);
        req.flash("success","Signed Up Successfully , Welcome to WanderWise");
        resp.redirect("/listings");
    }catch(err){
        req.flash("error",err.message);
        resp.redirect("/signup");
    }
}))

router.get("/login",(req,resp)=>{
    resp.render("users/loginForm.ejs");
})

router.post("/login" , passport.authenticate("local",{failureRedirect:"/login" , failureFlash:true}) , async(req,resp)=>{
    req.flash("success","Welcome back to WanderWise");
    resp.redirect("/listings");
})

module.exports=router;