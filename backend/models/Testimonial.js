let mongoose = require("mongoose")

let TestimonialSchema = new mongoose.Schema({

    UserName:{type:String,default:""},
    description:{type:String,default:""},
    Image:{type:String,default:"no-image.jpg"},
    createdAt:{type:Date,default:Date.now()},
    status : { type:Boolean,default:1},
   
})

module.exports = mongoose.model("Testimonial",TestimonialSchema)
