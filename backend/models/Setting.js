// models/SettingsModel.js
const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  setting_key: {
    type: String,
    required: true,
    unique: true, // Ensures you don't have duplicate settings
    default: "is_captcha_enabled",
  },
  setting_value: {
    type: Boolean,
    required: true,
    default: true, // Default to having CAPTCHA enabled
  },
});

module.exports = mongoose.model("Settings", settingsSchema);