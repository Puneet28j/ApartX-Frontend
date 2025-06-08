const SendCurrency = require("../models/SendCurrency");
const UserWallet = require("../models/UserWallet");
const User = require("../models/User");
const ReferralTree = require("../models/ReferralTree");
const { logTransaction } = require("../utils/transactionLogger");
const WalletTransaction = require("../models/WalletTransaction");

exports.createSendCurrency = async (req, res) => {
  try {
    const { amount, wallet, walletID } = req.body;
    const screenshotFile = req.file;

    // Validate required fields
    if (!amount || !wallet || !walletID || !screenshotFile) {
      return res
        .status(400)
        .json({ message: "All fields including screenshot are required." });
    }

    const userId = req.user?._id;

    const userWallet = await UserWallet.findOne({
  userId,
  walletType: wallet.toLowerCase().trim(),
  isActive: true,
});
console.log("Looking for active user wallet with:", {
  userId,
  walletType: wallet.toLowerCase().trim(),
});

if (!userWallet) {
  console.log("No wallet found for:", { userId, wallet: wallet.toLowerCase().trim() });
  return res.status(400).json({
    message: "No active wallet found. Please create or activate a wallet before sending currency.",
  });
}


    // ✅ 2. Check for existing pending request for same wallet type + ID
    const existingPending = await SendCurrency.findOne({
      userId,
      wallet: wallet.toLowerCase(),
      walletID,
      status: "Pending",
    });

    if (existingPending) {
      return res.status(409).json({
        message:
          "You already have a pending request for this wallet. Please wait until it is approved or rejected.",
      });
    }

    // ✅ 3. Create send request if validations pass
    const newSend = new SendCurrency({
      userId,
      amount,
      wallet: wallet.toLowerCase(),
      walletID,
      screenshot: screenshotFile.filename,
    });

    await newSend.save();

    res.status(201).json({
      message: "Send request submitted successfully",
      data: newSend,
    });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};


exports.getAllSendRequests = async (req, res) => {
  try {
    const requests = await SendCurrency.find()
      .populate("userId", "name email mobile profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: requests });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching requests", error: err.message });
  }
};
exports.getAllSendRequestsRecent = async (req, res) => {
  try {
    const requests = await SendCurrency.find()
      .populate("userId", "name email mobile profilePic")
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({ data: requests });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching requests", error: err.message });
  }
};

exports.updateSendStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remark } = req.body;

    if (!id) return res.status(400).json({ message: "Deposit ID is required" });
    if (!status || !["Approved", "Disapproved", "Pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const depositRequest = await SendCurrency.findById(id);
    if (!depositRequest) return res.status(404).json({ message: "Deposit request not found" });

    const user = await User.findById(depositRequest.userId);
    if (!user) {
      return res.status(400).json({
        message: "Invalid user in this request",
        details: "Associated user account not found",
      });
    }

    depositRequest.status = status;
    if (remark) depositRequest.remark = remark;

    if (status === "Approved") {
      try {
        const normalizedWalletType = depositRequest.wallet.toLowerCase();

        if (!["trustwallet", "binance", "metamask", "coinbase"].includes(normalizedWalletType)) {
          return res.status(400).json({
            message: "Invalid wallet type",
            details: "Supported wallets: trustwallet, binance, metamask, coinbase",
          });
        }

        const userWallet = await UserWallet.findOne({
          userId: depositRequest.userId,
          walletType: normalizedWalletType,
          isActive: true,
        });

        if (!userWallet) {
          return res.status(400).json({
            message: `Active wallet of type '${normalizedWalletType}' not found for this user.`,
            error: "User must have an active wallet of the same type before approving deposit.",
          });
        }

        const amount = parseFloat(depositRequest.amount);
        if (isNaN(amount)) throw new Error("Invalid amount value");

        userWallet.balance += amount;
        await userWallet.save();

        const walletTransaction = new WalletTransaction({
          userId: depositRequest.userId,
          type: "Deposit",
          amount,
          balanceAfter: userWallet.balance,
          walletID: depositRequest.walletID,
          description: `Deposit approved - ${depositRequest.wallet} wallet`,
        });

        await walletTransaction.save();
        console.log("Wallet transaction created successfully:", walletTransaction);

      } catch (walletError) {
        console.error("Wallet update error:", walletError);
        return res.status(500).json({
          message: "Failed to process deposit",
          error: walletError.message,
        });
      }
    }

    await depositRequest.save();

    return res.status(200).json({
      success: true,
      message: `Deposit ${status.toLowerCase()} successfully`,
      data: depositRequest,
    });

  } catch (err) {
    console.error("Update status error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update deposit status",
      error: err.message,
    });
  }
};

exports.getSendRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const send = await SendCurrency.findById(id).populate(
      "userId",
      "name email mobile"
    );

    if (!send) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ data: send });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching request", error: err.message });
  }
};
