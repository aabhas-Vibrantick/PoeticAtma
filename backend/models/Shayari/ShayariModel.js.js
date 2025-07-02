const mongoose = require("mongoose");

const shayarischema = new mongoose.Schema({
  title: { type: String, default: null },
  shayari: { type: String, default: null },
  language: { type: String, default: null },
  Image: { type: String, default: "no-image.jpg" },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "user", default: null },
  Category_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "shayari_Category",
    default: null,
  },
  status: { type: Boolean, default: true },
  tags: [{ type: String }],
  created_at: { type: Date, default: Date.now() },
});

shayarischema.pre("save", function (next) {
  if (this.shayari && typeof this.shayari === "string") {
    this.shayari = this.shayari.replace(/<\/?p>/g, ""); // remove all <p> and </p> tags
  }
  next();
});


module.exports = new mongoose.model("shayari", shayarischema);
