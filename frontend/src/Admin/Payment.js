// export default PaymentsTransactions;
import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, Clock, XCircle, Download, Search, Filter, Smartphone, DollarSign, RefreshCw } from 'lucide-react';

const PaymentsTransactions = () => {
  const [activeTab, setActiveTab] = useState('All Payments');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsData, setPaymentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchPaymentsData = async () => {
      try {
        setLoading(true);
        
        // Fetch orders using public endpoint
        const ordersResponse = await fetch('https://cctvshoppee.onrender.com/api/orders/public');
        if (!ordersResponse.ok) {
          throw new Error(`Orders API error: ${ordersResponse.status}`);
        }
        const ordersData = await ordersResponse.json();
        const orders = ordersData.orders || ordersData || [];

        // Process orders into payment data
        const processedPayments = orders.map(order => {
          const orderDate = new Date(order.createdAt || order.orderDate || order.date);
          const amount = parseFloat(order.totalAmount || order.amount || 0);
          const status = (order.status || '').toLowerCase();
          
          // Determine payment status based on order status
          let paymentStatus = 'Pending';
          let paymentMethod = order.paymentMethod || 'Card';
          
          if (status.includes('completed') || status.includes('delivered') || status.includes('success')) {
            paymentStatus = 'Success';
          } else if (status.includes('failed') || status.includes('cancelled') || status.includes('declined')) {
            paymentStatus = 'Failed';
          } else if (status.includes('pending') || status.includes('processing')) {
            paymentStatus = 'Pending';
          }

          // Determine payment method
          if (order.paymentMethod) {
            paymentMethod = order.paymentMethod;
          } else if (order.paymentType) {
            paymentMethod = order.paymentType;
          } else if (amount === 0) {
            paymentMethod = 'COD';
          }

          return {
            id: `PAY-${(order.orderNumber || order._id || '').toString().slice(-4)}`,
            orderId: `#${order.orderNumber || order._id || 'ORD-' + Math.random().toString(36).substr(2, 6)}`,
            customer: order.user?.name || order.customerName || `${order.userId?.firstName || ''} ${order.userId?.lastName || ''}`.trim() || 'Unknown Customer',
            amount: amount,
            method: paymentMethod,
            status: paymentStatus,
            date: orderDate.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }),
            originalOrder: order
          };
        });

        setPaymentsData(processedPayments);
      } catch (error) {
        console.error('Error fetching payments data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentsData();
  }, []);

  // Calculate stats from real data
  const totalRevenue = paymentsData.reduce((sum, payment) => sum + payment.amount, 0);
  const successfulPayments = paymentsData.filter(p => p.status === 'Success').length;
  const pendingPayments = paymentsData.filter(p => p.status === 'Pending').length;
  const failedPayments = paymentsData.filter(p => p.status === 'Failed').length;

  const getFilteredPayments = () => {
    let filtered = paymentsData;
    
    if (activeTab === 'Success') {
      filtered = filtered.filter(p => p.status === 'Success');
    } else if (activeTab === 'Pending') {
      filtered = filtered.filter(p => p.status === 'Pending');
    } else if (activeTab === 'Failed') {
      filtered = filtered.filter(p => p.status === 'Failed');
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.method.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredPayments = getFilteredPayments();
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  const getStatusStyle = (status) => {
    const styles = {
      'Success': { bg: '#d1fae5', color: '#059669', icon: <CheckCircle size={14} /> },
      'Pending': { bg: '#fef3c7', color: '#d97706', icon: <Clock size={14} /> },
      'Failed': { bg: '#fee2e2', color: '#dc2626', icon: <XCircle size={14} /> }
    };
    return styles[status];
  };

  const getMethodIcon = (method) => {
    const methodLower = method.toLowerCase();
    if (methodLower.includes('card') || methodLower.includes('credit') || methodLower.includes('debit')) {
      return <CreditCard size={16} />;
    } else if (methodLower.includes('upi') || methodLower.includes('digital') || methodLower.includes('wallet')) {
      return <Smartphone size={16} />;
    } else if (methodLower.includes('cod') || methodLower.includes('cash')) {
      return <DollarSign size={16} />;
    } else {
      return <CreditCard size={16} />;
    }
  };

  const retryPayment = (paymentId) => {
    // Implement retry payment logic here
    console.log('Retrying payment:', paymentId);
    alert(`Retrying payment ${paymentId}. This would integrate with your payment gateway.`);
  };

  const exportToExcel = () => {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add headers
    csvContent += "Payment ID,Order ID,Customer,Amount,Payment Method,Status,Date\n";
    
    // Add payment data
    paymentsData.forEach(payment => {
      csvContent += `${payment.id},${payment.orderId},${payment.customer},₹${payment.amount.toFixed(2)},${payment.method},${payment.status},${payment.date}\n`;
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payments_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const StatCard = ({ label, value, change, icon, iconBg }) => {
    const isPositive = !change.startsWith('-');
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{label}</div>
          <div style={{ fontSize: '32px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
            {value}
          </div>
          <div style={{ fontSize: '13px', color: isPositive ? '#059669' : '#dc2626' }}>
            {change}
          </div>
        </div>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '8px',
          backgroundColor: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{
        padding: '32px',
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <p>Loading payment data...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: '32px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              Payments & Transactions
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Track all payment transactions and revenue</p>
          </div>
          <button 
            onClick={exportToExcel}
            style={{
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Download size={16} /> Export Report
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          <StatCard
            label="Total Revenue"
            value={`₹${totalRevenue.toLocaleString()}`}
            change="+15.3%"
            icon={<CreditCard size={24} color="#059669" />}
            iconBg="#d1fae5"
          />
          <StatCard
            label="Successful Payments"
            value={successfulPayments.toLocaleString()}
            change="+12.5%"
            icon={<CheckCircle size={24} color="#059669" />}
            iconBg="#d1fae5"
          />
          <StatCard
            label="Pending Payments"
            value={pendingPayments.toString()}
            change="-5.2%"
            icon={<Clock size={24} color="#d97706" />}
            iconBg="#fef3c7"
          />
          <StatCard
            label="Failed Payments"
            value={failedPayments.toString()}
            change="-8.1%"
            icon={<XCircle size={24} color="#dc2626" />}
            iconBg="#fee2e2"
          />
        </div>

        {/* Main Content */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          {/* Tabs and Search */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['All Payments', 'Success', 'Pending', 'Failed'].map(tab => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: '8px 20px',
                    border: 'none',
                    background: activeTab === tab ? '#d1fae5' : 'transparent',
                    color: activeTab === tab ? '#059669' : '#6b7280',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab} {tab !== 'All Payments' && `(${paymentsData.filter(p => p.status === tab).length})`}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type="text"
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '10px 12px 10px 40px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '14px',
                    width: '280px'
                  }}
                />
              </div>
              <button style={{
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                background: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Filter size={18} color="#374151" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '12px 20px', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    PAYMENT ID
                  </th>
                  <th style={{ padding: '12px 20px', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    ORDER ID
                  </th>
                  <th style={{ padding: '12px 20px', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    CUSTOMER
                  </th>
                  <th style={{ padding: '12px 20px', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    AMOUNT
                  </th>
                  <th style={{ padding: '12px 20px', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    METHOD
                  </th>
                  <th style={{ padding: '12px 20px', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    STATUS
                  </th>
                  <th style={{ padding: '12px 20px', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    DATE
                  </th>
                  {/* <th style={{ padding: '12px 20px', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    ACTION
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {paginatedPayments.length > 0 ? (
                  paginatedPayments.map((payment, index) => {
                    const statusStyle = getStatusStyle(payment.status);
                    return (
                      <tr key={payment.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '16px 20px', fontSize: '14px', color: '#111827', fontWeight: '500' }}>
                          {payment.id}
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '14px', color: '#059669', fontWeight: '500' }}>
                          {payment.orderId}
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '14px', color: '#374151' }}>
                          {payment.customer}
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '14px', color: '#111827', fontWeight: '500' }}>
                          ₹{payment.amount.toFixed(2)}
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#374151', fontSize: '14px' }}>
                            {getMethodIcon(payment.method)}
                            <span>{payment.method}</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '13px',
                            fontWeight: '500',
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color
                          }}>
                            {statusStyle.icon}
                            {payment.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '14px', color: '#6b7280' }}>
                          {payment.date}
                        </td>
                        {/* <td style={{ padding: '16px 20px' }}>
                          {payment.status === 'Failed' ? (
                            <button 
                              onClick={() => retryPayment(payment.id)}
                              style={{
                                color: '#059669',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <RefreshCw size={14} /> Retry
                            </button>
                          ) : (
                            <button style={{
                              color: '#6b7280',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontWeight: '500'
                            }}>
                              View
                            </button>
                          )}
                        </td> */}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" style={{ padding: '40px 20px', textAlign: 'center', color: '#6b7280' }}>
                      No payments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredPayments.length > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPayments.length)} of {filteredPayments.length} payments
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    background: 'white',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    color: '#374151',
                    opacity: currentPage === 1 ? 0.5 : 1
                  }}
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    style={{
                      padding: '8px 12px',
                      border: 'none',
                      borderRadius: '6px',
                      background: currentPage === i + 1 ? '#059669' : 'white',
                      color: currentPage === i + 1 ? 'white' : '#374151',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      minWidth: '36px',
                      border: currentPage === i + 1 ? 'none' : '1px solid #e5e7eb'
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    background: 'white',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    color: '#374151',
                    opacity: currentPage === totalPages ? 0.5 : 1
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsTransactions;
