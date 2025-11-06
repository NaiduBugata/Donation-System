const User = require('../models/User');
const Campaign = require('../models/Campaign');
const Transaction = require('../models/Transaction');
const Request = require('../models/Request');

const getAnalytics = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const campaignCount = await Campaign.countDocuments();
    const requestCount = await Request.countDocuments();
    const transactions = await Transaction.find();
    const totalDonations = transactions.reduce((s, t) => s + (t.amount || 0), 0);

    res.json({ success: true, data: { userCount, campaignCount, requestCount, totalDonations } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAnalytics };
