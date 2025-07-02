const Sher = require("../../models/Sher/SherModel");

function addsher(req, res) {
  var validation = "";

  if (req.body.title == "") {
    validation += "title name is required ";
  }
  if (req.body.Category_id == "") {
    validation += "Category_id  is required ";
  }
  if (req.body.sher == "") {
    validation += "sher  is required ";
  }
  if (req.body.language == "") {
    validation += "language  is required ";
  }
  if (req.body.tags == "") {
    validation += "tags  is required ";
  }

  if (req.body.tags == "") {
    validation += "upload image";
  }

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    let sherobj = new Sher();

    sherobj.title = req.body.title;
    sherobj.sher = req.body.sher;
    sherobj.language = req.body.language;
    sherobj.Category_id = req.body.Category_id;

    const tagsArray = req.body.tag.split(",").map((tag) => tag.trim());
    sherobj.tags = tagsArray;
    sherobj.userId = req.decoded;

    if (req.file) {
      sherobj.Image = "sher_photo/" + req.file.filename;
    }

    sherobj.save();

    res.json({
      status: 200,
      success: true,
      message: "Sher Inserted",
      data: req.body,
    });
  }
}

// --------get all sher start-----------

getallsher = (req, res) => {
  Sher.find(req.body)
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((sherdata) => {
      res.json({
        status: 200,
        success: true,
        message: "data loaded",
        data: sherdata,
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

// ---------get single sher-----------
getsinglesher = (req, res) => {
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
    Sher.findOne({ _id: req.body._id })
      .populate("Category_id")
      .populate("userId")
      .then((sherdata) => {
        res.json({
          status: 200,
          success: true,
          message: "data loaded",
          data: sherdata,
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

// --------update sher-----------
// ----------------------------------------------------------
updatesher = (req, res) => {
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
    Sher.findOne({ _id: req.body._id })
      .then((sherdata) => {
        if (sherdata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          //updatesher
          sherdata.title = req.body.title;
          sherdata.Category_id = req.body.Category_id;
          sherdata.sher = req.body.sher;
          sherdata.language = req.body.language;
          const tagsArray = req.body.tag.split(",").map((tag) => tag.trim());
          sherdata.tags = tagsArray;
          sherdata.userId = req.decoded;
          if (req.file) {
            sherdata.Image = "sher_photo/" + req.file.filename;
          }
          sherdata.save();

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

getallsherbyUserId = (req, res) => {
  Sher.find({ userId: req.body.userId })
    .select({})
    .populate("Category_id")
    .populate("userId")
    .then((sherByUser) => {
      res.json({
        status: 200,
        success: true,
        message: "your all sher by user id ",
        data: sherByUser,
      });
    })

    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all sher by user id ",
      });
    });
};
// ----------------------------------------------------------------
deletesher = (req, res) => {
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
    Sher.findOne({ _id: req.body._id })
      .then((sherdata) => {
        if (sherdata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          //Delete
          Sher.deleteOne({ _id: req.body._id })
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

getFeaturedSher = async (req, res) => {
  Sher.find()
    .sort({ likes: -1 }) // Sort by likes in descending order
    .limit(3) // Get the top 3 popular shayari
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((topSher) => {
      res.status(200).json({ topSher });
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
getPopularSher = (req, res) => {
  Sher.find()
    .sort({ likes: -1 }) // Sort by likes in descending order
    .limit(10) // Get the top 20 popular shayari
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((popularSher) => {
      res.json({
        status: 200,
        success: true,
        message: "Popular sher loaded",
        data: popularSher,
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
getBestSher = (req, res) => {
  Sher.find()
    .sort({ likes: -1 }) // Sort by likes in descending order
    .limit(100) // Get the top 20 popular shayari
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((popularSher) => {
      res.json({
        status: 200,
        success: true,
        message: "Popular sher loaded",
        data: popularSher,
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
getSherByCategory = (req, res) => {
  Sher.find({ Category_id: req.body.Category_id })
    .select({})
    .populate("Category_id")
    .populate("userId")
    .then((sherByCategory) => {
      res.json({
        status: 200,
        success: true,
        message: "your all Sher by gategory id ",
        data: sherByCategory,
      });
    })

    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all Sher by id ",
      });
    });
};

// -------getByLanguage---------

getsherByHindi = (req, res) => {
  Sher.find({ language: "hindi" })
    .select({})
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((allhindi) => {
      res.json({
        status: 200,
        success: true,
        message: "your all hindi sher",
        allhindi: allhindi,
      });
    })

    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all  hindi sher",
      });
    });
};

getsherByHindi = (req, res) => {
  Sher.find({ language: "hindi" })
    .select({})
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((allhindi) => {
      res.json({
        status: 200,
        success: true,
        message: "your all hindi sher",
        allhindi: allhindi,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all  hindi sher",
      });
    });
};

// ---by userId-----------
gethindiSherByUserId = (req, res) => {
  const userId = { userId: req.body.userId, language: "hindi" };
  console.log("query is : " + JSON.stringify(userId));
  Sher.find(userId)
    .select({})
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((allhindi) => {
      res.json({
        status: 200,
        success: true,
        message: "your all hindi sher",
        allhindi: allhindi,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all  hindi sher",
      });
    });
};

getenglishSherByUserId = (req, res) => {
  const userId = { userId: req.body.userId, language: "English" };
  console.log("query is : " + JSON.stringify(userId));
  Sher.find(userId)
    .select({})
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((allenglish) => {
      res.json({
        status: 200,
        success: true,
        message: "your all English sher",
        allenglish: allenglish,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all  English sher",
      });
    });
};

getsherByEnglish = (req, res) => {
  Sher.find({ language: "English" })
    .select({})
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((allenglish) => {
      res.json({
        status: 200,
        success: true,
        message: "your all English Sher",
        allenglish: allenglish,
      });
    })

    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all  English sher",
      });
    });
};

// --------tag-------------
getAllsherTags = (req, res) => {
  Sher.distinct("tags")
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
getTrendingsherTags = (req, res) => {
  Sher.aggregate([
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
const updateSherStatus = async (req, res) => {
  try {
    const formData = req.body;

    if (!formData._id || !formData.status) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Both _id and status are required",
      });
    }

    const sher = await Sher.findOne({ _id: formData._id });

    if (!sher) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No sher Found",
      });
    }

    sher.status = formData.status;
    await sher.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "sher Status Changed Successfully",
      data: sher,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message || "Internal Server Error",
    });
  }
};

latestSher = (req, res) => {
  Sher.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((latestSher) => {
      res.json({
        status: 200,
        success: true,
        message: "Latest Sher loaded",
        data: latestSher,
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

usersherDash = async (req, res) => {
  const userIds = req.body.userIds;

  try {
    const sherCounts = {};

    for (const userId of userIds) {
      const sherCount = await Sher.countDocuments({ userId });
      sherCounts[userId] = sherCount;
    }

    res.json({ sherCounts });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
module.exports = {
  addsher,
  getallsher,
  getsinglesher,
  updatesher,
  deletesher,
  getPopularSher,
  getBestSher,
  getSherByCategory,
  getsherByHindi,
  getsherByEnglish,
  getAllsherTags,
  getTrendingsherTags,
  updateSherStatus,
  getallsherbyUserId,
  gethindiSherByUserId,
  getenglishSherByUserId,
  latestSher,
  usersherDash,
  getFeaturedSher,
};
