const express = require('express');
const Request = require('../models/Request');

const router = express.Router();

router.post('/register-request', async (req, res) => {
  try {
    const payload = req.body;
    // create a request representing the organization registration request
    await Request.create({ title: 'Organization Registration', description: JSON.stringify(payload), type: 'service' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
