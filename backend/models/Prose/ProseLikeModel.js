const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
  proseId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'prose' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ProseLike', likeSchema);
