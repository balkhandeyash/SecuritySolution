import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <img src="logo192.png" alt="Your Logo" />
        <span>Security Solution</span>
      </div>
      <div className="header-links">
        <Link to="/login" className="nav-link">
          Sign In
        </Link>
        <Link to="/register" className="nav-link">
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
