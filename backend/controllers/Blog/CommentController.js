const Comment = require("../../models/Blog/BCommentModel");

// Create a new comment on a blog post
async function createblogComment(req, res) {
  try {
    const { text, blogId } = req.body;
    let validation = "";

    if (!text) validation += "Comment text is required ";
    if (!blogId) validation += "Blog ID is required ";

    if (validation) {
      return res.json({
        status: 409,
        success: false,
        message: validation.trim(),
      });
    }

    const commentObj = new Comment({
      text,
      userId: req.decoded, // ✅ user comes from token
      blogId,
    });

    const savedComment = await commentObj.save();

    // ✅ populate user details before sending back
    const populatedComment = await savedComment.populate("userId", "name Image");

    res.json({
      status: 200,
      success: true,
      message: "Comment inserted",
      data: populatedComment,
    });
  } catch (err) {
    console.error("Error creating blog comment:", err);
    res.json({
      status: 500,
      success: false,
      message: "Error Occurred",
      error: String(err),
    });
  }
}

// Get all comments for a specific blog post
const getAllComments = (req, res) => {
  const { blogId } = req.body;

  if (!blogId) {
    return res.json({
      status: 409,
      success: false,
      message: "Blog ID is required",
    });
  }

  Comment.find({ blogId })
    .populate("userId", "name Image") // ✅ only user info
    .populate("blogId", "_id title") // ✅ optional blog info
    .then((comments) => {
      res.json({
        status: 200,
        success: true,
        message: "All comments fetched successfully",
        data: comments,
      });
    })
    .catch((err) => {
      console.error("Error fetching comments:", err);
      res.json({
        status: 400,
        success: false,
        message: "Error in getting all comments by blog id",
        error: String(err),
      });
    });
};

module.exports = { createblogComment, getAllComments };
