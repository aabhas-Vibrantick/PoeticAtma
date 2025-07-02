const ProseImage = require("../../models/Prose/ProseImageModel");

addProseImage = (req, res) => {
  var validation = "";
  if (req.body.title == "") {
    validation = "Please enter title";
  }
  if (req.body.Image == "") {
    validation = "Please Insert Image";
  }

  if (req.body.Category_id == "") {
    validation += "Category_id is required ";
  }
  if (req.body.userId == "") {
    validation += "userId is required ";
  }
  if (!!validation) {
    res.json({
      status: 400,
      success: false,
      message: validation,
    });
  } else {
    let imageobj = new ProseImage();
    imageobj.title = req.body.title;
    imageobj.Category_id = req.body.Category_id;
    imageobj.userId = req.decoded;
    // Handling the tag field
    const tagsArray = req.body.tag.split(",").map((tag) => tag.trim());
    imageobj.tags = tagsArray;

    if (req.file) {
      imageobj.Image = "Prose_Image/" + req.file.filename;
    }
    imageobj
      .save()
      .then((data) => {
        res.json({
          status: 200,
          success: false,
          message: "successfully inserted",
          data: data,
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: "internal Error Occur",
          error: String(err),
        });
      });
  }
};

getallProseImage = (req, res) => {
  ProseImage.find(req.body)
    .populate("Category_id")
    .populate("userId")
    .exec()
    .then((imagedata) => {
      res.json({
        status: 200,
        success: true,
        message: "data loaded",
        data: imagedata,
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

const updateProseImageStatus = async (req, res) => {
  try {
    const formData = req.body;

    if (!formData._id || !formData.status) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Both _id and status are required",
      });
    }

    const sher = await ProseImage.findOne({ _id: formData._id });

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
module.exports = {
  addProseImage,
  getallProseImage,
  updateProseImageStatus,
};
