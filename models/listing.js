const mongoose = require("mongoose");
const { type } = require("../Joi_Schema");
const { ref, required } = require("joi");
const Schema = mongoose.Schema;
const Review=require("./review.js");

const listingSchema= new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type:String,
        // you can give min and max length for description
    },
    price:{
        type:Number,
        min:0   // added lately
    },
    image: {
        filename : String,
        url: {
          type: String,
          default: "https://media.istockphoto.com/id/2157387146/photo/contemporary-charm-exploring-the-exterior-of-the-modern-cottage-villa.webp?a=1&b=1&s=612x612&w=0&k=20&c=_ECmcv8NS-dwpDQo_QBH_4aFPgOScm_oaGvdl1ytmCk=",
          set: (v) => v === "" ? "https://media.istockphoto.com/id/2157387146/photo/contemporary-charm-exploring-the-exterior-of-the-modern-cottage-villa.webp?a=1&b=1&s=612x612&w=0&k=20&c=_ECmcv8NS-dwpDQo_QBH_4aFPgOScm_oaGvdl1ytmCk=" : v
        }
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    category:{
        type: String, 
        enum: ["Trending","Rooms","Iconic Cities","Historical","Beaches","Camping","Farms","Hill Station","Boating","Amazing Pools","Snowy","Nature","Other"],
        required: true 
    }
    // geometry:{
    //     type: {
    //       type: String, // Don't do `{ location: { type: String } }`
    //       enum: ['Point'], // 'location.type' must be 'Point'
    //     //   required: true
    //     },
    //     coordinates: {
    //       type: [Number],
    //       required: true
    //     }
    // }
})
 
listingSchema.post("findOneAndDelete",async(listing)=>{
    await Review.deleteMany({ _id: {$in:listing.reviews} });
})
 
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;