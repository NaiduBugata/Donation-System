const express = require('express');
const { getRequestsByUser, completeService } = require('../controllers/requestController');
const Request = require('../models/Request');

const router = express.Router();

// GET /api/services/helper/:id -> services accepted by helper
router.get('/helper/:id', async (req, res) => {
  try {
    const helperId = req.params.id;
    const services = await Request.find({ acceptedBy: helperId }).sort({ createdAt: -1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/services/complete -> mark service complete
router.post('/complete', async (req, res) => {
  // delegate to request controller completeService
  return completeService(req, res);
});

module.exports = router;
