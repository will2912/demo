const mongoose=require("mongoose");
const listin =require("../models/listings.js");
let sl=require("./data.js")

const mongo_url='mongodb://127.0.0.1:27017/wanderlust';
async function main(){
    await mongoose.connect(mongo_url);
}
main().then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log(err);
})


const initdb=async ()=>{
  await listin.deleteMany();
  sl=sl.map((obj)=>({...obj,owner:"677cdfcd253361790bc32f26"}))
  await listin.insertMany(sl);
  console.log("init");
}
  initdb();
