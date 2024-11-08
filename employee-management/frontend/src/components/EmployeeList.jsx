/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '../services/employeeService';
import EmployeeForm from './EmployeeForm';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('id');
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, search]);

  const fetchEmployees = async () => {
    const response = await getEmployees(search, sort);
    setEmployees(response.data);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

 
const handleEdit = (employee) => {
  navigate('/edit-employee', { state: { employee } });
};

  return (
    <div>
      <h2>Employee List</h2>
      <input 
        placeholder="Search employees" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <button onClick={() => setShowForm(true)}>Add New Employee</button>
      <select onChange={(e) => setSort(e.target.value)} value={sort}>
        <option value="id">Sort by ID</option>
        <option value="email">Sort by Email</option>
        <option value="date">Sort by Date</option>
      </select>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            <img src={employee.imageUrl} alt={employee.name} width="50" height="50" />
            <span>{employee.name}</span>
            <span>{employee.email}</span>
            <span>{employee.mobile}</span>
            <button onClick={() => handleEdit(employee)}>Edit</button>
            <button onClick={() => handleDelete(employee._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {showForm && (
        <EmployeeForm 
          onClose={() => { setShowForm(false); setSelectedEmployee(null); fetchEmployees(); }} 
          employee={selectedEmployee} 
        />
      )}
    </div>
  );
}

export default EmployeeList;
