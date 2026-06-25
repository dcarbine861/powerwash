// src/components/Footer.js

import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h3>💧 ProWash</h3>
          <p>Professional power washing for a spotless home.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>📞 (555) 123-4567</p>
          <p>✉️ hello@prowash.com</p>
        </div>
        <div>
          <h4>Hours</h4>
          <p>Mon–Fri: 7am – 7pm</p>
          <p>Sat–Sun: 8am – 5pm</p>
        </div>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} ProWash. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
