const Reply = require("../../models/Blog/BReplyModel");

// Create a new reply on a comment
async function createReply(req, res) {
  try {
    console.log("Received request body:", req.body); // Debug line

    // const { reply, userId, commentId } = req.body;

    var validation = "";
    if (req.body.text == "") {
      validation += "Reply text is required ";
    }
    if ((req.body.userId = "")) {
      validation += "user ID is required ";
    }
    if ((req.body.commentId = "")) {
      validation += "Comment ID is required ";
    }

    if (!!validation) {
      res.json({
        status: 409,
        success: false,
        message: validation,
      });
    } else {
      const newReply = new Reply();
      newReply.text = req.body.text;
      newReply.userId = req.decoded;
      newReply.commentId = req.body._id;

      await newReply.save();

      res.json({
        status: 200,
        success: true,
        message: "Reply created successfully",
        reply: newReply,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "An error occurred while creating the reply",
      error: error.message,
    });
  }
}

getAllReplies = (req, res) => {
  Reply.find({ commentId: req.body._id })
    .select({})
    .populate("commentId")
    .populate("userId")
    .then((blogByUser) => {
      res.json({
        status: 200,
        success: true,
        message: "your all reply by comment id ",
        data: blogByUser,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all reply by comment id ",
        error: err,
      });
    });
};

module.exports = { createReply, getAllReplies };
