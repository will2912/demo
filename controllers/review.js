const review =require("../models/review.js");
const listin =require("../models/listings.js");

module.exports.CreateReview=async(req,res,next)=>{
    let{id}=req.params;
    console.log(req.body);
    let{rating,comment}=req.body.review;
   // let rev=new review(req.body.review);
   let prop=await listin.findById(id);
   let rev=new review({
    rating:rating,
    comment:comment,
   })
   rev.author=req.user._id;
   prop.reviews.push(rev);
let a=   await rev.save();
 let b=  await prop.save();
   console.log(a);
   console.log(b);
   let detail =prop;
   req.flash("success","new review created")
   res.redirect(`/listings/${id}/show`)

}

module.exports.delete=async(req,res)=>{
    let {id,reviewid}=req.params;
    let y=await listin.findByIdAndUpdate(id,{$pull:{reviews:reviewid}})
  let x= await review.findByIdAndDelete(reviewid);
  console.log(x,y)
  req.flash("success","review deleted")
    res.redirect(`/listings/${id}/show`)
    //res.render("listings/show.ejs",{detail})
}