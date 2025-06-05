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
    // Validate amount
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ message: "Invalid amount provided." });
    }
    // check the user wallet balance of isactive wallet
    const userWallet = await UserWallet.findOne({
      userId: req.user?._id,
      walletType: wallet.toLowerCase(),
      isActive: true,
    });
    if (!userWallet) {
      return res.status(400).json({
        message: `No active wallet found for type ${wallet}. Please add a wallet first.`,
      });
    }
    if (userWallet.balance < parsedAmount) {
      return res.status(400).json({
        message: "Insufficient balance in your active wallet.",
      });
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
      .populate("userId", "name email mobile")
      .sort({ createdAt: -1 });

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
        // Normalize wallet type
        let normalizedWalletType = depositRequest.wallet.toLowerCase();

        if (
          !["trustwallet", "binance", "metamask", "coinbase"].includes(
            normalizedWalletType
          )
        ) {
          return res.status(400).json({
            message: "Invalid wallet type",
            details:
              "Supported wallets are TrustWallet, Binance, Metamask, and Coinbase",
          });
        }

        // 1. Find User Wallet
        let userWallet = await UserWallet.findOne({
          userId: depositRequest.userId,
          walletType: normalizedWalletType,
          isActive: true,
        });

        if (!userWallet || userWallet.balance < depositRequest.amount) {
          return res.status(400).json({
            message: "Insufficient balance in user wallet",
          });
        }
        // Add to updateSendStatus
        console.log("Searching for admin wallet:", {
          normalizedWalletType,
          adminIds: await User.find({ role: "admin" }).distinct("_id"),
        });
        // 2. Find Admin Wallet
        // Ensure admin wallet exists for the given wallet type
        const adminWallet = await UserWallet.findOne({
          walletType: normalizedWalletType,
          userId: { $in: await User.find({ role: "admin" }).distinct("_id") },
        });

        if (!adminWallet) {
          return res.status(500).json({
            message: "Admin wallet not found for this wallet type",
          });
        }

        const amount = parseFloat(depositRequest.amount);
        if (isNaN(amount)) throw new Error("Invalid amount");

        // 3. Deduct from user wallet
        userWallet.balance -= amount;
        await userWallet.save();

        // 4. Add to admin wallet
        adminWallet.balance += amount;
        await adminWallet.save();

        // 5. Log user transaction
        await new WalletTransaction({
          userId: depositRequest.userId,
          type: "Withdrawal",
          amount,
          balanceAfter: userWallet.balance,
          walletID: userWallet.walletID,
          description: `Deposit sent to admin (${normalizedWalletType})`,
        }).save();

        // 6. Log admin transaction
        await new WalletTransaction({
          userId: adminWallet.userId._id,
          type: "Deposit",
          amount,
          balanceAfter: adminWallet.balance,
          walletID: adminWallet.walletID,
          description: `Received deposit from user (${depositRequest.userId})`,
        }).save();
      } catch (walletError) {
        console.error("Wallet processing error:", walletError);
        return res.status(500).json({
          message: "Failed to process transfer between user and admin",
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
