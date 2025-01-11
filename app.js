
if(!process.env.NODE_ENV!="production"){
    require('dotenv').config()
}
//console.log(process.env.secret) 
//require('dotenv').config()

const express= require("express");
const app= express();
const port =3000;
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"/public")));
const mo=require("method-override");
app.use(mo("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const listin =require("./models/listings.js");
const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);
const asyncWrap=require("./utils/asyncWrap")
const expressError= require("./utils/ExpressError");
const {lSchema,reviewSchema}=require("./schema.js")


const passport =require("passport")
const LocalStrategy=require("passport-local")
const user=require("./models/user.js")
const session= require("express-session")
const MongoStore =require("connect-mongo")

const flash=require("connect-flash")
const userRouter=require("./routes/user.js")
const listingRouter=require("./routes/listings.js")
const reviewRouter=require("./routes/reviews.js")
const mongoose =require("mongoose");
const review = require("./models/review.js");

const dburl =process.env.ATLASDB_URL
//const mongo_url='mongodb://127.0.0.1:27017/wanderlust';
async function main(){
    await mongoose.connect(dburl);
}
main().then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log(err);
})

app.listen(port,()=>{
    console.log("hearing....")
})

const store =MongoStore.create({
    mongoUrl: dburl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
  })

store.on("err",()=>{
    console.log("error in mongo session store",err)
})

const sessionOptions={
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        expires:Date.now()+ 7*24*3600*1000,
        maxAge:7*24*3600*1000,
        httpOnly:true
     }
}
app.use(session(sessionOptions))
app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.get("/demouser",async(req,res)=>{
    let fakeUser=new user({
        email:"student@gmail.com",
        username:"delta-std",
    });
    let result= await user.register(fakeUser,"hello");
    res.send(result)
})

app.use(flash())
app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    res.locals.currUser=req.user
    next()
})

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/user",userRouter)



//1 err handling for wrong route
app.all("*",(req,res,next)=>{
    next(new expressError(405,"page not found"))
})
app.use((err,req,res,next)=>{
    let {status=200,message="exeption"}=err;
    console.log("error");
    console.log(err);
    res.render("error.ejs",{err})
    // res.status(status).send(message)
})























//JO2jwJlR5r5wizyM
//mongodb+srv://willklinson4:JO2jwJlR5r5wizyM@cluster0.4sbqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
