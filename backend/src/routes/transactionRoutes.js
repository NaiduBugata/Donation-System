const express = require('express');
const { createDonation, getImpactByQR, getTransactions } = require('../controllers/transactionController');

const router = express.Router();

router.post('/', createDonation);
router.get('/impact/:qr', getImpactByQR);
router.get('/', getTransactions);

module.exports = router;
 
