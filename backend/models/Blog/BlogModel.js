const mongoose = require("mongoose");

const blogschema = new mongoose.Schema({
  title: { type: String, default: null },
  description: { type: String, default: null },
  blog: { type: String, default: null },
  Image: { type: String, default: "no-image.jpg" },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "user", default: null },
  Category_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Blog_Category",
    default: null,
  },
  status: { type: Boolean, default: true },
  tags: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now() },
});

module.exports = new mongoose.model("Blog", blogschema);
