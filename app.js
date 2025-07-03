const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
 const ExpressError=require("./utils/ExpressError.js");

 const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");







const Mongo_url="mongodb://127.0.0.1:27017/wanderlust";

main().
then(()=>{console.log("connected to DB");

}).catch((err)=>{console.log(err);

});



async function main(){
    await mongoose.connect(Mongo_url);
}


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


//root route
app.get("/",(req,res)=>{
    res.send("hi i am root");
});









app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);











// app.use("*",(req,res,next)=>{
//     next(new ExpressError(404,"page not found"));
// });
app.use((err,req,res,next)=>{
   const { statusCode = 500, message = "Something went wrong" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message});
});



app.listen(8080,()=>{
    console.log("server listening on port 8080");
});