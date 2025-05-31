const mongoose = require("mongoose");

const userWalletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Set to true if wallet must be tied to a user
    },
    walletID: {
      type: String,
      required: true,
      trim: true,
    },
    walletType: {
      type: String,
      required: true,
      enum: ["binance", "metamask", "coinbase", "trustWallet"], // Optional enum
      lowercase: true,
      trim: true,
    },
    qrImage: {
      type: String, // This stores the file path of the uploaded image
      required: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("UserWallet", userWalletSchema);
