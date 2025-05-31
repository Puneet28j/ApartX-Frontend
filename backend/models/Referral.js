const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
  referrerCode: { type: String, required: true },
  referredMobile: { type: String, required: true },
  referredName: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Referral", referralSchema);
