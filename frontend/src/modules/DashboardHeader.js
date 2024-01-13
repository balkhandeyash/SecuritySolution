// DashboardHeader.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu4Line, RiNotification2Line } from "react-icons/ri";
import "../css/DashboardHeader.css"; // Import your stylesheet for styling if needed

const DashboardHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]); // Assuming you have a notification state

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-left">
        <div className="dashboard-logo-container">
          <img src="logo192.png" alt="Your Logo" className="dashboard-logo" />
          <span>Security Solution</span>
        </div>
      </div>
      <div className="dashboard-left">
        <div className="notification-icon">
          <RiNotification2Line size={24} />
          {notifications.length > 0 && (
            <div className="notification-badge">{notifications.length}</div>
          )}
        </div>
        <div className="dropdown" onClick={handleDropdownToggle}>
          <RiMenu4Line size={24} />
          {isDropdownOpen && (
            <div className="dropdown-content">
              {/* Dropdown menu content goes here */}
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/myappliedjobs">My Applied Jobs</Link>
              <Link to="/">Logout</Link>
              {/* Add more menu items as needed */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
