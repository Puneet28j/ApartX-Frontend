const mongoose = require("mongoose");

const userWalletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  walletID: { type: String, required: true },
  walletType: { type: String, required: true },
  qrImage: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserWallet", userWalletSchema);
