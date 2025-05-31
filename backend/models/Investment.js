const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  planName: { type: String, required: true },
  amount: { type: Number, required: true },
  rate: { type: String, required: true },
  duration: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Investment", investmentSchema);
