const express = require('express');
const { recommendCampaigns, matchHelpers, analyzeSentiment } = require('../controllers/aiController');

const router = express.Router();

router.post('/recommend', recommendCampaigns);
router.post('/match-helpers', matchHelpers);
router.post('/sentiment', analyzeSentiment);

module.exports = router;
