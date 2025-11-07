import React, { useState, useEffect } from 'react';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('all'); // all, paid, failed

  useEffect(() => {
    fetchPayments();
  }, [currentPage, filter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      });
      
      if (filter !== 'all') {
        params.append('status', filter);
      }

      const response = await fetch(`/api/payments/history?${params}`);
      const data = await response.json();

      if (data.success) {
        setPayments(data.data);
        setTotalPages(data.pagination.pages);
      } else {
        setError(data.message || 'Failed to fetch payment history');
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
      setError('Error loading payment history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return '#10B981';
      case 'failed': return '#EF4444';
      case 'created': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return '✅';
      case 'failed': return '❌';
      case 'created': return '⏳';
      default: return '❓';
    }
  };

  if (loading && payments.length === 0) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center', 
        color: '#6B7280' 
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        Loading payment history...
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2 style={{ 
          margin: 0, 
          color: '#111827',
          fontSize: '1.875rem',
          fontWeight: '700'
        }}>
          💳 Payment History
        </h2>
        
        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #D1D5DB',
            background: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="all">All Payments</option>
          <option value="paid">Successful</option>
          <option value="failed">Failed</option>
          <option value="created">Pending</option>
        </select>
      </div>

      {error && (
        <div style={{
          background: '#FEE2E2',
          color: '#DC2626',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      {payments.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#6B7280'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</div>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>No payments found</h3>
          <p style={{ margin: 0 }}>You haven't made any donations yet.</p>
        </div>
      ) : (
        <>
          {/* Payment List */}
          <div style={{ space: '1rem' }}>
            {payments.map((payment) => (
              <div
                key={payment.id}
                style={{
                  background: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.25rem' }}>
                        {getStatusIcon(payment.status)}
                      </span>
                      <span style={{
                        color: getStatusColor(payment.status),
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {payment.status}
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: '700',
                      color: '#111827'
                    }}>
                      ₹{payment.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right', fontSize: '0.875rem', color: '#6B7280' }}>
                    {formatDate(payment.createdAt)}
                  </div>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  fontSize: '0.875rem',
                  color: '#6B7280'
                }}>
                  <div>
                    <strong>Order ID:</strong><br />
                    <code style={{ 
                      background: '#F3F4F6', 
                      padding: '2px 6px', 
                      borderRadius: '4px',
                      fontSize: '0.75rem'
                    }}>
                      {payment.orderId}
                    </code>
                  </div>
                  
                  {payment.paymentId && (
                    <div>
                      <strong>Payment ID:</strong><br />
                      <code style={{ 
                        background: '#F3F4F6', 
                        padding: '2px 6px', 
                        borderRadius: '4px',
                        fontSize: '0.75rem'
                      }}>
                        {payment.paymentId}
                      </code>
                    </div>
                  )}
                </div>

                {payment.campaign && (
                  <div style={{ 
                    marginTop: '1rem',
                    padding: '0.75rem',
                    background: '#F9FAFB',
                    borderRadius: '6px',
                    fontSize: '0.875rem'
                  }}>
                    <strong>Campaign:</strong> {payment.campaign}
                  </div>
                )}

                {payment.impactStory && (
                  <div style={{ 
                    marginTop: '1rem',
                    padding: '0.75rem',
                    background: '#FEF3C7',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontStyle: 'italic'
                  }}>
                    💫 {payment.impactStory}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '2rem'
            }}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #D1D5DB',
                  background: currentPage === 1 ? '#F9FAFB' : 'white',
                  borderRadius: '6px',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                ← Previous
              </button>
              
              <span style={{ 
                padding: '8px 16px',
                background: '#F3F4F6',
                borderRadius: '6px',
                fontSize: '0.875rem'
              }}>
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #D1D5DB',
                  background: currentPage === totalPages ? '#F9FAFB' : 'white',
                  borderRadius: '6px',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentHistory;