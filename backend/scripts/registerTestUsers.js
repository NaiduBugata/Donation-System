// Script to register test users for demonstration
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

const testUsers = [
  {
    name: 'John Donor',
    email: 'donor@test.com',
    password: 'donor123',
    role: 'donor',
    phone: '+91 9876543210'
  },
  {
    name: 'Dr. Sarah Helper',
    email: 'helper@test.com',
    password: 'helper123',
    role: 'helper',
    phone: '+91 9876543211',
    profession: 'doctor',
    license: 'MED12345'
  },
  {
    name: 'Ramesh Receiver',
    email: 'receiver@test.com',
    password: 'receiver123',
    role: 'receiver',
    phone: '+91 9876543212',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    aadhar: '1234-5678-9012'
  },
  {
    name: 'Help India Foundation',
    email: 'org@test.com',
    password: 'org123',
    role: 'organization',
    phone: '+91 9876543213',
    registrationNumber: 'NGO/2023/12345',
    website: 'https://helpindia.org'
  },
  {
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin',
    adminCode: 'ADMIN2024'
  }
];

const registerUsers = async () => {
  console.log('\n📝 Registering Test Users...\n');
  console.log('='.repeat(80));
  
  let successCount = 0;
  let failCount = 0;

  for (const user of testUsers) {
    try {
      const response = await axios.post(`${API_BASE}/auth/register`, user);
      
      if (response.data.success) {
        console.log(`✅ SUCCESS: ${user.name} (${user.role})`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Password: ${user.password}`);
        if (user.phone) console.log(`   Phone: ${user.phone}`);
        if (user.profession) console.log(`   Profession: ${user.profession}`);
        if (user.address) console.log(`   Address: ${user.address}`);
        console.log('');
        successCount++;
      }
    } catch (error) {
      console.log(`❌ FAILED: ${user.name} (${user.role})`);
      if (error.response) {
        console.log(`   Error: ${error.response.data.message}`);
      } else {
        console.log(`   Error: ${error.message}`);
      }
      console.log('');
      failCount++;
    }
  }

  console.log('='.repeat(80));
  console.log(`\n✅ Successfully registered: ${successCount}/${testUsers.length}`);
  console.log(`❌ Failed: ${failCount}/${testUsers.length}\n`);

  if (successCount > 0) {
    console.log('🎉 Great! Now run the following command to see all credentials:\n');
    console.log('   node scripts/getAllCredentials.js\n');
  }
};

// Check if server is running
const checkServer = async () => {
  try {
    await axios.get(`${API_BASE}/users`);
    return true;
  } catch (error) {
    return false;
  }
};

const main = async () => {
  console.log('\n🔍 Checking if backend server is running...');
  
  const isRunning = await checkServer();
  
  if (!isRunning) {
    console.log('❌ Backend server is not running!');
    console.log('   Please start it first with: npm start\n');
    process.exit(1);
  }
  
  console.log('✅ Backend server is running!\n');
  
  await registerUsers();
};

main();
