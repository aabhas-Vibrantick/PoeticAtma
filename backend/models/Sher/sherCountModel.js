const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'sher', required: true },
  count: { type: Number, default: 0 },
});

module.exports = mongoose.model('sherPageView', pageViewSchema);
