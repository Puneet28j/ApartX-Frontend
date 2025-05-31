const ReceiveCurrency = require("../models/ReceiveCurrency");

exports.createReceiveCurrency = async (req, res) => {
  try {
    const { amount, wallet } = req.body;

    if (!amount || !wallet) {
      return res.status(400).json({ message: "Amount and wallet are required." });
    }

    const newReceive = new ReceiveCurrency({
      userId: req.user?._id, // optional if using auth
      amount,
      wallet,
    });

    await newReceive.save();
    res.status(201).json({ message: "Receive request submitted", data: newReceive });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};
