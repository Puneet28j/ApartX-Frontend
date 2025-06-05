const UserWallet = require("../models/UserWallet");
const WalletTransaction = require("../models/WalletTransaction");

exports.addWallet = async (req, res) => {
  try {
    const { walletID, walletType, balance } = req.body;
    const userId = req.user._id;

    if (!walletID || !walletType) {
      return res
        .status(400)
        .json({ message: "walletID and walletType are required" });
    }

    const qrImagePath = req.file ? req.file.path : null;

    const newWallet = new UserWallet({
      walletID,
      walletType,
      userId,
      qrImage: qrImagePath,
      balance: balance || 0, // Default 0
    });

    await newWallet.save();

    return res.status(201).json({ message: "Wallet added", wallet: newWallet });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

exports.getUserWallets = async (req, res) => {
  try {
    const userId = req.user._id;
    const wallets = await UserWallet.find({ userId });
    res.status(200).json({ wallets });
    console.log("User wallets fetched successfully", wallets);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching wallets", error: err.message });
  }
};

exports.updateWallet = async (req, res) => {
  try {
    const { walletID, walletType } = req.body;
    const { walletId } = req.params;

    const wallet = await UserWallet.findOneAndUpdate(
      { _id: walletId, userId: req.user._id },
      {
        walletID,
        walletType,
        qrImage: req.file ? req.file.path : undefined,
      },
      { new: true }
    );

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    res.status(200).json({ message: "Wallet updated", wallet });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating wallet", error: err.message });
  }
};

exports.toggleWalletStatus = async (req, res) => {
  try {
    const { walletId } = req.params;

    const wallet = await UserWallet.findOne({
      _id: walletId,
      userId: req.user._id,
    });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    wallet.isActive = !wallet.isActive;
    await wallet.save();

    res.status(200).json({ message: "Wallet status toggled", wallet });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error toggling wallet status", error: err.message });
  }
};

exports.updateWalletBalance = async (req, res) => {
  try {
    const { walletId } = req.params;
    const { amount } = req.body;

    if (typeof amount !== "number") {
      return res.status(400).json({ message: "Amount must be a number" });
    }

    const wallet = await UserWallet.findOne({
      _id: walletId,
      userId: req.user._id,
    });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    wallet.balance = amount;
    await wallet.save();

    res.status(200).json({ message: "Balance updated", wallet });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating balance", error: err.message });
  }
};

exports.getTotalWalletBalance = async (req, res) => {
  try {
    const userId = req.user._id;
    const wallets = await UserWallet.find({ userId });

    const total = wallets.reduce((sum, w) => sum + w.balance, 0);

    res.status(200).json({ totalBalance: total });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error calculating total balance", error: err.message });
  }
};

exports.getUserPassbook = async (req, res) => {
  try {
    const userId = req.user._id;
    const transactions = await WalletTransaction.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ transactions });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching passbook", error: err.message });
  }
};

exports.getAllPassbooks = async (req, res) => {
  try {
    const { userId } = req.query;

    const filter = userId ? { userId } : {};
    const data = await WalletTransaction.find(filter)
      .populate("userId", "name email mobile")
      .sort({ createdAt: -1 });

    res.status(200).json({ data });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching all passbooks", error: err.message });
  }
};

exports.getAdminWallets = async (req, res) => {
  try {
    // Find all wallets that belong to admin users
    const wallets = await UserWallet.find()
      .populate({
        path: "userId",
        select: "name email role",
        match: { role: "admin" },
      })
      .exec();

    // Filter out wallets where userId is null (in case the user was deleted)
    const adminWallets = wallets.filter((wallet) => wallet.userId !== null);

    // Format the response
    const formattedWallets = adminWallets.map((wallet) => ({
      _id: wallet._id,
      walletType: wallet.walletType,
      walletID: wallet.walletID,
      balance: wallet.balance,
      qrImage: wallet.qrImage,
      adminName: wallet.userId.name,
      adminEmail: wallet.userId.email,
    }));

    res.status(200).json({ wallets: formattedWallets });
  } catch (err) {
    console.error("Error fetching admin wallets:", err);
    res.status(500).json({
      message: "Error fetching admin wallets",
      error: err.message,
    });
  }
};
