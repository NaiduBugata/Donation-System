const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
  createOrder,
  createAnonymousOrder,
  verifyPayment,
  webhook,
  getPaymentHistory,
  getPaymentAnalytics
} = require('../controllers/paymentController');

const router = express.Router();

// Public routes (no authentication required)
router.post('/create-anonymous-order', createAnonymousOrder);
// Razorpay webhook (must receive raw body)
router.post('/webhook', express.raw({ type: '*/*' }), webhook);

// Protected routes (require authentication)
router.post('/create-order', protect, createOrder);
router.post('/verify-payment', verifyPayment); // Allow both authenticated and anonymous
router.get('/history', protect, getPaymentHistory);

// Admin only routes
router.get('/analytics', protect, roleMiddleware(['admin']), getPaymentAnalytics);

module.exports = router;