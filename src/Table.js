import React, { useState, useEffect } from 'react';
import './Table.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import EditModal from './EditModal';
import ViewModal from './ViewModal';
import axios from 'axios';

const Table = ({ addNotification }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isRemarksModalOpen, setIsRemarksModalOpen] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [vehicle, setVehicle] = useState([]);

  // Fetch vehicle data from the backend
  useEffect(() => {
    async function getAllVehicles() {
      try {
        const result = await axios.get('http://localhost:4000/api/vehicle/getall');
        setVehicle(result.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    }
    getAllVehicles();
  }, []);

  // Handle View button click
  const handleView = (row) => {
    setSelectedDriver(row);
    setIsViewModalOpen(true);
  };

  // Handle Edit button click
  const handleEdit = (row) => {
    setSelectedDriver(row);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedDriver(null);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedDriver(null);
  };

  const closeRemarksModal = () => {
    setIsRemarksModalOpen(false);
    setRemarks('');
    setSelectedDriver(null);
  };

  const saveDriver = (updatedDriver) => {
    setVehicle(vehicle.map(driver =>
      driver.id === updatedDriver.id ? { ...driver, ...updatedDriver } : driver
    ));
  };

  // Handle approval change and update database
  const handleApprovalChange = async (id, status, remarks = '-') => {
    setVehicle(vehicle.map(driver =>
      driver.id === id ? { ...driver, provisionallyApproved: status, remarks } : driver
    ));

    if (status === 'Rejected') {
      addNotification(`Booking ID: ${id} was rejected. Remarks: ${remarks}`);
    } else if (status === 'Approved') {
      addNotification(`Booking ID: ${id} was approved.`);
    }
  };

  // Determine row status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'approved';
      case 'Rejected':
        return 'rejected';
      default:
        return 'pending';
    }
  };

  // Save remarks and reject booking
  const handleRemarksSave = () => {
    if (selectedDriver) {
      handleApprovalChange(selectedDriver.id, 'Rejected', remarks);
      closeRemarksModal();
    }
  };

  // Filter data based on search term
  const filteredData = vehicle.filter(row =>
    Object.values(row).some(
      value => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="main-container">
      <div className="booking-status">
        <h2>Booking Status</h2>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Faculty Name</th>
              <th>Purpose</th>
              <th>City Name</th>
              <th>Type of car/Bus</th>
              <th>Member Count</th>
              <th>From Date</th>
              <th>Return Date</th>
              <th>Provisionally Approved</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={row.id || index}> {/* Use a unique key */}
                <td>{index + 1}</td>
                <td>{row.fname}</td>
                <td>{row.purpose}</td>
                <td>{row.city}</td>
                <td>{row.Type}</td>
                <td>{row.count}</td>
                <td>{row.fdata}</td>
                <td>{row.rdata}</td>
                <td>
                  <select
                    className={getStatusClass(row.provisionallyApproved)}
                    value={row.provisionallyApproved}
                    onChange={(e) => {
                      if (e.target.value === 'Rejected') {
                        setSelectedDriver(row);
                        setIsRemarksModalOpen(true);
                      } else {
                        handleApprovalChange(row.id, e.target.value);
                      }
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td>{row.remarks}</td>
                <td className="actions">
                  <i
                    className={`fas fa-eye ${row.provisionallyApproved !== 'Approved' ? 'disabled' : ''}`}
                    onClick={row.provisionallyApproved === 'Approved' ? () => handleView(row) : null}
                  ></i>
                  <i
                    className={`fas fa-edit ${row.provisionallyApproved !== 'Approved' ? 'disabled' : ''}`}
                    onClick={row.provisionallyApproved === 'Approved' ? () => handleEdit(row) : null}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        driver={selectedDriver}
        onSave={saveDriver}
        vehicalData={filteredData}
      />

      <ViewModal
        isOpen={isViewModalOpen}
        onRequestClose={closeViewModal}
        driverId={selectedDriver ? selectedDriver.id : null}
      />

      {isRemarksModalOpen && (
        <div className="remarks-modal">
          <div className="modal-content">
            <h2>Enter Remarks for Rejection</h2>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
            <div className="button-group">
              <button className="save-button" onClick={handleRemarksSave}>
                Save
              </button>
              <button className="cancel-button" onClick={closeRemarksModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
