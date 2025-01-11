const joi = require('joi');
const lSchema= joi.object({
  list:joi.object({
   title:joi.string().required(),
    description:joi.string().required(),
    location:joi.string().required(),
    country:joi.string().required(),
    price:joi.number().required().min(0),
    image:joi.string().allow("",null),
    }).required()
})

const reviewSchema= joi.object({
  review:joi.object({
   comment:joi.string().required(),
   rating:joi.number().required(),
    }).required()
})


module.exports=
{lSchema,reviewSchema};