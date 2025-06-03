const express = require("express");
const router = express.Router();
const investmentController = require("../controllers/userInvestmentController");
const { verifyToken: auth} = require("../middlewares/authMiddleware");

router.post("/invest", auth, investmentController.investInPlan);
router.get("/investments", auth, investmentController.getAllInvestments);

module.exports = router;
