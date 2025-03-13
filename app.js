const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");

const Listing=require("./models/listing.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

async function  main(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/WanderWise");
        console.log("Connection to MongoDB Succesful");
    }catch(err){
        console.log("Some error occured while connecting to db",err);
    }
}
main();  // Calling main() after defining it is better than calling it before , although it works fine


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
