const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
  userId: String,
  documents: [String],
  verified: { type: Boolean, default: false },
  verifiedBy: String,
  verifiedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('KYC', kycSchema);
