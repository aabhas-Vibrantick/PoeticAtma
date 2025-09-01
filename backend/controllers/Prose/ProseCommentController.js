const ProseComment = require("../../models/Prose/ProseCommentModel");

// Create a new comment on a prose post
async function createproseComment(req, res) {
  let validation = "";
  if (!req.body.text) {
    validation += "Comment text is required ";
  }
  if (!req.body.proseId) {
    validation += "Prose ID is required ";
  }

  if (validation) {
    return res.json({
      status: 409,
      success: false,
      message: validation.trim(),
    });
  }

  try {
    const commentobj = new ProseComment({
      text: req.body.text,
      userId: req.decoded, // ✅ user comes from token
      proseId: req.body.proseId,
    });

    // save + populate user info
    const savedComment = await commentobj.save();
    const populatedComment = await savedComment.populate("userId", "name Image");

    res.json({
      status: 200,
      success: true,
      message: "Comment inserted",
      data: populatedComment, // ✅ return populated object
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "Error Occurred",
      error: String(err),
    });
  }
}

// Get all comments for a prose
const getAllproseComments = (req, res) => {
  ProseComment.find({ proseId: req.body.proseId })
    .populate("userId", "name Image") // ✅ only necessary fields
    .populate("proseId")
    .then((proseByUser) => {
      res.json({
        status: 200,
        success: true,
        message: "Your all comments by prose id",
        data: proseByUser,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "Error in getting comments by prose id",
        error: String(err),
      });
    });
};

module.exports = { createproseComment, getAllproseComments };
