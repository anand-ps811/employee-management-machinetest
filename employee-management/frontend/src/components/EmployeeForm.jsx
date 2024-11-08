/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { createEmployee, updateEmployee } from '../services/employeeService';

function EmployeeForm({ onClose, employee }) {
  const [name, setName] = useState(employee ? employee.name : '');
  const [email, setEmail] = useState(employee ? employee.email : '');
  const [mobile, setMobile] = useState(employee ? employee.mobile : '');
  const [designation, setDesignation] = useState(employee ? employee.designation : '');
  const [gender, setGender] = useState(employee ? employee.gender : '');
  const [course, setCourse] = useState(employee ? employee.course : []);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('designation', designation);
    formData.append('gender', gender);
    formData.append('course', JSON.stringify(course));
    if (image) formData.append('image', image);

    if (employee) {
      await updateEmployee(employee._id, formData);
    } else {
      await createEmployee(formData);
    }

    onClose();
  };

  return (
    <div>
      <h3>{employee ? 'Edit Employee' : 'Add New Employee'}</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="tel" 
          placeholder="Mobile" 
          value={mobile} 
          onChange={(e) => setMobile(e.target.value)} 
          required 
        />
        <select value={designation} onChange={(e) => setDesignation(e.target.value)} required>
          <option value="">Select Designation</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
          {/* Add other options here */}
        </select>
        <div>
          <label>
            <input 
              type="radio" 
              name="gender" 
              value="Male" 
              checked={gender === 'Male'} 
              onChange={(e) => setGender(e.target.value)} 
            /> 
            Male
          </label>
          <label>
            <input 
              type="radio" 
              name="gender" 
              value="Female" 
              checked={gender === 'Female'} 
              onChange={(e) => setGender(e.target.value)} 
            /> 
            Female
          </label>
        </div>
        <div>
          <label>
            <input 
              type="checkbox" 
              checked={course.includes('Course1')} 
              onChange={(e) => setCourse([...course, 'Course1'])} 
            /> 
            Course1
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={course.includes('Course2')} 
              onChange={(e) => setCourse([...course, 'Course2'])} 
            /> 
            Course2
          </label>
        </div>
        <input 
          type="file" 
          accept="image/jpeg, image/png" 
          onChange={(e) => setImage(e.target.files[0])} 
        />
        <button type="submit">{employee ? 'Update' : 'Create'}</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
