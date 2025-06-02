const express = require("express");
const router = express.Router();
const { getMyReferrals } = require("../controllers/referralController");

const { verifyToken: auth} = require("../middlewares/authMiddleware");


router.get("/referrals", auth, getMyReferrals);

module.exports = router;
