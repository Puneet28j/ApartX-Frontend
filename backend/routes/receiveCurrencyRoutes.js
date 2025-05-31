const express = require("express");
const router = express.Router();
const { createReceiveCurrency } = require("../controllers/receiveCurrencyController");

router.post("/receive-currency", createReceiveCurrency);

module.exports = router;
