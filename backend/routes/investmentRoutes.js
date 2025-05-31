const express = require("express");
const router = express.Router();
const { createInvestment } = require("../controllers/investmentController");

router.post("/investment/create", createInvestment);

module.exports = router;
