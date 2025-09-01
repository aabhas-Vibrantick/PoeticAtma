const SherReply = require("../../models/Sher/SherReplyModel");

// Create a new reply on a Sher comment
async function createSherReply(req, res) {
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

    const newReply = new SherReply({
      text,
      userId: req.decoded,   // ✅ from token
      commentId,             // ✅ correct key
    });

    const savedReply = await newReply.save();
    const populatedReply = await savedReply.populate("userId", "name Image");

    res.json({
      status: 200,
      success: true,
      message: "Reply created successfully",
      data: populatedReply,   // ✅ send populated reply
    });
  } catch (error) {
    console.error("Error in createSherReply:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "An error occurred while creating the reply",
      error: error.message,
    });
  }
}

// Get all replies for a comment
const getAllsherReplies = (req, res) => {
  const { commentId } = req.body;

  if (!commentId) {
    return res.json({
      status: 400,
      success: false,
      message: "Comment ID is required",
    });
  }

  SherReply.find({ commentId })
    .populate("userId", "name Image") // ✅ only return useful fields
    .then((replies) => {
      res.json({
        status: 200,
        success: true,
        message: "All replies fetched successfully",
        data: replies,
      });
    })
    .catch((err) => {
      console.error("Error fetching sher replies:", err);
      res.json({
        status: 500,
        success: false,
        message: "Error in getting replies",
        error: String(err),
      });
    });
};

module.exports = { createSherReply, getAllsherReplies };
