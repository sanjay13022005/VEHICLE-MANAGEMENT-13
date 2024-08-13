import React, { useState, useEffect } from 'react';
import './Table.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import EditModal from './EditModal';
import ViewModal from './ViewModal';

const Table = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isRemarksModalOpen, setIsRemarksModalOpen] = useState(false);
  const [remarks, setRemarks] = useState('-');

  const initialData = [
    {
      id: 1,
      facultyname: 'Sanjay G ASP II',
      name: 'Sanjay G ASP II',
      licenseNo: 'AB123456',
      driverNo: 'D78910',
      carName: 'Bolero',
      carNo: 'XYZ-1234',
      purpose: 'Company Visit',
      cityName: 'Coimbatore',
      vehicleType: 'Bolero',
      memberCount: 3,
      fromDate: '5/7/2024',
      returnDate: '5/7/2024',
      
      provisionallyApproved: 'Pending',
      remarks: '-'
    },
    {
      id: 2,
      facultyname: 'John Doe',
      name: 'John Doe',
      licenseNo: 'XY789012',
      driverNo: 'D34567',
      carName: 'Toyota Camry',
      carNo: 'ABC-9876',
      purpose: 'Research Conference',
      cityName: 'Chennai',
      vehicleType: 'SUV',
      memberCount: 2,
      fromDate: '6/7/2024',
      returnDate: '7/7/2024',
     
      provisionallyApproved: 'Pending',
      remarks: '-'
    },
    {
      id: 3,
      facultyname: 'John Doe',
      name: 'John Doe',
      licenseNo: 'XY789012',
      driverNo: 'D34567',
      carName: 'Toyota Camry',
      carNo: 'ABC-9876',
      purpose: 'Research Conference',
      cityName: 'Chennai',
      vehicleType: 'SUV',
      memberCount: 2,
      fromDate: '6/7/2024',
      returnDate: '7/7/2024',
     
      provisionallyApproved: 'Pending',
      remarks: '-'
    },
  ];

  const [driverData, setDriverData] = useState(() => {
    const savedData = localStorage.getItem('driverData');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('driverData', JSON.stringify(driverData));
  }, [driverData]);

  const filteredData = driverData.filter(row =>
    Object.values(row).some(
      value => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleView = (row) => {
    setSelectedDriver(row);
    setIsViewModalOpen(true);
  };

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
    setRemarks('-');
    setSelectedDriver(null);
  };

  const saveDriver = (updatedDriver) => {
    setDriverData(driverData.map(driver =>
      driver.id === updatedDriver.id ? updatedDriver : driver
    ));
  };

  const handleApprovalChange = (id, status, remarks = '-') => {
    setDriverData(driverData.map(driver =>
      driver.id === id ? { ...driver, provisionallyApproved: status, remarks } : driver
    ));
  };

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

  const handleRemarksSave = () => {
    if (selectedDriver) {
      handleApprovalChange(selectedDriver.id, 'Rejected', remarks);
      closeRemarksModal();
    }
  };

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
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.facultyname}</td>
                <td>{row.purpose}</td>
                <td>{row.cityName}</td>
                <td>{row.vehicleType}</td>
                <td>{row.memberCount}</td>
                <td>{row.fromDate}</td>
                <td>{row.returnDate}</td>
                
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
      />
      <ViewModal
        isOpen={isViewModalOpen}
        onRequestClose={closeViewModal}
        driver={selectedDriver}
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
