/* eslint-disable no-unused-vars */
import axios from 'axios';
import { search } from '../../../backend/routes/employeeRoutes';
// import employee from '../../../backend/models/employee';


const API_URL = 'http://localhost:3001/api/employees';

export const fetchEmployees = async (search = '',sort='')=>{
    const response = await axios.get(`${API_URL}?search=${search}&sort=${sort}`);
    return response.data;
};

export const createEmployee =async(employeeData)=>{
    const formData = new formData();
    Object.keys(employeeData).forEach((key)=>{
        formData.append(key,employeeData[key]);
    });
    const response = await axios.post(API_URL,formData,{
        headers:{'Content-Type':'multipart/form-data'}
    });
    return response.data;
};

export const updateEmployee = async(id,employeeData)=>{
    const formData = new FormData();
    Object.keys(employeeData).forEach((key)=>{
        formData.append(key,employeeData[key]);
    });
    const response = await axios.post(API_URL,formData,{
        headers:{'content-type':'multipart/form-data'}
    });
    return response.data;
};

export const deleteEmployee = async(id)=>{
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const fetchEmployee = async(id)=>{
    const response =await axios.get(`${API_URL}/${id}`);
    return response.data;
}