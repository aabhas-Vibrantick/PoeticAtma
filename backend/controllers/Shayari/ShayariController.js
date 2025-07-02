const Shayari = require("../../models/Shayari/ShayariModel.js");

// -------Check Validation and add shayari -------

function addshayari(req, res) {
  var validation = "";

  if (req.body.title == "") {
    validation += "title name is required ";
  }
  if (req.body.Category_id == "") {
    validation += "Category_id is required ";
  }
  if (req.body.shayari == "") {
    validation += "shayari is required ";
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
    let shayariobj = new Shayari();
    shayariobj.title = req.body.title;
    shayariobj.shayari = req.body.shayari;
    shayariobj.Category_id = req.body.Category_id;
    shayariobj.language = req.body.language;
    // Handling the tag field
    const tagsArray = req.body.tag.split(",").map((tag) => tag.trim());
    shayariobj.tags = tagsArray;

    shayariobj.userId = req.decoded;

    if (req.file) {
      shayariobj.Image = "shayari_photo/" + req.file.filename;
    }
    shayariobj
      .save()
      .then(() => {
        res.json({
          status: 200,
          success: true,
          message: "shayari inserted",
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

// --------get all shayari start-----------

getallshayari = (req, res) => {
  //   console.log(req.body)
  Shayari.find(req.body)
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((shayridata) => {
      res.json({
        status: 200,
        success: true,
        message: "data loaded",
        data: shayridata,
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

// ---------get single shayari-----------
getsingleshayari = (req, res) => {
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
    Shayari.findOne({ _id: req.body._id })
      .populate("Category_id")
      .populate("userId")
      .then((shayaridata) => {
        res.json({
          status: 200,
          success: true,
          message: "data loaded",
          data: shayaridata,
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

getallshayaribyUserId = (req, res) => {
  Shayari.find({ userId: req.body.userId })
    .select({})
    .populate("Category_id")
    .populate("userId")
    .then((shayariByUser) => {
      res.json({
        status: 200,
        success: true,
        message: "your all Shayari by user id ",
        data: shayariByUser,
      });
    })

    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all shayari by user id ",
        error: err,
      });
    });
};

// --------update shayari-----------
// ----------------------------------------------------------
updateshayari = (req, res) => {
  var validation = "";
  if (req.body.title == "") {
    validation += "title  is required ";
  }
  if (req.body.Category_id == "") {
    validation += "Category_id  is required ";
  }
  if (req.body.shayari == "") {
    validation += "shayari  is required ";
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
    Shayari.findOne({ _id: req.body._id })
      .then((shayaridata) => {
        if (shayaridata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          //updateshayari
          shayaridata.title = req.body.title;
          shayaridata.Category_id = req.body.Category_id;
          shayaridata.shayari = req.body.shayari;
          const tagsArray = req.body.tag.split(",").map((tag) => tag.trim());
          shayaridata.tags = tagsArray;
          shayaridata.userId = req.decoded;
          if (req.file) {
            shayaridata.Image = "shayari_photo/" + req.file.filename;
          }
          shayaridata.save();

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
deleteshayari = (req, res) => {
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
    Shayari.findOne({ _id: req.body._id })
      .then((shayaridata) => {
        if (shayaridata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          //Delete
          Shayari.deleteOne({ _id: req.body._id })
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

// -------random shaayri---------

getRandomShayari = (req, res) => {
  Shayari.countDocuments().exec((err, count) => {
    if (err) {
      res.json({
        status: 500,
        success: false,
        message: "Error",
        error: String(err),
      });
    } else {
      const randomIndex = Math.floor(Math.random() * count);
      Shayari.findOne()
        .skip(randomIndex)
        .exec((err, randomShayari) => {
          if (err) {
            res.json({
              status: 500,
              success: false,
              message: "Error",
              error: String(err),
            });
          } else if (!randomShayari) {
            res.json({
              status: 404,
              success: false,
              message: "No random shayari found",
            });
          } else {
            res.json({
              status: 200,
              success: true,
              message: "Random shayari loaded",
              data: randomShayari,
            });
          }
        });
    }
  });
};

getFeaturedShayari = (req, res) => {
  Shayari.find()
    .sort({ likes: -1 }) // Sort by likes in descending order
    .limit(3) // Get the top 20 popular shayari
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((topShayari) => {
      // console.log(topShayari)
      res.status(200).json({ topShayari });
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
getPopularShayari = (req, res) => {
  Shayari.find()
    .sort({ likes: -1 }) // Sort by likes in descending order
    .limit(10) // Get the top 20 popular shayari
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((popularShayari) => {
      res.json({
        status: 200,
        success: true,
        message: "Popular shayari loaded",
        data: popularShayari,
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
getBestShayari = (req, res) => {
  Shayari.find()
    .sort({ likes: -1 }) // Sort by likes in descending order
    .limit(100) // Get the top 20 popular shayari
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((popularShayari) => {
      res.json({
        status: 200,
        success: true,
        message: "Popular shayari loaded",
        data: popularShayari,
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

// -----search shayari---------
// searchShayari = (req, res) => {
//   const searchQuery = req.query.q;
//   const searchRegex = new RegExp(searchQuery, "i");

//   Shayari.find({
//     $or: [{ title: searchRegex }, { shayari: searchRegex }],
//   })
//     .populate("Category_id")
//     .populate("userId")
//     .exec()
//     .then((searchResults) => {
//       res.json({
//         status: 200,
//         success: true,
//         message: "Search results loaded",
//         data: searchResults,
//       });
//     })
//     .catch((err) => {
//       res.json({
//         status: 500,
//         success: false,
//         message: "Error",
//         error: String(err),
//       });
//     });
// };

// --------get shayari by Category Id----
getShayariByCategory = (req, res) => {
  Shayari.find({ Category_id: req.body.Category_id })
    .select({})
    .populate("Category_id")
    .populate("userId")
    .then((shayariByCategory) => {
      res.json({
        status: 200,
        success: true,
        message: "your all Shayari by gategory id ",
        data: shayariByCategory,
      });
    })

    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all shayari by id ",
      });
    });
};

// -------get Shayari by language-----------

gethindiShayariByUserId = (req, res) => {
  const userId = { userId: req.body.userId, language: "hindi" };
  // console.log("query is : "+JSON.stringify(userId));
  Shayari.find(userId)
    .select({})
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((allhindi) => {
      res.json({
        status: 200,
        success: true,
        message: "your all hindi shayari",
        allhindi: allhindi,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all  hindi shayari",
      });
    });
};

getByLanguage = (req, res) => {
  Shayari.find({ language: "hindi" })
    .select({})
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((allhindi) => {
      res.json({
        status: 200,
        success: true,
        message: "your all hindi shayari",
        allhindi: allhindi,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all  hindi shayari",
      });
    });
};

getByEnglish = (req, res) => {
  Shayari.find({ language: "English" })
    .select({})
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((allenglish) => {
      res.json({
        status: 200,
        success: true,
        message: "your all English shayari",
        allenglish: allenglish,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all  English shayari",
      });
    });
};

getenglishShayariByUserId = (req, res) => {
  const userId = { userId: req.body.userId, language: "English" };
  // console.log("query is : "+JSON.stringify(userId));
  Shayari.find(userId)
    .select({})
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((allenglish) => {
      res.json({
        status: 200,
        success: true,
        message: "your all English shayari",
        allenglish: allenglish,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        success: false,
        message: "err in getting all  English shayari",
      });
    });
};

// --------tag-------------
getAllTags = (req, res) => {
  Shayari.distinct("tags")
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
getTrendingTags = (req, res) => {
  Shayari.aggregate([
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

const updateShayariStatus = async (req, res) => {
  try {
    const formData = req.body;

    if (!formData._id || !formData.status) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Both _id and status are required",
      });
    }

    const shayari = await Shayari.findOne({ _id: formData._id });

    if (!shayari) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No Shayari Found",
      });
    }

    shayari.status = formData.status;
    await shayari.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Shayari Status Changed Successfully",
      data: shayari,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message || "Internal Server Error",
    });
  }
};

latestShayari = (req, res) => {
  Shayari.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((latestShayari) => {
      res.json({
        status: 200,
        success: true,
        message: "Latest shayari loaded",
        data: latestShayari,
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

usershayariDash = async (req, res) => {
  const userIds = req.body.userIds; // Assuming userIds is an array of user IDs

  try {
    const shayariCounts = {};

    // Loop through each user ID and count shayaris for each user
    for (const userId of userIds) {
      const shayariCount = await Shayari.countDocuments({ userId });
      shayariCounts[userId] = shayariCount;
    }

    res.json({ shayariCounts });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  addshayari,
  getallshayari,
  getsingleshayari,
  updateshayari,
  deleteshayari,
  getAllTags,
  getTrendingTags,
  getShayariByCategory,
  getPopularShayari,
  // searchShayari//
  getBestShayari,
  getByLanguage,
  getByEnglish,
  getallshayaribyUserId,
  gethindiShayariByUserId,
  getenglishShayariByUserId,
  updateShayariStatus,
  latestShayari,
  usershayariDash,
  getFeaturedShayari
};
