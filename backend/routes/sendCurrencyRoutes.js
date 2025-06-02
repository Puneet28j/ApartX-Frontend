const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const {
  createSendCurrency,
  getAllSendRequests,
  getSendRequestById,
  updateSendStatus,
} = require("../controllers/sendCurrencyController");

const { verifyToken: auth } = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

// ✅ Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/screenshots/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) cb(null, true);
    else cb(new Error("Only image files are allowed (jpg, jpeg, png, webp)"));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

// ✅ ROUTES (prefix already set to `/api` in main app)
router.post("/send-currency", auth, upload.single("screenshot"), createSendCurrency);
router.get("/send-currency", auth, isAdmin, getAllSendRequests);
router.get("/send-currency/:id", auth, isAdmin, getSendRequestById);
router.put("/send-currency/:id", auth, isAdmin, updateSendStatus); // ✅ Corrected

module.exports = router;
