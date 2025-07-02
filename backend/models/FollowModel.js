const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  followingId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
});

module.exports = mongoose.model('Follow', followSchema);
