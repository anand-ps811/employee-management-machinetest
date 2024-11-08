const express = require('express');
const { createEmployee, getEmployees, updateEmployee, deleteEmployee, upload } = require('../controller/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, upload, createEmployee);
router.get('/', authMiddleware, getEmployees);
router.put('/:id', authMiddleware, upload, updateEmployee);
router.delete('/:id', authMiddleware, deleteEmployee);

module.exports = router;
