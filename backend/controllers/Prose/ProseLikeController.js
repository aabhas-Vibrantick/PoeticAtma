const ProseLike = require("../../models/Prose/ProseLikeModel");

// Like or Unlike Prose
const likeOrUnlikeProse = async (req, res) => {
  try {
    const userId = req.decoded; // assuming JWT middleware sets req.decoded = userId
    const proseId = req.body.proseId;

    if (!userId || !proseId) {
      return res.status(400).json({
        success: false,
        message: "User ID or Prose ID missing",
      });
    }

    const existingLike = await ProseLike.findOne({ userId, proseId });

    if (existingLike) {
      await ProseLike.deleteOne({ userId, proseId });
      return res.status(200).json({
        success: true,
        message: "Post unliked successfully",
        liked: false,
      });
    } else {
      const newLike = new ProseLike({ userId, proseId });
      await newLike.save();
      return res.status(201).json({
        success: true,
        message: "Post liked successfully",
        liked: true,
      });
    }
  } catch (error) {
    console.error("Error performing like/unlike operation:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get like count for a prose
const getLikeCountForProse = async (req, res) => {
  try {
    const proseId = req.body.proseId;

    if (!proseId) {
      return res.status(400).json({
        success: false,
        message: "Prose ID is required",
      });
    }

    const likeCount = await ProseLike.countDocuments({ proseId });

    res.status(200).json({
      success: true,
      message: "Like count fetched successfully",
      data: { likeCount },
    });
  } catch (error) {
    console.error("Error fetching like count:", error);
    res.status(500).json({
      success: false,
      message: "Internal error occurred",
      error: error.message,
    });
  }
};

module.exports = {
  likeOrUnlikeProse,
  getLikeCountForProse,
};
