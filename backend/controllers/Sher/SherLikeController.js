const SherLike = require('../../models/Sher/SherLikeModel');

// Like or Unlike a Sher
const likeOrUnlikeSher = async (req, res) => {
  try {
    const userId = req.decoded;       // from token middleware
    const { sherId } = req.body;

    if (!sherId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Sher ID is required",
      });
    }

    const existingLike = await SherLike.findOne({ userId, sherId });

    if (existingLike) {
      await SherLike.deleteOne({ userId, sherId });
      const likeCount = await SherLike.countDocuments({ sherId });

      return res.json({
        status: 200,
        success: true,
        liked: false,
        message: "Post unliked successfully",
        data: { likeCount },
      });
    } else {
      const newLike = new SherLike({ userId, sherId });
      await newLike.save();
      const likeCount = await SherLike.countDocuments({ sherId });

      return res.json({
        status: 201,
        success: true,
        liked: true,
        message: "Post liked successfully",
        data: { likeCount },
      });
    }
  } catch (error) {
    console.error("Error performing like/unlike operation:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get Like Count for Sher
const getLikeCountForSher = async (req, res) => {
  try {
    const { sherId } = req.body;

    if (!sherId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Sher ID is required",
      });
    }

    const likeCount = await SherLike.countDocuments({ sherId });

    res.json({
      status: 200,
      success: true,
      message: "Like count fetched successfully",
      data: { likeCount },
    });
  } catch (error) {
    console.error("Error in getLikeCountForSher:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  likeOrUnlikeSher,
  getLikeCountForSher,
};
