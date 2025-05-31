const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  setMpin,
  updateProfile
} = require('../controllers/authController');

const { verifyToken } = require('../middlewares/authMiddleware');
const upload = require("../middlewares/uploadMiddleware");

// Auth Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/set-mpin', setMpin);
router.put('/update-profile', verifyToken, upload.single("profilePic"), updateProfile);
router.get('/me', verifyToken, (req, res) => {
  res.json(req.user);
});

// Health check
router.get("/", (req, res) => {
  res.send("Auth API working on server");
});

module.exports = router;
