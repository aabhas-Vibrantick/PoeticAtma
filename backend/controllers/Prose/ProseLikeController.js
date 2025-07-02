const ProseLike = require("../../models/Prose/ProseLikeModel");

// const { validationResult } = require('express-validator');
likeOrUnlikeProse = async (req, res) => {
  try {
    const userId = req.decoded;
    const proseId = req.body.proseId;
    const existingLike = await ProseLike.findOne({ userId, proseId });
    if (existingLike) {
      await ProseLike.deleteOne({ userId, proseId });
      res.status(200).json({ message: "Post unliked successfully" });
    } else {
      const newLike = new ProseLike({ userId, proseId });
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

const getLikeCountForProse = async (req, res) => {
  try {
    const proseId = req.body.proseId;

    const likeCount = await ProseLike.countDocuments({ proseId });

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
  likeOrUnlikeProse,
  getLikeCountForProse,
};
