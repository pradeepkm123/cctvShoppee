import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpteamistLogin = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [formData, setFormData] = useState({
    username: 'demo.user',
    password: 'demo123',
    email: 'demo.user@upteamist.com',
    confirmPassword: 'demo123',
    rememberPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError('');
  };

  const handleSignIn = async () => {
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (formData.username === 'demo.user' && formData.password === 'demo123') {
        console.log('Login successful!', formData);
        localStorage.setItem('adminToken', 'demo-admin-token');
        localStorage.setItem('user', JSON.stringify({
          username: formData.username,
          email: formData.email,
        }));
        navigate('/admin/homedash');
      } else {
        setError('Invalid username or password. Use demo.user / demo123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Registration successful!', formData);
      localStorage.setItem('adminToken', 'demo-admin-token');
      localStorage.setItem('user', JSON.stringify({
        username: formData.username,
        email: formData.email,
      }));
      navigate('/admin/homedash');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const resetToDemo = () => {
    setFormData((prev) => ({
      ...prev,
      username: 'demo.user',
      password: 'demo123',
      email: 'demo.user@upteamist.com',
      confirmPassword: 'demo123',
    }));
    setError('');
  };

  const slides = [
    {
      title: "Welcome!",
      description: "Get a real intranet on top of your Office 365 environment, with Upteamist.",
      illustration: (
        <svg style={styles.illustration} viewBox="0 0 400 400" fill="none">
          <ellipse cx="150" cy="180" rx="80" ry="30" fill="rgba(255,255,255,0.15)" />
          <ellipse cx="280" cy="150" rx="60" ry="25" fill="rgba(255,255,255,0.1)" />
          <circle cx="320" cy="200" r="40" fill="rgba(255,255,255,0.08)" />
          <rect x="150" y="150" width="100" height="140" rx="8" fill="#2563eb" stroke="#1e40af" strokeWidth="3" />
          <rect x="160" y="160" width="80" height="120" rx="4" fill="white" />
          <rect x="185" y="145" width="30" height="15" rx="3" fill="#60a5fa" />
          <path d="M 175 180 L 180 185 L 190 175" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
          <line x1="200" y1="180" x2="225" y2="180" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          <path d="M 175 205 L 180 210 L 190 200" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
          <line x1="200" y1="205" x2="225" y2="205" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          <path d="M 175 225 L 185 235 M 185 225 L 175 235" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          <line x1="200" y1="230" x2="225" y2="230" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          <path d="M 175 250 L 180 255 L 190 245" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
          <line x1="200" y1="250" x2="225" y2="250" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          <g transform="translate(120, 280) rotate(-45)">
            <rect x="0" y="0" width="15" height="60" rx="2" fill="#60a5fa" />
            <polygon points="7.5,60 0,75 15,75" fill="#1e40af" />
            <rect x="3" y="5" width="9" height="8" fill="#93c5fd" />
          </g>
          <circle cx="100" cy="120" r="4" fill="rgba(255,255,255,0.4)" />
          <circle cx="320" cy="280" r="3" fill="rgba(255,255,255,0.3)" />
          <text x="130" y="100" fill="rgba(255,255,255,0.3)" fontSize="20">+</text>
          <circle cx="300" cy="100" r="6" fill="rgba(255,255,255,0.2)" />
        </svg>
      ),
    },
    {
      title: "Collaborate Seamlessly",
      description: "Work together with your team in real-time. Share files, communicate, and boost productivity.",
      illustration: (
        <svg style={styles.illustration} viewBox="0 0 400 400" fill="none">
          <circle cx="280" cy="140" r="50" fill="rgba(255,255,255,0.1)" />
          <circle cx="120" cy="180" r="35" fill="rgba(255,255,255,0.08)" />
          <ellipse cx="200" cy="280" rx="70" ry="25" fill="rgba(255,255,255,0.12)" />
          <circle cx="200" cy="180" r="60" fill="white" opacity="0.95" />
          <circle cx="200" cy="165" r="25" fill="#3b82f6" />
          <path d="M 200 190 Q 180 200 170 220 L 230 220 Q 220 200 200 190" fill="#3b82f6" />
          <circle cx="140" cy="220" r="45" fill="white" opacity="0.9" />
          <circle cx="140" cy="210" r="18" fill="#60a5fa" />
          <path d="M 140 228 Q 125 235 118 250 L 162 250 Q 155 235 140 228" fill="#60a5fa" />
          <circle cx="260" cy="220" r="45" fill="white" opacity="0.9" />
          <circle cx="260" cy="210" r="18" fill="#60a5fa" />
          <path d="M 260 228 Q 245 235 238 250 L 282 250 Q 275 235 260 228" fill="#60a5fa" />
          <line x1="180" y1="195" x2="155" y2="210" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
          <line x1="220" y1="195" x2="245" y2="210" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="100" r="5" fill="rgba(255,255,255,0.4)" />
          <circle cx="310" cy="290" r="4" fill="rgba(255,255,255,0.3)" />
          <text x="90" y="320" fill="rgba(255,255,255,0.3)" fontSize="24">+</text>
        </svg>
      ),
    },
    {
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee. Your data is always safe with us.",
      illustration: (
        <svg style={styles.illustration} viewBox="0 0 400 400" fill="none">
          <circle cx="150" cy="150" r="45" fill="rgba(255,255,255,0.1)" />
          <circle cx="290" cy="200" r="55" fill="rgba(255,255,255,0.08)" />
          <ellipse cx="200" cy="300" rx="80" ry="30" fill="rgba(255,255,255,0.12)" />
          <path d="M 200 120 L 160 140 L 160 200 Q 160 260 200 280 Q 240 260 240 200 L 240 140 Z" fill="white" opacity="0.95" />
          <path d="M 200 130 L 170 145 L 170 200 Q 170 250 200 265 Q 230 250 230 200 L 230 145 Z" fill="#3b82f6" />
          <circle cx="200" cy="185" r="18" fill="white" />
          <rect x="197" y="195" width="6" height="25" rx="3" fill="white" />
          <path d="M 185 215 L 200 230 L 225 205" stroke="#22c55e" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="140" cy="180" r="8" fill="rgba(255,255,255,0.3)" />
          <circle cx="260" cy="180" r="8" fill="rgba(255,255,255,0.3)" />
          <circle cx="200" cy="100" r="6" fill="rgba(255,255,255,0.4)" />
          <circle cx="120" cy="260" r="10" fill="rgba(255,255,255,0.25)" />
          <circle cx="280" cy="270" r="12" fill="rgba(255,255,255,0.2)" />
          <text x="310" y="140" fill="rgba(255,255,255,0.3)" fontSize="28">★</text>
          <text x="80" y="120" fill="rgba(255,255,255,0.3)" fontSize="22">★</text>
        </svg>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      {/* Left Side - Blue Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.illustrationContainer}>
          {slides[activeSlide].illustration}
        </div>
        <div style={styles.welcomeSection}>
          <h1 style={styles.welcomeTitle}>{slides[activeSlide].title}</h1>
          <p style={styles.welcomeText}>{slides[activeSlide].description}</p>
        </div>
        <div style={styles.pagination}>
          {slides.map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.paginationDot,
                ...(activeSlide === index ? styles.paginationDotActive : {}),
              }}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Form Panel */}
      <div style={styles.rightPanel}>
        <div style={styles.formContainer}>
          {/* Login Form */}
          <div
            style={{
              ...styles.formSlide,
              transform: isRegister ? 'translateX(-100%)' : 'translateX(0)',
              opacity: isRegister ? 0 : 1,
              pointerEvents: isRegister ? 'none' : 'auto',
            }}
          >
            <h2 style={styles.formTitle}>Log In</h2>
            <div style={styles.createAccountSection}>
              <span style={styles.createAccountText}>Don't have an account?</span>
              <button style={styles.createAccountLink} onClick={() => setIsRegister(true)}>
                Create an account
              </button>
            </div>
            <p style={styles.subtitle}>It will take less than a minute.</p>
            <div style={styles.formFields}>
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  style={styles.input}
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <svg style={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div style={styles.inputGroup}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  style={styles.input}
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <svg style={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div style={styles.optionsRow}>
                <button
                  onClick={handleSignIn}
                  style={{
                    ...styles.signInButton,
                    ...(isLoading ? styles.loadingButton : {}),
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? <div style={styles.loadingSpinner}></div> : 'Sign in'}
                </button>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="rememberPassword"
                    style={styles.checkbox}
                    checked={formData.rememberPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <span style={styles.checkboxText}>Remember password</span>
                </label>
              </div>
              <button style={styles.forgotPassword} disabled={isLoading}>
                Forget your password?
              </button>
            </div>
          </div>

          {/* Register Form */}
          <div
            style={{
              ...styles.formSlide,
              transform: isRegister ? 'translateX(-100%)' : 'translateX(0)',
              opacity: isRegister ? 1 : 0,
              pointerEvents: isRegister ? 'auto' : 'none',
            }}
          >
            <h2 style={styles.formTitle}>Create Account</h2>
            <div style={styles.createAccountSection}>
              <span style={styles.createAccountText}>Already have an account?</span>
              <button style={styles.createAccountLink} onClick={() => setIsRegister(false)} disabled={isLoading}>
                Log in
              </button>
            </div>
            <p style={styles.subtitle}>Join us today! It's quick and easy.</p>
            <div style={styles.formFields}>
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  style={styles.input}
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <svg style={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div style={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  style={styles.input}
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <svg style={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div style={styles.inputGroup}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  style={styles.input}
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <svg style={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div style={styles.inputGroup}>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  style={styles.input}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <svg style={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <button
                onClick={handleRegister}
                style={{
                  ...styles.signInButton,
                  width: '100%',
                  marginTop: '20px',
                  ...(isLoading ? styles.loadingButton : {}),
                }}
                disabled={isLoading}
              >
                {isLoading ? <div style={styles.loadingSpinner}></div> : 'Create Account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f0f2f5',
  },
  leftPanel: {
    flex: '1',
    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
    padding: '60px',
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
  },
  logoContainer: {
    marginBottom: '40px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    width: '45px',
    height: '45px',
    background: 'white',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: '700',
    color: '#2563eb',
  },
  logoText: {
    fontSize: '28px',
    fontWeight: '600',
  },
  illustrationContainer: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '40px',
    transition: 'all 0.5s ease',
  },
  illustration: {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
  },
  welcomeSection: {
    marginBottom: '40px',
    transition: 'all 0.5s ease',
  },
  welcomeTitle: {
    fontSize: '48px',
    fontWeight: '700',
    margin: '0 0 20px 0',
    color: '#fff',
  },
  welcomeText: {
    fontSize: '18px',
    lineHeight: '1.6',
    opacity: '0.95',
    margin: '0',
    color: '#fff',
  },
  pagination: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  paginationDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: '2px solid white',
    opacity: '0.5',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  paginationDotActive: {
    background: 'white',
    opacity: '1',
  },
  rightPanel: {
    flex: '1',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px',
    position: 'relative',
    overflow: 'hidden',
  },
  formContainer: {
    width: '100%',
    maxWidth: '480px',
    position: 'relative',
    minHeight: '500px',
  },
  demoBanner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f0f9ff',
    border: '1px solid #bae6fd',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '20px',
  },
  demoText: {
    fontSize: '14px',
    color: '#0369a1',
    fontWeight: '500',
  },
  resetButton: {
    background: '#0ea5e9',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  errorBanner: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '20px',
  },
  errorText: {
    fontSize: '14px',
    color: '#dc2626',
    fontWeight: '500',
  },
  formSlide: {
    width: '100%',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'absolute',
    top: '0',
    left: '0',
  },
  formTitle: {
    fontSize: '48px',
    fontWeight: '600',
    color: '#3b82f6',
    margin: '0 0 20px 0',
    letterSpacing: '-0.5px',
  },
  createAccountSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px',
    flexWrap: 'wrap',
  },
  createAccountText: {
    fontSize: '15px',
    color: '#9ca3af',
  },
  createAccountLink: {
    fontSize: '15px',
    color: '#3b82f6',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    fontWeight: '500',
    textDecoration: 'none',
  },
  subtitle: {
    fontSize: '14px',
    color: '#9ca3af',
    margin: '0 0 40px 0',
  },
  formFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  inputGroup: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '16px 50px 16px 16px',
    fontSize: '16px',
    border: 'none',
    borderBottom: '2px solid #e5e7eb',
    outline: 'none',
    transition: 'all 0.3s ease',
    background: 'transparent',
    color: '#374151',
    boxSizing: 'border-box',
  },
  inputIcon: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '22px',
    height: '22px',
    color: '#d1d5db',
    pointerEvents: 'none',
  },
  optionsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginTop: '10px',
  },
  signInButton: {
    padding: '14px 40px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  loadingButton: {
    background: '#9ca3af',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  loadingSpinner: {
    width: '16px',
    height: '16px',
    border: '2px solid transparent',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: '#3b82f6',
  },
  checkboxText: {
    fontSize: '14px',
    color: '#6b7280',
  },
  forgotPassword: {
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    fontSize: '15px',
    cursor: 'pointer',
    padding: '0',
    textAlign: 'left',
    marginTop: '10px',
    fontWeight: '500',
  },
};

// Add CSS for spinner animation
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerStyle);

export default UpteamistLogin;
