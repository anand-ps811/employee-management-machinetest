/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EmployeePage from './pages/EmployeePage';
import CreateEmployee from './components/CreateEmployee'; 

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/employees" element={isAuthenticated ? <EmployeePage /> : <Navigate to="/login" />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
