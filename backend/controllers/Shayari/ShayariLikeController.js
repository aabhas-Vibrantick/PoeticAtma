const ShayariLike = require('../../models/Shayari/ShayariLikeModel'); 


// const { validationResult } = require('express-validator');
likeOrUnlikeShayari = async (req, res) => {
  try {
    const userId = req.decoded;
    const shayariId = req.body.shayariId;
    const existingLike = await ShayariLike.findOne({ userId, shayariId });
    if (existingLike) {
      await ShayariLike.deleteOne({ userId, shayariId });
      res.status(200).json({ message: 'Post unliked successfully' });
    } else {
      const newLike = new ShayariLike({ userId, shayariId });
      await newLike.save();
      res.status(201).json({ message: 'Post liked successfully' });
    }
  } catch (error) {
    console.error('Error performing like/unlike operation:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getLikeCountForShayari = async (req, res) => {
  try {
    const shayariId = req.body.shayariId;

    const likeCount = await ShayariLike.countDocuments({ shayariId });

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
  likeOrUnlikeShayari,
  getLikeCountForShayari
};