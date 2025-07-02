const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
  sherId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'sher' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SherLike', likeSchema);
