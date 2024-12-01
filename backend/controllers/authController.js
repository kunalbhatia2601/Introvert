const User = require('../models/User');
const OTP = require('../models/OTP');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { generateOTP } = require('../utils/otpGenerator');
const { sendOTPEmail } = require('../utils/emailService');

const authController = {
  // Signup
  signup: async (req, res) => {
    try {
      const { name, email, password, birthdate } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'EMAIL_EXISTS' });
      }

      // Create new user
      const user = new User({
        name,
        email,
        password,
        birthdate
      });

      await user.save();

      // Generate and send OTP
      const otp = generateOTP();
      await OTP.create({ email, otp });
      await sendOTPEmail(email, otp);

      res.status(201).json({ 
        message: 'User registered successfully. Please verify your email.' 
      });

    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ error: 'SERVER_ERROR' });
    }
  },

  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'INVALID_CREDENTIALS' });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: 'INVALID_CREDENTIALS' });
      }

      // Generate and send OTP
      const otp = generateOTP();
      await OTP.create({ email, otp });
      await sendOTPEmail(email, otp);

      res.json({ message: 'OTP sent to your email' });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'SERVER_ERROR' });
    }
  },

  // Verify OTP
  verifyOTP: async (req, res) => {
    try {
      const { email, otp } = req.body;

      // Find OTP record
      const otpRecord = await OTP.findOne({ 
        email, 
        otp,
        createdAt: { $gt: new Date(Date.now() - config.OTP_EXPIRY) }
      });

      if (!otpRecord) {
        return res.status(400).json({ error: 'INVALID_OTP' });
      }

      // Update user verification status
      await User.updateOne({ email }, { isVerified: true });

      // Generate JWT token
      const token = jwt.sign(
        { email },
        config.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Delete used OTP
      await OTP.deleteOne({ _id: otpRecord._id });

      res.json({ token });

    } catch (error) {
      console.error('OTP verification error:', error);
      res.status(500).json({ error: 'SERVER_ERROR' });
    }
  }
};

module.exports = authController;
