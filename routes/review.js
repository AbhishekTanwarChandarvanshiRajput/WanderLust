const express=require("express");
const router=express.Router({mergeParams: true});
const wrapAsync=require("../utils/wrapAsync.js");  
const ExpressError=require("../utils/ExpressError.js");

const Review=require("../models/review.js");
const Listing=require("../models/listing.js"); 
const {validateReview,isLoggedIn, isReviewAuthor}=require("../middleware.js");
const reviewcontroller= require("../controllers/reviews.js");










//post reviews route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewcontroller.createReview)); 
//delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewcontroller.destroyReview));
module.exports=router;