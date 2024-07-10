const express=require("express")
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema}=require("../schema.js");

const Listing=require("../models/listing.js");
const reviews=require("../routes/review.js");
const{isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage })
const listingController=require("../controllers/listings.js")


router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
     upload.single('listing[image]'),
     validateListing,
     wrapAsync(listingController.createListing))
// new route

router.get("/new",isLoggedIn,listingController.renderNewForm)


router
.route("/:id")
.get(wrapAsync(listingController.showListing)
)
.put(isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn, isOwner,wrapAsync(listingController.destroyListing)
)



// // show routes
// router.get("/:id",wrapAsync(async (req,res,next)=>{
//     let {id}=req.params;
//     const listing=await Listing.findById(id).populate("review").populate("owner").then(res =>console.log(res)).catch(err=> console.log(err))

//     if(listing==undefined || listing==null){
//         req.flash("error","Listing you requestd for does not exit!");
//         res.redirect("/listings")
//         return;
//     }
//     console.log(listing)
//     res.render("listings/show.ejs",{listing});
// }))



// edit route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm))


module.exports=router;

