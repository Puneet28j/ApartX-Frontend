const mongoose = require("mongoose");

const receiveCurrencySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ✅ This must be correct!
    required: true,
  },
  amount: { type: Number, required: true },
  wallet: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Disapproved"],
    default: "Pending",
  },
  remark: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ReceiveCurrency", receiveCurrencySchema);
