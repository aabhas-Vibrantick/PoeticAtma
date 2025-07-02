const mongoose=require('mongoose')
const contactschema=new mongoose.Schema({
    name:{type:String,default:null},
    email:{type:String,default:null},
    subject:{type:String,default:null},
    user_type:{type:Number,default:2}, //1=admin,2=customer
    contact:{type:Number,default:null},
    message:{type:String,default:null},
    status:{type:Boolean,default:true},
    created_at:{type:Date,default:Date.now()},
})
module.exports=new mongoose.model("Contact",contactschema) 