let mongoose = require("mongoose")

let BookSchema = new mongoose.Schema({

    title:{type:String,default:""},
    author:{type:String,default:""},
    description:{type:String,default:""},
    Book_Price:{type:String,default:""},
    bookcategory:{type:String,default:""},
    Book_Quantity:{type:String,default:""},
    Payment_option:{type:String,default:""},
    Image:{type:String,default:"no-image.jpg"},
    userId : {type:mongoose.SchemaTypes.ObjectId,ref:'user',default:null},
    createdAt:{type:Date,default:Date.now()},
    status : { type:Boolean,default:1},
   
})

module.exports = mongoose.model("Book",BookSchema)
