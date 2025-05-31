const Referral = require("../models/Referral");

exports.createReferral = async (req, res) => {
  try {
    const { referrerCode, referredMobile, referredName } = req.body;

    if (!referrerCode || !referredMobile || !referredName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const referral = new Referral({
      referrerCode,
      referredMobile,
      referredName
    });

    await referral.save();
    res.status(201).json({ message: "Referral saved", data: referral });
  } catch (error) {
    res.status(500).json({ message: "Error saving referral", error: error.message });
  }
};

exports.getReferralsByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const referrals = await Referral.find({ referrerCode: code }).sort({ joinedAt: -1 });

    res.status(200).json({ referrals });
  } catch (error) {
    res.status(500).json({ message: "Error fetching referrals", error: error.message });
  }
};
