const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'User registration failed' });
    console.error(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Logged in successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
    console.error(error);
  }
};
