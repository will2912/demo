const listin =require("../models/listings.js");

module.exports.index=async(req,res)=>{
    console.log("index")
let data= await (listin.find())
res.render("listings/index.ejs",{data});
}

module.exports.showListings=async(req,res)=>{
     console.log("show")
    let {id}=req.params; 
    const detail =await listin.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    if(!detail){
       req.flash("error","listing you requested for does not exist")
       res.redirect("/listings")
    }
   // console.log(detail)
    res.render("listings/show.ejs",{detail})
   }

module.exports.createListingForm=(req,res)=>{
    console.log("create form")
    res.render("listings/new.ejs")
}

module.exports.CreateListing=async(req,res,next)=>{
    console.log("created")
   let {title,description,image,price,location,country}=req.body.list;
   if(Object.keys(req.body).length === 0||!req.body||undefined){
    throw new expressError(400,"bad requet")
   }
   let url=req.file.path;
    let filename=req.file.filename
    const doc1= new listin({
      title: title,
      description:description,
      image:{url,filename},
      price: price,
      location: location,
      country: country,
    })
    

    doc1.owner=req.user._id;
   const resu = await doc1.save()
   req.flash("success","new listing created")
    
    res.redirect("/listings")
    // catch(err){
    //     next(err)
    // }
}

module.exports.editForm=async(req,res)=>{
    let {id}=req.params;
   
    const x= await listin.findById(id);
   // console.log(x);
   let oi=x.image.url
   oi=oi.replace("/upload","/upload/w_250")
   console.log(oi);
    res.render("listings/edit.ejs",{x,oi});
}

module.exports.edit=async(req,res)=>{
    //console.log(req.file);
    let {id}=req.params;
    
    
    let {title,description,price,location,country}=req.body;
    let updatedListing = await listin.findById(id);

    // Update fields individually
    if (title) updatedListing.title = title;
    if (description) updatedListing.description = description;
    if (price) updatedListing.price = price;
    if (location) updatedListing.location = location;
    if (country) updatedListing.country = country;
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        console.log(url);
    let filename=req.file.filename
    updatedListing.image={url,filename}}
    await updatedListing.save();
   // let v=await listin.findByIdAndUpdate(id,{...req.body})
    console.log("edit");
   // console.log(v);
    req.flash("success","listing updated")
    res.redirect("/listings")
}

module.exports.delete=async(req,res)=>{
    let {id}=req.params;
   let d=await listin.findByIdAndDelete(id);
   //console.log(d);
   req.flash("success","listing deleted")
   res.redirect("/listings")
}