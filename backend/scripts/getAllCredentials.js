// Script to fetch all user credentials from database
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../src/models/User');

const getAllCredentials = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/social-impact');
    console.log('✅ Connected to MongoDB\n');
    console.log('='.repeat(100));
    console.log('📋 ALL USER CREDENTIALS IN DATABASE');
    console.log('='.repeat(100));
    
    // Fetch all users
    const users = await User.find().sort({ createdAt: -1 });
    
    if (users.length === 0) {
      console.log('\n❌ No users found in database\n');
      return;
    }

    console.log(`\n✅ Total Users: ${users.length}\n`);
    
    users.forEach((user, index) => {
      console.log(`\n${'─'.repeat(100)}`);
      console.log(`👤 USER #${index + 1}`);
      console.log(`${'─'.repeat(100)}`);
      console.log(`📧 Email:           ${user.email}`);
      console.log(`👤 Name:            ${user.name || 'N/A'}`);
      console.log(`🔐 Password:        [HASHED] ${user.password.substring(0, 20)}...`);
      console.log(`👔 Role:            ${user.role}`);
      console.log(`📱 Phone:           ${user.phone || 'N/A'}`);
      
      // Role-specific fields
      if (user.role === 'helper') {
        console.log(`💼 Profession:      ${user.profession || 'N/A'}`);
        console.log(`🆔 License:         ${user.license || 'N/A'}`);
      }
      
      if (user.role === 'receiver') {
        console.log(`🏠 Address:         ${user.address || 'N/A'}`);
        console.log(`🆔 Aadhar:          ${user.aadhar || 'N/A'}`);
      }
      
      if (user.role === 'organization' || user.role === 'ngo') {
        console.log(`📋 Reg Number:      ${user.registrationNumber || 'N/A'}`);
        console.log(`🌐 Website:         ${user.website || 'N/A'}`);
      }
      
      console.log(`✅ Verified:        ${user.isVerified ? 'Yes' : 'No'}`);
      console.log(`🏆 Trust Score:     ${user.trustScore || 0}`);
      console.log(`🎖️  Badge:           ${user.badge || 'None'}`);
      console.log(`🔍 KYC Status:      ${user.kycStatus || 'pending'}`);
      console.log(`📅 Created:         ${new Date(user.createdAt).toLocaleString()}`);
    });
    
    console.log(`\n${'='.repeat(100)}`);
    console.log(`✅ Total: ${users.length} users retrieved`);
    console.log(`${'='.repeat(100)}\n`);
    
    // Summary by role
    console.log('📊 SUMMARY BY ROLE:');
    console.log('─'.repeat(50));
    const roleCounts = {};
    users.forEach(user => {
      roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
    });
    Object.entries(roleCounts).forEach(([role, count]) => {
      console.log(`   ${role.toUpperCase()}: ${count}`);
    });
    console.log('─'.repeat(50));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed\n');
  }
};

getAllCredentials();
