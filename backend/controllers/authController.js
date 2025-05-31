const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Generate new referral code based on mobile
const generateReferralCode = (mobile) => {
  return "REF" + mobile.slice(-4) + Math.floor(1000 + Math.random() * 9000);
};

exports.registerUser = async (req, res) => {
  try {
    const {
      mobile,
      password,
      referralCode: referrerCode,
      name,
      email,
      profilePic,
    } = req.body;

    if (!mobile || !password || !referrerCode) {
      return res
        .status(400)
        .json({ message: "Mobile, password, and referrer code are required." });
    }

    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(409).json({ message: "Mobile already registered." });
    }

    const referrer = await User.findOne({ referralCode: referrerCode });
    if (!referrer) {
      return res.status(400).json({ message: "Invalid referral code." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newReferralCode = generateReferralCode(mobile);

    const user = new User({
      mobile,
      password: hashedPassword,
      referralCode: newReferralCode,
      referredBy: referrerCode,
      name,
      email: `${mobile.replace(/\D/g, "")}-${Date.now()}@demo.com`,
      profilePic,
      role: "user",
    });

    await user.save();
    return res.status(201).json({
      message: "User registered successfully.",
      referralCode: newReferralCode,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { mobile, password, deviceId } = req.body;

    if (!mobile || !password || !deviceId) {
      return res
        .status(400)
        .json({ message: "Mobile, password, and deviceId are required" });
    }

    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // const isMpinMissing = !user.mpin || !user.deviceId;
    // const isNewDevice = user.deviceId !== deviceId;

    // if (isMpinMissing || isNewDevice) {
    //   return res.status(200).json({
    //     message: "First time on device. MPIN required.",
    //     requireMpin: true,
    //     token,
    //     userId: user._id,
    //     role: user.role,
    //     redirectTo: user.role === "admin" ? "/admin" : "/main-screen",
    //   });
    // }

    return res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      userId: user._id, // ✅ Add this
      deviceId: user.deviceId, // ✅ Optional: helpful for debug
      redirectTo: user.role === "admin" ? "/admin" : "/main-screen",
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.setMpin = async (req, res) => {
  try {
    const { userId, mpin, deviceId } = req.body;

    if (!userId || !mpin || !deviceId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.mpin = mpin;
    user.deviceId = deviceId;

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "MPIN set successfully. You can now login.",
      token,
      role: user.role,
      redirectTo: user.role === "admin" ? "/admin" : "/main-screen",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to set MPIN" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if they exist in request
    if (name) user.name = name.trim();
    if (email) user.email = email.trim();
    if (mobile) user.mobile = mobile.trim();

    // Handle profile picture
    if (req.file) {
      // Create profile_pic directory if it doesn't exist
      const profilePicDir = path.join(__dirname, "../uploads/profile_pic");
      if (!fs.existsSync(profilePicDir)) {
        fs.mkdirSync(profilePicDir, { recursive: true });
      }

      const filename = `resized-${Date.now()}-${req.file.originalname}`;
      const outputPath = path.join("uploads/profile_pic", filename);

      // Delete previous image if exists
      if (user.profilePic) {
        const previousImagePath = path.join(__dirname, "..", user.profilePic);
        if (fs.existsSync(previousImagePath)) {
          fs.unlinkSync(previousImagePath);
        }
      }

      // Process and save new image
      await sharp(req.file.path)
        .resize(300, 300, {
          fit: "cover",
          position: "center",
        })
        .toFile(path.join(__dirname, "..", outputPath));

      // Delete temporary file
      fs.unlinkSync(req.file.path);

      // Update user profile pic path (store relative path)
      user.profilePic = outputPath;
    }

    await user.save();

    // Send back the updated user data
    res.status(200).json({
      message: "Profile updated successfully",
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({
      message: "Failed to update profile",
      error: err.message,
    });
  }
};
