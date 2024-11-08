/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditEmployee.css'; // Import the CSS file


const EditEmployee = () => {
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    profileImage: null,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/employees/${id}`, {
          withCredentials: true,
        });
        setEmployee(response.data);
      } catch (err) {
        setError('Failed to fetch employee details.');
      }
    };

    fetchEmployee();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEmployee((prev) => ({ ...prev, profileImage: e.target.files[0] }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setEmployee((prev) => ({
      ...prev,
      courses: checked
        ? [...prev.courses, value]
        : prev.courses.filter((course) => course !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(employee).forEach((key) => {
      formData.append(key, employee[key]);
    });

    try {
      const response = await axios.put(`http://localhost:3001/api/employees/${id}`, formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        // eslint-disable-next-line no-undef
        navigate('/employee-page'); // Redirect to employee list after successful update
      }
    } catch (err) {
      setError('Failed to update employee.');
    }
  };

  return (
    <div className="edit-employee-form">
      <h2>Edit Employee</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={employee.name} onChange={handleInputChange} required />
        </div>

        <div>
          <label>Email</label>
          <input type="email" name="email" value={employee.email} onChange={handleInputChange} required />
        </div>

        <div>
          <label>Mobile</label>
          <input type="text" name="mobile" value={employee.mobile} onChange={handleInputChange} required />
        </div>

        <div>
          <label>Designation</label>
          <select name="designation" value={employee.designation} onChange={handleInputChange} required>
            <option value="">Select Designation</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            {/* Add other designations as needed */}
          </select>
        </div>

        <div>
          <label>Gender</label>
          <label>
            <input type="radio" name="gender" value="Male" checked={employee.gender === 'Male'} onChange={handleInputChange} /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={employee.gender === 'Female'} onChange={handleInputChange} /> Female
          </label>
        </div>

        <div>
          <label>Courses</label>
          <label>
            <input type="checkbox" value="JavaScript" checked={employee.courses.includes('JavaScript')} onChange={handleCheckboxChange} /> JavaScript
          </label>
          <label>
            <input type="checkbox" value="React" checked={employee.courses.includes('React')} onChange={handleCheckboxChange} /> React
          </label>
          <label>
            <input type="checkbox" value="Node" checked={employee.courses.includes('Node')} onChange={handleCheckboxChange} /> Node
          </label>
        </div>

        <div>
          <label>Profile Image</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
