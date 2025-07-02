const mongoose=require('mongoose')
const proseschema=new mongoose.Schema({
  title:{type:String,default:null},
  prose:{type:String,default:null},
  language:{type:String,default:null},
  Image:{type:String,default:"no-image.jpg"},
  userId:{type:mongoose.SchemaTypes.ObjectId,ref:'user',default:null},
  Category_id:{type:mongoose.SchemaTypes.ObjectId,ref:'prose_Category',default:null},
  tags: [{ type: String }],
  status:{type:Boolean,default:true},
  created_at:{type:Date,default:Date.now()},
})

proseschema.pre("save", function (next) {
  if (this.prose && typeof this.prose === "string") {
    this.prose = this.prose.replace(/<\/?p>/g, ""); // remove all <p> and </p> tags
  }
  next();
});
module.exports=new mongoose.model("prose",proseschema)
// ---------------------------------------------------------------------------------

