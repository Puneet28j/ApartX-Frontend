const ReceiveCurrency = require("../models/ReceiveCurrency");
const User = require("../models/User");
const UserWallet = require("../models/UserWallet");
const WalletTransaction = require("../models/WalletTransaction");

exports.createReceiveCurrency = async (req, res) => {
  try {
    const { amount, wallet, walletID } = req.body;

    if (!amount || !wallet || !walletID) {
      return res
        .status(400)
        .json({ message: "Amount, wallet, and walletID are required." });
    }

    // ✅ Fix: Use findOne with proper query and await
    const walletInfo = await UserWallet.findOne({ walletID: walletID });

    // ✅ Check if wallet exists
    if (!walletInfo) {
      return res
        .status(404)
        .json({ message: "Wallet not found with the provided walletID." });
    }

    const newReceive = new ReceiveCurrency({
      userId: req.user?._id,
      amount,
      wallet,
      walletID,
      walletQrImage: walletInfo.qrImage, // ✅ Now this will have the actual value
    });

    await newReceive.save();
    res
      .status(201)
      .json({ message: "Receive request submitted", data: newReceive });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

exports.getAllReceiveRequests = async (req, res) => {
  try {
    const receiveRequests = await ReceiveCurrency.find()
      .populate("userId", "name email mobile profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: receiveRequests });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching requests", error: err.message });
  }
};

exports.updateReceiveStatus = async (req, res) => {
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
    const withdrawRequest = await ReceiveCurrency.findById(id);

    if (!withdrawRequest) {
      return res.status(404).json({ message: "Withdraw request not found" });
    }

    // Verify user exists
    const user = await User.findById(withdrawRequest.userId);
    if (!user) {
      return res.status(400).json({
        message: "Invalid user in this request",
        details: "Associated user account not found",
      });
    }

    // Update the deposit request
    withdrawRequest.status = status;
    if (remark) {
      withdrawRequest.remark = remark;
    }

    // If status is approved, handle the deposit
    if (status === "Approved") {
      try {
        // Normalize wallet type to match enum values
        let normalizedWalletType = withdrawRequest.wallet.toLowerCase();
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
          userId: withdrawRequest.userId,
          walletType: normalizedWalletType,
        });

        if (!userWallet) {
          userWallet = new UserWallet({
            userId: withdrawRequest.userId,
            walletType: normalizedWalletType,
            wallet: withdrawRequest.wallet,
            balance: 0,
          });
        }

        // Update wallet balance - ensure amount is a number
        const amount = parseFloat(withdrawRequest.amount);
        if (isNaN(amount)) {
          throw new Error("Invalid amount value");
        }

        // Calculate new balance
        const previousBalance = userWallet.balance;
        if (previousBalance < amount) {
          return res.status(400).json({
            message: "Insufficient balance in users account",
          });
        }
        userWallet.balance -= amount;
        const newBalance = userWallet.balance;

        await userWallet.save();

        // Create wallet transaction record
        const walletTransaction = new WalletTransaction({
          userId: withdrawRequest.userId,
          type: "Withdrawal", // ✅ Use capitalized "Deposit" to match enum
          amount: amount,
          balanceAfter: newBalance, // ✅ Provide required balanceAfter field
          walletID: userWallet.walletID,
          description: `Deposit approved - ${withdrawRequest.wallet} wallet`,
        });

        await walletTransaction.save();

        console.log(
          "Wallet transaction created successfully:",
          walletTransaction
        );
      } catch (walletError) {
        console.error("Wallet update error:", walletError);
        return res.status(500).json({
          message: "Failed to process Withdraw",
          error: walletError.message,
        });
      }
    }

    // Save the updated deposit request
    await withdrawRequest.save();

    return res.status(200).json({
      success: true,
      message: `Withdraw ${status.toLowerCase()} successfully`,
      data: withdrawRequest,
    });
  } catch (err) {
    console.error("Update status error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update withdraw status",
      error: err.message,
    });
  }
};

exports.getReceiveRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const receive = await ReceiveCurrency.findById(id).populate(
      "userId",
      "name email mobile"
    );

    if (!receive) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ data: receive });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching request", error: err.message });
  }
};
