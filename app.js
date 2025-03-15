const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Listing=require("./models/listing.js");

const methodOverride=require("method-override");
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

async function  main(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/WanderWise");
        console.log("Connection to MongoDB Succesful");
    }catch(err){
        console.log("Some error occured while connecting to db",err);
    }
}
main();  // Calling main() after defining it is better than calling it before , although it works fine


// UPDATE ROUTE 
app.put("/listings/:id",async(req,resp)=>{
    let {id}=req.params;
    // console.log(req.body);
    let updatedListing=req.body;
    const updated= await Listing.findByIdAndUpdate(id,updatedListing);
    console.log("UPDATED DATA: ",updated);
    resp.redirect(`/listings/${id}`)
})

// EDIT ROUTE  
app.get("/listings/:id/edit",async(req,resp)=>{
    let {id}=req.params;
    let listingData=await Listing.findById(id);
    // console.log("EDIT LISTING DATA: ",listingData);
    resp.render("./listings/editListing.ejs",({listingData:listingData}));
})

// CREATE NEW LISTING ROUTE 
app.post("/listings", async (req,resp)=>{
    // console.log(req.body);
    let listing=req.body;
    const newListing=new Listing(listing);
    const addedListing = await newListing.save();
    console.log("New listing added: ",addedListing);
    resp.redirect("/listings");
})

// Display form for new listing input
app.get("/listings/new",(req,resp)=>{
    resp.render("./listings/newListing.ejs");
})

// SHOW ROUTE 
app.get("/listings/:id",async(req,resp)=>{
    let {id}=req.params;
    let listingData=await Listing.findById(id);
    // console.log(listingData);
    resp.render("./listings/showListing.ejs",{listingData:listingData});
})

// INDEX ROUTE
app.get("/listings", async (req,resp)=>{
    let allListings=await Listing.find({});
    resp.render("./listings/index.ejs",{allListings:allListings});
})

app.get("/",(req,resp)=>{
    resp.send("Welcome to home page bhai");
})

app.listen(8080,()=>{
    console.log("Server listening to port 8080");
})
