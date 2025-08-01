const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: { type: String, default: "",},
  email: { type: String, default: "", },
  password: { type: String, default: "", },
  userType: { type: Number, default: 2 }, //1= admin, 2=customer
  Image: { type: String, default: "", },
  created_at: { type: Date, default: Date.now() },
  verificationToken: String,
  tokenExpirationTime: Date,
  tokenVerificationTime: { type: Date, default: null },
  bedgeverify: { type: Boolean, default: 0 },
  otp: {
    type: String,
    default: null,
  },
  otpExpiration: {
    type: Date,
    default: null,
  },
  passwordResetTime: { type: Date, default: null },
  status: { type: Boolean, default: 0 },
});

module.exports = new mongoose.model("user", userschema);
