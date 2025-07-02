const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
  shayariId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'shayari' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ShayariLike', likeSchema);
