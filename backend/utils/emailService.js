const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS
  }
});

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: config.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Introvert Account Verification',
    html: `
      <h1>Account Verification</h1>
      <p>Your OTP for account verification is: <strong>${otp}</strong></p>
      <p>This OTP will expire in 10 minutes.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

module.exports = { sendOTPEmail };
