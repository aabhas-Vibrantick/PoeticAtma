let mongoose = require("mongoose")

let proseImageSchema = new mongoose.Schema({

    title:{type:String,default:""},
    Image:{type:String,default:"no-image.jpg"},
    userId:{type:mongoose.SchemaTypes.ObjectId,ref:'user',default:null},
    Category_id:{type:mongoose.SchemaTypes.ObjectId,ref:'prose_Category',default:null},
    tags: [{ type: String }],
    status:{type:Boolean,default:0},
    createdAt:{type:Date,default:Date.now()}

})

module.exports = mongoose.model("prose_Image",proseImageSchema)
