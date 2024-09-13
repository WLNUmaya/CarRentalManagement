import React, { useState } from 'react';
import backgroundImage from '../assets/IMG8.png'; // Adjust the path as needed
import './Signin.css'; // Import the CSS file
import IMG9 from '../assets/IMG9.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const validationResponse = await fetch('https://localhost:7009/api/Auth/validateinputs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: email,
          Password: password,
          ConfirmPassword: confirmPassword,
        }),
      });

      const validationData = await validationResponse.json();
      if (!validationData.isValid) {
        setError(validationData.errorMessage);
        setLoading(false);
        return;
      }

      const registerResponse = await fetch('https://localhost:7009/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, email, password }),
      });

      const registerData = await registerResponse.json();
      if (registerResponse.ok) {
        console.log('Registration successful:', registerData);
      } else {
        setError(registerData.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-form">
        <img src={IMG9} alt="Overlay" className="overlay-img1" />

        <p className="welcome-text01">Create Account</p> {/* Added welcome text */}
        <p className="welcome-text02">Your adventure begins with</p>
        <p className="welcome-text03">a simple sign-up!</p>

        <h2 className="sign-in-title1">Sign In</h2>
        <div className="login-form-container1">

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="show-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="show-password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="sign-in-button"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
      <div className="sign-in-background"></div>
    </div>
  );
}
