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
    from: `"CCTV SHOPPEE" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Password Reset OTP - CCTV SHOPPEE`,
    text: `Your OTP for password reset is: ${otp}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #2874f0 0%, #1c54b2 100%); color: white; padding: 40px 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px; letter-spacing: 1px; text-transform: uppercase;">CCTV SHOPPEE</h1>
          <p style="margin-top: 10px; opacity: 0.9; font-size: 16px;">Secure Password Reset</p>
        </div>
        <div style="padding: 40px; line-height: 1.8; color: #444; background-color: #ffffff;">
          <p style="font-size: 18px; margin-bottom: 20px;">Hello,</p>
          <p style="font-size: 16px;">We received a request to reset your password for your <strong>CCTV SHOPPEE</strong> account. Use the verification code below to proceed:</p>
          
          <div style="background-color: #f0f7ff; border: 2px dashed #2874f0; border-radius: 8px; padding: 25px; text-align: center; margin: 30px 0;">
            <span style="font-size: 42px; font-weight: 800; letter-spacing: 8px; color: #2874f0; display: block;">${otp}</span>
            <span style="font-size: 14px; color: #666; display: block; margin-top: 10px;">Verification Code</span>
          </div>
          
          <p style="font-size: 14px; color: #666; background-color: #fff9e6; padding: 10px; border-left: 4px solid #ffc107; border-radius: 4px;">
            <strong>Important:</strong> This code is valid for 10 minutes. For your security, please do not share this OTP with anyone.
          </p>
          
          <p style="font-size: 16px; margin-top: 30px;">If you didn't request this change, you can safely ignore this email. Your password will remain unchanged.</p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="margin: 0; font-size: 16px; font-weight: 600;">Best Regards,</p>
            <p style="margin: 5px 0 0; color: #2874f0; font-weight: 700; font-size: 18px;">Team CCTV SHOPPEE</p>
          </div>
        </div>
        <div style="background-color: #f8f9fa; padding: 25px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} CCTV SHOPPEE. All rights reserved.</p>
          <p style="margin: 5px 0 0;">This is an automated message, please do not reply to this email.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP Email sent successfully to ' + email);

    // Store OTP and expiration time in the database after successful send
    const user = await User.findOne({ email });
    if (user) {
      user.otp = otp;
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
      await user.save();
    }
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};

module.exports = { generateOTP, sendOTP };
