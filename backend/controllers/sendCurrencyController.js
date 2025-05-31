const SendCurrency = require("../models/SendCurrency");
const ReceiveCurrency = require("../models/ReceiveCurrency");

exports.createSendCurrency = async (req, res) => {
  try {
    const { amount, wallet, walletID } = req.body;
    const screenshot = req.file ? req.file.filename : null;

    const newTx = new SendCurrency({
      userId: req.user?._id, // optional
      amount,
      wallet,
      walletID,
      screenshot
    });

    await newTx.save();
    res.status(201).json({ message: "Transaction submitted", data: newTx });
  } catch (err) {
    console.error("❌ ERROR:", err); // 👈 print full error in console
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

