const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  text: { type: String,default:null, required: true },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'user', required: true },
  commentId: { type: mongoose.SchemaTypes.ObjectId, ref:'SherComment', required: true },
  status:{type:Boolean,default:1},
  created_at:{type:Date,default:Date.now()},
});

module.exports = mongoose.model('SherReply', replySchema);
