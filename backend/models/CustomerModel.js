const mongoose = require("mongoose");

const customerschema = new mongoose.Schema({
  name: { type: String, default: "", },
  penname: { type: String, default: "", },
  email: { type: String, default: "", },
  password: { type: String, default: "", },
  contact: { type: Number, default: 0 },
  address: { type: String},
  bio: { type: String},
  facebook: { type: String },
  linkdin: { type: String},
  twiter: { type: String },
  instagram: { type: String },
  Image: { type: String},
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
