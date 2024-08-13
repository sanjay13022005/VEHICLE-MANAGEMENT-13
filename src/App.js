import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import Header from './Header';
import './App.css';
import AcademicFeedback from './AcademicFeedback';
import Table from './Table';


function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/AcademicFeedback" element={<AcademicFeedback />} />
              <Route path="/Table" element={<Table />} />
            
              {/* Add more routes as needed */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
