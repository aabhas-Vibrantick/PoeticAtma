const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const saltround = 10;

exports.adminseeder = (req, res) => {
  User.findOne({ email: "admin@gmail.com" }).then((userdata) => {
    if (userdata == null) {
      let userobj = new User();

      userobj.email = "admin@gmail.com";
      userobj.password = bcrypt.hashSync("admin123", saltround);
      userobj.name = "Admin";
      userobj.userType = 1;
      userobj.save();

      console.log("Admin Registered!");
    } else {
      console.log("Admin already Exists!");
    }
  });
};
