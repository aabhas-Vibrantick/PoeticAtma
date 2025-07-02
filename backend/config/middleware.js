const jwt = require("jsonwebtoken");
const secretkey = "Project123#@";

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return res.status(403).json({
        status: false,
        message: "Token missing after Bearer",
      });
    }

    jwt.verify(token, secretkey, function (err, decoded) {
      if (err) {
        return res.status(403).json({
          status: false,
          message: "Unauthorized Access!",
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({
      status: 403,
      success: false,
      message: "No Token Found",
    });
  }
};

  // console.log(token)
  // jwt.verify(token, secretkey, (err, decoded) => {
  //   if (err) {
  //     return  res.json({
  //       status: 401,
  //       success: false,
  //       message: "Unauthenicated access",
  //     });
  //   } else {
  //     console.log("********************jwt data", data);

  //     req.userId = data._id;
  //     req.email = data.email;
  //     req.name = data.name;
  //     req.userType = data.userType;
  //     req.decoded = decoded;
  //     next();
  //   }
  // });

