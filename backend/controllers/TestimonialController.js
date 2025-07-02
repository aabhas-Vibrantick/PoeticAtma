const Testimonial = require("../models/Testimonial");

// -------Check Validation and add Testimonial -------

function addTestimonial(req, res) {
  var validation = "";

  if (req.body.UserName == "") {
    validation += "UserName is required";
  }
  if (req.body.description == "") {
    validation += "description is required";
  }
  if (req.body.Image == "") {
    validation += "Image is required";
  }
  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    let Testimonialobj = new Testimonial();
    Testimonialobj.UserName = req.body.UserName;
    Testimonialobj.description = req.body.description;

    if (req.file) {
      Testimonialobj.Image = "Testimonial_Image/" + req.file.filename;
    }
    Testimonialobj.save();
    res.json({
      status: 200,
      success: true,
      message: "Testimonial inserted",
      data: Testimonialobj,
    });
  }
}

// --------get all Testimonial start-----------

getallTestimonial = (req, res) => {
  Testimonial.find(req.body)
    .exec()
    .then((Testimonialdata) => {
      res.json({
        status: 200,
        success: true,
        message: "data loaded",
        data: Testimonialdata,
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

// ---------get single Testimonial-----------
getsingleTestimonial = (req, res) => {
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
    Testimonial.findOne({ _id: req.body._id })
      .exec()
      .then((Testimonialdata) => {
        res.json({
          status: 200,
          success: true,
          message: "data loaded",
          data: Testimonialdata,
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

// --------update Testimonial-----------
updateTestimonial = (req, res) => {
  var validation = "";
  if (req.body._id == "") {
    validation += "ID is required \n";
  }

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    //check whether data exists or not wrt particular id
    Testimonial.findOne({ _id: req.body._id })
      .then((Testimonialdata) => {
        if (Testimonialdata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          //update
          Testimonialdata.UserName = req.body.UserName;
          Testimonialdata.description = req.body.description;
          if (req.file) {
            Testimonialdata.Image = "Testimonial_Image/" + req.file.filename;
          }
          Testimonialdata.save();

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

deleteTestimonial = (req, res) => {
  var validation = "";
  if (req.body._id == "") {
    validation += "ID is required \n";
  }
  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    //check whether data exists or not wrt particular id
    Testimonial.findOne({ _id: req.body._id })
      .then((Testimonialdata) => {
        if (Testimonialdata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          //Delete
          Testimonial.deleteOne({ _id: req.body._id })
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

const updatetestimonialStatus = async (req, res) => {
  try {
    const formData = req.body;

    if (!formData._id || !formData.status) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Both _id and status are required",
      });
    }

    const testimonial = await Testimonial.findOne({ _id: formData._id });

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No Testimonial Found",
      });
    }

    testimonial.status = formData.status;
    await testimonial.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Testimonial Status Changed Successfully",
      data: testimonial,
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
  addTestimonial,
  getallTestimonial,
  getsingleTestimonial,
  updateTestimonial,
  deleteTestimonial,
  updatetestimonialStatus,
};
