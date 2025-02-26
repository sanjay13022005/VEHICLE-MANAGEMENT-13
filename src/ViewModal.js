import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './ViewModal.css';

Modal.setAppElement('#root');

const ViewModal = ({ isOpen, onRequestClose, driverId }) => {
  const [driverData, setDriverData] = useState({ driverDetails: null, remarks: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchDriverData = async () => {
      if (driverId) {
        setLoading(true);
        setError(null);

        // Check local storage for data
        const localData = localStorage.getItem(`driver_${driverId}`);
        if (localData) {
          setDriverData(JSON.parse(localData));
          setLoading(false);
          return;
        }

        try {
          const response = await axios.get(`http://localhost:5000/api/driver/${driverId}`);
          if (isMounted) {
            setDriverData(response.data);
            localStorage.setItem(`driver_${driverId}`, JSON.stringify(response.data)); // Save to local storage
          }
        } catch (error) {
          console.error('Error fetching driver data:', error);
          if (isMounted) {
            setError('Failed to fetch driver data. Please try again later.');
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    };

    fetchDriverData();

    return () => {
      isMounted = false;
    };
  }, [driverId]);

  const { driverDetails, remarks } = driverData;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
      <div className="view-modal-content">
        <h2>Driver Details</h2>
        {!loading ? (
          <p>Loading...</p>
        ): true ? (
          <div>
            <p>Name: { "VIJAY"}</p>
            <p>License No: {'Q356724'}</p>
            <p>Driver No: {'9443732103'}</p>
            <p>Car Name: {'ALT0'}</p>
            <p>Car No: {'TN47V5730'}</p>
            
            {remarks.length > 0 ? (
              <ul>
                {remarks.map((remark) => (
                  <li key={remark._id}>{remark.content}</li>
                ))}
              </ul>
            ) : (
              <p>No remarks available.</p>
            )}
          </div>
        ) : (
          <p>No driver details available.</p>
        )}
        <button onClick={onRequestClose}>Close</button>
      </div>
    </Modal>
  );
};

export default ViewModal;
