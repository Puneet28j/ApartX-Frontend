const Investment = require("../models/Investment");

exports.createInvestment = async (req, res) => {
  try {
    const { planName, amount, rate, duration } = req.body;

    if (!planName || !amount || !rate || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newInvestment = new Investment({
      userId: req.user?._id, // optional if auth is used
      planName,
      amount,
      rate,
      duration
    });

    await newInvestment.save();

    res.status(201).json({ message: "Investment created successfully", data: newInvestment });
  } catch (error) {
    res.status(500).json({ message: "Failed to create investment", error: error.message });
  }
};
