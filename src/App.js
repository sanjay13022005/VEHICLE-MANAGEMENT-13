import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import Header from './Header';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import './App.css';
import AcademicFeedback from './AcademicFeedback';
import Table from './Table';

function App() {
  const [notifications, setNotifications] = useState([]);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [count, setCount] = useState(0)
  const[token, setToken] = useState(null)

  const toggleNotificationPopup = () => {
    setShowNotificationPopup(!showNotificationPopup);
  };

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [...prevNotifications, notification]);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    // setCount(count+1)
    window.location.href = '/login'; // Redirect to login page
  };


  useEffect(()=>{
    const isAuthenticated = !!localStorage.getItem('token');
    if(isAuthenticated){
      setToken(isAuthenticated)
    }else{
      setToken(null)
    console.log("hek");
      
    }
    
  },[count])
  

  return (
    <Router>
      <div className="app">
        {token&&
        <Header
          notifications={notifications}
          toggleNotificationPopup={toggleNotificationPopup}
          showNotificationPopup={showNotificationPopup}
          handleLogout={handleLogout}
          setCount = {setCount}
        />
}
        <div className="main-content">
          {token &&
          <Sidebar />
}
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/AcademicFeedback"
                element={
                  <PrivateRoute>
                    <AcademicFeedback />
                  </PrivateRoute>
                }
              />
              <Route
                path="/Table"
                element={
                  <PrivateRoute>
                    <Table addNotification={addNotification} />
                  </PrivateRoute>
                }
              />
              {/* Add more routes as needed */}
              <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect unknown paths to login */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
