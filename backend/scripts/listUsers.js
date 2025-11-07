const mongoose = require('mongoose');
const User = require('../src/models/User');
require('dotenv').config();

const listUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    const users = await User.find({}).select('name email _id');
    console.log('📋 All users:');
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) ID: ${user._id}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

listUsers();