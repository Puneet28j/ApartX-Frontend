const UserWallet = require("../models/UserWallet");

exports.addWallet = async (req, res) => {
  try {
    const { walletID, walletType } = req.body;
    const qrImage = req.file ? req.file.filename : null;

    if (!walletID || !walletType) {
      return res.status(400).json({ message: "walletID and walletType are required" });
    }

    const newWallet = new UserWallet({
      userId: req.user?._id, // if auth middleware used
      walletID,
      walletType,
      qrImage
    });

    await newWallet.save();
    res.status(201).json({ message: "Wallet saved successfully", data: newWallet });
  } catch (error) {
    res.status(500).json({ message: "Error saving wallet", error: error.message });
  }
};
