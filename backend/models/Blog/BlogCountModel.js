const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
  count: { type: Number, default: 0 },
});

module.exports = mongoose.model('blogPageView', pageViewSchema);
