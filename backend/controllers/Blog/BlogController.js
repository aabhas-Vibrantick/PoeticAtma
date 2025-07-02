const Blog = require("../../models/Blog/BlogModel");

function addblog(req, res) {
  var validation = "";
  if (req.body.title == "") {
    validation += "title name is required ";
  }
  if (req.body.description == "") {
    validation += "description name is required ";
  }
  if (req.body.Category_id == "") {
    validation += "Category_id is required ";
  }
  if (req.body.blog == "") {
    validation += "blog is required ";
  }
  if (req.body.language == "") {
    validation += "language is required ";
  }

  if (req.body.Image == "") {
    validation += "upload image";
  }
  if (req.body.tag == "") {
    validation += "tag is required";
  }

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    let blogobj = new Blog();
    blogobj.title = req.body.title;
    blogobj.description = req.body.description;
    blogobj.blog = req.body.blog;
    blogobj.language = req.body.language;
    blogobj.isFeatured = req.body.isFeatured;
    blogobj.Category_id = req.body.Category_id;
    // Handling the tag field
    const tagsArray = req.body.tag.split(",").map((tag) => tag.trim());
    blogobj.tags = tagsArray;

    blogobj.userId = req.decoded;

    if (req.file) {
      blogobj.Image = "blog_photo/" + req.file.filename;
    }
    blogobj
      .save()
      .then(() => {
        res.json({
          status: 200,
          success: true,
          message: "blog inserted",
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

getallblog = (req, res) => {
  Blog.find(req.query)
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((blogdata) => {
      res.json({
        status: 200,
        success: true,
        message: "data loaded",
        data: blogdata,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: "Error Occur",
        error: String(err),
      });
    });
};

// ---------get all  blog bty user id-----------
getallblogbyUserId = (req, res) => {
  Blog.find({ userId: req.body.userId })
    .select({})
    .populate("Category_id")
    .populate("userId")
    .then((blogByUser) => {
      res.json({
        status: 200,
        success: true,
        message: "your all Blog by user id ",
        data: blogByUser,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all Blog by user id ",
        error: err,
      });
    });
};
// ---------get single blog-----------
getsingleblog = (req, res) => {
  var validate = "";
  if (req.body._id == "") {
    validate += "_id is required";
  }

  if (!!validate) {
    res.json({
      status: 409,
      success: false,
      message: validate,
    });
  } else {
    Blog.findOne({ _id: req.body._id })
      .populate("Category_id")
      .populate("userId")
      .exec()
      .then((bdata) => {
        res.json({
          status: 200,
          success: true,
          message: "data loaded",
          data: bdata,
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: "Error Occur",
          error: String(err),
        });
      });
  }
};

// --------update blog-----------
updateblog = (req, res) => {
  var validation = "";
  if (req.body._id == "") {
    validation += "ID is required ";
  }

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    //check whether data exists or not wrt particular id
    Blog.findOne({ _id: req.body._id })
      .then((blogdata) => {
        if (blogdata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          //update
          blogdata.title = req.body.title;
          blogdata.description = req.body.description;
          blogdata.Category_id = req.body.Category_id;
          blogdata.blog = req.body.blog;
          blogdata.language = req.body.language;
          blogdata.isFeatured = req.body.isFeatured;
          blogdata.userId = req.decoded;
          const tagsArray = req.body.tag.split(",").map((tag) => tag.trim());
          blogdata.tags = tagsArray;

          if (req.file) {
            blogdata.Image = "blog_photo/" + req.file.filename;
          }
          blogdata.save();

          res.json({
            status: 200,
            success: true,
            message: "Record updated",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: "Error",
          error: String(err),
        });
      });
  }
};

// ----------------------------------------------------------

// ----------------------------------------------------------------
deleteblog = (req, res) => {
  var validation = "";
  if (req.body._id == "") {
    validation += "ID is required ";
  }

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    //check whether data exists or not wrt particular id
    Blog.findOne({ _id: req.body._id })
      .then((blogdata) => {
        if (blogdata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          //Delete
          Blog.deleteOne({ _id: req.body._id })
            .then((data) => {
              res.json({
                status: 200,
                success: true,
                message: "Record Deleted",
              });
            })
            .catch((err) => {
              res.json({
                status: 500,
                success: false,
                message: "Error",
                error: String(err),
              });
            });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: "Error",
          error: String(err),
        });
      });
  }
};

// ----------------featured blog--------------
getFeaturedBlogs = async (req, res) => {
  try {
    const limit = 3;
    // Fetch blogs that are marked as featured
    const featuredBlogs = await Blog.find({ isFeatured: true }).limit(limit);

    res.status(200).json({ featuredBlogs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching featured blogs", error: error.message });
  }
};

// ------------related blog------------
getRelatedBlogs = async (req, res) => {
  try {
    const { currentBlogId } = req.body;
    const currentBlog = await Blog.findById(currentBlogId);

    if (!currentBlog) {
      return res.status(404).json({ message: "Current blog not found" });
    }

    // Fetch related blogs based on category or tags
    const relatedBlogs = await Blog.find({
      $or: [
        { category: currentBlog.category },
        { tags: { $in: currentBlog.tags } },
      ],
      _id: { $ne: currentBlog._id }, // Exclude the current blog
    });

    res.status(200).json({ relatedBlogs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching related blogs", error: error.message });
  }
};

getBlogsByCategory = (req, res) => {
  Blog.find({ Category_id: req.body.Category_id })
    // .select({})
    .populate("Category_id")
    .populate("userId")
    .then((blogByCategory) => {
      res.json({
        status: 200,
        success: true,
        message: "your all blog by gategory id ",
        data: blogByCategory,
      });
    })

    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all blog by id ",
      });
    });
};

// ----------------update blog -status--------------
const updateBlogStatus = async (req, res) => {
  try {
    const formData = req.body;

    if (!formData._id || !formData.status) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Both _id and status are required",
      });
    }

    const blog = await Blog.findOne({ _id: formData._id });

    if (!blog) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No blog Found",
      });
    }

    blog.status = formData.status;
    await blog.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "blog Status Changed Successfully",
      data: blog,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message || "Internal Server Error",
    });
  }
};

// ----------search blog-------
searchBlogs = (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.json({
      status: 400,
      success: false,
      message: "Missing search query",
    });
  }

  Blog.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { blog: { $regex: query, $options: "i" } },
    ],
  })
    .populate("Category_id")
    .populate("userId")
    .then((searchResults) => {
      res.json({
        status: 200,
        success: true,
        message: "Search results",
        data: searchResults,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: "Error searching blogs",
        error: String(err),
      });
    });
};

latestBlog = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((latestblog) => {
      res.json({
        status: 200,
        success: true,
        message: "Latest blog loaded",
        data: latestblog,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: "Error",
        error: String(err),
      });
    });
};
module.exports = {
  addblog,
  getallblog,
  getsingleblog,
  updateblog,
  deleteblog,
  searchBlogs,
  getFeaturedBlogs,
  getRelatedBlogs,
  updateBlogStatus,
  getBlogsByCategory,
  getallblogbyUserId,
  latestBlog,
};
