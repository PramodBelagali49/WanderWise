module.exports.isLoggedIn=(req,resp,next)=>{
    // console.log("req.user(in middleware.js): " , req.user);
    console.log(req);
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in");
        resp.redirect("/login");
    }else{
        // console.log("req.user(in middleware.js) after login: ",req.user);
        next();
    }
};