const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const Campaign = require('../models/Campaign');
const Transaction = require('../models/Transaction');
const Request = require('../models/Request');
const { hashPassword } = require('../utils/hashUtils');

const seed = async () => {
  await connectDB();

  // Clear existing
  await Promise.all([User.deleteMany(), Campaign.deleteMany(), Transaction.deleteMany(), Request.deleteMany()]);

  // Hash passwords for seeded users
  const hashedAdminPass = await hashPassword('admin123');
  const hashedDonorPass = await hashPassword('donor123');
  const hashedHelperPass = await hashPassword('helper123');
  const hashedReceiverPass = await hashPassword('receiver123');

  // Users
  const users = await User.create([
    { name: 'Admin', email: 'admin@socialimpact.org', password: hashedAdminPass, role: 'admin', verified: true },
    { name: 'Rajesh Kumar', email: 'donor@example.com', password: hashedDonorPass, role: 'donor', verified: true },
    { name: 'Dr. Priya Sharma', email: 'doctor@example.com', password: hashedHelperPass, role: 'helper', verified: true },
    { name: 'Amit Patel', email: 'receiver@example.com', password: hashedReceiverPass, role: 'receiver', verified: true }
  ]);

  // Campaigns
  const campaigns = await Campaign.create([
    { title: 'Medical Emergency: Heart Surgery for Child', description: 'A 7-year-old child needs urgent heart surgery.', category: 'medical', goal: 500000, raised: 325000, verified: true, active: true },
    { title: 'Education Support: Laptop for Online Classes', description: 'Help students access online education.', category: 'education', goal: 50000, raised: 50000, verified: true, active: false }
  ]);

  // Requests
  await Request.create([
    { userId: users[3]._id.toString(), category: 'medical', title: 'Need Doctor Consultation - Fever', description: 'High fever for 3 days', type: 'service', location: { lat: 28.6692, lng: 77.4538, address: 'Ghaziabad, UP' } },
    { userId: users[3]._id.toString(), campaignId: campaigns[0]._id.toString(), category: 'medical', title: 'Medical Emergency: Heart Surgery', description: 'Urgent heart surgery required', type: 'financial', amount: 500000 }
  ]);

  // Transactions
  await Transaction.create([
    { donorId: users[1]._id.toString(), receiverId: users[3]._id.toString(), campaignId: campaigns[0]._id.toString(), amount: 50000, paymentId: 'pay_mock_001', isAnonymous: false },
    { donorId: 'anonymous', receiverId: users[3]._id.toString(), campaignId: campaigns[0]._id.toString(), amount: 100000, paymentId: 'pay_mock_002', isAnonymous: true, qrCode: 'QR-ANO-7F8E9D' }
  ]);

  console.log('Database seeded');
  process.exit(0);
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
