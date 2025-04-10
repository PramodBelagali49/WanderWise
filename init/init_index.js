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
    initData.data = initData.data.map((obj)=>
        ( { ...obj , owner:"67f6795b4f05694a5161ccf2" } )
    );
    await Listing.insertMany(initData.data);
    console.log("Initialised data successfully !!");
}
initDB();