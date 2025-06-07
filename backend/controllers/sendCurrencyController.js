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

    if (!amount || !wallet || !walletID || !screenshotFile) {
      return res
        .status(400)
        .json({ message: "All fields including screenshot are required." });
    }

    const newSend = new SendCurrency({
      userId: req.user?._id,
      amount,
      wallet,
      walletID,
      screenshot: screenshotFile.filename,
    });

    await newSend.save();
    res.status(201).json({ message: "Send request submitted", data: newSend });
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

    // Validate input
    if (!id) {
      return res.status(400).json({ message: "Deposit ID is required" });
    }

    if (!status || !["Approved", "Disapproved", "Pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find the deposit request
    const depositRequest = await SendCurrency.findById(id);

    if (!depositRequest) {
      return res.status(404).json({ message: "Deposit request not found" });
    }

    // Verify user exists
    const user = await User.findById(depositRequest.userId);
    if (!user) {
      return res.status(400).json({
        message: "Invalid user in this request",
        details: "Associated user account not found",
      });
    }

    // Update the deposit request
    depositRequest.status = status;
    if (remark) {
      depositRequest.remark = remark;
    }

    // If status is approved, handle the deposit
    if (status === "Approved") {
      try {
        // Normalize wallet type to match enum values
        let normalizedWalletType = depositRequest.wallet.toLowerCase();
        if (normalizedWalletType === "trustwallet") {
          normalizedWalletType = "trustwallet";
        } else if (normalizedWalletType === "binance") {
          normalizedWalletType = "binance";
        } else if (normalizedWalletType === "metamask") {
          normalizedWalletType = "metamask";
        } else if (normalizedWalletType === "coinbase") {
          normalizedWalletType = "coinbase";
        } else {
          return res.status(400).json({
            message: "Invalid wallet type",
            details: "Supported wallets are TrustWallet and Binance",
          });
        }

        // Find or create user wallet
        let userWallet = await UserWallet.findOne({
          userId: depositRequest.userId,
          walletType: normalizedWalletType,
        });

        if (!userWallet) {
  return res.status(400).json({
    message: `Wallet of type '${normalizedWalletType}' does not exist for this user.`,
    error: "User wallet not found. Please create the wallet manually before approving deposit.",
  });
}


        // Update wallet balance - ensure amount is a number
        const amount = parseFloat(depositRequest.amount);
        if (isNaN(amount)) {
          throw new Error("Invalid amount value");
        }

        // Calculate new balance
        const previousBalance = userWallet.balance;
        userWallet.balance += amount;
        const newBalance = userWallet.balance;

        await userWallet.save();

        // Create wallet transaction record
        const walletTransaction = new WalletTransaction({
          userId: depositRequest.userId,
          type: "Deposit", // ✅ Use capitalized "Deposit" to match enum
          amount: amount,
          balanceAfter: newBalance, // ✅ Provide required balanceAfter field
          walletID: depositRequest.walletID,
          description: `Deposit approved - ${depositRequest.wallet} wallet`,
        });

        await walletTransaction.save();

        console.log(
          "Wallet transaction created successfully:",
          walletTransaction
        );
      } catch (walletError) {
        console.error("Wallet update error:", walletError);
        return res.status(500).json({
          message: "Failed to process deposit",
          error: walletError.message,
        });
      }
    }

    // Save the updated deposit request
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
