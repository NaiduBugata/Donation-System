import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        if (!user?.email) {
          setPayments([]);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/payments/history?email=${encodeURIComponent(user.email)}`);
        setPayments(response.data || []);
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'paid': return 'status-paid';
      case 'created': return 'status-created';
      case 'failed': return 'status-failed';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Loading payment history...</div>;
  }

  return (
    <div className="payment-history">
      <h2>Payment History</h2>
      
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        payments.map(payment => (
          <div key={payment._id} className="payment-item">
            <div>
              <strong>Order ID:</strong> {payment.orderId}<br />
              <strong>Amount:</strong> ₹{(payment.amount / 100).toFixed(2)}<br />
              <strong>Date:</strong> {formatDate(payment.createdAt)}
            </div>
            <div className={`payment-status ${getStatusClass(payment.status)}`}>
              {payment.status.toUpperCase()}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PaymentHistory;
