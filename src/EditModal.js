// src/EditModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './EditModal.css';

const EditModal = ({ isOpen, onRequestClose, driver, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    licenseNo: '',
    driverNo: '',
    carName: '',
    carNo: ''
  });

  useEffect(() => {
    if (driver) {
      setFormData(driver);
    }
  }, [driver]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onRequestClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      ariaHideApp={false}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2> Driver Information</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label> Driver Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label> Driver License No:</label>
            <input type="text" name="licenseNo" value={formData.licenseNo} onChange={handleChange} />
          </div>
          <div>
            <label>Driver Contact No:</label>
            <input type="text" name="driverNo" value={formData.driverNo} onChange={handleChange} />
          </div>
          <div>
            <label>Car Name:</label>
            <input type="text" name="carName" value={formData.carName} onChange={handleChange} />
          </div>
          <div>
            <label>Car No:</label>
            <input type="text" name="carNo" value={formData.carNo} onChange={handleChange} />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={onRequestClose}>Cancel</button>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
