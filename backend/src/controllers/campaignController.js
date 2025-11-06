const Campaign = require('../models/Campaign');

const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json({ success: true, data: campaigns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createCampaign = async (req, res) => {
  try {
    const payload = req.body;
    const campaign = await Campaign.create(payload);
    res.status(201).json({ success: true, data: campaign });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getCampaigns, createCampaign };
 
