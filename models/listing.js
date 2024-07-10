// const mongoose=require("mongoose");
// const review = require("./review");
// const Review=require("./review.js");
// const Schema=mongoose.Schema;
// const express=require("express")
// const router=express.Router();
// const wrapAsync=require("../utils/wrapAsync.js");

// const listingSchema=new Schema({
//     title:{
//         type:String,
//         required:true
//     },
//     description:String,
//     image:{
//         type:String,
//         set:(v)=>
//         v===""
//         ? "https://media.istockphoto.com/id/1453462931/photo/maldives-hotel-beach-resort-on-tropical-island-with-aerial-drone-view.webp?b=1&s=170667a&w=0&k=20&c=u-zNzEvxClpUbq92jGiKxWDhF2KB30Sev8jMUG3SiG0="
//         : v,
//     },

//     price:Number,
//     location:String,
//     country:String,

//     review:[
//         {
//             type:Schema.Types.ObjectId,
//             ref:"Review",
//         }
//     ],
//     owner:{
//         type:Schema.Types.ObjectId,
//         ref:"User",
//     }
// });

// listingSchema.post("findOneAndDelete",async(listing)=>{
//     if(listing){
//         await Review.deleteMany({_id:{$in:listing.reviews}});
//     }
// })

// const Listing=mongoose.model("Listing",listingSchema);
// // router.delete("/:id",wrapAsync(async (req,res,next)=>{
// //     let {id}=req.params;
// //     let deletingListing=await Listing.findByIdAndDelete(id)
// //     console.log(deletingListing);
// //     res.redirect("./listings")
// // }));
// module.exports=Listing
const mongoose = require("mongoose");
const review = require("./review");
const Review = require("./review.js");
const Schema = mongoose.Schema;
const express = require("express")
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    // image: {
    //     type: String,
    //     set: (v) =>
    //         v === ""
    //             ? "https://media.istockphoto.com/id/1453462931/photo/maldives-hotel-beach-resort-on-tropical-island-with-aerial-drone-view.webp?b=1&s=170667a&w=0&k=20&c=u-zNzEvxClpUbq92jGiKxWDhF2KB30Sev8jMUG3SiG0="
    //             : v,
    // },
    image:{
        url:String,
        filename:String,

    },

    price: Number,
    location: String,
    country: String,

    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing