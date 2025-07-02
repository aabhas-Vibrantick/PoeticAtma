const SherLike = require('../../models/Sher/SherLikeModel'); 

// const { validationResult } = require('express-validator');
likeOrUnlikeSher = async (req, res) => {
  try {
    const userId = req.decoded;
    const sherId = req.body.sherId;
    const existingLike = await SherLike.findOne({ userId, sherId });
    if (existingLike) {
      await SherLike.deleteOne({ userId, sherId });
      res.status(200).json({ message: 'Post unliked successfully' });
    } else {
      const newLike = new SherLike({ userId, sherId });
      await newLike.save();
      res.status(201).json({ message: 'Post liked successfully' });
    }
  } catch (error) {
    console.error('Error performing like/unlike operation:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getLikeCountForSher = async (req, res) => {
  try {
    const sherId = req.body.sherId;

    const likeCount = await SherLike.countDocuments({ sherId });

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
  likeOrUnlikeSher,
  getLikeCountForSher
};