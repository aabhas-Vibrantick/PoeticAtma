const mongoose = require("mongoose");

const customerschema = new mongoose.Schema({
  name: { type: String, default: null },
  penname: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, default: null },
  contact: { type: Number, default: 0 },
  address: { type: String, default: null },
  bio: { type: String, default: null },
  facebook: { type: String, default: null },
  linkdin: { type: String, default: null },
  twiter: { type: String, default: null },
  instagram: { type: String, default: null },
  Image: { type: String, default: null },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "user", default: null },
  // status:{type:Boolean,default:0},
  verificationToken: String,
  tokenExpirationTime: Date,
  bedgeverify: { type: Boolean, default: 0 },
  otp: {
    type: String,
    default: null,
  },
  otpExpiration: {
    type: Date,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = new mongoose.model("Customer", customerschema);
