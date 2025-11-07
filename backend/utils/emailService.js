// utils/emailService.js
const nodemailer = require('nodemailer');
const User = require('../models/User');

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP for password reset is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  // Store OTP and expiration time in the database
  const user = await User.findOne({ email });
  if (user) {
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 2 * 60 * 1000); // OTP expires in 2 minutes
    await user.save();
  }
};

module.exports = { generateOTP, sendOTP };
