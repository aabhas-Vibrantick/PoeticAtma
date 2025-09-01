const Like = require("../../models/Blog/BLikeModel");

const likeOrUnlikeBlog = async (req, res) => {
  try {
    const userId = req.decoded;
    const { blogId } = req.body;

    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const existingLike = await Like.findOne({ userId, blogId });

    if (existingLike) {
      await Like.deleteOne({ userId, blogId });
    } else {
      const newLike = new Like({ userId, blogId });
      await newLike.save();
    }

    // ✅ Always return updated like count + status
    const likeCount = await Like.countDocuments({ blogId });
    const liked = !existingLike; // true if we just liked

    res.json({
      success: true,
      message: liked ? "Post liked successfully" : "Post unliked successfully",
      liked,
      likeCount,
    });
  } catch (error) {
    console.error("Error performing like/unlike operation:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getLikeCountForBlog = async (req, res) => {
  try {
    const { blogId } = req.body;
    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const likeCount = await Like.countDocuments({ blogId });

    res.json({
      success: true,
      message: "Like count fetched successfully",
      likeCount,
    });
  } catch (error) {
    console.error("Error fetching like count:", error);
    res.status(500).json({
      success: false,
      message: "Internal Error Occurred",
      error: error.message,
    });
  }
};

module.exports = {
  likeOrUnlikeBlog,
  getLikeCountForBlog,
};
