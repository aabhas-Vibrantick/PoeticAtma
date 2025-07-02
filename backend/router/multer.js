var multer = require("multer");

var excelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/excelUploads"); // file added to the public folder of the root directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var excelUploads = multer({ storage: excelStorage });

module.exports = excelUploads;
