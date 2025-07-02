const Book = require("../models/Bookmodel");

// -------Check Validation and add Book -------

function addBook(req, res) {
  var validation = "";

  if (req.body.Book_Price == "") {
    validation += "Book_Price is required";
  }
  if (req.body.Book_Quantity == "") {
    validation += "Book_Quantity is required";
  }
  if (req.body.userId == "") {
    validation += "Book_Quantity is required";
  }
  if (req.body.Image == "") {
    validation += "Image is required";
  }
  if (req.body.title == "") {
    validation += "title is required";
  }
  if (req.body.bookcategory == "") {
    validation += "bookcategory is required";
  }
  if (req.body.description == "") {
    validation += "description is required";
  }
  if (req.body.author == "") {
    validation += "author is required";
  }

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    let Bookobj = new Book();

    Bookobj.title = req.body.title;
    Bookobj.author = req.body.author;
    Bookobj.bookcategory = req.body.bookcategory;
    Bookobj.description = req.body.description;
    Bookobj.Book_Price = req.body.Book_Price;
    Bookobj.Book_Quantity = req.body.Book_Quantity;
    Bookobj.Payment_option = req.body.Payment_option;
    Bookobj.userId = req.decoded;

    if (req.file) {
      Bookobj.Image = "Book_Image/" + req.file.filename;
    }

    Bookobj.save();

    res.json({
      status: 200,
      success: true,
      message: "Book Inserted",
      data: Bookobj,
    });
  }
}

// --------get all Book start-----------

getallBook = (req, res) => {
  Book.find(req.body)
    .populate("userId")
    .exec()
    .then((Bookdata) => {
      res.json({
        status: 200,
        success: true,
        message: "Data Loaded!",
        data: Bookdata,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: "Error Occured!",
        error: String(err),
      });
    });
};

// ---------get single Book-----------
getsingleBook = (req, res) => {
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
    Book.findOne({ _id: req.body._id })
      .populate("userId")
      .exec()
      .then((Bookdata) => {
        res.json({
          status: 200,
          success: true,
          message: "data loaded",
          data: Bookdata,
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

// --------update Book-----------
updateBook = (req, res) => {
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
    Book.findOne({ _id: req.body._id })
      .then((Bookdata) => {
        if (Bookdata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          //update
          Bookdata.title = req.body.title;
          Bookdata.author = req.body.author;
          Bookdata.bookcategory = req.body.bookcategory;
          Bookdata.description = req.body.description;
          Bookdata.Book_Price = req.body.Book_Price;
          Bookdata.Book_Price = req.body.Book_Price;
          Bookdata.Book_Quantity = req.body.Book_Quantity;
          Bookdata.Payment_option = req.body.Payment_option;
          Bookdata.bookstatus = req.body.bookstatus;
          Bookdata.userId = req.decoded;
          if (req.file) {
            Bookdata.Image = "Book_photo/" + req.file.filename;
          }
          Bookdata.save();

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

deleteBook = (req, res) => {
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
    Book.findOne({ _id: req.body._id })
      .then((Bookdata) => {
        if (Bookdata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          //Delete
          Book.deleteOne({ _id: req.body._id })
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

const updatebookStatus = async (req, res) => {
  try {
    const formData = req.body;

    if (!formData._id || !formData.status) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Both _id and status are required",
      });
    }

    const book = await Book.findOne({ _id: formData._id });

    if (!book) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No book Found",
      });
    }

    book.status = formData.status;
    await book.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "book Status Changed Successfully",
      data: book,
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
  addBook,
  getallBook,
  getsingleBook,
  updateBook,
  deleteBook,
  updatebookStatus,
};
