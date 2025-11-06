const express = require('express');
const { geoMatch } = require('../controllers/geoController');

const router = express.Router();

router.post('/match', geoMatch);

module.exports = router;
 
