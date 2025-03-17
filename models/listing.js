const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema= new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
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
    }
})

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;