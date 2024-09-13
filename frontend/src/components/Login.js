import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IMG7 from '../assets/IMG8.png';
import IMG8 from '../assets/IMG7.png'; 
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Auto-fill email if available in localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7009/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Username: email, Password: password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);

        // Save email to localStorage if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('email');
        }

        navigate('/detail-page'); // Redirect to detail page
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <img src={IMG7} alt="Background" className="background-img" />
      <img src={IMG8} alt="Overlay" className="overlay-img" />

      <p className="welcome-text1">Welcome Back!</p>
      <p className="welcome-text2">Log in To Unlock Your Ride And</p> 
      <p className="welcome-text3">Hit The Road!</p> 

      <div className="login-content-adjusted">
        <h2 className="login-heading">Login</h2>
        <p className="welcome-text">Welcome back! Please log in to your account.</p>
        <div className="login-form-container">
          <form onSubmit={handleLogin}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="remember-forgot-container">
              <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" className="login-button">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
          <p className="end-text">
            New User? <a href="/signin">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
