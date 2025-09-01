const SherComment = require("../../models/Sher/SherCommentModel");

// Create a new comment on a sher post
async function createsherComment(req, res) {
  let validation = "";
  if (!req.body.text) validation += "Comment text is required ";
  if (!req.body.sherId) validation += "Sher ID is required ";

  if (validation) {
    return res.json({
      status: 409,
      success: false,
      message: validation.trim(),
    });
  }

  try {
    const commentobj = new SherComment({
      text: req.body.text,
      userId: req.decoded,   // ✅ from token
      sherId: req.body.sherId,
    });

    const savedComment = await commentobj.save();
    const populatedComment = await savedComment.populate("userId", "name Image");

    res.json({
      status: 200,
      success: true,
      message: "Comment inserted successfully",
      data: populatedComment,  // ✅ frontend gets full user info
    });
  } catch (err) {
    console.error("Error saving sher comment:", err);
    res.json({
      status: 500,
      success: false,
      message: "Error occurred",
      error: String(err),
    });
  }
}

// Get all comments for a sher post
const getAllsherComments = (req, res) => {
  const { sherId } = req.body;

  if (!sherId) {
    return res.json({
      status: 400,
      success: false,
      message: "Sher ID is required",
    });
  }

  SherComment.find({ sherId })
    .populate("userId", "name Image") // ✅ only useful fields
    .populate("sherId")               // optional: can be removed if not needed
    .then((sherByUser) => {
      res.json({
        status: 200,
        success: true,
        message: "All comments fetched successfully",
        data: sherByUser,
      });
    })
    .catch((err) => {
      console.error("Error fetching comments:", err);
      res.json({
        status: 500,
        success: false,
        message: "Error in getting comments by sherId",
        error: String(err),
      });
    });
};

module.exports = { createsherComment, getAllsherComments };
