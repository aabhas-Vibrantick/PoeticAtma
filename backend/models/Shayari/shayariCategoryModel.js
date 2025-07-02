let mongoose = require("mongoose")

let shayariCategorySchema = new mongoose.Schema({

    Category_name:{type:String,default:""},
    status:{type:Boolean,default:0},
    createdAt:{type:Date,default:Date.now()}

})

module.exports = mongoose.model("shayari_Category",shayariCategorySchema)
