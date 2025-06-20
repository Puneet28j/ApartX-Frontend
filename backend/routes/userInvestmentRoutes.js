const express = require("express");
const router = express.Router();
const investmentController = require("../controllers/userInvestmentController");
const { verifyToken: auth } = require("../middlewares/authMiddleware");

router.post("/invest", auth, investmentController.investInPlan);
router.get("/investments", auth, investmentController.getAllInvestors);
router.get("/all-investments", auth, investmentController.getAllInvestments);
router.get("/my-investments", auth, investmentController.getMyActiveInvestments);
router.put("/exit-investment/:id", auth, investmentController.exitInvestment);

const { withdrawRoiAndExit,previewCompoundROI } = require("../controllers/userInvestmentController");
router.post("/investments/:id/withdraw-roi", auth, withdrawRoiAndExit);
router.get("/investments/:id/roi-preview", auth, previewCompoundROI);


module.exports = router;
