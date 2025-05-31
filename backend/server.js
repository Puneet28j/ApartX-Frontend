const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

// ✅ Enhanced CORS Setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://apart-x.pro",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ JSON Parser
app.use(express.json());

// ✅ Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ✅ Serve static files
app.use("/uploads", express.static(uploadsDir));

// ✅ Error handler for static files
app.use((err, req, res, next) => {
  if (err.code === "ENOENT") {
    console.error("File not found:", req.path);
    return res.status(404).send("File not found");
  }
  next(err);
});

// ✅ Health Check Route
app.get("/", (req, res) => res.send("API is running..."));

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const sendCurrencyRoutes = require("./routes/sendCurrencyRoutes");
const receiveCurrencyRoutes = require("./routes/receiveCurrencyRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const referralRoutes = require("./routes/referralRoutes");

app.use("/api/auth", authRoutes);
app.use("/api", sendCurrencyRoutes);
app.use("/api", receiveCurrencyRoutes);
app.use("/api", investmentRoutes);
app.use("/api", referralRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ✅ Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
