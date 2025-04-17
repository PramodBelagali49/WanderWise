const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const initData=require("./data.js");

async function main(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/WanderWise");
        console.log("Connection to mongodb successful");
    }catch(err){
        console.log("Error connecting to mongodb ",err);
    }
}
main();

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>
        ( { ...obj , owner:"67ff7ae16bfbdaee0199f012" } )
    );
    await Listing.insertMany(initData.data);
    console.log("Initialised data successfully !!");
}
initDB();