const Employee = require('../models/Employee');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, 'uploads');

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG files are allowed'), false);
    }
  },
});

exports.upload = upload.single('image'); // Ensure field name is 'image'
('image'); // Ensure field name is 'image'



// CREATE Employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;
    const image = req.file ? req.file.filename : null;

    // Check if email is already in use
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email is already taken' });
    }

    // Create new employee
    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image,
    });
    await newEmployee.save();

    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: 'Error creating employee' });
    console.error(error);
  }
};

// GET Employees with Search, Sort, and Pagination
exports.getEmployees = async (req, res) => {
  const { search, sort = 'createdAt', order = 'asc', page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const sortOrder = order === 'asc' ? 1 : -1;

    const employees = await Employee.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ [sort]: sortOrder });

    const totalCount = await Employee.countDocuments(filter);

    res.json({ employees, totalCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees' });
    console.error(err);
  }
};

// UPDATE Employee by ID
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (req.file) updatedData.image = req.file.filename;

  try {
    const employee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: 'Error updating employee' });
    console.error(error);
  }
};

// DELETE Employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting employee' });
    console.error(error);
  }
};
