require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path')
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const connectDB= require('./config/db');
connectDB();

const app = express();


// Serve static files from the 'uploads' directory 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


// Use CORS to allow requests from your frontend
app.use(cors({
    origin: 'http://localhost:5173', // This is the URL of your React frontend
    methods: 'GET,POST,PUT,DELETE', // Specify which HTTP methods are allowed
    credentials: true, // Allow cookies to be sent with requests (if needed)
  }));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});