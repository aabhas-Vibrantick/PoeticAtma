const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, default:"" },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'user',default:null },
  shayariId: { type: mongoose.SchemaTypes.ObjectId, ref: 'shayari',default:null },
  status:{type:Boolean,default:0},
  created_at:{type:Date,default:Date.now()},

});

module.exports = mongoose.model('ShayariComment', commentSchema);
