const Listing=require("../models/listing");
const Review=require("../models/review");



module.exports.createReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","Your Review Added!");
    res.redirect(`/listings/${listing._id}`);

};
module.exports.destroyReview=async (req, res) => {
    let { id, reviewId } = req.params;

    // Remove reference from listing's reviews array
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review document itself
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Your Review Deleted!");

    res.redirect(`/listings/${id}`);
};