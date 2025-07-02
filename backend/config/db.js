const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/poet")
  .then(
    (obj = () => {
      console.log("Database Connected!");
    })
  )
  .catch(
    (err = () => {
      console.log("Error while connecting Database!" + err);
    })
  );
