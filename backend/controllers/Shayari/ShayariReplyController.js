const ShayariReply = require('../../models/Shayari/ShayariReplyModel');

// Create a new reply on a comment
async function createShayariReply(req, res) {
  try {
    const { text, commentId } = req.body;
    let validation = "";

    if (!text) validation += "Reply text is required ";
    if (!commentId) validation += "Comment ID is required ";

    if (validation) {
      return res.json({
        status: 409,
        success: false,
        message: validation.trim(),
      });
    }

    const newReply = new ShayariReply({
      text,
      userId: req.decoded, // from token
      commentId,
    });

    const savedReply = await newReply.save();
    const populatedReply = await savedReply.populate("userId", "name Image");

    res.json({
      status: 200,
      success: true,
      message: "Reply created successfully",
      data: populatedReply, // ✅ populated reply returned
    });
  } catch (error) {
    console.error("Error in createShayariReply:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "An error occurred while creating the reply",
      error: error.message,
    });
  }
}

// Get all replies for a comment
const getAllshayariReplies = (req, res) => {
  ShayariReply.find({ commentId: req.body.commentId })
    .populate("userId", "name Image")
    .then((replies) => {
      res.json({
        status: 200,
        success: true,
        message: "All replies by comment id",
        data: replies,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "Error in getting replies",
        error: String(err),
      });
    });
};

module.exports = { createShayariReply, getAllshayariReplies };
