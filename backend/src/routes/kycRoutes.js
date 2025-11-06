const express = require('express');
const { uploadKYC, verifyKYC } = require('../controllers/kycController');

const router = express.Router();

router.post('/', uploadKYC);
router.post('/verify', verifyKYC);
router.get('/', async (req, res) => {
	try {
		const KYC = require('../models/KYC');
		const items = await KYC.find().sort({ createdAt: -1 });
		res.json({ success: true, data: items });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

module.exports = router;
