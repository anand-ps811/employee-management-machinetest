/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [courses, setCourses] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  
  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation before submit
    if (!name || !email || !mobile || !designation || !gender || !courses.length) {
      return setError('All fields are required!');
    }
    if (!/^\d+$/.test(mobile)) {
      return setError('Mobile must be a valid number.');
    }
    if (!profileImage || !['image/jpeg', 'image/png'].includes(profileImage.type)) {
      return setError('Please upload a valid JPG or PNG image.');
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('designation', designation);
    formData.append('gender', gender);
    formData.append('courses', courses);
    formData.append('profileImage', Image);

    try {
      const response = await axios.post('http://localhost:3001/api/employees', formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate('/employee-page'); // Redirect to employee list after successful creation
      }
    } catch (err) {
      setError('Failed to create employee.');
    }
  };

  return (
    <div className="create-employee-form">
      <h2>Create New Employee</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <label>Mobile</label>
          <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        </div>

        <div>
          <label>Designation</label>
          <select value={designation} onChange={(e) => setDesignation(e.target.value)} required>
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
            <input type="radio" value="Male" checked={gender === 'Male'} onChange={() => setGender('Male')} /> Male
          </label>
          <label>
            <input type="radio" value="Female" checked={gender === 'Female'} onChange={() => setGender('Female')} /> Female
          </label>
        </div>

        <div>
          <label>Courses</label>
          <label>
            <input type="checkbox" value="JavaScript" onChange={(e) => setCourses(prev => e.target.checked ? [...prev, 'JavaScript'] : prev.filter(course => course !== 'JavaScript'))} /> JavaScript
          </label>
          <label>
            <input type="checkbox" value="React" onChange={(e) => setCourses(prev => e.target.checked ? [...prev, 'React'] : prev.filter(course => course !== 'React'))} /> React
          </label>
          <label>
            <input type="checkbox" value="Node" onChange={(e) => setCourses(prev => e.target.checked ? [...prev, 'Node'] : prev.filter(course => course !== 'Node'))} /> Node
          </label>
        </div>

        <div>
          <label>Profile Image</label>
          <input type="file" onChange={handleFileChange} required />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
