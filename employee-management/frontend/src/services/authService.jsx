import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/api';
axios.defaults.withCredentials = true;

export const login = async (username, password) => {
  return axios.post('/auth/login', { username, password });
};

export const register = async (username, password) => {
  return axios.post('/auth/register', { username, password });
};
