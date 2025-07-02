const Comment = require("../../models/Blog/BCommentModel");

// Create a new comment on a blog post
async function createblogComment(req, res) {
  // const { text, authorId, blogId } = req.body;

  var validation = "";
  if (req.body.text == "") {
    validation += "Comment text is required ";
  }
  if (req.body.authorId == "") {
    validation += "Author ID is required ";
  }
  if (req.body.blogId == "") {
    validation += "Blog ID is required ";
  }

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    let commentobj = new Comment();
    commentobj.text = req.body.text;
    commentobj.userId = req.decoded;
    commentobj.blogId = req.body.blogId;

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

// Get all comments for a specific blog post
// async function getAllComments(req, res) {
//   try {

//     var validation = "";
//     if (!blogId) {
//       validation += "Blog ID is required ";
//     }
//     if (!!validation) {
//       res.json({
//         status: 409,
//         success: false,
//         message: validation,
//       });
//     } else {
//       const comments = await Comment.find({ blogId: Blog.blogId })
//       .populate("userId")
//       .populate("blogId")
//       res.json({
//         status: 200,
//         success: true,
//         message: "Fetched all comments",
//         comments,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: 500,
//       success: false,
//       message: "An error occurred while fetching comments",
//       error: error.message,
//     });
//   }
// }
getAllComments = (req, res) => {
  Comment.find({ blogId: req.body.blogId })
    .select({})
    .populate("blogId")
    .populate("userId")
    .then((blogByUser) => {
      res.json({
        status: 200,
        success: true,
        message: "your all comment by blog id ",
        data: blogByUser,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all comment by blog id ",
        error: err,
      });
    });
};

module.exports = { createblogComment, getAllComments };
