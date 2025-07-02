const Category = require("../../models/Prose/proseCategoryModel");

// -------Check Validation and add Category -------

async function add_prose_category(req, res) {
  try {
    const name = req.body.Category_name?.trim();

    if (!name) {
      return res.status(409).json({
        success: false,
        message: "Category name is required",
      });
    }

    // Optional: Check for duplicate
    const existing = await Category.findOne({ Category_name: name });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = new Category({ Category_name: name });

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category inserted",
      data: category,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: String(err),
    });
  }
}


// --------get all category start-----------

const getall_prose_category = async (req, res) => {
  try {
    const filters = req.body || {}; // if any filters are passed
    const categoryData = await Category.find(filters);

    return res.status(200).json({
      success: true,
      message: "Categories loaded successfully",
      data: categoryData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching categories",
      error: error.message,
    });
  }
};


// ---------get single category-----------
getsingle_prose_category = (req, res) => {
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
    Category.findOne({ _id: req.body._id })
      .then((categorydata) => {
        res.json({
          status: 200,
          success: true,
          message: "data loaded",
          data: categorydata,
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

// --------update category-----------
// ----------------------------------------------------------
update_prose_category = (req, res) => {
  var validation = "";
  console.log(req.body);
  console.log(req.files);
  if (req.body._id == "") {
    validation += "ID is required \n";
  }
  if (req.body.Category_name == "") {
    validation += "Category name is required \n";
  }

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    //check whether data exists or not wrt particular id
    Category.findOne({ _id: req.body._id })
      .then((categorydata) => {
        if (categorydata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          //updateCategory
          categorydata.Category_name = req.body.Category_name;
          categorydata.save();

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
delete_prose_data = (req, res) => {
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
    Category.findOne({ _id: req.body._id })
      .then((categorydata) => {
        if (categorydata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          //Delete
          Category.deleteOne({ _id: req.body._id })
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

const updateProseCategoryStatus = async (req, res) => {
  try {
    const formData = req.body;

    if (!formData._id || !formData.status) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Both _id and status are required",
      });
    }

    const prose = await Category.findOne({ _id: formData._id });

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

module.exports = {
  add_prose_category,
  getall_prose_category,
  getsingle_prose_category,
  update_prose_category,
  delete_prose_data,
  updateProseCategoryStatus,
};
