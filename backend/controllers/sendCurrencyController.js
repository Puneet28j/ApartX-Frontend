const SendCurrency = require("../models/SendCurrency");
const UserWallet = require("../models/UserWallet");
const User = require("../models/User");
const ReferralTree = require("../models/ReferralTree");
const { logTransaction } = require("../utils/transactionLogger");

exports.createSendCurrency = async (req, res) => {
  try {
    const { amount, wallet, walletID } = req.body;
    const screenshotFile = req.file;

    if (!amount || !wallet || !walletID || !screenshotFile) {
      return res.status(400).json({ message: "All fields including screenshot are required." });
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
    res.status(500).json({ message: "Error fetching requests", error: err.message });
  }
};


exports.updateSendStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remark } = req.body;

    if (!["Approved", "Disapproved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
const request = await SendCurrency.findById(id).populate("userId");
if (!request) {
  return res.status(404).json({ message: "Send request not found" });
}

if (!request.userId) {
  return res.status(400).json({ message: "Invalid user in this request" });
}


    // ✅ Step 1: Update status & remark
    request.status = status;
    request.remark = remark;
    await request.save();

    // ✅ Step 2: On Approval → Add Amount to User Wallet
    if (status === "Approved") {
      let userWallet = await UserWallet.findOne({ userId: request.userId._id });
      if (userWallet) {
        userWallet.balance += request.amount;
        await userWallet.save();
      } else {
        userWallet = new UserWallet({
          userId: request.userId._id,
          walletID: "default",
          walletType: "deposit",
          balance: request.amount
        });
        await userWallet.save();
      }
await logTransaction({
  userId: request.userId._id,
  type: "Deposit",
  amount: request.amount,
  walletID: request.walletID,
  balanceAfter: userWallet.balance,
  description: "Deposit approved by admin"
});

console.log("Request Object:", request);
console.log("Request.userId:", request.userId);

      // ✅ Step 3: If it's user's first deposit ≥ ₹250 → Trigger Referral Bonuses
      const totalDeposits = await SendCurrency.countDocuments({
        userId: request.userId._id,
        status: "Approved"
      });

      if (totalDeposits === 1 && request.amount >= 250) {
        const tree = await ReferralTree.findOne({ userId: request.userId._id });
        if (tree) {
          const path = tree.path.reverse(); // Closest upline first
          const percentages = [3, 1]; // 3% → 1st referrer, 1% → next

          for (let i = 0; i < path.length && i < percentages.length; i++) {
            const refUserId = path[i];
            const bonus = parseFloat(((request.amount * percentages[i]) / 100).toFixed(2));

            let wallet = await UserWallet.findOne({ userId: refUserId });
            if (wallet) {
              wallet.balance += bonus;
              await wallet.save();
            } else {
              wallet = new UserWallet({
                userId: refUserId,
                walletID: "default",
                walletType: "bonus",
                balance: bonus
              });
              await wallet.save();
            }
          }
        }
      }
    }

    res.status(200).json({ message: "Status updated and processed", data: request });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
}; 


exports.getSendRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const send = await SendCurrency.findById(id)
      .populate("userId", "name email mobile");

    if (!send) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ data: send });
  } catch (err) {
    res.status(500).json({ message: "Error fetching request", error: err.message });
  }
};
