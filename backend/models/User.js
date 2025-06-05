const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  referralCode: {
    type: String,
    required: true,
    unique: true, // this user's own code
  },
  referredBy: {
  type: String,
  required: function () {
    return this.role !== "admin";
  },
},

  name: String,
  email: {
    type: String,
    sparse: true, // This allows multiple null values
    default: "", // Default empty string instead of null
  },
  otpCode: { type: String },
otpExpiry: { type: Date },
  profilePic: String,
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  mpin: String,
  deviceId: String, // for device-specific MPIN
});

module.exports = mongoose.model("User", userSchema);
