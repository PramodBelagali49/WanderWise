const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Listing=require("./models/listing.js");

const wrapAsync=require("./utils/wrapAsync.js")
const ExpressError=require("./utils/ExpressError.js")

const methodOverride=require("method-override");
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"/public"))); 

const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);

// const listingSchema=require("./schema.js/joiListingSchema.js");
const {listingSchema,reviewSchema}=require("./Joi_Schema.js")

const Review = require("./models/review.js");

async function  main(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/WanderWise");
        console.log("Connection to MongoDB Successful");
    }catch(err){
        console.log("Some error occured while connecting to db",err);
    }
}
main();  // Calling main() after defining it is better than calling it before , although it works fine


// Listings related all routes imported from listingsRoutes.js file
const listingroutes=require("./routes/listingsRoutes.js")
app.use("/listings",listingroutes);


// Reviews related all routes imported from reviewsRoutes.js file
const revroutes=require("./routes/reviewsRoutes.js")
app.use("/listings/:id/reviews",revroutes);

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
