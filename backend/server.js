const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "https://http://147.93.105.130:5000"], // Update with your frontend URL
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure static file serving before routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Add after static file middleware
app.use((err, req, res, next) => {
  if (err.code === "ENOENT") {
    console.error("File not found:", req.path);
    return res.status(404).send("File not found");
  }
  next(err);
});

// Test route
app.get("/", (req, res) => res.send("API is running..."));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error: ", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
