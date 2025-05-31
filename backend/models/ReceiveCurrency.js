const mongoose = require("mongoose");

const receiveCurrencySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  amount: { type: Number, required: true },
  wallet: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ReceiveCurrency", receiveCurrencySchema);
