const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    donorId: String,
    receiverId: String,
    campaignId: String,
    amount: { type: Number, default: 0 },
    paymentId: String,
    isAnonymous: { type: Boolean, default: false },
    qrCode: String,
    trackUrl: String,
    status: { type: String, default: 'completed' },
    impactStory: String,
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
 
