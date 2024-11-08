/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EmployeePage.css'; // Import the CSS file

const EmployeePage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('id');
  const [order, setOrder] = useState('asc');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/employees', {
          params: { search, sort, order },
          withCredentials: true
        });
        setEmployees(response.data.employees);
        setTotalCount(response.data.totalCount);
      } catch (err) {
        setError('Failed to fetch employees');
      }
    };

    fetchEmployees();
  }, [search, sort, order]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${id}`, {
        withCredentials: true
      });
      setEmployees(employees.filter(emp => emp._id !== id));
    } catch (err) {
      setError('Failed to delete employee');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleCreate = () => {
    navigate('/create-employee'); // Navigate to create employee form
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h1>Employee Management</h1>
        <div>
          <span>Welcome, User</span>
          <button onClick={() => { /* Logout logic */ }}>Logout</button>
        </div>
      </nav>

      <div className="employee-list-container">
        <h2>Employee List</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="header-actions">
          <span className="employee-count">Total Employees: {totalCount}</span>
          <button onClick={handleCreate} className="btn btn-primary">Create New Employee</button>
        </div>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search Employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
        </div>

        <table className="employee-table">
          <thead>
            <tr>
              <th onClick={() => setSort('id')}>ID</th>
              <th onClick={() => setSort('name')}>Name</th>
              <th>Image</th> {/* Move Image column */}
              <th onClick={() => setSort('email')}>Email</th>
              <th onClick={() => setSort('mobile')}>Mobile</th>
              <th onClick={() => setSort('date')}>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="7">No employees found</td> {/* Updated colspan */}
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee._id}</td>
                  <td>{employee.name}</td>
                  <td>
                    {employee.image && <img src={`http://localhost:3001/uploads/${employee.image}`} alt={employee.name} width="50" height="50" />}
                  </td> {/* Display image */}
                  <td>{employee.email}</td>
                  <td>{employee.mobile}</td>
                  <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEdit(employee._id)} className="btn btn-primary">Edit</button>
                    <button onClick={() => handleDelete(employee._id)} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination">
          {/* Add pagination controls here */}
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
