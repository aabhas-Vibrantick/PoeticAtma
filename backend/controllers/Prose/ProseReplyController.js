const ProseReply = require("../../models/Prose/ProseReplyModel");

// Create a new reply on a prose comment
async function createProseReply(req, res) {
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

    const newReply = new ProseReply({
      text,
      userId: req.decoded,   // ✅ user from token
      commentId,
    });

    const savedReply = await newReply.save();
    const populatedReply = await savedReply.populate("userId", "name Image");

    res.json({
      status: 200,
      success: true,
      message: "Reply created successfully",
      data: populatedReply,  // ✅ consistent key for frontend
    });
  } catch (error) {
    console.error("Error in createProseReply:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "An error occurred while creating the reply",
      error: error.message,
    });
  }
}

// Get all replies for a prose comment
const getAllproseReplies = (req, res) => {
  ProseReply.find({ commentId: req.body.commentId })  // ✅ correct key
    .populate("userId", "name Image")                 // ✅ only user details
    .then((replies) => {
      res.json({
        status: 200,
        success: true,
        message: "All replies fetched successfully",
        data: replies,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "Error in getting replies by comment id",
        error: String(err),
      });
    });
};

module.exports = { createProseReply, getAllproseReplies };
