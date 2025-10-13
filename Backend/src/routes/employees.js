const express = require('express');
const router = express.Router();
// const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');

// CREATE new employee (HR registration)
router.post('/', async (req, res) => {
  try {
    const { name, empCode, email, role, department, project, doj, manager } = req.body;

    // Check duplicates
    const existing = await Employee.findOne({ empCode });
    if (existing) return res.status(400).json({ message: 'Employee already exists with this code' });

    // Create new employee
    const newEmployee = new Employee({
      name,
      empCode,
      email,
      role: role || 'EMPLOYEE',
      department,
      project,
      doj,
      manager,
      password: null,     // HR can set password later
      isApproved: false,  // default
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee registered successfully', employee: newEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET employee by ID or empCode
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE employee details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await Employee.findByIdAndUpdate(id, updates, { new: true });
    res.json({ message: 'Employee updated', employee: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Toggle approval
router.patch('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;
    const employee = await Employee.findByIdAndUpdate(id, { isApproved }, { new: true });
    res.json({ message: 'Approval updated', employee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

