/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

function Navbar({ handleShowEmployeeList, handleShowHome, userName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the authentication token
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav>
      <div className="navbar">
        <h1>Logo</h1>
        <a onClick={handleShowHome}>Home</a> {/* Call handleShowHome */}
        <a onClick={handleShowEmployeeList}>Employee List</a> {/* Call handleShowEmployeeList */}
        <span className="navbar-user">{userName}</span> {/* Display user name */}
        <a onClick={handleLogout}>Logout</a>
      </div>
    </nav>
  );
}

export default Navbar;
