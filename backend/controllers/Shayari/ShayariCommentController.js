const ShayariComment = require("../../models/Shayari/ShayariCommentModel");

// Create a new comment on a shayari post
async function createshayariComment(req, res) {
  // const { text, authorId, shayariId } = req.body;

  var validation = ""
  if (req.body.text=="" ) {
    validation += "Comment text is required "
  }
  if (req.body.authorId =="" ) {
    validation += "Author ID is required "
  }
  if (req.body.shayariId =="" ) {
    validation += "shayari ID is required "
  }

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    let commentobj = new ShayariComment()
    commentobj.text = req.body.text
    commentobj.userId = req.decoded
    commentobj.shayariId = req.body.shayariId

    await commentobj.save()
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


getAllshayariComments = (req, res) => {
  ShayariComment.find({ shayariId: req.body.shayariId })
    .select({})
    .populate("shayariId")
    .populate("userId")
    .then((shayariByUser) => {
      res.json({
        status: 200,
        success: true,
        message: "your all comment by shayari id ",
        data: shayariByUser,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all comment by shayari id ",
        error: err,
      });
    });
};

module.exports = { createshayariComment, getAllshayariComments };
