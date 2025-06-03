const cron = require("node-cron");
const UserInvestment = require("../models/UserInvestment");
const UserWallet = require("../models/UserWallet");

cron.schedule("1 0 * * *", async () => {
  console.log("🎯 Running daily ROI job at 12:01 AM");

  const today = new Date().setHours(0, 0, 0, 0);

  const activeInvestments = await UserInvestment.find({ isCompleted: false });

  for (let invest of activeInvestments) {
    const now = new Date().setHours(0, 0, 0, 0);

    // Skip if investment has ended
    if (now > new Date(invest.endDate).setHours(0, 0, 0, 0)) {
      invest.isCompleted = true;
      await invest.save();
      continue;
    }

    // Add daily earning to wallet
    const wallet = await UserWallet.findOne({ userId: invest.userId });
    if (wallet) {
      wallet.balance += invest.dailyEarning;
      await wallet.save();
    }

    // Update earned amount
    invest.earnedTillNow += invest.dailyEarning;
    await invest.save();
  }

  console.log("✅ Daily ROI credited to eligible users.");
});
