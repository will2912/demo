const listin =require("./models/listings.js");
const Review =require("./models/review.js");
const expressError= require("./utils/ExpressError");
const {lSchema,reviewSchema}=require("./schema.js")

module.exports.isLoggedin =(req,res,next)=>{
    //console.log(req.user) 
    if(!req.isAuthenticated()){
        req.session.redirecturl=req.originalUrl
        req.flash("error","you must logged in")
        return res.redirect("/user/login");
    }
    next();
}
module.exports.savedRedirect=(req,res,next)=>{
    if(req.session.redirecturl){
        res.locals.redirecturl=req.session.redirecturl
    }
   
    console.log(req.session.redirecturl);
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await listin.findById(id)
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "permission denied")
        return res.redirect(`/listings/${id}/show`)
    }
    next()
}

module.exports.isReviewOwner=async(req,res,next)=>{
    let {id,reviewid}=req.params;
    let review=await Review.findById(reviewid)
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "permission denied")
        return res.redirect(`/listings/${id}/show`)
    }
    next()
}

module.exports.validateSchema=(req,res,next)=>{
    //console.log(req.body);
    let {error} =lSchema.validate(req.body);
    console.log(error);
    if(error){
        throw new expressError(121,error);
    }
    else{
        next();
    }
}

module.exports.RvalidateSchema=(req,res,next)=>{
   // console.log(req.body)
    let {error} =reviewSchema.validate(req.body);
    
    if(error){
        throw new expressError(120,error);
    }
    else{
        next();
    }
}