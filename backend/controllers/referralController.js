const ReferralTree = require("../models/ReferralTree");


exports.getMyReferrals  = async (req, res) => {
  try {
    const userId = req.user._id;

    const downline = await ReferralTree.find({ path: userId })
      .populate("userId", "name email mobile")
      .sort({ level: 1 });

    res.status(200).json({ tree: downline });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};
