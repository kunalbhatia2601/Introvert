const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup endpoint
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, birthdate } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Save user to database
    // ... your database logic here ...

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Verify user credentials
    // ... your database verification logic here ...

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in database with expiry
    // ... your OTP storage logic here ...

    // Send OTP email
    await sendOTPEmail(email, otp);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// OTP verification endpoint
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    // Verify OTP from database
    // ... your OTP verification logic here ...

    // Generate JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'OTP verification failed' });
  }
});

// Email sending function
async function sendOTPEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    // Configure your email service
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Login',
    html: `Your OTP is: <b>${otp}</b>. It will expire in 5 minutes.`,
  });
}

module.exports = router;
