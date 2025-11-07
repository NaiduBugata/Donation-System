const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return !this.isAnonymous;
    }
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign'
  },
  orderId: {
    type: String,
    required: true
  },
  paymentId: {
    type: String
  },
  signature: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['created', 'attempted', 'paid', 'failed'],
    default: 'created'
  },
  receipt: {
    type: String,
    required: true
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  anonymousId: {
    type: String,
    required: function() {
      return this.isAnonymous;
    }
  },
  donorEmail: {
    type: String,
    required: function() {
      return this.isAnonymous;
    }
  },
  donationType: {
    type: String,
    enum: ['campaign', 'general', 'emergency'],
    default: 'general'
  },
  impactStory: {
    type: String
  }
}, {
  timestamps: true
});

paymentSchema.index({ orderId: 1 });
paymentSchema.index({ user: 1, createdAt: -1 });
paymentSchema.index({ status: 1 });

module.exports = mongoose.model('Payment', paymentSchema);