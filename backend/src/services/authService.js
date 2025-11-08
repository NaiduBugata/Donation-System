// src/services/authService.js
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/hashUtils');
const { generateToken } = require('../utils/jwtUtils');

class AuthService {
  static async register(userData) {
    const { name, email, password, role, phone, profession, license, address, aadhar, registrationNumber, website, adminCode } = userData;
    
    const existing = await User.findOne({ email });
    if (existing) throw new Error('User already exists');

    const hashedPassword = await hashPassword(password);
    
    // Create user object with all provided fields
    const userObj = {
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      profession,
      license,
      address,
      aadhar,
      registrationNumber,
      website,
      adminCode
    };

    // Remove undefined fields
    Object.keys(userObj).forEach(key => userObj[key] === undefined && delete userObj[key]);

    const user = await User.create(userObj);
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
