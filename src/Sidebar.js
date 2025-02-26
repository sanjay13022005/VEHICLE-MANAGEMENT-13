import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Ensure you have this file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar } from '@fortawesome/free-solid-svg-icons'; // Import icons from FontAwesome library

const Sidebar = () => {
  const [isVehicleSubmenuOpen, setIsVehicleSubmenuOpen] = useState(false);

  const toggleVehicleSubmenu = () => {
    setIsVehicleSubmenuOpen(!isVehicleSubmenuOpen);
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faHome} /> Main
          </Link>
        </li>
        <li>
          <span className="sidebar-submenu" onClick={toggleVehicleSubmenu}>
            <FontAwesomeIcon icon={faCar} /> Vehicle
          </span>
          {isVehicleSubmenuOpen && (
            <ul className="submenu">
              <li><Link to="/AcademicFeedback">Vehicle Booking</Link></li>
              <li><Link to="/Table">Booking Status</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
