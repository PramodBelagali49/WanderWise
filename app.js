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

const listingSchema=require("./schema.js/joiListingSchema.js");

async function  main(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/WanderWise");
        console.log("Connection to MongoDB Succesful");
    }catch(err){
        console.log("Some error occured while connecting to db",err);
    }
}
main();  // Calling main() after defining it is better than calling it before , although it works fine


// DELETE ROUTE     (btn in showListing.ejs)
app.delete("/listings/:id",wrapAsync(async(req,resp)=>{
    let {id}=req.params;
    const deleted=await Listing.findByIdAndDelete(id,{new:true});
    // console.log("DELETED LISTING: ",deleted);
    resp.redirect("/listings");
}))

// UPDATE ROUTE 
app.patch("/listings/:id",wrapAsync(async(req,resp)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Invalid data for listing");
    }
    let {id}=req.params;
    console.log("id received from edit page: ",id);
    console.log("Request body: ",req.body);
    let updatedListing={...req.body.listing};
    const updated= await Listing.findByIdAndUpdate(id,updatedListing,{new:true});
    console.log("UPDATED DATA: ",updated);
    resp.redirect(`/listings/${id}`)
}))

// EDIT ROUTE     (btn in showListing.ejs)
app.get("/listings/:id/edit",wrapAsync(async(req,resp)=>{
    let {id}=req.params;
    let listingData=await Listing.findById(id);
    console.log("EDIT LISTING DATA: ",listingData);
    resp.render("./listings/editListing.ejs",({listingData:listingData}));
}))

// CREATE NEW LISTING ROUTE 
app.post("/listings", wrapAsync(async (req,resp,next)=>{
    // console.log(req.body);

    let result=listingSchema.validate(req.body);                   // SERVER SIDE VALIDATION USING JOI PACKAGE
    // console.log(result.error)
    if(result.error){
        throw new ExpressError(400,result.error);
    }

    let listing=req.body;
    const newListing=new Listing(listing);
    const addedListing = await newListing.save();
    // console.log("New listing added: ",addedListing);
    resp.redirect("/listings");
}))

// Display form for new listing input
app.get("/listings/new",(req,resp)=>{
    resp.render("./listings/newListing.ejs");
})

// SHOW ROUTE 
app.get("/listings/:id",wrapAsync(async(req,resp)=>{
    let {id}=req.params;
    let listingData=await Listing.findById(id);
    console.log("SHOW LISTING DATA: ",listingData);
    resp.render("./listings/showListing.ejs",{listingData:listingData});
}))

// INDEX ROUTE
app.get("/listings", wrapAsync(async (req,resp)=>{
    let allListings=await Listing.find({});
    // console.log(allListings);
    resp.render("./listings/index.ejs",{allListings:allListings});
}))

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
