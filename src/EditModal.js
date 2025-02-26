import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './EditModal.css';
import axios from 'axios';

const EditModal = ({ isOpen, onRequestClose, driver, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    licenseNo: '',
    driverNo: '',
    carName: '',
    carNo: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (driver) {
      setFormData({
        id: driver.id,
        name: driver.fname,
        licenseNo: driver.licenseNo || '',
        driverNo: driver.driverNo || '',
        carName: driver.carName || '',
        carNo: driver.carNo || ''
      });
    }
  }, [driver]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`http://localhost:4000/api/remarks/${formData.id}`, {
        name: formData.name,
        license: formData.licenseNo,
        contact: formData.driverNo,
        carName: formData.carName,
        carNo: formData.carNo
      });

      // Save data to local storage
      localStorage.setItem(`driver_${formData.id}`, JSON.stringify(response.data));

      // Call the onSave function to update parent component and close modal
      onSave(response.data);
      onRequestClose();
    } catch (error) {
      console.error('Error saving driver details:', error);
      setError('There was an error saving the driver details. Please try again.');
    } finally {
      setLoading(false);
    }
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
        <h2>Edit Driver Information</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Driver Name:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label>License No:</label>
            <input 
              type="text" 
              name="licenseNo" 
              value={formData.licenseNo} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Driver No:</label>
            <input 
              type="text" 
              name="driverNo" 
              value={formData.driverNo} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Car Name:</label>
            <input 
              type="text" 
              name="carName" 
              value={formData.carName} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Car No:</label>
            <input 
              type="text" 
              name="carNo" 
              value={formData.carNo} 
              onChange={handleChange} 
            />
          </div>
          <div className="button-group">
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={onRequestClose}>Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
