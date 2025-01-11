const express =require ("express");
const router = express.Router({mergeParams:true});
const review = require("../models/review.js");
const listin =require("../models/listings.js");
const asyncWrap=require("../utils/asyncWrap")
const expressError= require("../utils/ExpressError");
const {lSchema,reviewSchema}=require("../schema.js")
const {RvalidateSchema,isLoggedin,isReviewOwner}=require("../middleware.js")
const reviewController=require("../controllers/review.js")


router.post("/",isLoggedin,RvalidateSchema,asyncWrap(reviewController.CreateReview))
router.delete("/:reviewid",isLoggedin,isReviewOwner,asyncWrap(reviewController.delete))

module.exports=router;
