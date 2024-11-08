/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import EmployeePage from './EmployeePage';
import './Dashboard.css'; // Import the CSS file

function Dashboard() {
  const [showEmployeeList, setShowEmployeeList] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const { default: jwt_decode } = await import('jwt-decode');
        const decodedToken = jwt_decode(token);
        setUserName(decodedToken.username); // Assuming 'username' is the field in the token
      }
    };
    fetchUserName();
  }, []);

  const handleShowEmployeeList = () => {
    setShowEmployeeList(true);
  };

  const handleShowHome = () => {
    setShowEmployeeList(false);
  };

  return (
    <div>
      <Navbar handleShowEmployeeList={handleShowEmployeeList} handleShowHome={handleShowHome} userName={userName} /> {/* Pass userName as prop */}
      <div className="dashboard-content">
        {showEmployeeList ? <EmployeePage /> : <p>Welcome to the Dashboard!</p>}
      </div>
    </div>
  );
}

export default Dashboard;
