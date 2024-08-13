import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Ensure you have this file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar } from '@fortawesome/free-solid-svg-icons'; // Import icons from FontAwesome library

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faHome} /> Main
          </Link>
        </li>
        <li>
          <span className="sidebar-submenu">
            <FontAwesomeIcon icon={faCar} />  Vehicle
          </span>
          <ul className="submenu">
            <li><Link to="/AcademicFeedback">Vehicle Booking</Link></li>
            <li><Link to="/Table">Booking Status</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
