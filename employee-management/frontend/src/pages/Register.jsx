/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate('/login')}>Already have an account? Log In</button>
    </div>
  );
}

export default Register;
