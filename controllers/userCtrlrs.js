const User = require("../models/user");


module.exports.signupUserCtrlr=async(req,resp)=>{
    try{
        let {username,email,password}=req.body;
        let newUser=new User({
            username:username,
            email:email                                      
        })
        let registeredUser=await User.register(newUser,password);
        console.log("registeredUser: ",registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Signed Up Successfully , Welcome to WanderWise");
            return resp.redirect("/listings");
        })
        
    }catch(err){
        req.flash("error",err.message);
        resp.redirect("/signup");
    }
};

module.exports.loginUserCtrlr=async(req,resp)=>{
    // console.log("req.user(in usersRoutes.js) after login: ",req.user);
    req.flash("success","Welcome back to WanderWise");
    // console.log(resp.locals.redirectUrl);
    if(resp.locals.redirectUrl){
        resp.redirect(resp.locals.redirectUrl);
    }else{
        resp.redirect("/listings");
    }
};