import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ====== CONFIG ======
const API_BASE = 'http://localhost:5000/api';
axios.defaults.baseURL = API_BASE;
// If your backend uses httpOnly cookies for auth, uncomment next line and enable credentials in server CORS
// axios.defaults.withCredentials = true;

function Login() {
  const [formData, setFormData] = useState({
    mobileNo: '',
    password: '',
    email: '',
    otp: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120);
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  // Validators
  const validateMobileNo = (mobileNo) => /^[0-9]{10}$/.test(mobileNo);

  // Keep yours if you want a strict policy; otherwise soften a bit:
  // require ≥8, one number, one special char
  const validatePassword = (password) =>
    /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validateMobileNo(formData.mobileNo)) {
      newErrors.mobileNo = 'Please enter a valid 10-digit mobile number.';
    }
    if (!validatePassword(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters and include a number & special character.';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error('Please correct the errors in the form.');
      return;
    }

    try {
      setSubmitting(true);
      const { data } = await axios.post('/auth/login', {
        mobileNo: formData.mobileNo,
        password: formData.password,
      });

      // Support common shapes:
      const token = data?.token || data?.accessToken || null;

      if (token) {
        localStorage.setItem('token', token);
      }

      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        'Error logging in. Please try again later.';
      toast.error(String(msg));
      console.error('Login error:', error?.response || error);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((s) => !s);
  const toggleNewPasswordVisibility = () => setShowNewPassword((s) => !s);
  const toggleConfirmNewPasswordVisibility = () => setShowConfirmNewPassword((s) => !s);

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setShowOTP(false);
    setShowResetPassword(false);
  };

  const handleGetOTP = async () => {
    if (!formData.email) {
      toast.error('Please enter your email.');
      return;
    }
    try {
      await axios.post('/auth/forgot-password', { email: formData.email });
      toast.success('OTP sent to your email!');
      setShowOTP(true);
      setOtpTimer(120);
      setIsOtpValid(true);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        'Error sending OTP. Please try again later.';
      toast.error(String(msg));
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp) {
      toast.error('Please enter the OTP.');
      return;
    }
    if (!isOtpValid) {
      toast.error('OTP has expired. Please request a new OTP.');
      return;
    }
    try {
      await axios.post('/auth/verify-otp', {
        email: formData.email,
        otp: formData.otp,
      });
      toast.success('OTP verified!');
      setShowResetPassword(true);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        'Error verifying OTP. Please try again later.';
      toast.error(String(msg));
    }
  };

  const handleResendOTP = async () => {
    try {
      await axios.post('/auth/forgot-password', { email: formData.email });
      toast.success('New OTP sent to your email!');
      setOtpTimer(120);
      setIsOtpValid(true);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        'Error resending OTP. Please try again later.';
      toast.error(String(msg));
    }
  };

  const handleResetPassword = async () => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (!validatePassword(formData.newPassword)) {
      toast.error(
        'Password must be at least 8 characters and include a number & special character.'
      );
      return;
    }
    try {
      await axios.post('/auth/reset-password', {
        email: formData.email,
        newPassword: formData.newPassword,
      });
      toast.success('Password reset successful!');
      setShowForgotPassword(false);
      // Optional: clear password fields
      setFormData((p) => ({ ...p, password: '', newPassword: '', confirmNewPassword: '' }));
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        'Error resetting password. Please try again later.';
      toast.error(String(msg));
    }
  };

  useEffect(() => {
    if (!showOTP) return;
    if (otpTimer <= 0) {
      setIsOtpValid(false);
      return;
    }
    const t = setTimeout(() => setOtpTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [otpTimer, showOTP]);

  return (
    <div className="container pt-200" style={{ maxWidth: '1140px' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="tp-login-wrapper">
            {!showForgotPassword ? (
              <>
                <div className="tp-login-top text-center mb-30">
                  <h3 className="tp-login-title">Login</h3>
                  <p>
                    Don’t have an account?{' '}
                    <span><Link to="/register">Register here!</Link></span>
                  </p>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="mobileNo" className="form-label">Mobile No</label>
                    <input
                      type="text"
                      className={`form-control ${errors.mobileNo ? 'is-invalid' : ''}`}
                      id="mobileNo"
                      value={formData.mobileNo}
                      onChange={handleChange}
                      required
                    />
                    {errors.mobileNo && <div className="invalid-feedback">{errors.mobileNo}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group has-validation">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                      {errors.password && (
                        <div className="invalid-feedback d-block">{errors.password}</div>
                      )}
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mb-3">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={handleForgotPassword}
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={submitting}
                  >
                    {submitting ? 'Logging in...' : 'Login'}
                  </button>
                </form>
              </>
            ) : !showOTP ? (
              <>
                <div className="tp-login-top text-center mb-30">
                  <h3 className="tp-login-title">Forgot Password</h3>
                  <p>Enter your email to receive an OTP</p>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="button" className="btn btn-primary w-100" onClick={handleGetOTP}>
                    Get OTP
                  </button>
                </form>
              </>
            ) : !showResetPassword ? (
              <>
                <div className="tp-login-top text-center mb-30">
                  <h3 className="tp-login-title">Verify OTP</h3>
                  <p>Enter the OTP sent to your email</p>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label">OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      id="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <button
                      type="button"
                      className="btn btn-link"
                      disabled={isOtpValid}
                      onClick={handleResendOTP}
                    >
                      Resend OTP
                    </button>
                    <span>OTP valid for: {otpTimer}s</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handleVerifyOTP}
                  >
                    Verify OTP
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="tp-login-top text-center mb-30">
                  <h3 className="tp-login-title">Reset Password</h3>
                  <p>Enter your new password</p>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <div className="input-group">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        className="form-control"
                        id="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={toggleNewPasswordVisibility}
                      >
                        {showNewPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                    <div className="input-group">
                      <input
                        type={showConfirmNewPassword ? 'text' : 'password'}
                        className="form-control"
                        id="confirmNewPassword"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={toggleConfirmNewPasswordVisibility}
                      >
                        {showConfirmNewPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
