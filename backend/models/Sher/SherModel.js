const mongoose = require("mongoose");

const sherschema = new mongoose.Schema({
  title: { type: String, default: null ,required: true },
  sher: { type: String, default: null , required: true },
  language: { type: String, default: null , required: true },
  Image: { type: String, default: "no-image.jpg" },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "user", default: null },
  Category_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "sher_Category",
    default: null,
  },
  tags: [{ type: String }],
  status: { type: Boolean, default: true},
  created_at: { type: Date, default: Date.now() },
});

sherschema.pre("save", function (next) {
  if (this.sher && typeof this.sher === "string") {
    this.sher = this.sher
      .replace(/<\/?p>/gi, "")         // remove <p> and </p>
      .replace(/<br\s*\/?>/gi, "")     // remove <br> and <br/>
      .trim();                         // optional: clean whitespace
  }
  next();
});
module.exports = new mongoose.model("sher", sherschema);
