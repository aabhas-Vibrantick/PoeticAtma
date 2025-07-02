const Prose = require("../../models/Prose/ProseModel");

function addprose(req, res) {
  var validation = "";

  if (req.body.title == "") {
    validation += "title name is required ";
  }
  if (req.body.Category_id == "") {
    validation += "Category_id  is required ";
  }
  if (req.body.prose == "") {
    validation += "prose  is required ";
  }
  if (req.body.language == "") {
    validation += "language  is required ";
  }
  if (req.body.tags == "") {
    validation += "tags  is required ";
  }
  if (req.body.userId == "") {
    validation += "userId  is required ";
  }

  if (req.body.Image == "") {
    validation += "upload image";
  }

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    let proseobj = new Prose();
    proseobj.title = req.body.title;
    proseobj.prose = req.body.prose;
    proseobj.language = req.body.language;
    proseobj.Category_id = req.body.Category_id;
    proseobj.userId = req.decoded;
    const tagsArray = req.body.tag.split(",").map((tag) => tag.trim());
    proseobj.tags = tagsArray;
    if (req.file) {
      proseobj.Image = "prose_photo/" + req.file.filename;
    }
    proseobj.save();
    res.json({
      status: 200,
      success: true,
      message: "prose inserted",
      data: req.body,
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

  if (req.body.Image == "") {
    validation += "upload image";
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
          //updateprose
          prosedata.title = req.body.title;
          prosedata.Category_id = req.body.Category_id;
          prosedata.prose = req.body.prose;
          prosedata.language = req.body.language;
          const tagsArray = req.body.tag.split(",").map((tag) => tag.trim());
          prosedata.tags = tagsArray;
          if (req.file) {
            prosedata.Image = "prose_photo/" + req.file.filename;
          }
          prosedata.userId = req.decoded;
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
deleteprose = (req, res) => {
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
  Prose.find()
    .sort({ likes: -1 }) // Sort by likes in descending order
    .limit(3) // Get the top 20 popular shayari
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
      const proseCount = await Prose.countDocuments({ userId });
      proseCounts[userId] = proseCount;
    }

    res.json({ proseCounts });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
module.exports = {
  addprose,
  getallprose,
  getsingleprose,
  updateprose,
  deleteprose,
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
