import React from 'react';
import './Dashboard.css'; // Create this file for styling

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="welcome-box">
        <div className="avatar">SG</div>
        <p>Welcome back, SANJAY G</p>
      </div>
      <div className="dashboard-options">
        <div className="option">
          <h2>Faculty Dashboard</h2>
          <a href="https://bip.bitsathy.ac.in/dashboard">Login: Faculty dashboard</a>
          <p>to view your individual performance.</p>
        </div>
        <div className="option">
          <h2>For Any Support</h2>
          <a href="https://supportdesk.bitsathy.ac.in">Login: supportdesk.bitsathy.ac.in</a>
          <p>(Academic/Non-Academic/Personal)</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
