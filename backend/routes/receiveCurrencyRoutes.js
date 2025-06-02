const express = require("express");
const router = express.Router();
const receiveController = require("../controllers/receiveCurrencyController");

// ✅ Create receive request
router.post("/receive", receiveController.createReceiveCurrency);

// ✅ Get all receive requests (admin panel)
router.get("/receive", receiveController.getAllReceiveRequests);

// ✅ Get single request by ID
router.get("/receive/:id", receiveController.getReceiveRequestById);

// ✅ Approve / Disapprove
router.put("/receive/:id/status", receiveController.updateReceiveStatus);

module.exports = router;
