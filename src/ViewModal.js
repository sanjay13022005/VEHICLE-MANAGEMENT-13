// src/ViewModal.js
import React from 'react';
import Modal from 'react-modal';
import './ViewModal.css';

const ViewModal = ({ isOpen, onRequestClose, driver }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2>Driver Information</h2>
        {driver ? (
          <ul>
            <li><strong> Driver Name:</strong> {driver.name}</li>
            <li><strong>Driver License No:</strong> {driver.licenseNo}</li>
            <li><strong>Driver Contact No:</strong> {driver.driverNo}</li>
            <li><strong>Car Name:</strong> {driver.carName}</li>
            <li><strong>Car No:</strong> {driver.carNo}</li>
          </ul>
        ) : (
          <p>No driver information available.</p>
        )}
        <button onClick={onRequestClose}>Close</button>
      </div>
    </Modal>
  );
};

export default ViewModal;
