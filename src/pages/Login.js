import React from 'react';
import './Login.css';

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login to STOCKIFY</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          
          <button type="submit" className="cta-button">Login</button>
          
          <p className="signup-link">
            Not a member? <a href="#">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;