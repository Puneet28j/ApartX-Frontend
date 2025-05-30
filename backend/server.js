const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
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

// Test route
app.get("/", (req, res) => res.send("API is running..."));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));

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
