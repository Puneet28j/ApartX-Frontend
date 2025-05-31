const express = require("express");
const router = express.Router();
const {
  createReferral,
  getReferralsByCode
} = require("../controllers/referralController");

router.post("/referral", createReferral);                // For saving new referral
router.get("/referral/:code", getReferralsByCode);       // For fetching referral list by code

module.exports = router;
