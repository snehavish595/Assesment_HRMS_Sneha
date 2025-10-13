const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const { JWT_SECRET } = process.env;

// Login
router.post('/login', async (req, res) => {
  const { empCode, password, role } = req.body;
  try {
    const user = await Employee.findOne({ empCode });
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });
    if(!user.password) return res.status(400).json({ message: 'Password not set' });
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    if(role && user.role !== role) return res.status(403).json({ message: 'Role mismatch' });
    const token = jwt.sign({ id: user._id, empCode: user.empCode, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, user });
  } catch(err){ res.status(500).json({ message: err.message }); }
});

// Set Password (HR creates accounts then sets password or employee sets once)
router.post('/set-password', async (req, res) => {
  const { empCode, password } = req.body;
  if(!empCode || !password) return res.status(400).json({ message: 'empCode & password required' });
  try {
    const user = await Employee.findOne({ empCode });
    if(!user) return res.status(404).json({ message: 'Employee not found' });
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    await user.save();
    res.json({ message: 'Password set successfully' });
  } catch(e){ res.status(500).json({ message: e.message }); }
});

module.exports = router;
