//mongodb customer model
const Customer = require("../models/CustomerModel");

//mongodb user model
const User = require("../models/UserModel");

//hash password
const bcrypt = require("bcrypt");
const saltround = 15;

//token generate
const jwt = require("jsonwebtoken");
const secretkey = "Project123#@";

//axios verifie google captcha
const axios = require("axios");

//google captcha secretkey
const SECRETKEY = `6LfiQG0rAAAAAPWOY0AmUzZEv7L_KuxpqirbrgMZ`;

//node mailer
const nodemailer = require("nodemailer");
//otp generater
const otpGenerator = require("otp-generator");
//token generater
const crypto = require("crypto");

// =========================
//          SIGN UP

function generateVerificationToken() {
  const tokenLength = 32;

  const token = crypto.randomBytes(tokenLength).toString("hex");

  const expirationTime = new Date();

  expirationTime.setHours(expirationTime.getHours() + 24);

  return { token, expirationTime };
}

function sendVerifyMail({ name, email, token, expirationTime }) {
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: "mailerbot@vibrantick.in",
      pass: "7F2gaC>7jU",
    },
  });

  const verifyLink = `http://localhost:3000/verify/${token}`; //chang localhost to IP addr

  const mailOptions = {
    from: '"Poetic Atma" <mailerbot@vibrantick.in>',
    to: email,
    subject: "Email Verification Link - Poetic Atma",
    html: `
          <div style="justify-content:center;font-family:sans-serif;">
            <p>Hello ${name},</p>
            <p>Click the following link to verify your Email Address:</p>
            <div style="display:flex;justify-content:center;align-items:center;">
              <button style="background-color:#7A7F34;color:white;cursor:pointer;width:112px;height:42px;" onMouseOver="this.style.background-color='#AFA957'" onMouseOut="this.style.background-color='#7A7F34'"> 
                <a href="${verifyLink}" style="color:white;text-decoration:none;font-size:28px;font-weight:bold;letter-spacing:1.6px;" onMouseOver="this.style.color='black'"
                onMouseOut="this.style.color='white'">Verify</a> 
              </button>
            </div>
            <p>This link is valid for 24 hours. If you did not register with Poetic Atma, Please Ignore this Mail.</p>
            <br/> <br/>
            <b>Note : Your Email Verification Link will expire in 24 Hours.</b>
          </div>
          `,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.error("Error in Sending Verification Email : ", error);
    }
  });
}

adduser = (req, res) => {
  var validator = "";

  if (req.body.name == "") validator += "Name is required";
  if (req.body.email == "") validator += "Email is required";
  if (req.body.password == "") validator += "Password is required";
  if (req.body.contact == "") validator += "Contact is required";
  if (req.body.address == "") validator += "Address is required";
  if (req.body.Image == "") validator += "Image is required";

  if (!!validator) {
    res.json({
      status: 409,
      success: false,
      message: validator,
    });
  } else {

    
    // Duplicacy
    User.findOne({ email: req.body.email }).then((udata) => {
      if (udata == null) {
        // Insert
        const { token, expirationTime } = generateVerificationToken();

        let userobj = new User();

        userobj.name = req.body.name;
        userobj.email = req.body.email;
        userobj.password = bcrypt.hashSync(req.body.password, saltround);
        userobj.verificationToken = token;
        userobj.tokenExpirationTime = expirationTime;

        if (req.file) {
          userobj.Image = "Customer_photo/" + req.file.filename;
        }

        userobj.save().then((userdata) => {
          let customerobj = new Customer();

          customerobj.name = req.body.name;
          customerobj.email = req.body.email;
          customerobj.password = bcrypt.hashSync(req.body.password, saltround);
          customerobj.contact = req.body.contact;
          customerobj.address = req.body.address;
          customerobj.verificationToken = token;
          customerobj.tokenExpirationTime = expirationTime;
          customerobj.userId = userdata._id;

          if (req.file) {
            customerobj.Image = "Customer_photo/" + req.file.filename;
          }

          customerobj
            .save()
            .then((user) => {
              // Send the verification email
              sendVerifyMail({
                name: user.name,
                email: user.email,
                token: user.verificationToken,
                expirationTime: user.tokenExpirationTime,
              });
              res.status(200).json({
                message: "User registered, verification email sent.",
                data: customerobj,
              });
            })
            .catch((error) => {
              console.error("Error saving customer:", error);
              res.status(500).json({ message: "Internal server error" });
            });
        });
      } else {
        res.json({
          status: 409,
          success: false,
          message: "User already exists",
        });
      }
    });
  }
};

register = (req, res) => {
  var validator = "";

  const recaptchaResponse = req.body.recaptchaValue;

  axios({
    url: `https://www.google.com/recaptcha/api/siteverify?secret=${SECRETKEY}&response=${recaptchaResponse}`,
    method: "post",
  })
    .then((recaptchaResponse) => {
      if (recaptchaResponse.data.success) {
        if (req.body.name == "") validator += "Name is required";
        if (req.body.email == "") validator += "Email is required";
        if (req.body.password == "") validator += "Password is required";
        if (req.body.contact == "") validator += "Contact is required";
        if (req.body.address == "") validator += "Address is required";

        if (!!validator) {
          res.json({
            status: 409,
            success: false,
            message: validator,
          });
        } else {
          User.findOne({ email: req.body.email }).then((udata) => {
            if (udata == null) {
              const { token, expirationTime } = generateVerificationToken();

              const userobj = new User();

              userobj.name = req.body.name;
              userobj.email = req.body.email;
              userobj.password = bcrypt.hashSync(req.body.password, saltround);
              userobj.verificationToken = token;
              userobj.tokenExpirationTime = expirationTime;

              if (req.file) {
                userobj.Image = "Customer_photo/" + req.file.filename;
              }

              userobj.save().then((userdata) => {
                const customerobj = new Customer();

                customerobj.name = req.body.name;
                customerobj.penname = req.body.penname;
                customerobj.email = req.body.email;
                customerobj.password = bcrypt.hashSync(
                  req.body.password,
                  saltround
                );
                customerobj.contact = req.body.contact;
                customerobj.address = req.body.address;
                customerobj.userId = userdata._id;

                if (req.file) {
                  customerobj.Image = "Customer_photo/" + req.file.filename;
                }

                customerobj
                  .save()
                  .then((user) => {
                    sendVerifyMail({
                      name: req.body.name,
                      email: req.body.email,
                      token: token,
                      expirationTime: expirationTime,
                    });

                    res.status(200).json({
                      message: "User registered, Verification Email Sent.",
                    });
                  })
                  .catch((error) => {
                    res.status(500).json({ message: "Internal server error" });
                  });
              });
            } else {
              res.json({
                status: 409,
                success: false,
                message: "User already exists",
              });
            }
          });
        }
      } else {
        res.json({
          status: 400,
          success: false,
          message: "reCAPTCHA verification failed",
        });
      }
    })
    .catch((error) => {
      console.log("Recaptcha error:", error);
      res.status(500).json({
        status: 500,
        success: false,
        message: "Internal server error",
      });
    });
};

updateuser = (req, res) => {
  var validator = "";

  if (req.body._id == "") {
    validator += "ID is required ";
  }

  if (!!validator) {
    res.json({
      status: 409,
      success: false,
      message: validator,
    });
  } else {
    User.findOne({ _id: req.body._id })
      .then((ucustomerobj) => {
        if (ucustomerobj == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          ucustomerobj.name = req.body.name;
          ucustomerobj.penname = req.body.penname;
          ucustomerobj.email = req.body.email;
          ucustomerobj.bedgeverify = req.body.bedgeverify;

          if (req.file) {
            ucustomerobj.Image = "customer_photo/" + req.file.filename;
          }

          ucustomerobj.save().then(async (ustu) => {
            Customer.findOne({ userId: req.body._id }).then((customerObj) => {
              customerObj.name = req.body.name;
              customerObj.penname = req.body.penname;
              customerObj.email = req.body.email;
              customerObj.contact = req.body.contact;
              customerObj.address = req.body.address;
              customerObj.bio = req.body.bio;
              customerObj.facebook = req.body.facebook;
              customerObj.linkdin = req.body.linkdin;
              customerObj.twiter = req.body.twiter;
              customerObj.instagram = req.body.instagram;
              customerObj.userId = ustu._id;
              customerObj.bedgeverify = ustu.bedgeverify;

              if (req.file) {
                customerObj.Image = "customer_photo/" + req.file.filename;
              }

              customerObj.save();

              res.json({
                status: 200,
                success: true,
                message: "User updated",
              });
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

changepassword = (req, res) => {
  validator = "";

  if (req.body.oldpassword == "") validator += "Old password is required";
  if (req.body.newpassword == "") validator += "New password is required";
  if (req.body.confirmpassword == "")
    validator += "Confirm password is required";
  if (req.body.userId == "") validator += "User Id  is required";

  if (!!validator) {
    res.json({
      status: 409,
      success: false,
      message: validator,
    });
  } else {
    if (req.body.newpassword == req.body.confirmpassword) {
      User.findOne({ _id: req.body.userId }).then((userdata) => {
        if (userdata != null) {
          bcrypt.compare(
            req.body.oldpassword,
            userdata.password,
            (err, data) => {
              if (data) {
                userdata.password = bcrypt.hashSync(
                  req.body.newpassword,
                  saltround
                );
                userdata.save();
                res.json({
                  status: 200,
                  success: true,
                  message: "password updated",
                });
              } else {
                res.json({
                  status: 409,
                  success: false,
                  message: "old password do not matched",
                });
              }
            }
          );
        } else {
          res.json({
            status: 409,
            success: false,
            message: "User does not exists",
          });
        }
      });
    } else {
      res.json({
        status: 409,
        success: false,
        message: "new password and confirm password do not match",
      });
    }
  }
};

login = (req, res) => {
  let validator = "";

  const recaptchaResponse = req.body.recaptchaValue;

  axios({
    url: `https://www.google.com/recaptcha/api/siteverify?secret=${SECRETKEY}&response=${recaptchaResponse}`,
    method: "post",
  })
    .then((recaptchaResponse) => {
      if (recaptchaResponse.data.success) {
        if (req.body.email === "" && req.body.contact === "") {
          validator += "Email Address/Phone Number is required";
        }

        if (req.body.password === "") validator += "Password is required";

        if (!!validator) {
          res.json({
            status: 409,
            success: false,
            message: validator,
          });
        } else {
          const query = req.body.email
            ? { email: req.body.email }
            : { contact: req.body.contact };

          User.findOne(query).then((userdata) => {
            if (userdata === null) {
              res.json({
                status: 404,
                success: false,
                message:
                  "User with this Email Address/Phone Number not Exists!",
              });
            } else {
              bcrypt.compare(
                req.body.password,
                userdata.password,
                (err, data) => {
                  if (!data) {
                    res.json({
                      status: 409,
                      success: false,
                      message: "Invalid Password!",
                    });
                  } else {
                    const payload = {
                      _id: userdata._id,
                      name: userdata.name,
                      email: userdata.email,
                      userType: userdata.userType,
                    };

                    const token = jwt.sign(payload, secretkey, {
                      expiresIn: "24h",
                    });

                    res.json({
                      status: 200,
                      success: true,
                      message: "Login Successful",
                      data: userdata,
                      token: token,
                    });
                  }
                }
              );
            }
          });
        }
      } else {
        res.json({
          status: 400,
          success: false,
          message: "reCAPTCHA Verification Failed!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Server Error",
      });
    });
};

getalluser = (req, res) => {
  User.find(req.body)
    .then((udata) => {
      res.json({
        status: 200,
        success: true,
        message: "data loaded",
        data: udata,
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

getsingleuser = (req, res) => {
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
    User.findOne({ _id: req.body._id })
      .then((udata) => {
        res.json({
          status: 200,
          success: true,
          message: "data loaded",
          data: udata,
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

deleteuser = (req, res) => {
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
    User.findOne({ _id: req.body._id })
      .then((Userdata) => {
        if (Userdata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          User.deleteOne({ _id: req.body._id })
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

deletecustomer = (req, res) => {
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
    Customer.findOne({ _id: req.body._id })
      .then((custdata) => {
        if (custdata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          //Delete
          Customer.deleteOne({ _id: req.body._id })
            .then((data) => {
              res.json({
                status: 200,
                success: true,
                message: "Record Deleted",
                data: data,
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

getallcustomer = (req, res) => {
  Customer.find(req.body)
    .populate("userId")
    .then((udata) => {
      res.json({
        status: 200,
        success: true,
        message: "data loaded",
        data: udata,
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

getTop10Customers = (req, res) => {
  Customer.find()
    .populate({
      path: "userId",
      match: { status: true, userType: 2, bedgeverify: true },
    })
    .sort({ Like: -1 })
    .limit(10)
    .then((topCustomers) => {
      // ✅ Filter only those with matched userId (i.e., verified users)
      const verifiedUsers = topCustomers.filter((cust) => cust.userId !== null);

      res.json({
        status: 200,
        success: true,
        message: "Top 10 verified customers loaded",
        data: verifiedUsers,
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
};



getsinglecustomer = (req, res) => {
  Customer.findOne({ userId: req.body.userId })
    .populate("userId")
    .then((udata) => {
      res.json({
        status: 200,
        success: true,
        message: "data loaded",
        data: udata,
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

const changeStatus = async (req, res) => {
  try {
    const formData = req.body;

    if (!formData._id || !formData.status) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Both _id and status are required",
      });
    }

    const user = await User.findOne({ _id: formData._id });
    const customer = await Customer.findOne({ userId: formData._id });

    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No User Found",
      });
    }

    user.status = formData.status;
    customer.isVerified = formData.status;

    await user.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "User Status Changed Successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message || "Internal Server Error",
    });
  }
};

forgotPassword = async (req, res) => {
  try {
    const { email, recaptchaValue } = req.body;

    axios({
      url: `https://www.google.com/recaptcha/api/siteverify?secret=${SECRETKEY}&response=${recaptchaValue}`,
      method: "post",
    })
      .then((recaptchaResponse) => {
        if (recaptchaResponse.data.success) {
          User.findOne({ email })
            .then(async (user) => {
              if (!user) {
                return res.status(404).json({ message: "User not found" });
              }

              const passwordResetTime = user.passwordResetTime;

              if (passwordResetTime) {
                if (new Date() <= passwordResetTime) {
                  res.status(200).json({
                    message:
                      "Your password has been recently Changed, Please try after 3 days",
                    passwordResetTimeReached: true,
                  });
                }
              }

              const otp = otpGenerator.generate(8, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
              });

              const otpExpiration = new Date();
              otpExpiration.setMinutes(otpExpiration.getMinutes() + 30);

              user.otp = otp;
              user.otpExpiration = otpExpiration;

              await user.save();

              const transporter = nodemailer.createTransport({
                host: "smtp.hostinger.com",
                port: 465,
                auth: {
                  user: "mailerbot@vibrantick.in",
                  pass: "7F2gaC>7jU",
                },
              });

              const mailOptions = {
                from: '"Poetic Atma" <mailerbot@vibrantick.in>',
                to: email,
                subject: "Forget Password Verification Code",
                html: `
                      <div style="justify-content:center;font-family:sans-serif;">
                        Verification Code : <b> ${otp} </b>
                        <br/> <br/>
                        <b>Note : Your Email Verification Code will expire in 20 Minutes.</b>
                      </div>
                      `,
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error("Error in Sending Email : ", error);

                  return res.status(500).json({
                    message: "Failed to send OTP via Email!",
                    status: false,
                  });
                } else {
                  res.status(200).json({
                    message: "OTP sent Successfully",
                    status: true,
                    otpSent: true,
                  });
                }
              });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({ message: "Internal server error" });
            });
        } else {
          res.json({
            status: 400,
            success: false,
            message: "reCAPTCHA verification failed",
          });
        }
      })
      .catch((error) => {
        console.error("reCAPTCHA error:", error);
        res.status(500).json({ message: "Internal server error" });
      });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

resetPassword = async (req, res) => {
  console.log("Received resetPassword data:", req.body);

  try {
    const { email, otp, newPassword, recaptchaValue } = req.body;

    
    axios({
      url: `https://www.google.com/recaptcha/api/siteverify?secret=${SECRETKEY}&response=${recaptchaValue}`,
      method: "post",
    })
      .then((recaptchaResponse) => {
        if (recaptchaResponse.data.success) {
          
          User.findOne({ email })
            .then(async (user) => {
              if (!user) {
                return res.status(404).json({ message: "User not found" });
              }

              
              if (
                user.otp !== otp ||
                new Date() > new Date(user.otpExpiration)
              ) {
                return res
                  .status(400)
                  .json({ message: "Invalid or expired OTP" });
              }

              
              const hashedPassword = bcrypt.hashSync(newPassword, 10);
              user.password = hashedPassword;

              
              user.otp = null;
              user.otpExpiration = null;

              
              const futureDate = new Date();
              futureDate.setHours(futureDate.getHours() + 72);
              user.passwordResetTime = futureDate;

              await user.save();

              return res.status(200).json({
                hasPasswordChanged: true,
                message: "Password reset successfully",
              });
            })
            .catch((error) => {
              console.error("DB error:", error);
              res.status(500).json({ message: "Internal server error" });
            });
        } else {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "reCAPTCHA verification failed",
          });
        }
      })
      .catch((error) => {
        console.error("reCAPTCHA error:", error);
        res.status(500).json({ message: "Internal server error" });
      });
  } catch (error) {
    console.error("Outer try-catch error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


verifyEmail = async (req, res) => {
  const verificationToken = req.body.token;
  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or Expired Verification Token!",
        status: false,
      });
    }

    if (user.status === true) {
      return res.status(200).json({
        message: "Your Account is already Verified",
        isVerified: true,
      });
    }

    const currentTime = new Date();

    if (user.tokenExpirationTime && currentTime > user.tokenExpirationTime) {
      return res.status(400).json({
        message: "Verification token has Expired!",
        status: false,
      });
    }

    // Update user
    user.status = true;
    user.tokenVerificationTime = new Date();
    user.tokenExpirationTime = null;
    user.verificationToken = null;

    // Update customer status if found
    const customer = await Customer.findOne({ userId: user._id });
    if (customer) {
      customer.isVerified = true;
      await customer.save();
    }

    await user.save();

    return res.status(200).json({
      message: "Email Verified and Account Activated Successfully",
      status: true,
      data: user,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ message: "Server Error!", status: false });
  }
};

const updateCustomerProfile = async (req, res) => {
  try {
    const { userId, address, facebook, instagram, linkdin, twiter } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const updateFields = {
      address,
      facebook,
      instagram,
      linkdin,
      twiter,
    };

    if (req.file) {
      updateFields.Image = "Customer_photo/" + req.file.filename;
    }

    const updatedCustomer = await Customer.findOneAndUpdate(
      { userId },
      updateFields,
      { new: true }
    );

    res.status(200).json({ success: true, message: "Profile updated", data: updatedCustomer });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ success: false, message: "Failed to update profile", error: err.message });
  }
};


module.exports = {
  register,
  adduser,
  changepassword,
  login,
  getalluser,
  getsingleuser,
  deleteuser,
  updateuser,
  getallcustomer,
  getsinglecustomer,
  deletecustomer,
  changeStatus,
  forgotPassword,
  resetPassword,
  verifyEmail,
  getTop10Customers,
  updateCustomerProfile,
};
