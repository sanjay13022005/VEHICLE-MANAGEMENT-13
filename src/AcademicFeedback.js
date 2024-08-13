import React, { useState } from 'react';
import './AcademicFeedback.css';

const AcademicFeedback = ({ onApplyVehicle }) => {
  const [formData, setFormData] = useState({
    cartypes: '',
    purpose: '',
    membercount: '',
    provisionalDocument: null,
    facultyGuide: '',
    fromDate: '',
    returnDate: '',
    cityName: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const validateForm = () => {
    const newErrors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value && key !== 'provisionalDocument') {
        newErrors[key] = 'This field is required';
      }
    }
    if (!formData.provisionalDocument) {
      newErrors.provisionalDocument = 'Document is required';
    }
    // Check city name validity if needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onApplyVehicle({
        fromDate: formData.fromDate,
        returnDate: formData.returnDate,
      });
    }
  };

  const handleCreateAndAddAnother = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onApplyVehicle({
        fromDate: formData.fromDate,
        returnDate: formData.returnDate,
      });
      setFormData({
        cartypes: '',
        purpose: '',
        membercount: '',
        provisionalDocument: null,
        facultyGuide: '',
        fromDate: '',
        returnDate: '',
        cityName: '',
      });
      setErrors({});
    }
  };

  return (
    <div className="academic-feedback">
      <h2>STAFF VEHICLE BOOKING</h2><br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Faculty Name:</label>
          <select
            name="facultyGuide"
            value={formData.facultyGuide}
            onChange={handleChange}
          >
            <option value="">Choose an option</option>
            {/* Add options here */}
          </select>
          {errors.facultyGuide && <p className="error">{errors.facultyGuide}</p>}
        </div>
        <div className="form-group">
          <label>Purpose:</label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
          />
          {errors.purpose && <p className="error">{errors.purpose}</p>}
        </div>
        <div className="form-group">
          <label>City Name :</label>
          <input
            type="text"
            name="cityName"
            value={formData.cityName}
            onChange={handleChange}
          />
          <h3 className="info">Note: Please enter a city within 60 km radius.</h3>
          {errors.cityName && <p className="error">{errors.cityName}</p>}
        </div>
        <div className="form-group">
          <label>Type of Car/Bus:</label>
          <select
            name="cartypes"
            value={formData.cartypes}
            onChange={handleChange}
          >
            <option value="">Choose an option</option>
            <option value="Alto">Alto</option>
            <option value="Swift">Swift</option>
            <option value="Bolero">Bolero</option>
            <option value="SUV">SUV</option>
            <option value="Creta">Creta</option>
          </select>
          {errors.cartypes && <p className="error">{errors.cartypes}</p>}
        </div>
        <div className="form-group">
          <label>Member Count:</label>
          <input
            type="number"
            name="membercount"
            value={formData.membercount}
            onChange={handleChange}
          />
          {errors.membercount && <p className="error">{errors.membercount}</p>}
        </div>
        <div className="form-group">
          <label>From Date:</label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
          />
          {errors.fromDate && <p className="error">{errors.fromDate}</p>}
        </div>
        <div className="form-group">
          <label>Return Date:</label>
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
          />
          {errors.returnDate && <p className="error">{errors.returnDate}</p>}
        </div>

        <div className="form-group declaration-group">
          <input type="checkbox" name="acknowledge" required />
          <label>
            I declare that the above mentioned details are correct to my knowledge and no changes in the above details will be requested at any time.
          </label>
        </div>
        <div className="form-buttons">
          <button type="button" onClick={() => console.log('Cancel')}>
            Cancel
          </button>
          <button type="submit">Apply Vehicle</button>
          <button type="button" onClick={handleCreateAndAddAnother}>
            Create & Add Another
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcademicFeedback;
