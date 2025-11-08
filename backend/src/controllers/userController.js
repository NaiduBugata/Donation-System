const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ 
      success: true, 
      message: 'Password updated successfully',
      user 
    });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent deleting admin users (optional safety check)
    if (user.role === 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Cannot delete admin users' 
      });
    }

    // Delete the user
    await User.findByIdAndDelete(id);

    // Optional: Delete related data (requests, transactions, etc.)
    // const Request = require('../models/Request');
    // const Transaction = require('../models/Transaction');
    // await Request.deleteMany({ userId: id });
    // await Transaction.deleteMany({ $or: [{ donorId: id }, { receiverId: id }] });

    res.json({ 
      success: true, 
      message: 'User deleted successfully',
      deletedUser: { id: user._id, email: user.email, name: user.name }
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getUsers, updateProfile, updateUserPassword, deleteUser };
 
