// models/ShayariOfTheDay.js

const mongoose = require("mongoose");

const shayariSchema = new mongoose.Schema({
  shayari: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true, // Only one active shayari of the day
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ShayariOfTheDay", shayariSchema);
