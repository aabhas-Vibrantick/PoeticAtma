const SherComment = require("../../models/Sher/SherCommentModel");

// Create a new comment on a sher post
async function createsherComment(req, res) {

  var validation = ""
  if (req.body.text=="" ) {
    validation += "Comment text is required "
  }
  if (req.body.userId =="" ) {
    validation += "userId ID is required "
  }
  if (req.body.sherId =="" ) {
    validation += "sher ID is required "
  }

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    let commentobj = new SherComment()
    commentobj.text = req.body.text
    commentobj.userId = req.decoded
    commentobj.sherId = req.body.sherId

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

getAllsherComments = (req, res) => {
  SherComment.find({ sherId: req.body.sherId })
    .select({})
    .populate("sherId")
    .populate("userId")
    .then((sherByUser) => {
      res.json({
        status: 200,
        success: true,
        message: "your all comment by sher id ",
        data: sherByUser,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all comment by sher id ",
        error: err,
      });
    });
};

module.exports = { createsherComment, getAllsherComments };
