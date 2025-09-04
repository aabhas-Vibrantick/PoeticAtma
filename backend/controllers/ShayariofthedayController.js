// controllers/ShayariofthedayController.js

const ShayariOfTheDay = require("../models/ShayariOfTheDay");

// Add Shayari of the Day (namespaced)
exports.addShayariOfTheDay = async (req, res) => {
  try {
    const shayari = (req.body.shayari || "").trim();
    const author = (req.body.author || "Anonymous").trim();

    if (!shayari) {
      return res.status(400).json({ success: false, message: "Shayari is required" });
    }

    // Deactivate previously active shayari(s) only
    // await ShayariOfTheDay.updateMany({ active: true }, { $set: { active: false } });

    const newShayari = await ShayariOfTheDay.create({ shayari, author, active: true });

    return res.status(201).json({
      success: true,
      message: "Shayari of the Day added successfully",
      data: newShayari,
    });
  } catch (err) {
    console.error("Error adding shayari of the day:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: String(err),
    });
  }
};

// Get Latest (active) Shayari of the Day
exports.getLatestShayariOfTheDay = async (req, res) => {
  try {
    const latest = await ShayariOfTheDay.findOne({ active: true }).sort({ createdAt: -1 });
    if (!latest) {
      return res.status(404).json({ success: false, message: "No active shayari found" });
    }
    res.status(200).json({ success: true, data: latest });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Delete Shayari of the Day by ID
exports.deleteShayariOfTheDay = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ShayariOfTheDay.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Shayari not found" });
    }
    res.status(200).json({ success: true, message: "Shayari deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Get All Shayari of the Day (history)
exports.getAllShayariOfTheDay = async (req, res) => {
  try {
    const list = await ShayariOfTheDay.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch shayari list",
      error: err.message,
    });
  }
};

// Get Shayari of the Day by ID
exports.getShayariOfTheDayById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await ShayariOfTheDay.findById(id);
    if (!doc) {
      return res.status(404).json({ success: false, message: "Shayari not found" });
    }
    res.status(200).json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Update Shayari of the Day
exports.updateShayariOfTheDay = async (req, res) => {
  try {
    const { _id } = req.body;
    const shayari = (req.body.shayari || "").trim();
    const author = (req.body.author || "").trim();

    if (!_id) {
      return res.status(400).json({ success: false, message: "ID (_id) is required" });
    }

    const update = {};
    if (shayari) update.shayari = shayari;
    if (author) update.author = author;

    const updated = await ShayariOfTheDay.findByIdAndUpdate(_id, update, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Shayari not found" });
    }

    res.status(200).json({ success: true, message: "Shayari updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
