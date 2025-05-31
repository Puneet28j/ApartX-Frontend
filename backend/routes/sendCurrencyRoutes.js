const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { createSendCurrency } = require("../controllers/sendCurrencyController");

// Upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/screenshots/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Routes
router.post("/send-currency", upload.single("screenshot"), createSendCurrency);

module.exports = router;
