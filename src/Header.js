import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ notifications, toggleNotificationPopup, showNotificationPopup,setCount }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()

  // Handle logout function integrated into the component
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      // Redirect to sign-up page
      localStorage.removeItem("token")
      // setToken(null)
      
      navigate("/login")
    }
    setCount(1)
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>BIT INFORMATION PORTAL</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Press / to search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <p key={index}>{notification}</p>
                ))
              ) : (
                <p>No new notifications</p>
              )}
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
