const Like = require("../../models/Blog/BLikeModel");

// const { validationResult } = require('express-validator');
likeOrUnlikeBlog = async (req, res) => {
  try {
    const userId = req.decoded;
    const blogId = req.body.blogId;
    const existingLike = await Like.findOne({ userId, blogId });
    if (existingLike) {
      await Like.deleteOne({ userId, blogId });
      res.status(200).json({ message: "Post unliked successfully" });
    } else {
      const newLike = new Like({ userId, blogId });
      await newLike.save();
      res.status(201).json({ message: "Post liked successfully" });
    }
  } catch (error) {
    console.error("Error performing like/unlike operation:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getLikeCountForBlog = async (req, res) => {
  try {
    const blogId = req.body.blogId;

    const likeCount = await Like.countDocuments({ blogId });

    res.json({
      status: 200,
      success: true,
      message: "Like count fetched successfully",
      data: {
        likeCount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Error Occurred",
      error: String(error),
    });
  }
};

module.exports = {
  likeOrUnlikeBlog,
  getLikeCountForBlog,
};
