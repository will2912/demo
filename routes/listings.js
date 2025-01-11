const express =require ("express");
const router = express.Router();
const listin =require("../models/listings.js");
const asyncWrap=require("../utils/asyncWrap")
const expressError= require("../utils/ExpressError");
const {lSchema,reviewSchema}=require("../schema.js")
const {isLoggedin,isOwner,validateSchema}=require("../middleware.js")
const listingcontroller=require("../controllers/listings.js")
 
const multer  = require('multer')
const {storage}= require("../cloudConfig.js")
const upload = multer({ storage })



router.get("/",listingcontroller.index)

router.get("/:id/show",listingcontroller.showListings)

router.get("/new",isLoggedin,listingcontroller.createListingForm)

router.post("/post",isLoggedin,upload.single('list[image]'),validateSchema,asyncWrap(listingcontroller.CreateListing))



router.get("/:id/edit",isLoggedin,isOwner,listingcontroller.editForm)

router.patch("/:id/update",isLoggedin,isOwner,upload.single('image'),listingcontroller.edit)

router.delete("/:id/delete",isLoggedin,isOwner,listingcontroller.delete)

module.exports=router;