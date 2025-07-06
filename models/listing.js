const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
  image: {
  filename: {
    type: String,
    default: ""
  },
  url: {
    type: String,
    default: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    set: (value) => {
      // If value is undefined, null, or empty string, use default
      if (!value || value.trim() === "") {
        return "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60";
      }
      return value.trim();
    }
  }
},


    price:Number,
    location:String,
    country:String,
    reviews:[
      {
        type: Schema.Types.ObjectId,
        ref:"Review",

      }
    ],
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});  
  }

})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;