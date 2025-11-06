const Campaign = require('../models/Campaign');
const User = require('../models/User');

const recommendCampaigns = async (req, res) => {
  try {
    const { userId } = req.body || {};
    // simple heuristic: return top 5 active campaigns sorted by raised/goal
    const campaigns = await Campaign.find({ active: true }).sort({ raised: -1 }).limit(5);
    res.json({ success: true, data: campaigns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const matchHelpers = async (req, res) => {
  try {
    const { requestId } = req.body || {};
    // fallback: return up to 5 helpers (users with role 'helper')
    const helpers = await User.find({ role: 'helper' }).limit(10);
    res.json({ success: true, data: helpers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const analyzeSentiment = async (req, res) => {
  try {
    const { text } = req.body || {};
    if (!text) return res.json({ success: true, data: { sentiment: 'neutral', score: 0 } });
    // naive sentiment: positive if contains thanks/good, negative if contains bad/poor
    const t = text.toLowerCase();
    let score = 0;
    if (t.includes('thank') || t.includes('good') || t.includes('great')) score = 1;
    if (t.includes('bad') || t.includes('poor') || t.includes('terrible')) score = -1;
    const sentiment = score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
    res.json({ success: true, data: { sentiment, score } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { recommendCampaigns, matchHelpers, analyzeSentiment };
