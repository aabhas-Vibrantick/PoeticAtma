let mongoose = require("mongoose")

let sherCategorySchema = new mongoose.Schema({

    Category_name:{type:String,default:""},
    createdAt:{type:Date,default:Date.now()}

})

module.exports = mongoose.model("sher_Category",sherCategorySchema)
