import React, { useState, useEffect } from 'react';
import { TrendingUp, ShoppingCart, Package, Users, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: { today: 0, month: 0, year: 0, allTime: 0 },
    totalOrders: { today: 0, month: 0, year: 0, allTime: 0 },
    totalProducts: 0,
    totalCustomers: 0
  });
  const [orderStatus, setOrderStatus] = useState({
    pending: 0,
    completed: 0,
    cancelled: 0
  });
  const [lowStockItems, setLowStockItems] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data without authentication
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch orders using public endpoint
        const ordersResponse = await fetch('http://localhost:5000/api/orders/public');
        if (!ordersResponse.ok) {
          throw new Error(`Orders API error: ${ordersResponse.status}`);
        }
        const ordersData = await ordersResponse.json();
        const orders = ordersData.orders || ordersData || [];
        
        // Fetch products (public endpoint)
        const productsResponse = await fetch('http://localhost:5000/api/products');
        if (!productsResponse.ok) {
          throw new Error(`Products API error: ${productsResponse.status}`);
        }
        const productsData = await productsResponse.json();
        const products = productsData.products || productsData || [];

        processDashboardData(orders, products);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const processDashboardData = (orders, products) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentYear = new Date(now.getFullYear(), 0, 1);

    // Calculate sales and orders
    let todaySales = 0;
    let monthSales = 0;
    let yearSales = 0;
    let allTimeSales = 0;
    let todayOrders = 0;
    let monthOrders = 0;
    let yearOrders = 0;
    let allTimeOrders = orders.length;

    const statusCount = {
      pending: 0,
      completed: 0,
      cancelled: 0
    };

    // Monthly sales data for chart
    const monthlySales = Array(12).fill(0);
    const monthlyOrders = Array(12).fill(0);

    orders.forEach(order => {
      const orderDate = new Date(order.createdAt || order.orderDate || order.date);
      const orderAmount = parseFloat(order.totalAmount || order.amount || 0);
      const orderMonth = orderDate.getMonth();

      // Count by status
      const status = (order.status || '').toLowerCase();
      if (status.includes('pending') || status.includes('processing') || status.includes('created')) {
        statusCount.pending++;
      } else if (status.includes('complete') || status.includes('delivered')) {
        statusCount.completed++;
      } else if (status.includes('cancel')) {
        statusCount.cancelled++;
      } else {
        statusCount.pending++; // default to pending
      }

      // Calculate sales and orders by time period
      if (orderDate >= today) {
        todaySales += orderAmount;
        todayOrders++;
      }
      if (orderDate >= currentMonth) {
        monthSales += orderAmount;
        monthOrders++;
      }
      if (orderDate >= currentYear) {
        yearSales += orderAmount;
        yearOrders++;
      }

      // All time sales
      allTimeSales += orderAmount;

      // Monthly data for chart
      monthlySales[orderMonth] += orderAmount;
      monthlyOrders[orderMonth]++;
    });

    // Find low stock items (stock less than 5)
    const lowStock = products.filter(product => {
      const stock = parseFloat(product.stockQuantity || product.quantity || product.stock || 0);
      return stock < 5;
    }).map(product => ({
      name: product.name,
      sku: product.sku || product.productCode || product._id || 'N/A',
      stock: parseFloat(product.stockQuantity || product.quantity || product.stock || 0),
      min: product.minStock || 5 // Default minimum stock level
    }));

    // Get recent orders (last 4 orders)
    const recent = orders
      .sort((a, b) => new Date(b.createdAt || b.orderDate || b.date) - new Date(a.createdAt || a.orderDate || a.date))
      .slice(0, 4)
      .map(order => ({
        id: order.orderNumber || order._id,
        customer: order.user?.name || order.customerName || `${order.userId?.firstName || ''} ${order.userId?.lastName || ''}`.trim() || 'Unknown Customer',
        amount: `₹${(parseFloat(order.totalAmount || order.amount || 0)).toFixed(2)}`,
        time: formatTimeAgo(new Date(order.createdAt || order.orderDate || order.date)),
        status: order.status || 'Pending'
      }));

    // Calculate total customers from orders
    const uniqueCustomerIds = new Set(orders.map(order => order.userId?.toString() || order.user?.name).filter(Boolean));
    const totalCustomers = uniqueCustomerIds.size;

    // Prepare sales trend data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const salesTrendData = months.map((month, index) => ({
      month,
      sales: monthlySales[index],
      orders: monthlyOrders[index]
    }));

    setStats({
      totalSales: {
        today: todaySales,
        month: monthSales,
        year: yearSales,
        allTime: allTimeSales
      },
      totalOrders: {
        today: todayOrders,
        month: monthOrders,
        year: yearOrders,
        allTime: allTimeOrders
      },
      totalProducts: products.length,
      totalCustomers: totalCustomers
    });

    setOrderStatus(statusCount);
    setLowStockItems(lowStock);
    setRecentOrders(recent);
    setSalesData(salesTrendData);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  // Generate chart points based on sales data
  const generateChartPoints = () => {
    if (salesData.length === 0) return "20,200 100,180 180,150 260,170 340,120 420,140 500,100 580,90 660,110 740,80 820,95 900,60";
    
    const maxSales = Math.max(...salesData.map(d => d.sales));
    const points = salesData.map((data, index) => {
      const x = 20 + (index * 73);
      const y = maxSales > 0 ? 200 - (data.sales / maxSales * 160) : 200;
      return `${x},${y}`;
    });
    
    return points.join(' ');
  };

  const statCards = [
    {
      icon: <TrendingUp size={24} />,
      label: 'Total Sales',
      value: formatCurrency(stats.totalSales.allTime),
      period: 'all time',
      month: formatCurrency(stats.totalSales.month),
      year: formatCurrency(stats.totalSales.year),
      change: '+12.5%',
      bgColor: '#d4f4dd'
    },
    {
      icon: <ShoppingCart size={24} />,
      label: 'Total Orders',
      value: formatNumber(stats.totalOrders.allTime),
      period: 'all time',
      month: formatNumber(stats.totalOrders.month),
      year: formatNumber(stats.totalOrders.year),
      change: '+8.2%',
      bgColor: '#dae6ff'
    },
    {
      icon: <Package size={24} />,
      label: 'Total Products',
      value: formatNumber(stats.totalProducts),
      period: 'in stock',
      month: formatNumber(stats.totalProducts),
      year: formatNumber(stats.totalProducts),
      change: '+2.1%',
      bgColor: '#e8d4ff'
    },
    {
      icon: <Users size={24} />,
      label: 'Total Customers',
      value: formatNumber(stats.totalCustomers),
      period: 'registered',
      month: formatNumber(stats.totalCustomers),
      year: formatNumber(stats.totalCustomers),
      change: '+15.3%',
      bgColor: '#ffd4cc'
    }
  ];

  const orderStatusData = [
    { label: 'Pending', count: orderStatus.pending, bgColor: '#fff9db' },
    { label: 'Completed', count: orderStatus.completed, bgColor: '#d4f4dd' },
    { label: 'Cancelled', count: orderStatus.cancelled, bgColor: '#ffd4d4' }
  ];

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.subtitle}>Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      <div style={styles.statsGrid}>
        {statCards.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={{...styles.iconWrapper, backgroundColor: stat.bgColor}}>
              {stat.icon}
            </div>
            <div style={styles.statContent}>
              <p style={styles.statLabel}>{stat.label}</p>
              <p style={styles.statValue}>
                {stat.value} <span style={styles.period}>{stat.period}</span>
              </p>
              <p style={styles.statDetails}>
                Month: {stat.month} &nbsp;&nbsp; Year: {stat.year}
              </p>
            </div>
            <div style={styles.changeIndicator}>
              <TrendingUp size={14} color="#10b981" />
              <span style={styles.changeText}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.leftColumn}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Order Status</h2>
            <div style={styles.orderStatusList}>
              {orderStatusData.map((status, index) => (
                <div key={index} style={styles.orderStatusItem}>
                  <span style={styles.orderStatusLabel}>{status.label}</span>
                  <span style={{...styles.orderStatusBadge, backgroundColor: status.bgColor}}>
                    {status.count} orders
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.alertHeader}>
                <AlertCircle size={20} color="#ef4444" />
                <h2 style={styles.cardTitle}>Low Stock Alerts</h2>
              </div>
              <span style={styles.alertCount}>{lowStockItems.length} items</span>
            </div>
            <div style={styles.stockList}>
              {lowStockItems.length > 0 ? (
                lowStockItems.map((item, index) => (
                  <div key={index} style={styles.stockItem}>
                    <div>
                      <p style={styles.stockName}>{item.name}</p>
                      <p style={styles.stockSku}>SKU: {item.sku}</p>
                    </div>
                    <div style={styles.stockInfo}>
                      <span style={styles.stockCount}>{item.stock}</span>
                      <span style={styles.stockMin}>Min: {item.min}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p style={styles.noData}>No low stock items</p>
              )}
            </div>
          </div>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Sales Trend</h2>
              <select style={styles.dropdown}>
                <option>Last 12 Months</option>
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            <div style={styles.chartPlaceholder}>
              <svg width="100%" height="250" style={{marginTop: '20px'}}>
                <polyline
                  points={generateChartPoints()}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />
                {salesData.map((data, i) => (
                  <text key={i} x={20 + i * 73} y="235" fontSize="11" fill="#666" textAnchor="middle">
                    {data.month}
                  </text>
                ))}
                {/* Add sales values on points */}
                {salesData.map((data, i) => {
                  const maxSales = Math.max(...salesData.map(d => d.sales));
                  const x = 20 + (i * 73);
                  const y = maxSales > 0 ? 200 - (data.sales / maxSales * 160) : 200;
                  return (
                    <text key={i} x={x} y={y - 10} fontSize="10" fill="#3b82f6" textAnchor="middle">
                      ${data.sales > 1000 ? `${(data.sales/1000).toFixed(0)}k` : data.sales.toFixed(0)}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Recent Orders</h2>
              <a href="/admin/order" style={styles.viewAllLink}>View All</a>
            </div>
            <div style={styles.ordersList}>
              {recentOrders.length > 0 ? (
                recentOrders.map((order, index) => (
                  <div key={index} style={styles.orderItem}>
                    <div>
                      <p style={styles.orderId}>{order.id}</p>
                      <p style={styles.orderCustomer}>{order.customer}</p>
                    </div>
                    <div style={styles.orderRight}>
                      <p style={styles.orderAmount}>{order.amount}</p>
                      <div style={styles.orderMeta}>
                        <span style={styles.orderTime}>{order.time}</span>
                        <span style={{...styles.orderStatus, ...getStatusStyle(order.status)}}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={styles.noData}>No recent orders</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getStatusStyle(status) {
  const styles = {
    'Completed': { backgroundColor: '#d4f4dd', color: '#059669' },
    'Pending': { backgroundColor: '#fff9db', color: '#d97706' },
    'Processing': { backgroundColor: '#dae6ff', color: '#2563eb' },
    'Cancelled': { backgroundColor: '#ffd4d4', color: '#dc2626' },
    'Created': { backgroundColor: '#e0e7ff', color: '#3730a3' },
    'Delivered': { backgroundColor: '#d4f4dd', color: '#059669' },
    'Return Requested': { backgroundColor: '#fef3c7', color: '#d97706' }
  };
  return styles[status] || {};
}

const styles = {
  container: {
    padding: '24px',
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    fontSize: '16px',
    color: '#6b7280'
  },
  noData: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '14px',
    padding: '20px 0'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 4px 0'
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '24px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    position: 'relative'
  },
  iconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px'
  },
  statContent: {
    marginBottom: '8px'
  },
  statLabel: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 8px 0'
  },
  statValue: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 4px 0'
  },
  period: {
    fontSize: '13px',
    color: '#9ca3af',
    fontWeight: '400'
  },
  statDetails: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: 0
  },
  changeIndicator: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  changeText: {
    fontSize: '13px',
    color: '#10b981',
    fontWeight: '500'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '400px 1fr',
    gap: '20px'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    margin: 0
  },
  alertHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  alertCount: {
    fontSize: '14px',
    color: '#ef4444',
    fontWeight: '500'
  },
  viewAllLink: {
    fontSize: '14px',
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500'
  },
  orderStatusList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  orderStatusItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0'
  },
  orderStatusLabel: {
    fontSize: '14px',
    color: '#374151'
  },
  orderStatusBadge: {
    padding: '4px 16px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500'
  },
  stockList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  stockItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '16px',
    borderBottom: '1px solid #f3f4f6'
  },
  stockName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#111827',
    margin: '0 0 4px 0'
  },
  stockSku: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: 0
  },
  stockInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '2px'
  },
  stockCount: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#ef4444'
  },
  stockMin: {
    fontSize: '11px',
    color: '#9ca3af'
  },
  dropdown: {
    padding: '6px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#374151',
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  chartPlaceholder: {
    height: '250px',
    backgroundColor: '#fafafa',
    borderRadius: '4px'
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  orderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '16px',
    borderBottom: '1px solid #f3f4f6'
  },
  orderId: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 4px 0'
  },
  orderCustomer: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0
  },
  orderRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  orderAmount: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 6px 0'
  },
  orderMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  orderTime: {
    fontSize: '12px',
    color: '#9ca3af'
  },
  orderStatus: {
    padding: '3px 10px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '500'
  }
};

export default Dashboard; 