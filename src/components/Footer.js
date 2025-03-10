import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <p>© 2025 STOCKIFY. All rights reserved.</p>
      <div className="social-links">
        <a href="#"><i className='bx bxl-facebook'></i></a>
        <a href="#"><i className='bx bxl-twitter'></i></a>
        <a href="#"><i className='bx bxl-instagram'></i></a>
      </div>
    </footer>
  );
}

export default Footer;