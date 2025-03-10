import React from 'react';
import './LoginModal.css';

function LoginModal({ onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    onClose();
  };

  return (
    <div className="login-modal" id="loginModal">
      <div className="login-content">
        <h2>Login to STOCKIFY</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
          <p>Not a member? <a href="#" style={{ color: 'var(--primary)' }}>Sign Up</a></p>
        </form>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

export default LoginModal;