let mongoose = require("mongoose")

let BlogCategorySchema = new mongoose.Schema({

    Category_name:{type:String,default:""},
    createdAt:{type:Date,default:Date.now()}

})

module.exports = mongoose.model("Blog_Category",BlogCategorySchema)
