const Prose = require("../../models/Prose/ProseModel");

async function addprose(req, res) {
  let validation = "";

  if (!req.body.title) validation += "Title is required. ";
  if (!req.body.Category_id) validation += "Category ID is required. ";
  if (!req.body.prose) validation += "Prose content is required. ";
  if (!req.body.language) validation += "Language is required. ";

  if (!!validation) {
    return res.json({
      status: 409,
      success: false,
      message: validation.trim(),
    });
  }

  try {
    const tagsArray = req.body.tag
      ? req.body.tag.split(",").map((tag) => tag.trim())
      : [];

    const isAdmin = req.decoded && req.decoded.usertype === 1;

    const proseObj = new Prose();
    proseObj.title = req.body.title;
    proseObj.prose = req.body.prose;
    proseObj.language = req.body.language;
    proseObj.Category_id = req.body.Category_id;
    proseObj.tags = tagsArray;

    // Assign userId properly
    proseObj.userId = req.body.userId || req.decoded._id;

    // Assign image path if file exists
    proseObj.Image = req.file ? "prose_photo/" + req.file.filename : "";

    // Set approval status
    proseObj.isApproved = isAdmin ? true : false;

    // Save to DB
    await proseObj.save();

    return res.json({
      status: 200,
      success: true,
      message: isAdmin
        ? "Prose published successfully."
        : "Prose submitted for admin approval.",
      data: req.body,
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: "Server error while saving prose",
      error: String(error),
    });
  }
}



// --------get all prose start-----------

getallprose = (req, res) => {
  Prose.find(req.body)
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((prosedata) => {
      res.json({
        status: 200,
        success: true,
        message: "data loaded",
        data: prosedata,
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

// ---------get single prose-----------
getsingleprose = (req, res) => {
  // console.log(req.body)
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
    Prose.findOne({ _id: req.body._id })
      .populate("Category_id")
      .populate("userId")
      .then((prosedata) => {
        res.json({
          status: 200,
          success: true,
          message: "data loaded",
          data: prosedata,
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

getsingleproseBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ success: false, message: "slug is required" });
    }

    const prosedata = await Prose.findOne({ slug })
      .populate({ path: "Category_id", select: "Category_name status createdAt" })
      .populate({ path: "userId", select: "name Image _id slug" }) // avoid leaking sensitive fields
      .lean();

    if (!prosedata) {
      return res.status(404).json({ success: false, message: "Prose not found" });
    }

    return res.status(200).json({ success: true, message: "data loaded", data: prosedata });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error Occur", error: String(err) });
  }
};

approveProse = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Prose ID is required",
      });
    }

    const proseData = await Prose.findById(_id);
    if (!proseData) {
      return res.status(404).json({
        success: false,
        message: "Prose not found",
      });
    }

    proseData.isApproved = true; // or `approved = true` depending on your schema
    proseData.approvedBy = req.decoded?._id || "Unknown"; // optional

    await proseData.save();

    return res.status(200).json({
      success: true,
      message: "Prose approved successfully",
    });
  } catch (error) {
    console.error("Error approving prose:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.toString(),
    });
  }
};


// --------update prose-----------
// ----------------------------------------------------------
updateprose = (req, res) => {
  var validation = "";
  if (req.body.title == "") {
    validation += "title  is required ";
  }
  if (req.body.Category_id == "") {
    validation += "Category_id  is required ";
  }
  if (req.body.prose == "") {
    validation += "prose  is required ";
  }

  // if (req.body.Image == "") {
  //   validation += "upload image";
  // }
  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    //check whether data exists or not wrt particular id
    Prose.findOne({ _id: req.body._id })
      .then((prosedata) => {
        if (prosedata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          //updateprose
          prosedata.title = req.body.title;
          prosedata.Category_id = req.body.Category_id;
          prosedata.prose = req.body.prose;
          prosedata.language = req.body.language;

          const tagsArray = req.body.tag.split(",").map((tag) => tag.trim());
          prosedata.tags = tagsArray;

          // ✅ Allow admin to update slug if provided
          if (req.body.slug && req.body.slug.trim() !== "") {
            prosedata.slug = req.body.slug.trim();
          }

          if (req.file) {
            prosedata.Image = "prose_photo/" + req.file.filename;
          }
          prosedata.userId = req.body.userId;

          prosedata.save();

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

// ----------------------------------------------------------------
deleteProse = (req, res) => {
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
    Prose.findOne({ _id: req.body._id })
      .then((prosedata) => {
        if (prosedata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          //Delete
          Prose.deleteOne({ _id: req.body._id })
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

getFeaturedProse = (req, res) => {
  Prose.find({ isApproved: true }) // Fetch only approved prose
    .sort({ likes: -1 }) // Sort by likes in descending order
    .limit(12) // Limit to top 10
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((topProse) => {
      res.status(200).json({ topProse });
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


// -----popular shayari---------
getPopularProse = (req, res) => {
  Prose.find()
    .sort({ likes: -1 }) // Sort by likes in descending order
    .limit(10) // Get the top 20 popular shayari
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((popularProse) => {
      res.json({
        status: 200,
        success: true,
        message: "Popular prose loaded",
        data: popularProse,
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

// -----popular shayari---------
getBestProse = (req, res) => {
  Prose.find()
    .sort({ likes: -1 }) // Sort by likes in descending order
    .limit(100) // Get the top 20 popular shayari
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((popularProse) => {
      res.json({
        status: 200,
        success: true,
        message: "Popular Prose loaded",
        data: popularProse,
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

// --------get shayari by Category Id----
getProseByCategory = (req, res) => {
  Prose.find({ Category_id: req.body.Category_id })
    .select({})
    .populate("Category_id")
    .populate("userId")
    .then((proseByCategory) => {
      res.json({
        status: 200,
        success: true,
        message: "your all Prose by gategory id ",
        data: proseByCategory,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all Prose by id ",
      });
    });
};

// -------getByLanguage---------

getproseByHindi = (req, res) => {
  Prose.find({ language: "hindi" })
    .select({})
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((allhindi) => {
      res.json({
        status: 200,
        success: true,
        message: "your all hindi prose",
        allhindi: allhindi,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all  hindi prose",
      });
    });
};
// ---by userId-----------
gethindiProseByUserId = (req, res) => {
  const userId = { userId: req.body.userId, language: "hindi" };
  console.log("query is : " + JSON.stringify(userId));
  Prose.find(userId)
    .select({})
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((allhindi) => {
      res.json({
        status: 200,
        success: true,
        message: "your all hindi Prose",
        allhindi: allhindi,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all  hindi Prose",
      });
    });
};

getenglishProseByUserId = (req, res) => {
  const userId = { userId: req.body.userId, language: "English" };
  console.log("query is : " + JSON.stringify(userId));
  Prose.find(userId)
    .select({})
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((allenglish) => {
      res.json({
        status: 200,
        success: true,
        message: "your all English prose",
        allenglish: allenglish,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all  English prose",
      });
    });
};

// ========BY USER===========
getallprosebyUserId = (req, res) => {
  Prose.find({ userId: req.body.userId })
    .select({})
    .populate("Category_id")
    .populate("userId")
    .then((proseByUser) => {
      res.json({
        status: 200,
        success: true,
        message: "your all prose by user id ",
        data: proseByUser,
      });
    })

    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all prose by user id ",
      });
    });
};
// ========ENGLISH===========
getproseByEnglish = (req, res) => {
  Prose.find({ language: "English" })
    .select({})
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((allenglish) => {
      res.json({
        status: 200,
        success: true,
        message: "your all English prose",
        allenglish: allenglish,
      });
    })

    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all  English prose",
      });
    });
};

// --------tag-------------
getAllproseTags = (req, res) => {
  Prose.distinct("tags")
    .exec()
    .then((tags) => {
      res.json({
        status: 200,
        success: true,
        message: "All tags loaded",
        data: tags,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Error",
        error: String(err),
      });
    });
};

// -----trending tags------------
getTrendingproseTags = (req, res) => {
  Prose.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }, // You can adjust the limit as needed
  ])
    .exec()
    .then((trendingTags) => {
      const tags = trendingTags.map((tag) => tag._id);
      res.json({
        status: 200,
        success: true,
        message: "Trending tags loaded",
        data: tags,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Error",
        error: String(err),
      });
    });
};

// ----------change status of shyari---------

const updateProseStatus = async (req, res) => {
  try {
    const formData = req.body;

    if (!formData._id || !formData.status) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Both _id and status are required",
      });
    }

    const prose = await Prose.findOne({ _id: formData._id });

    if (!prose) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No prose Found",
      });
    }

    prose.status = formData.status;
    await prose.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "prose Status Changed Successfully",
      data: prose,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message || "Internal Server Error",
    });
  }
};

latestProse = (req, res) => {
  Prose.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((latestProse) => {
      res.json({
        status: 200,
        success: true,
        message: "Latest prose loaded",
        data: latestProse,
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

userproseDash = async (req, res) => {
  const userIds = req.body.userIds;

  try {
    const proseCounts = {};

    for (const userId of userIds) {
      const total = await Prose.countDocuments({ userId });
      const approved = await Prose.countDocuments({ userId, isApproved: true });
      const pending = await Prose.countDocuments({ userId, isApproved: false });

      proseCounts[userId] = {
        total,
        approved,
        pending,
      };
    }

    res.json({ proseCounts });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  addprose,
  approveProse,
  getallprose,
  getsingleprose,
  getsingleproseBySlug,
  updateprose,
  deleteProse,
  getProseByCategory,
  getBestProse,
  getPopularProse,
  getproseByEnglish,
  getproseByHindi,
  updateProseStatus,
  getTrendingproseTags,
  getAllproseTags,
  getallprosebyUserId,
  gethindiProseByUserId,
  getenglishProseByUserId,
  latestProse,
  userproseDash,
  getFeaturedProse,
};
