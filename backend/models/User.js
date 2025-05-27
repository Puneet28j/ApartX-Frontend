const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  referralCode: {
    type: String,
    required: true,
    unique: true, // this user's own code
  },
  referredBy: {
    type: String,
    required: true // code of the person who referred them
  },
  name: String,
  email: String,
  profilePic: String,
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
  mpin: String,
  deviceId: String, // for device-specific MPIN
});

module.exports = mongoose.model('User', userSchema);
