const express = require('express');
const Request = require('../models/Request');
const User = require('../models/User');

const router = express.Router();

// GET /api/public-org - Get all verified organizations
router.get('/', async (req, res) => {
  try {
    // Return users with role 'organization' or 'receiver' who are verified
    const organizations = await User.find({ 
      role: { $in: ['organization', 'receiver'] },
      isVerified: true 
    }).select('name email role isVerified createdAt');
    
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/register-request', async (req, res) => {
  try {
    const payload = req.body;
    
    // Check if user with this email already exists
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'An account with this email already exists. Please use a different email or contact admin.' 
      });
    }
    
    // Create a pending user account for the NGO (with temporary password)
    const tempPassword = 'TempPass' + Math.random().toString(36).slice(-8);
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    
    const newUser = await User.create({
      name: payload.organization_name,
      email: payload.email,
      password: hashedPassword,
      role: 'organization', // Set role as organization/NGO
      phone: payload.phone || '',
      isVerified: false, // Not verified until admin approves
      metadata: {
        contact_person: payload.contact_person,
        address: payload.address,
        website: payload.website,
        description: payload.description
      }
    });
    
    console.log('✅ NGO user created (pending approval):', newUser.email);
    
    // Create a request linked to this user for admin approval
    await Request.create({ 
      title: 'Organization Registration',
      description: `NGO Registration Request from ${payload.organization_name}`,
      type: 'service',
      userId: newUser._id, // Link request to the newly created user
      status: 'pending',
      metadata: payload // Store all registration details
    });
    
    res.json({ success: true, message: 'Registration request submitted successfully. You will receive login credentials via email once approved.' });
  } catch (error) {
    console.error('NGO registration error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
