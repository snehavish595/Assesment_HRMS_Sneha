const express = require('express');
const router = express.Router();
// const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');

// CREATE new employee (HR registration)
router.post('/', async (req, res) => {
  try {
    console.log("📦 Incoming employee data:", req.body);
    const { name, doj, dept, proj, email, password } = req.body;

    // Find last employee
    const lastEmp = await Employee.findOne().sort({ _id: -1 });
    let newCode = "";

    if (!lastEmp || !lastEmp.empCode) {
      newCode = "OS2501001";
    } else {
      const num = parseInt(lastEmp.empCode.slice(-3)) + 1;
      const now = new Date();
      const year = now.getFullYear().toString().slice(-2);
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      newCode = `OS${year}${month}${num.toString().padStart(3, "0")}`;
    }

    const newEmployee = new Employee({
      name,
      empCode: newCode,
      doj,
      dept,
      proj,
      email,
      password,
    });

    await newEmployee.save();

    res.status(201).json({
      success: true,
      message: "Employee saved successfully",
      code: newCode,
    });
  } catch (err) {
    console.error("❌ Error saving employee:", err);
    res.status(400).json({ success: false, message: err.message });
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

