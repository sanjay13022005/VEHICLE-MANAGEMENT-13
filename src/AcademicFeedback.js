import React, { useState } from 'react';
import './AcademicFeedback.css';
import axios from "axios";
import Sidebar from './Sidebar';

const AcademicFeedback = ({ onApplyVehicle }) => {
  const [formData, setFormData] = useState({
    cartypes: '',
    purpose: '',
    membercount: '',
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await axios.post("http://localhost:4000/api/vehicle/post", {
          fname: formData.facultyGuide,
          purpose: formData.purpose,
          city: formData.cityName,
          Type: formData.cartypes,
          count: formData.membercount,
          fdata: formData.fromDate.toString(),
          rdata: formData.returnDate.toString()
        });

        console.log(result);

        // Display popup message for success
        window.alert('Vehicle successfully booked!');

        // Clear form fields
        setFormData({
          cartypes: '',
          purpose: '',
          membercount: '',
          facultyGuide: '',
          fromDate: '',
          returnDate: '',
          cityName: '',
        });

        setErrors({});
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCreateAndAddAnother = (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        axios.post("http://localhost:4000/api/vehicle/post", {
          fname: formData.facultyGuide,
          purpose: formData.purpose,
          city: formData.cityName,
          Type: formData.cartypes,
          count: formData.membercount,
          fdata: formData.fromDate.toString(),
          rdata: formData.returnDate.toString()
        }).then((result) => {
          console.log(result);

          // Popup success message
          window.alert('Vehicle successfully added, you can add another now!');

          // Clear the form to allow adding another vehicle
          setFormData({
            cartypes: '',
            purpose: '',
            membercount: '',
            facultyGuide: '',
            fromDate: '',
            returnDate: '',
            cityName: '',
          });

          setErrors({});
        }).catch((error) => {
          console.log(error);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h2 className="title-outside">STAFF VEHICLE BOOKING</h2>
      <div className="academic-feedback">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Faculty Name:</label>
            <input
              name="facultyGuide"
              value={formData.facultyGuide}
              onChange={handleChange}
            />
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
            <label>City Name:</label>
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
            <input
              name="cartypes"
              value={formData.cartypes}
              onChange={handleChange}
            />
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
            <button type="button" onClick={() => console.log('Cancel')}>Cancel</button>
            <button type="submit">Apply Vehicle</button>
            <button type="button" onClick={handleCreateAndAddAnother}>
              Create & Add Another
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AcademicFeedback;
