const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { addWallet } = require("../controllers/walletController");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/qr/"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Use 'screenshot' here to match frontend & Postman field name
router.post("/wallet/add", upload.single("screenshot"), addWallet);

module.exports = router;
