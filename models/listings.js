const mongoose = require("mongoose");
const review = require("./review.js");
const user = require("./user.js");

const Schema=mongoose.Schema;
const ls =new mongoose.Schema({
    title:{
        type:String,
         required:true,
    },
    description:String,
    image:{
        filename:String,
        url:{type:String,
        default:"https://highxtar.com/wp-content/uploads/2022/07/mia-khalifa-onlyfans-selfie.jpg",
       }
    },
    price:Number,
    location:String,
    country:String,
    reviews: [
        {
          type: Schema.Types.ObjectId,
          ref: "review",
        },
      ],
    owner:{
      type: Schema.Types.ObjectId,
      ref: "user",
    }
})
ls.post("findOneAndDelete", async(customer)=> {
  console.log("work  ");
  
  if(customer.reviews.length){
    let res= await review.deleteMany({_id:{$in: customer.reviews}});
    console.log("mid  "+res);
  }
});
const listin=mongoose.model("listin",ls);
module.exports=listin;