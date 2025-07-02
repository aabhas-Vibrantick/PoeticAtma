const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, default:"" },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'user',default:null },
  blogId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Blog',default:null },
  status:{type:Boolean,default:0},
  created_at:{type:Date,default:Date.now()},

});

module.exports = mongoose.model('Comment', commentSchema);
