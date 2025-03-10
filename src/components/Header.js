import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ onLoginClick }) {
  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="logo">STOCKIFY</Link>
        <ul className="menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#scan">Features</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#features">Pricing</a></li>
          <li><Link to="/contact" id="contactBtn">Contact</Link></li>
          <li><a href="#" id="loginBtn" onClick={(e) => {
            e.preventDefault();
            onLoginClick();
          }}>Login</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;