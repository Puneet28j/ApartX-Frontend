const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/qr/" });
const {
  addWallet,
  getUserWallets,
  updateWallet,
  toggleWalletStatus,
  updateWalletBalance,
  getTotalWalletBalance,
  getUserPassbook,
  getAllPassbooks,
  getAdminWallets,
} = require("../controllers/walletController");

const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/wallet", verifyToken, upload.single("qrImage"), addWallet);
router.get("/wallet", verifyToken, getUserWallets);
router.put(
  "/wallet/:walletId",
  verifyToken,
  upload.single("qrImage"),
  updateWallet
);
router.patch("/wallet/:walletId/toggle", verifyToken, toggleWalletStatus);
router.put("/wallet/:walletId/balance", verifyToken, updateWalletBalance);
router.get("/wallets/total", verifyToken, getTotalWalletBalance);
router.get("/passbook", verifyToken, getUserPassbook);
router.get("/admin/passbooks", verifyToken, getAllPassbooks);
router.get("/admin/wallets", verifyToken, getAdminWallets);

module.exports = router;
