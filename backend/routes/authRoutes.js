const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  setMpin,
  updateProfile
} = require('../controllers/authController');

const { verifyToken } = require('../middlewares/authMiddleware');

// Auth Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/set-mpin', setMpin);
router.put('/update-profile', verifyToken, updateProfile);
router.get('/me', verifyToken, (req, res) => {
  res.json(req.user);
});

const upload = require("../middlewares/uploadMiddleware");

router.put("/update-profile", verifyToken, upload.single("profilePic"), updateProfile);



module.exports = router;
