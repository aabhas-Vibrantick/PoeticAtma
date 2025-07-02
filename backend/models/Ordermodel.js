const { default: mongoose } = require("mongoose")
const mongooge = require("mongoose")

const orderschema = new mongooge.Schema({
    userId : {type:mongoose.SchemaTypes.ObjectId,ref:'user',default:null},
    bookId : {type:mongoose.SchemaTypes.ObjectId,ref:'Book',default:null},
    price_per_item : { type:Number,default:0 },
    quantity : { type:Number,default:0 },
    sub_total : { type:Number,default:0 },
    order_status: {
        type: String,
        default: "pending",
        enum: ["pending", "process", "success"]
      },
      status : { type:Boolean,default:1},
    created_at : { type:Date,default:Date.now()}
})

module.exports = new mongooge.model('order',orderschema)