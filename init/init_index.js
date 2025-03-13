const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const initData=require("./data.js");

main();
async function main(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/WanderWise");
        console.log("Connecction to mongodb successful");
    }catch(err){
        console.log("Error connecting to db ",err);
    }
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data)
    console.log("Initialised data successfully !!");
}
initDB();