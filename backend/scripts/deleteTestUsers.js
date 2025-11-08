// Script to delete test users
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');

const deleteTestUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('\n🔄 Connected to MongoDB...\n');
    
    const testEmails = [
      'donor@test.com',
      'helper@test.com',
      'receiver@test.com',
      'org@test.com',
      'admin@test.com'
    ];
    
    const result = await User.deleteMany({ 
      email: { $in: testEmails } 
    });
    
    console.log(`✅ Deleted ${result.deletedCount} test users\n`);
    
    if (result.deletedCount > 0) {
      console.log('You can now register them again with:');
      console.log('   node scripts/registerTestUsers.js\n');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

deleteTestUsers();
