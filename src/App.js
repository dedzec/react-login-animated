/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import bg from './bg.jpg';
import './App.css';

function App() {
  return (
    <div
      className="section-login"
      style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat' }}
    >
      <div className="login-box">
        <form action="">
          <p className="title">Login</p>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="mail" />
            </span>
            <input type="email" required />
            <label>Email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="lock-closed" />
            </span>
            <input type="password" required />
            <label>Password</label>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              Don't have an account? <a href="#">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
