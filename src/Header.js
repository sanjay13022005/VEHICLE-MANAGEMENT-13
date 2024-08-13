import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      // Redirect to sign-up page
      window.location.href = 'http://localhost:3001/';
    }
  };

  const toggleNotificationPopup = () => {
    setShowNotificationPopup(!showNotificationPopup);
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>BIT INFORMATION PORTAL</h1>
        <div className="search-bar">
          <input type="text" placeholder="Press / to search" />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="header-right">
        <div className="notification-icon" onClick={toggleNotificationPopup}>
          <FontAwesomeIcon icon={faBell} />
          {showNotificationPopup && (
            <div className="notification-popup">
              <p>No new notifications</p>
            </div>
          )}
        </div>
        <div className="user-info">
          <span className="username">SANJAY G</span>
          <button className="logout-button" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
