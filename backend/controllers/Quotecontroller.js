//import Quote from "../models/Quote";
const Quote = require("../models/Quote");


exports.addQuote = async (req, res) => {
  try {
    const { quote, author } = req.body;

    if (!quote || !author) {
      return res.status(400).json({ success: false, message: "Quote and author are required" });
    }

    // Deactivate all old quotes
    await Quote.updateMany({}, { $set: { active: false } });

    // Create and save the new quote
    const newQuote = new Quote({ quote, author, active: true });
    await newQuote.save();

    return res.status(201).json({
      success: true,
      message: "Quote added successfully",
      data: newQuote,
    });
  } catch (err) {
    console.error("Error adding quote:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: String(err),
    });
  }

};


exports.getLatestQuote = async (req, res) => {
  try {
    const latestQuote = await Quote.findOne({ active: true }).sort({ createdAt: -1 });

    if (!latestQuote) {
      return res.status(404).json({ success: false, message: "No active quote found" });
    }

    res.status(200).json({ success: true, data: latestQuote });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


exports.deleteQuote = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Quote.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Quote not found" });
    }
    res.status(200).json({ success: true, message: "Quote deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ success: true, data: quotes });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quotes",
      error: err.message,
    });
  }
};



exports.getQuoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findById(id);

    if (!quote) {
      return res.status(404).json({ success: false, message: "Quote not found" });
    }

    res.status(200).json({ success: true, data: quote });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

exports.updateQuote = async (req, res) => {
  try {
    const { _id, quote, author } = req.body;

    const updated = await Quote.findByIdAndUpdate(_id, { quote, author }, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Quote not found" });
    }

    res.status(200).json({ success: true, message: "Quote updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
