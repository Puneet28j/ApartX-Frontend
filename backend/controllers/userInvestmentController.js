const UserInvestment = require("../models/UserInvestment");
const InvestmentPlan = require("../models/InvestmentPlan");
const UserWallet = require("../models/UserWallet");

exports.investInPlan = async (req, res) => {
  try {
    const { planId, amount } = req.body;
    const userId = req.user._id;

    const plan = await InvestmentPlan.findById(planId);
    if (!plan || !plan.isActive) {
      return res.status(400).json({ message: "Invalid or inactive plan" });
    }

    if (amount < plan.minAmount || amount > plan.maxAmount) {
      return res.status(400).json({ message: "Amount out of allowed range" });
    }

    const roi = plan.roi;
    const dailyEarning = parseFloat(((amount * roi) / 100).toFixed(2));
    const totalDays = plan.durationDays;
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + totalDays);

    const newInvestment = new UserInvestment({
      userId,
      planId,
      amount,
      roi,
      dailyEarning,
      totalDays,
      startDate,
      endDate,
    });

    await newInvestment.save();
    res
      .status(201)
      .json({ message: "Investment successful", investment: newInvestment });
  } catch (err) {
    res.status(500).json({ message: "Investment error", error: err.message });
  }
};

// Admin: View all user investments
exports.getAllInvestments = async (req, res) => {
  try {
    const investments = await UserInvestment.find()
      .populate("userId", "name email")
      .populate("planId", "name durationDays")
      .sort({ createdAt: -1 });

    res.status(200).json({ investments });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching investments", error: err.message });
  }
};
