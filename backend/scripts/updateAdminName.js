const mongoose = require('mongoose');
const User = require('../src/models/User');
require('dotenv').config();

const updateAdminName = async () => {
  try {
    // Use the MongoDB Atlas URI directly
    const uri = 'mongodb+srv://naidubugata88:Ke33d5p7i4dUwP57@cluster0.dlkrusm.mongodb.net/donationDB?retryWrites=true&w=majority';
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');

    // First, let's see all users
    const allUsers = await User.find({}).select('name email _id');
    console.log('📋 All users found:');
    allUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}) ID: ${user._id}`);
    });

    const result = await User.findOneAndUpdate(
      { email: 'stackhackdonation@gmail.com' },
      { name: 'Stack Hack' },
      { new: true }
    );

    if (result) {
      console.log('✅ Admin name updated successfully:');
      console.log('Name:', result.name);
      console.log('Email:', result.email);
    } else {
      console.log('❌ Admin user not found with email: stackhackdonation@gmail.com');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

updateAdminName();