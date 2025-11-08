// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'donor', 'helper', 'receiver', 'organization', 'ngo'],
      default: 'donor',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // Common fields for all users
    phone: {
      type: String,
      trim: true,
    },
    // Helper-specific fields
    profession: {
      type: String,
      trim: true,
    },
    license: {
      type: String,
      trim: true,
    },
    // Receiver-specific fields
    address: {
      type: String,
      trim: true,
    },
    aadhar: {
      type: String,
      trim: true,
    },
    // Organization-specific fields
    registrationNumber: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    // Admin-specific fields
    adminCode: {
      type: String,
      trim: true,
    },
    // Additional fields for tracking
    trustScore: {
      type: Number,
      default: 0,
    },
    badge: {
      type: String,
      default: null,
    },
    kycStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Indexes for performance
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ verified: 1 });
userSchema.index({ createdAt: -1 });

module.exports = mongoose.model('User', userSchema);
