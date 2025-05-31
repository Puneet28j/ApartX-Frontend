const mongoose = require("mongoose");

const sendCurrencySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  amount: { type: Number, required: true },
  wallet: { type: String, required: true },
  walletID: { type: String, required: true },
  screenshot: { type: String }, // saved file name or path
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SendCurrency", sendCurrencySchema);
