let mongoose = require("mongoose")

let proseCategorySchema = new mongoose.Schema({

    Category_name:{type:String,default:""},
    createdAt:{type:Date,default:Date.now()}

})

module.exports = mongoose.model("prose_Category",proseCategorySchema)
