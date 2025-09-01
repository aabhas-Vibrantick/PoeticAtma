const Reply = require("../../models/Blog/BReplyModel");

// Create a new reply on a comment
async function createReply(req, res) {
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

    const newReply = new Reply({
      text,
      userId: req.decoded, // ✅ comes from token
      commentId,
    });

    const savedReply = await newReply.save();

    // ✅ populate user before sending back
    const populatedReply = await savedReply.populate("userId", "name Image");

    res.json({
      status: 200,
      success: true,
      message: "Reply created successfully",
      data: populatedReply, // ✅ frontend expects `data`
    });
  } catch (error) {
    console.error("Error creating reply:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "An error occurred while creating the reply",
      error: error.message,
    });
  }
}

// Get all replies for a comment
const getAllReplies = (req, res) => {
  const { commentId } = req.body;

  if (!commentId) {
    return res.json({
      status: 409,
      success: false,
      message: "Comment ID is required",
    });
  }

  Reply.find({ commentId })
    .populate("userId", "name Image") // ✅ only user info
    .populate("commentId", "_id text") // ✅ optional, keep lightweight
    .then((replies) => {
      res.json({
        status: 200,
        success: true,
        message: "Replies fetched successfully",
        data: replies,
      });
    })
    .catch((err) => {
      console.error("Error fetching replies:", err);
      res.json({
        status: 400,
        success: false,
        message: "Error in getting replies",
        error: String(err),
      });
    });
};

module.exports = { createReply, getAllReplies };
