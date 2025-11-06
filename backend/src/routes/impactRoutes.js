const express = require('express');
const { getImpactByQR } = require('../controllers/transactionController');

const router = express.Router();

router.get('/:qr', getImpactByQR);

module.exports = router;
