const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  type: { type: String, enum: ["cloudflare", "google"], required: true },
  sitekey: { type: String, required: true },
  secretkey: { type: String, required: true },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model("Settings", SettingsSchema);
