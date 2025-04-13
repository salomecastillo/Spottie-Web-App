// src/pages/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import login from '../assets/images/login.png';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
      navigate('/scan');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="logo">Spottie</div>
        <h2>Login</h2>
        <p>Login to access your Spottie account</p>
        <form onSubmit={handleLogin} className="login-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="example.email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <div className="password-input">
            <input
              type="password"
              placeholder="••••••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="eye-icon">👁️</span>
          </div>
          <div className="form-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password
            </Link>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
        <div className="divider">Or login with</div>
        <div className="social-login">
          <button className="social-btn facebook">f</button>
          <button className="social-btn google">G</button>
          <button className="social-btn apple"></button>
        </div>
      </div>
      <div className="login-right">
      <img src={login} alt="Login" className="login-img" />
      </div>
    </div>
  );
};

export default Login;
