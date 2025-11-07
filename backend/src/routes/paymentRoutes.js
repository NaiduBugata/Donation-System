const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
  createOrder,
  verifyPayment,
  getPaymentHistory,
  getPaymentAnalytics
} = require('../controllers/paymentController');

const router = express.Router();

// Protected routes (require authentication)
router.post('/create-order', protect, createOrder);
router.post('/verify-payment', protect, verifyPayment);
router.get('/history', protect, getPaymentHistory);

// Admin only routes
router.get('/analytics', protect, roleMiddleware(['admin']), getPaymentAnalytics);

module.exports = router;