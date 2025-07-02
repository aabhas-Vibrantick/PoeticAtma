const ProseComment = require("../../models/Prose/ProseCommentModel");

// Create a new comment on a prose post
async function createproseComment(req, res) {
  // const { text, authorId, proseId } = req.body;

  var validation = "";
  if (req.body.text == "") {
    validation += "Comment text is required ";
  }
  if (req.body.authorId == "") {
    validation += "Author ID is required ";
  }
  if (req.body.proseId == "") {
    validation += "prose ID is required ";
  }

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    let commentobj = new ProseComment();
    commentobj.text = req.body.text;
    commentobj.userId = req.decoded;
    commentobj.proseId = req.body.proseId;

    await commentobj
      .save()
      .then(() => {
        res.json({
          status: 200,
          success: true,
          message: "Comment   inserted",
          data: req.body,
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: "Error Occurred",
          error: String(err),
        });
      });
  }
}

getAllproseComments = (req, res) => {
  ProseComment.find({ proseId: req.body.proseId })
    .select({})
    .populate("proseId")
    .populate("userId")
    .then((proseByUser) => {
      res.json({
        status: 200,
        success: true,
        message: "your all comment by prose id ",
        data: proseByUser,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all comment by prose id ",
        error: err,
      });
    });
};

module.exports = { createproseComment, getAllproseComments };
