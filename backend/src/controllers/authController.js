// src/controllers/authController.js
const AuthService = require('../services/authService');

const registerUser = async (req, res) => {
  try {
    const userData = req.body; // Get all fields from request body
    const { user, token } = await AuthService.register(userData);
    res.status(201).json({ success: true, user, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login({ email, password });
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser };
