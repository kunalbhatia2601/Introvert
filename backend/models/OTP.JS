const mongoose = require('mongoose');
const config = require('../config/config');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: config.OTP_EXPIRY / 1000 // Convert to seconds for MongoDB
  }
});

module.exports = mongoose.model('OTP', otpSchema);
