const ReceiveCurrency = require("../models/ReceiveCurrency");

exports.createReceiveCurrency = async (req, res) => {
  try {
    const { amount, wallet } = req.body;

    if (!amount || !wallet) {
      return res.status(400).json({ message: "Amount and wallet are required." });
    }

    const newReceive = new ReceiveCurrency({
      userId: req.user?._id, // optional if using auth
      amount,
      wallet,
    });

    await newReceive.save();
    res.status(201).json({ message: "Receive request submitted", data: newReceive });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

exports.getAllReceiveRequests = async (req, res) => {
  try {
    const receiveRequests = await ReceiveCurrency.find()
      .populate("userId", "name email mobile")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: receiveRequests });
  } catch (err) {
    res.status(500).json({ message: "Error fetching requests", error: err.message });
  }
};


exports.updateReceiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remark } = req.body;

    if (!["Approved", "Disapproved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await ReceiveCurrency.findByIdAndUpdate(
      id,
      { status, remark },
      { new: true }
    ).populate("userId", "name email mobile");

    if (!updated) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Status updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};


exports.getReceiveRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const receive = await ReceiveCurrency.findById(id)
      .populate("userId", "name email mobile");

    if (!receive) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ data: receive });
  } catch (err) {
    res.status(500).json({ message: "Error fetching request", error: err.message });
  }
};
