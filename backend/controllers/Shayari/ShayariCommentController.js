const ShayariComment = require("../../models/Shayari/ShayariCommentModel");

// Create a new comment on a shayari post
async function createshayariComment(req, res) {
  let validation = "";
  if (!req.body.text) {
    validation += "Comment text is required ";
  }
  if (!req.body.shayariId) {
    validation += "Shayari ID is required ";
  }

  if (validation) {
    return res.json({
      status: 409,
      success: false,
      message: validation.trim(),
    });
  }

  try {
    const commentobj = new ShayariComment({
      text: req.body.text,
      userId: req.decoded, // from token
      shayariId: req.body.shayariId,
    });

    // save + populate user info
    const savedComment = await commentobj.save();
    const populatedComment = await savedComment.populate("userId", "name Image");

    res.json({
      status: 200,
      success: true,
      message: "Comment inserted",
      data: populatedComment,
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

// Get all comments for a shayari
const getAllshayariComments = (req, res) => {
  ShayariComment.find({ shayariId: req.body.shayariId })
    .populate("shayariId")
    .populate("userId", "name Image")
    .then((shayariByUser) => {
      res.json({
        status: 200,
        success: true,
        message: "Your all comments by shayari id",
        data: shayariByUser,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "Error in getting all comments by shayari id",
        error: String(err),
      });
    });
};

module.exports = { createshayariComment, getAllshayariComments };
