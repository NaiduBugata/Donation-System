// src/services/authService.js
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/hashUtils');
const { generateToken } = require('../utils/jwtUtils');

class AuthService {
  static async register({ name, email, password, role }) {
    const existing = await User.findOne({ email });
    if (existing) throw new Error('User already exists');

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword, role });
    const token = generateToken(user);
    return { user, token };
  }

  static async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = generateToken(user);
    return { user, token };
  }
}

module.exports = AuthService;
