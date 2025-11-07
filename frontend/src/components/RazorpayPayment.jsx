import React, { useState } from 'react';

const RazorpayPayment = ({ 
  amount, 
  campaignId, 
  donationType = 'general',
  isAnonymous = false,
  donorEmail = '',
  onSuccess, 
  onFailure,
  onCancel,
  children 
}) => {
  const [loading, setLoading] = useState(false);

  // Load Razorpay SDK
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
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    // Check authentication for non-anonymous donations
    if (!isAnonymous) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (!currentUser.id) {
        alert('Please login to make a payment');
        return;
      }
    }

    // Validate email for anonymous donations
    if (isAnonymous && !donorEmail) {
      alert('Please provide an email for anonymous donation tracking');
      return;
    }

    setLoading(true);

    try {
      // Load Razorpay SDK
      const res = await loadRazorpay();
      if (!res) {
        alert('Razorpay SDK failed to load. Please check your internet connection.');
        setLoading(false);
        return;
      }

      // Create Razorpay order (anonymous or authenticated)
      const orderEndpoint = isAnonymous ? '/api/payments/create-anonymous-order' : '/api/payments/create-order';
      const orderPayload = {
        amount: parseFloat(amount) * 100, // Convert to paise
        campaignId: campaignId || null,
        donationType
      };

      // Add anonymous-specific fields
      if (isAnonymous) {
        orderPayload.isAnonymous = true;
        orderPayload.email = donorEmail;
      }

      const orderResponse = await fetch(orderEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const orderData = await orderResponse.json();
      
      if (!orderData.success) {
        alert(orderData.message || 'Failed to create payment order');
        setLoading(false);
        return;
      }

      const order = orderData.order;

      // Razorpay payment options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_RcsavZB6Xb9MD7',
        amount: order.amount,
        currency: order.currency,
        name: '🌍 Social Impact Platform',
        description: `${donationType} donation - ₹${amount}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/payments/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                impactStory: `Thank you for your generous donation of ₹${amount}! Your contribution is making a real difference in someone's life.`
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              const result = {
                payment: verifyData.payment,
                isAnonymous,
                anonymousId: orderData.anonymousId,
                qrCode: orderData.qrCode
              };
              if (onSuccess) onSuccess(result);
            } else {
              if (onFailure) onFailure(verifyData.message);
              else alert('Payment verification failed: ' + verifyData.message);
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            if (onFailure) onFailure('Payment verification failed');
            else alert('Payment verification failed. Please contact support.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: currentUser.name || 'Donor',
          email: currentUser.email || '',
          contact: currentUser.phone || '9999999999'
        },
        theme: {
          color: '#667eea'
        },
        modal: {
          ondismiss: function() {
            if (onCancel) onCancel();
            setLoading(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error('Payment error:', error);
      if (onFailure) onFailure(error.message);
      else alert('Payment failed: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div onClick={handlePayment} style={{ cursor: loading ? 'not-allowed' : 'pointer' }}>
      {children ? React.cloneElement(children, { disabled: loading }) : (
        <button
          disabled={loading}
          style={{
            background: loading ? '#9CA3AF' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Processing...' : `Pay ₹${amount}`}
        </button>
      )}
    </div>
  );
};

export default RazorpayPayment;