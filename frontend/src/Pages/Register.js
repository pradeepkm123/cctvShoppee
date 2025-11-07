// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return re.test(password);
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long and include a special character.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('https://cctvshoppee.onrender.com/api/auth/register', {
          name: formData.name,
          mobileNo: formData.mobileNo,
          email: formData.email,
          password: formData.password,
        });

        if (response.data === 'User registered') {
          toast.success('Registration successful!');
         //  navigate('/login');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data);
        } else {
          toast.error('Error registering user. Please try again later.');
        }
      }
    } else {
      toast.error('Please correct the errors in the form.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container pt-200">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="tp-login-wrapper">
            <div className="tp-login-top text-center mb-30">
              <h3 className="tp-login-title">Register</h3>
              <p>Already have an account? <span><Link to="/login">Login</Link></span></p>
            </div>
            <div className="tp-login-option">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 tp-login-input-wrapper">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobileNo" className="form-label">Mobile No</label>
                  <input type="text" className="form-control" id="mobileNo" value={formData.mobileNo} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" value={formData.email} onChange={handleChange} required />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <input type={showPassword ? "text" : "password"} className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" value={formData.password} onChange={handleChange} required />
                    <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <div className="input-group">
                    <input type={showConfirmPassword ? "text" : "password"} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    <button type="button" className="btn btn-outline-secondary" onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                  </div>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required />
                  <label className="form-check-label" htmlFor="agreeTerms">I agree to the Terms and Conditions</label>
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
