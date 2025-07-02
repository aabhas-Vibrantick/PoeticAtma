var express = require("express");
var router = express.Router();
var excelUploads = require("./multer");
var shayari = require("../models/Shayari/ShayariModel.js");
var csvtojson = require("csvtojson");
var fs = require("fs");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});

router.post(
  "/uploadExcelFile",
  excelUploads.single("uploadfile"),
  (req, res) => {
    importFile("./Public" + "/excelUploads/" + req.file.filename);

    async function importFile(filePath) {
      //  Read Excel File to Json Data
      var arrayToInsert = [];

      csvtojson()
        .fromFile(filePath)
        .then((source) => {
          console.log(source);
          // Fetching the all data from each row
          for (var i = 0; i < source.length; i++) {
            // console.log(source[i]["title"]);

            var singleRow = {
              title: source[i]["title"],
              shayari: source[i]["shayari"],
              status: true,
              tags: [],
            };

            arrayToInsert.push(singleRow);
          }

          //inserting into the table student
          shayari
            .insertMany(arrayToInsert)
            .then((result) => {
              console.log("File Imported Successfully!");

              fs.unlink(
                "./public" + "/excelUploads/" + req.file.filename,
                (err) => {
                  if (err) {
                    console.log("Failed to delete Excel File : " + err);
                  } else {
                    console.log("Successfully deleted Excel File");
                  }
                }
              );

              res.redirect("/");
            })
            .catch((err) => {
              console.error(err);
              // Handle the error appropriately, e.g., send an error response to the user
            });
        });
    }
  }
);

module.exports = router;
