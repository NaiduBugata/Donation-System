const razorpay = require('../config/razorpay');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Campaign = require('../models/Campaign');
const crypto = require('crypto');

// Create Razorpay order
const createOrder = async (req, res) => {
  try {
    const { amount, campaignId, donationType = 'general' } = req.body;
    const userId = req.user._id;

    // Validate amount
    if (!amount || amount < 100) {
      return res.status(400).json({ 
        success: false,
        message: 'Amount must be at least 100 paise (₹1)' 
      });
    }

    // Create Razorpay order
    const options = {
      amount: parseInt(amount), // Amount in paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}_${userId}`,
      payment_capture: 1,
    };

    console.log('Creating Razorpay order with options:', options);
    const order = await razorpay.orders.create(options);

    // Save payment record
    const payment = new Payment({
      user: userId,
      campaign: campaignId || null,
      orderId: order.id,
      amount: order.amount,
      receipt: order.receipt,
      status: 'created',
      donationType
    });
    
    await payment.save();

    console.log('✅ Order created successfully:', order.id);
    
    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      }
    });

  } catch (error) {
    console.error('❌ Error creating order:', error);
    
    let errorMessage = 'Failed to create order';
    if (error.error && error.error.description) {
      errorMessage = error.error.description;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    res.status(500).json({ 
      success: false,
      message: errorMessage
    });
  }
};

// Verify payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, impactStory } = req.body;
    
    // Verify signature
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest === razorpay_signature) {
      // Update payment record
      const payment = await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          status: 'paid',
          impactStory: impactStory || 'Thank you for your generous donation!'
        },
        { new: true }
      ).populate('user', 'name email').populate('campaign', 'title');

      if (!payment) {
        return res.status(404).json({
          success: false,
          message: 'Payment record not found'
        });
      }

      // If this was a campaign donation, update campaign raised amount
      if (payment.campaign) {
        await Campaign.findByIdAndUpdate(
          payment.campaign._id,
          { $inc: { raisedAmount: payment.amount / 100 } } // Convert paise to rupees
        );
      }

      res.json({ 
        success: true,
        message: 'Payment verified successfully',
        payment: {
          id: payment._id,
          orderId: payment.orderId,
          paymentId: payment.paymentId,
          amount: payment.amount / 100, // Convert to rupees
          status: payment.status,
          impactStory: payment.impactStory,
          createdAt: payment.createdAt
        }
      });
    } else {
      // Update payment record as failed
      await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { status: 'failed' }
      );

      res.status(400).json({ 
        success: false,
        message: 'Payment verification failed - invalid signature' 
      });
    }
  } catch (error) {
    console.error('❌ Payment verification error:', error);
    
    // Try to update payment as failed
    if (req.body.razorpay_order_id) {
      await Payment.findOneAndUpdate(
        { orderId: req.body.razorpay_order_id },
        { status: 'failed' }
      ).catch(console.error);
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Payment verification failed'
    });
  }
};

// Get payment history for user
const getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10, status } = req.query;

    const filter = { user: userId };
    if (status) filter.status = status;

    const payments = await Payment.find(filter)
      .populate('campaign', 'title')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('orderId paymentId amount status createdAt donationType impactStory campaign');

    const total = await Payment.countDocuments(filter);

    res.json({
      success: true,
      data: payments.map(payment => ({
        id: payment._id,
        orderId: payment.orderId,
        paymentId: payment.paymentId,
        amount: payment.amount / 100, // Convert to rupees
        status: payment.status,
        donationType: payment.donationType,
        campaign: payment.campaign?.title || null,
        impactStory: payment.impactStory,
        createdAt: payment.createdAt
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('❌ Error fetching payment history:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching payment history'
    });
  }
};

// Get payment analytics (admin only)
const getPaymentAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const matchCondition = { status: 'paid' };
    if (startDate && endDate) {
      matchCondition.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const analytics = await Payment.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          totalTransactions: { $sum: 1 },
          averageAmount: { $avg: '$amount' }
        }
      }
    ]);

    const typeWiseData = await Payment.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: '$donationType',
          amount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    const result = analytics[0] || { totalAmount: 0, totalTransactions: 0, averageAmount: 0 };

    res.json({
      success: true,
      data: {
        totalAmount: result.totalAmount / 100, // Convert to rupees
        totalTransactions: result.totalTransactions,
        averageAmount: result.averageAmount / 100, // Convert to rupees
        typeWiseBreakdown: typeWiseData.map(item => ({
          type: item._id,
          amount: item.amount / 100,
          count: item.count
        }))
      }
    });
  } catch (error) {
    console.error('❌ Error fetching payment analytics:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching payment analytics'
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getPaymentHistory,
  getPaymentAnalytics
};