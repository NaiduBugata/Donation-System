import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState(1000); // ₹10
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setMessage('');

      // Load Razorpay SDK
      const res = await loadRazorpay();
      if (!res) {
        setMessage('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      if (!user?.email) {
        setMessage('Please login to make a payment');
        setLoading(false);
        return;
      }

      // Create order (include user email since JWT has been removed)
      const orderResponse = await axios.post('http://localhost:5000/api/payments/create-order', {
        amount: selectedAmount,
        email: user.email
      });

      const order = orderResponse.data;

      // Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_live_RbdTXMySnEcBkt',
        amount: order.amount,
        currency: order.currency,
        name: 'RazorPay MERN App',
        description: 'Test Transaction',
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await axios.post('http://localhost:5000/api/payments/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse.data.status === 'success') {
              setMessage(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            } else {
              setMessage('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            setMessage('Payment verification failed');
          }
        },
        prefill: {
          name: user?.name || 'Test User',
          email: user?.email || 'test@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: function() {
            setMessage('Payment cancelled by user');
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error('Payment error:', error);
      setMessage(error.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const amountOptions = [
    { value: 1000, label: '₹10' },
    { value: 2000, label: '₹20' },
    { value: 5000, label: '₹50' },
    { value: 10000, label: '₹100' }
  ];

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}!</h1>
      <p>Make a payment using Razorpay</p>

      <div className="payment-card">
        <h3>Make Payment</h3>
        
        <div className="amount-buttons">
          {amountOptions.map(option => (
            <button
              key={option.value}
              className={`amount-btn ${selectedAmount === option.value ? 'active' : ''}`}
              onClick={() => setSelectedAmount(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing...' : `Pay ${(selectedAmount / 100).toFixed(2)}`}
        </button>

        {message && (
          <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-error'} mt-20`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
