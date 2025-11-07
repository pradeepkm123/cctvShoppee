const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateOTP, sendOTP } = require('../utils/emailService');

// exports.register = async (req, res) => {
//   try {
//     const { name, mobileNo, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, mobileNo, email, password: hashedPassword });
//     await user.save();
//     res.status(201).send('User registered');
//   } catch (error) {
//     res.status(500).send('Error registering user');
//   }
// };
exports.register = async (req, res) => {
  try {
    const { name, email, mobileNo, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, mobileNo, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// exports.login = async (req, res) => {
//   try {
//     const { mobileNo, password } = req.body;
//     const user = await User.findOne({ mobileNo });
//     if (!user) return res.status(404).send('User not found');

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).send('Invalid credentials');

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).send('Error logging in');
//   }
// };





exports.login = async (req, res) => {
  try {
    const { mobileNo, password } = req.body;
    const user = await User.findOne({ mobileNo });
    if (!user) {
      return res.status(400).json({ message: 'Invalid mobile number or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid mobile number or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 3600000); // 1 hour from now
    await user.save();

    sendOTP(email, otp);
    res.status(200).send('OTP sent to your email');
  } catch (error) {
    res.status(500).send('Error sending OTP');
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).send('User not found');
    if (user.otp !== otp) return res.status(400).send('Invalid OTP');
    if (user.otpExpires < new Date()) return res.status(400).send('OTP has expired');

    res.status(200).send('OTP verified successfully');
  } catch (error) {
    res.status(500).send('Error verifying OTP');
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send('Password reset successful');
  } catch (error) {
    res.status(500).send('Error resetting password');
  }
};
