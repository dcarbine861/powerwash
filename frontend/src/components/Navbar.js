// src/components/Navbar.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo-icon">💧</span>
        <Link to="/" className="brand-name" onClick={closeMenu}>ProWash</Link>
      </div>

      {/* Hamburger button — visible on mobile only */}
      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Nav links — toggled on mobile via .open class */}
      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <a href="/#services" onClick={closeMenu}>Services</a>
        <a href="/#reviews" onClick={closeMenu}>Reviews</a>
        <Link to="/book" className="nav-book-btn" onClick={closeMenu}>Book Now</Link>

        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="nav-login-link" onClick={closeMenu}>My Bookings</Link>
            <span className="nav-username">Hi, {user.name.split(" ")[0]}</span>
            <button className="nav-logout-btn" onClick={handleLogout}>Sign out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-login-link" onClick={closeMenu}>Sign in</Link>
            <Link to="/register" className="nav-register-btn" onClick={closeMenu}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
