const UserWallet = require("../models/UserWallet");


exports.addWallet = async (req, res) => {
  try {

    const { walletID, walletType, userId } = req.body;

    if (!walletID || !walletType) {
      return res.status(400).json({ message: "walletID and walletType are required" });
    }

    const qrImagePath = req.file ? req.file.path : null;

    const newWallet = new UserWallet({
      walletID,
      walletType,
      userId,
      qrImage: qrImagePath,
    });

    await newWallet.save();

    return res.status(201).json({
      message: "Wallet added successfully",
      wallet: newWallet,
    });
  } catch (error) {
    console.error("🔥 Error adding wallet:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
