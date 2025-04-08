const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const ExpressError=require("./utils/ExpressError.js")

const methodOverride=require("method-override");
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public"))); 

const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);

// for authentication using passport
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

async function  main(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/WanderWise");
        console.log("Connection to MongoDB Successful");
    }catch(err){
        console.log("Some error occured while connecting to db",err);
    }
}
main();  // Calling main() after defining it is better than calling it before , although it works fine


// COOKIES
// requiring cookie-parser npm package
/*
const cookieParser=require("cookie-parser");
app.use(cookieParser("**##secretkey##**"));

app.get("/setCookies",(req,resp)=>{
    resp.cookie("name","Pramod")
    resp.send("Cookie sent successfully!!");
})

app.get("/getSignedCookies",(req,resp)=>{
    resp.cookie("country","Bharat",{signed:true});
    resp.send("Signed cookie sent successfully!!");
})

// verify signed cookies
app.get("/verify",(req,resp)=>{
    resp.send(req.signedCookies);  
    // if value is modified then false is sent as repsonse else the original values is sent in the response
    // if value is completely erased (made empty) then {} is returned
})

app.get("/getCookies",(req,resp)=>{
    let {name}=req.cookies;
    resp.send(`<h1>Hello ${name} !!</h1`);
})
*/

// SESSIONS

const session=require("express-session");
const flash=require("connect-flash");
const sessionOptions={
    secret:"##$secretcode$**",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000 ,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
};
app.use(session(sessionOptions));
app.use(flash());

// Learning about Sessions
/*
app.get("/register",(req,resp)=>{
    let {name="Anon"}=req.query;
    // console.log(req.session);
    req.session.name=name;
    // console.log(req.session);
    if(name==="Anon"){
        req.flash("error","User NOT registered");
    }else{
        req.flash("success","User registered successfully !!");
    }
    resp.redirect("/hello");
})
app.use((req,resp,next)=>{
    resp.locals.successMsg=req.flash("success");    
    resp.locals.errorMsg=req.flash("error");
    next();
})
app.use("/hello",(req,resp)=>{
    // console.log("req.session(inside greet path): ",req.session);
    // resp.locals.successMsg=req.flash("success");    // you can place both these lines in a middleware to reduce bulkiness
    // resp.locals.errorMsg=req.flash("error");
    resp.render("flash.ejs",{name: req.session.name});
    // resp.send(`Hello , ${req.session.name} !!`);
})
*/



// SESSION IMPLEMENTATION IN THE PROJECT


// session must be created along with passport initialization always
// app.use(session(sessionOptions));     // it's already there above
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* middleware for resp.locals variables to be accessible in EJS files */
app.use((req,resp,next)=>{
    resp.locals.successMsg=req.flash("success");
    // console.log(resp.locals.successMsg);  // to show that success/error is an array can be of length 0
    resp.locals.errorMsg=req.flash("error");
    // console.log("req.user(in app.js):",req.user);
    resp.locals.currUser=req.user;
    console.log(resp.locals);
    next();
})
// app.get("/demoUser" , async(req,resp)=>{
//     let fakeUser=new User({
//         email:"xyz@gmail.com",
//         username:"xyz"
//     });
//     let regtrd=await User.register(fakeUser,"xyz");
//     resp.send(regtrd);
// });

 
// Listings related all routes imported from listingsRoutes.js file
const listingroutes=require("./routes/listingsRoutes.js")
app.use("/listings",listingroutes);

// Reviews related all routes imported from reviewsRoutes.js file
const revroutes=require("./routes/reviewsRoutes.js")
app.use("/listings/:id/reviews",revroutes);

// Users related routes form signup and login
const userRoutes=require("./routes/usersRoutes.js")
app.use("/",userRoutes);

app.get("/",(req,resp)=>{
    resp.send("Welcome to home page bhai");
})

app.all("*",(req,resp,next)=>{
    next(new ExpressError(404,"PaGe NoT FoUnD"));
})

app.use((err,req,resp,next)=>{
    // resp.send("Something went wrong");
    let {status=450,message="Some Unexpected Error occured"}=err;
    // resp.status(status).send(message);
    resp.status(status).render("error.ejs",{message});
})

app.listen(8080,()=>{
    console.log("Server listening to port 8080");
})
