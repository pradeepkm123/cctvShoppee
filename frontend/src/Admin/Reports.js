// // // import React, { useState } from 'react';
// // // import { TrendingUp, Package, FileText, Users, Download, Box, DollarSign, Calendar } from 'lucide-react';

// // // export default function ReportsAnalytics() {
// // //   const [activeReport, setActiveReport] = useState('Sales');
// // //   const [activeTab, setActiveTab] = useState('Monthly');

// // //   const reportCards = [
// // //     {
// // //       id: 'Sales',
// // //       title: 'Sales Reports',
// // //       value: '$342,891',
// // //       icon: <TrendingUp size={24} />,
// // //       bgColor: '#d4f4dd',
// // //       iconColor: '#10b981'
// // //     },
// // //     {
// // //       id: 'Product',
// // //       title: 'Product Reports',
// // //       value: '1,510',
// // //       icon: <Package size={24} />,
// // //       bgColor: '#dae6ff',
// // //       iconColor: '#3b82f6'
// // //     },
// // //     {
// // //       id: 'Inventory',
// // //       title: 'Inventory Reports',
// // //       value: '$147,320',
// // //       icon: <FileText size={24} />,
// // //       bgColor: '#f3e8ff',
// // //       iconColor: '#a855f7'
// // //     },
// // //     {
// // //       id: 'Customer',
// // //       title: 'Customer Reports',
// // //       value: '5,678',
// // //       icon: <Users size={24} />,
// // //       bgColor: '#fef3c7',
// // //       iconColor: '#f59e0b'
// // //     }
// // //   ];

// // //   const topProducts = [
// // //     { rank: '#1', name: 'Wireless Mouse', units: '342', revenue: '$10254.58', trend: '+15%' },
// // //     { rank: '#2', name: 'Mechanical Keyboard', units: '289', revenue: '$37559.11', trend: '+23%' },
// // //     { rank: '#3', name: 'Bluetooth Speaker', units: '245', revenue: '$19597.55', trend: '+8%' },
// // //     { rank: '#4', name: 'USB Cable Type-C', units: '456', revenue: '$5922.44', trend: '+12%' },
// // //     { rank: '#5', name: 'Laptop Stand', units: '178', revenue: '$8898.22', trend: '+19%' }
// // //   ];

// // //   const inventoryCategories = [
// // //     { name: 'Electronics', items: '245 items', value: '$65,420', status: 'Healthy', statusColor: '#10b981' },
// // //     { name: 'Accessories', items: '432 items', value: '$23,890', status: 'Low Stock', statusColor: '#ef4444' },
// // //     { name: 'Furniture', items: '89 items', value: '$45,670', status: 'Healthy', statusColor: '#10b981' },
// // //     { name: 'Office Supplies', items: '567 items', value: '$12,340', status: 'Overstock', statusColor: '#f59e0b' }
// // //   ];

// // //   const customerMetrics = [
// // //     { label: 'New Customers', value: '456', change: '+23%', changeColor: '#10b981' },
// // //     { label: 'Active Customers', value: '4234', change: '+12%', changeColor: '#10b981' },
// // //     { label: 'Returning Rate', value: '68%', change: '+5%', changeColor: '#10b981' },
// // //     { label: 'Avg Order Value', value: '$142', change: '+8%', changeColor: '#10b981' }
// // //   ];

// // //   const salesMetrics = [
// // //     {
// // //       icon: <DollarSign size={20} />,
// // //       iconBg: '#d4f4dd',
// // //       iconColor: '#10b981',
// // //       label: "Today's Sales",
// // //       value: '$12,426',
// // //       change: '+12.5% from yesterday',
// // //       changeColor: '#10b981'
// // //     },
// // //     {
// // //       icon: <Calendar size={20} />,
// // //       iconBg: '#dae6ff',
// // //       iconColor: '#3b82f6',
// // //       label: 'This Month',
// // //       value: '$342,891',
// // //       change: '+18.2% from last month',
// // //       changeColor: '#10b981'
// // //     },
// // //     {
// // //       icon: <TrendingUp size={20} />,
// // //       iconBg: '#f3e8ff',
// // //       iconColor: '#a855f7',
// // //       label: 'This Year',
// // //       value: '$3,421,567',
// // //       change: '+22.8% from last year',
// // //       changeColor: '#10b981'
// // //     }
// // //   ];

// // //   const renderContent = () => {
// // //     if (activeReport === 'Sales') {
// // //       return (
// // //         <>
// // //           <div style={styles.chartSection}>
// // //             <div style={styles.chartHeader}>
// // //               <div style={styles.chartTitle}>
// // //                 <TrendingUp size={20} />
// // //                 <h2 style={styles.chartHeading}>Sales Performance</h2>
// // //               </div>
// // //               <div style={styles.tabs}>
// // //                 {['Daily', 'Monthly', 'Yearly'].map((tab) => (
// // //                   <button
// // //                     key={tab}
// // //                     onClick={() => setActiveTab(tab)}
// // //                     style={{
// // //                       ...styles.tab,
// // //                       ...(activeTab === tab ? styles.activeTab : {})
// // //                     }}
// // //                   >
// // //                     {tab}
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             <div style={styles.chartArea}>
// // //               <svg width="100%" height="300" style={{marginTop: '20px'}}>
// // //                 <defs>
// // //                   <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
// // //                     <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
// // //                     <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
// // //                   </linearGradient>
// // //                 </defs>

// // //                 <polyline
// // //                   points="0,250 80,220 160,200 240,190 320,210 400,180 480,170 560,160 640,150 720,140 800,120 880,110 960,100 1040,90 1120,80 1200,70"
// // //                   fill="url(#gradient)"
// // //                 />

// // //                 <polyline
// // //                   points="0,250 80,220 160,200 240,190 320,210 400,180 480,170 560,160 640,150 720,140 800,120 880,110 960,100 1040,90 1120,80 1200,70"
// // //                   fill="none"
// // //                   stroke="#10b981"
// // //                   strokeWidth="3"
// // //                 />

// // //                 {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
// // //                   <text key={i} x={i * 100 + 20} y="285" fontSize="12" fill="#9ca3af" textAnchor="middle">
// // //                     {month}
// // //                   </text>
// // //                 ))}
// // //               </svg>
// // //             </div>
// // //           </div>

// // //           <div style={styles.salesMetricsGrid}>
// // //             {salesMetrics.map((metric, index) => (
// // //               <div key={index} style={styles.salesMetricCard}>
// // //                 <div style={{...styles.metricIcon, backgroundColor: metric.iconBg, color: metric.iconColor}}>
// // //                   {metric.icon}
// // //                 </div>
// // //                 <div style={styles.metricContent}>
// // //                   <p style={styles.salesMetricLabel}>{metric.label}</p>
// // //                   <p style={styles.salesMetricValue}>{metric.value}</p>
// // //                   <p style={{...styles.salesMetricChange, color: metric.changeColor}}>
// // //                     {metric.change}
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </>
// // //       );
// // //     }

// // //     if (activeReport === 'Product') {
// // //       return (
// // //         <div style={styles.contentSection}>
// // //           <div style={styles.sectionHeader}>
// // //             <Box size={20} />
// // //             <h2 style={styles.sectionTitle}>Top Performing Products</h2>
// // //           </div>
// // //           <div style={styles.table}>
// // //             <div style={styles.tableHeader}>
// // //               <div style={{...styles.tableCell, width: '10%'}}>RANK</div>
// // //               <div style={{...styles.tableCell, width: '40%'}}>PRODUCT</div>
// // //               <div style={{...styles.tableCell, width: '20%'}}>UNITS SOLD</div>
// // //               <div style={{...styles.tableCell, width: '20%'}}>REVENUE</div>
// // //               <div style={{...styles.tableCell, width: '10%'}}>TREND</div>
// // //             </div>
// // //             {topProducts.map((product, index) => (
// // //               <div key={index} style={styles.tableRow}>
// // //                 <div style={{...styles.tableCell, width: '10%', fontWeight: '600'}}>{product.rank}</div>
// // //                 <div style={{...styles.tableCell, width: '40%', color: '#111827'}}>{product.name}</div>
// // //                 <div style={{...styles.tableCell, width: '20%'}}>{product.units}</div>
// // //                 <div style={{...styles.tableCell, width: '20%', fontWeight: '600'}}>{product.revenue}</div>
// // //                 <div style={{...styles.tableCell, width: '10%', color: '#10b981', fontWeight: '500'}}>{product.trend}</div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       );
// // //     }

// // //     if (activeReport === 'Inventory') {
// // //       return (
// // //         <div style={styles.contentSection}>
// // //           <div style={styles.sectionHeader}>
// // //             <FileText size={20} />
// // //             <h2 style={styles.sectionTitle}>Inventory Overview by Category</h2>
// // //           </div>
// // //           <div style={styles.categoryList}>
// // //             {inventoryCategories.map((category, index) => (
// // //               <div key={index} style={styles.categoryItem}>
// // //                 <div style={styles.categoryLeft}>
// // //                   <p style={styles.categoryName}>{category.name}</p>
// // //                   <p style={styles.categoryItems}>{category.items}</p>
// // //                 </div>
// // //                 <div style={styles.categoryRight}>
// // //                   <p style={styles.categoryValue}>{category.value}</p>
// // //                   <span style={{...styles.categoryStatus, color: category.statusColor}}>
// // //                     {category.status}
// // //                   </span>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       );
// // //     }

// // //     if (activeReport === 'Customer') {
// // //       return (
// // //         <div style={styles.customerMetricsGrid}>
// // //           {customerMetrics.map((metric, index) => (
// // //             <div key={index} style={styles.metricCard}>
// // //               <p style={styles.metricLabel}>{metric.label}</p>
// // //               <p style={styles.metricValue}>
// // //                 {metric.value}
// // //                 <span style={{...styles.metricChange, color: metric.changeColor}}>
// // //                   {' '}{metric.change}
// // //                 </span>
// // //               </p>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       );
// // //     }

// // //     return null;
// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       <div style={styles.header}>
// // //         <div>
// // //           <h1 style={styles.title}>Reports & Analytics</h1>
// // //           <p style={styles.subtitle}>Generate and analyze business reports</p>
// // //         </div>
// // //         <button style={styles.exportButton}>
// // //           <Download size={16} />
// // //           Export All Reports
// // //         </button>
// // //       </div>

// // //       <div style={styles.cardsGrid}>
// // //         {reportCards.map((card, index) => (
// // //           <div
// // //             key={index}
// // //             onClick={() => setActiveReport(card.id)}
// // //             style={{
// // //               ...styles.reportCard,
// // //               border: activeReport === card.id ? `2px solid ${card.iconColor}` : '2px solid transparent',
// // //               cursor: 'pointer'
// // //             }}
// // //           >
// // //             <div style={styles.cardContent}>
// // //               <p style={styles.cardTitle}>{card.title}</p>
// // //               <p style={styles.cardValue}>{card.value}</p>
// // //             </div>
// // //             <div style={{...styles.cardIcon, backgroundColor: card.bgColor, color: card.iconColor}}>
// // //               {card.icon}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {renderContent()}
// // //     </div>
// // //   );
// // // }

// // // const styles = {
// // //   container: {
// // //     padding: '24px',
// // //     backgroundColor: '#f9fafb',
// // //     minHeight: '100vh',
// // //     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
// // //   },
// // //   header: {
// // //     display: 'flex',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'flex-start',
// // //     marginBottom: '24px'
// // //   },
// // //   title: {
// // //     fontSize: '24px',
// // //     fontWeight: '600',
// // //     color: '#111827',
// // //     margin: '0 0 4px 0'
// // //   },
// // //   subtitle: {
// // //     fontSize: '14px',
// // //     color: '#6b7280',
// // //     margin: 0
// // //   },
// // //   exportButton: {
// // //     padding: '10px 20px',
// // //     backgroundColor: '#10b981',
// // //     color: 'white',
// // //     border: 'none',
// // //     borderRadius: '6px',
// // //     fontSize: '14px',
// // //     fontWeight: '500',
// // //     cursor: 'pointer',
// // //     display: 'flex',
// // //     alignItems: 'center',
// // //     gap: '8px'
// // //   },
// // //   cardsGrid: {
// // //     display: 'grid',
// // //     gridTemplateColumns: 'repeat(4, 1fr)',
// // //     gap: '20px',
// // //     marginBottom: '24px'
// // //   },
// // //   reportCard: {
// // //     backgroundColor: 'white',
// // //     padding: '20px',
// // //     borderRadius: '12px',
// // //     display: 'flex',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     transition: 'all 0.2s'
// // //   },
// // //   cardContent: {
// // //     flex: 1
// // //   },
// // //   cardTitle: {
// // //     fontSize: '13px',
// // //     color: '#6b7280',
// // //     margin: '0 0 8px 0'
// // //   },
// // //   cardValue: {
// // //     fontSize: '28px',
// // //     fontWeight: '700',
// // //     color: '#111827',
// // //     margin: 0
// // //   },
// // //   cardIcon: {
// // //     width: '56px',
// // //     height: '56px',
// // //     borderRadius: '12px',
// // //     display: 'flex',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     flexShrink: 0
// // //   },
// // //   chartSection: {
// // //     backgroundColor: 'white',
// // //     padding: '24px',
// // //     borderRadius: '12px',
// // //     marginBottom: '24px',
// // //     border: '1px solid #e5e7eb'
// // //   },
// // //   chartHeader: {
// // //     display: 'flex',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     marginBottom: '20px'
// // //   },
// // //   chartTitle: {
// // //     display: 'flex',
// // //     alignItems: 'center',
// // //     gap: '10px'
// // //   },
// // //   chartHeading: {
// // //     fontSize: '16px',
// // //     fontWeight: '600',
// // //     color: '#111827',
// // //     margin: 0
// // //   },
// // //   tabs: {
// // //     display: 'flex',
// // //     gap: '8px',
// // //     backgroundColor: '#f3f4f6',
// // //     padding: '4px',
// // //     borderRadius: '8px'
// // //   },
// // //   tab: {
// // //     padding: '8px 20px',
// // //     backgroundColor: 'transparent',
// // //     border: 'none',
// // //     borderRadius: '6px',
// // //     fontSize: '13px',
// // //     fontWeight: '500',
// // //     color: '#6b7280',
// // //     cursor: 'pointer',
// // //     transition: 'all 0.2s'
// // //   },
// // //   activeTab: {
// // //     backgroundColor: '#10b981',
// // //     color: 'white'
// // //   },
// // //   chartArea: {
// // //     width: '100%',
// // //     height: '300px',
// // //     position: 'relative'
// // //   },
// // //   salesMetricsGrid: {
// // //     display: 'grid',
// // //     gridTemplateColumns: 'repeat(3, 1fr)',
// // //     gap: '20px'
// // //   },
// // //   salesMetricCard: {
// // //     backgroundColor: 'white',
// // //     padding: '24px',
// // //     borderRadius: '12px',
// // //     border: '1px solid #e5e7eb',
// // //     display: 'flex',
// // //     gap: '16px'
// // //   },
// // //   metricIcon: {
// // //     width: '48px',
// // //     height: '48px',
// // //     borderRadius: '10px',
// // //     display: 'flex',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     flexShrink: 0
// // //   },
// // //   metricContent: {
// // //     flex: 1
// // //   },
// // //   salesMetricLabel: {
// // //     fontSize: '13px',
// // //     color: '#6b7280',
// // //     margin: '0 0 8px 0'
// // //   },
// // //   salesMetricValue: {
// // //     fontSize: '32px',
// // //     fontWeight: '700',
// // //     color: '#111827',
// // //     margin: '0 0 6px 0'
// // //   },
// // //   salesMetricChange: {
// // //     fontSize: '13px',
// // //     fontWeight: '500',
// // //     margin: 0
// // //   },
// // //   contentSection: {
// // //     backgroundColor: 'white',
// // //     padding: '24px',
// // //     borderRadius: '12px',
// // //     border: '1px solid #e5e7eb'
// // //   },
// // //   sectionHeader: {
// // //     display: 'flex',
// // //     alignItems: 'center',
// // //     gap: '10px',
// // //     marginBottom: '24px'
// // //   },
// // //   sectionTitle: {
// // //     fontSize: '16px',
// // //     fontWeight: '600',
// // //     color: '#111827',
// // //     margin: 0
// // //   },
// // //   table: {
// // //     width: '100%'
// // //   },
// // //   tableHeader: {
// // //     display: 'flex',
// // //     padding: '12px 0',
// // //     borderBottom: '2px solid #e5e7eb'
// // //   },
// // //   tableRow: {
// // //     display: 'flex',
// // //     padding: '16px 0',
// // //     borderBottom: '1px solid #f3f4f6',
// // //     alignItems: 'center'
// // //   },
// // //   tableCell: {
// // //     fontSize: '13px',
// // //     color: '#6b7280',
// // //     textTransform: 'uppercase',
// // //     letterSpacing: '0.5px'
// // //   },
// // //   categoryList: {
// // //     display: 'flex',
// // //     flexDirection: 'column',
// // //     gap: '0'
// // //   },
// // //   categoryItem: {
// // //     display: 'flex',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     padding: '24px 0',
// // //     borderBottom: '1px solid #f3f4f6'
// // //   },
// // //   categoryLeft: {
// // //     flex: 1
// // //   },
// // //   categoryName: {
// // //     fontSize: '15px',
// // //     fontWeight: '600',
// // //     color: '#111827',
// // //     margin: '0 0 4px 0'
// // //   },
// // //   categoryItems: {
// // //     fontSize: '13px',
// // //     color: '#6b7280',
// // //     margin: 0
// // //   },
// // //   categoryRight: {
// // //     display: 'flex',
// // //     flexDirection: 'column',
// // //     alignItems: 'flex-end',
// // //     gap: '4px'
// // //   },
// // //   categoryValue: {
// // //     fontSize: '20px',
// // //     fontWeight: '700',
// // //     color: '#111827',
// // //     margin: 0
// // //   },
// // //   categoryStatus: {
// // //     fontSize: '12px',
// // //     fontWeight: '500'
// // //   },
// // //   customerMetricsGrid: {
// // //     display: 'grid',
// // //     gridTemplateColumns: 'repeat(2, 1fr)',
// // //     gap: '20px'
// // //   },
// // //   metricCard: {
// // //     backgroundColor: 'white',
// // //     padding: '24px',
// // //     borderRadius: '12px',
// // //     border: '1px solid #e5e7eb'
// // //   },
// // //   metricLabel: {
// // //     fontSize: '13px',
// // //     color: '#6b7280',
// // //     margin: '0 0 12px 0'
// // //   },
// // //   metricValue: {
// // //     fontSize: '36px',
// // //     fontWeight: '700',
// // //     color: '#111827',
// // //     margin: 0
// // //   },
// // //   metricChange: {
// // //     fontSize: '16px',
// // //     fontWeight: '500',
// // //     marginLeft: '8px'
// // //   }
// // // };












// // import React, { useState, useEffect } from 'react';
// // import { TrendingUp, Package, FileText, Users, Download, Box, DollarSign, Calendar } from 'lucide-react';

// // export default function ReportsAnalytics() {
// //   const [activeReport, setActiveReport] = useState('Sales');
// //   const [activeTab, setActiveTab] = useState('Monthly');
// //   const [loading, setLoading] = useState(true);
// //   const [dashboardData, setDashboardData] = useState({
// //     sales: { today: 0, month: 0, year: 0, allTime: 0 },
// //     products: [],
// //     inventory: [],
// //     customers: { total: 0, new: 0, active: 0, returningRate: 0, avgOrderValue: 0 },
// //     topProducts: []
// //   });

// //   useEffect(() => {
// //     const fetchDashboardData = async () => {
// //       try {
// //         setLoading(true);

// //         // Fetch orders using public endpoint
// //         const ordersResponse = await fetch('http://localhost:5000/api/orders/public');
// //         if (!ordersResponse.ok) {
// //           throw new Error(`Orders API error: ${ordersResponse.status}`);
// //         }
// //         const ordersData = await ordersResponse.json();
// //         const orders = ordersData.orders || ordersData || [];

// //         // Fetch products (public endpoint)
// //         const productsResponse = await fetch('http://localhost:5000/api/products');
// //         if (!productsResponse.ok) {
// //           throw new Error(`Products API error: ${productsResponse.status}`);
// //         }
// //         const productsData = await productsResponse.json();
// //         const products = productsData.products || productsData || [];

// //         processReportsData(orders, products);
// //       } catch (error) {
// //         console.error('Error fetching reports data:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDashboardData();
// //   }, []);

// //   const processReportsData = (orders, products) => {
// //     const now = new Date();
// //     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// //     const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
// //     const currentYear = new Date(now.getFullYear(), 0, 1);

// //     // Calculate sales
// //     let todaySales = 0;
// //     let monthSales = 0;
// //     let yearSales = 0;
// //     let allTimeSales = 0;

// //     // Calculate product sales and units sold
// //     const productSales = {};
// //     const customerOrders = {};
// //     const customerFirstOrder = {};
// //     const customerTotalSpent = {};

// //     orders.forEach(order => {
// //       const orderDate = new Date(order.createdAt || order.orderDate || order.date);
// //       const orderAmount = parseFloat(order.totalAmount || order.amount || 0);
// //       const customerId = order.userId || order.user?.id || 'unknown';

// //       // Calculate sales by time period
// //       if (orderDate >= today) todaySales += orderAmount;
// //       if (orderDate >= currentMonth) monthSales += orderAmount;
// //       if (orderDate >= currentYear) yearSales += orderAmount;
// //       allTimeSales += orderAmount;

// //       // Track customer data
// //       if (!customerOrders[customerId]) {
// //         customerOrders[customerId] = 0;
// //         customerFirstOrder[customerId] = orderDate;
// //         customerTotalSpent[customerId] = 0;
// //       }
// //       customerOrders[customerId]++;
// //       customerTotalSpent[customerId] += orderAmount;

// //       // Calculate product sales
// //       if (order.items && Array.isArray(order.items)) {
// //         order.items.forEach(item => {
// //           const productId = item.product?._id || item.productId || item.name;
// //           if (!productSales[productId]) {
// //             productSales[productId] = {
// //               name: item.product?.name || item.name || 'Unknown Product',
// //               unitsSold: 0,
// //               revenue: 0
// //             };
// //           }
// //           productSales[productId].unitsSold += item.quantity || 1;
// //           productSales[productId].revenue += (item.price || 0) * (item.quantity || 1);
// //         });
// //       }
// //     });

// //     // Calculate inventory by category
// //     const inventoryByCategory = {};
// //     products.forEach(product => {
// //       const category = product.category || 'Uncategorized';
// //       const stock = parseFloat(product.stockQuantity || product.quantity || product.stock || 0);
// //       const price = parseFloat(product.price || 0);

// //       if (!inventoryByCategory[category]) {
// //         inventoryByCategory[category] = {
// //           items: 0,
// //           totalStock: 0,
// //           totalValue: 0
// //         };
// //       }
// //       inventoryByCategory[category].items++;
// //       inventoryByCategory[category].totalStock += stock;
// //       inventoryByCategory[category].totalValue += stock * price;
// //     });

// //     // Calculate customer metrics
// //     const totalCustomers = Object.keys(customerOrders).length;
// //     const thirtyDaysAgo = new Date();
// //     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

// //     let newCustomers = 0;
// //     let activeCustomers = 0;
// //     let returningCustomers = 0;
// //     let totalOrderValue = 0;

// //     Object.keys(customerOrders).forEach(customerId => {
// //       const firstOrderDate = customerFirstOrder[customerId];
// //       const orderCount = customerOrders[customerId];
// //       const totalSpent = customerTotalSpent[customerId];

// //       totalOrderValue += totalSpent;

// //       // New customers (first order in last 30 days)
// //       if (firstOrderDate >= thirtyDaysAgo) newCustomers++;

// //       // Active customers (ordered in last 30 days)
// //       // For demo, we'll consider customers with more than 1 order as active
// //       if (orderCount > 1) activeCustomers++;

// //       // Returning customers (more than 1 order)
// //       if (orderCount > 1) returningCustomers++;
// //     });

// //     const returningRate = totalCustomers > 0 ? (returningCustomers / totalCustomers) * 100 : 0;
// //     const avgOrderValue = totalCustomers > 0 ? totalOrderValue / totalCustomers : 0;

// //     // Prepare top products
// //     const topProducts = Object.values(productSales)
// //       .sort((a, b) => b.revenue - a.revenue)
// //       .slice(0, 5)
// //       .map((product, index) => ({
// //         rank: `#${index + 1}`,
// //         name: product.name,
// //         units: product.unitsSold.toString(),
// //         revenue: `₹ ${product.revenue.toFixed(2)}`,
// //         trend: '+15%' // This would need historical data to calculate properly
// //       }));

// //     // Prepare inventory categories
// //     const inventoryCategories = Object.entries(inventoryByCategory).map(([category, data]) => {
// //       let status = 'Healthy';
// //       let statusColor = '#10b981';
// //       const avgStockPerItem = data.items > 0 ? data.totalStock / data.items : 0;

// //       if (avgStockPerItem < 5) {
// //         status = 'Low Stock';
// //         statusColor = '#ef4444';
// //       } else if (avgStockPerItem > 50) {
// //         status = 'Overstock';
// //         statusColor = '#f59e0b';
// //       }

// //       return {
// //         name: category,
// //         items: `${data.items} items`,
// //         value: `₹ ${data.totalValue.toFixed(2)}`,
// //         status,
// //         statusColor
// //       };
// //     });

// //     setDashboardData({
// //       sales: {
// //         today: todaySales,
// //         month: monthSales,
// //         year: yearSales,
// //         allTime: allTimeSales
// //       },
// //       products: products,
// //       inventory: inventoryCategories,
// //       customers: {
// //         total: totalCustomers,
// //         new: newCustomers,
// //         active: activeCustomers,
// //         returningRate: returningRate,
// //         avgOrderValue: avgOrderValue
// //       },
// //       topProducts: topProducts
// //     });
// //   };

// //   const reportCards = [
// //     {
// //       id: 'Sales',
// //       title: 'Sales Reports',
// //       value: `₹ ${dashboardData.sales.allTime.toLocaleString()}`,
// //       icon: <TrendingUp size={24} />,
// //       bgColor: '#d4f4dd',
// //       iconColor: '#10b981'
// //     },
// //     {
// //       id: 'Product',
// //       title: 'Product Reports',
// //       value: dashboardData.products.length.toString(),
// //       icon: <Package size={24} />,
// //       bgColor: '#dae6ff',
// //       iconColor: '#3b82f6'
// //     },
// //     {
// //       id: 'Inventory',
// //       title: 'Inventory Reports',
// //       value: `₹ ${dashboardData.inventory.reduce((total, category) => total + parseFloat(category.value.replace('$', '') || 0), 0).toLocaleString()}`,
// //       icon: <FileText size={24} />,
// //       bgColor: '#f3e8ff',
// //       iconColor: '#a855f7'
// //     },
// //     {
// //       id: 'Customer',
// //       title: 'Customer Reports',
// //       value: dashboardData.customers.total.toString(),
// //       icon: <Users size={24} />,
// //       bgColor: '#fef3c7',
// //       iconColor: '#f59e0b'
// //     }
// //   ];

// //   const salesMetrics = [
// //     {
// //       icon: <DollarSign size={20} />,
// //       iconBg: '#d4f4dd',
// //       iconColor: '#10b981',
// //       label: "Today's Sales",
// //       value: `₹ ${dashboardData.sales.today.toLocaleString()}`,
// //       change: '+12.5% from yesterday',
// //       changeColor: '#10b981'
// //     },
// //     {
// //       icon: <Calendar size={20} />,
// //       iconBg: '#dae6ff',
// //       iconColor: '#3b82f6',
// //       label: 'This Month',
// //       value: `₹ ${dashboardData.sales.month.toLocaleString()}`,
// //       change: '+18.2% from last month',
// //       changeColor: '#10b981'
// //     },
// //     {
// //       icon: <TrendingUp size={20} />,
// //       iconBg: '#f3e8ff',
// //       iconColor: '#a855f7',
// //       label: 'This Year',
// //       value: `₹ ${dashboardData.sales.year.toLocaleString()}`,
// //       change: '+22.8% from last year',
// //       changeColor: '#10b981'
// //     }
// //   ];

// //   const customerMetrics = [
// //     { 
// //       label: 'New Customers', 
// //       value: dashboardData.customers.new.toString(), 
// //       change: '+23%', 
// //       changeColor: '#10b981' 
// //     },
// //     { 
// //       label: 'Active Customers', 
// //       value: dashboardData.customers.active.toString(), 
// //       change: '+12%', 
// //       changeColor: '#10b981' 
// //     },
// //     { 
// //       label: 'Returning Rate', 
// //       value: `${dashboardData.customers.returningRate.toFixed(1)}%`, 
// //       change: '+5%', 
// //       changeColor: '#10b981' 
// //     },
// //     { 
// //       label: 'Avg Order Value', 
// //       value: `$${dashboardData.customers.avgOrderValue.toFixed(2)}`, 
// //       change: '+8%', 
// //       changeColor: '#10b981' 
// //     }
// //   ];

// //   const renderContent = () => {
// //     if (loading) {
// //       return (
// //         <div style={styles.loading}>
// //           <p>Loading reports data...</p>
// //         </div>
// //       );
// //     }

// //     if (activeReport === 'Sales') {
// //       return (
// //         <>
// //           <div style={styles.chartSection}>
// //             <div style={styles.chartHeader}>
// //               <div style={styles.chartTitle}>
// //                 <TrendingUp size={20} />
// //                 <h2 style={styles.chartHeading}>Sales Performance</h2>
// //               </div>
// //               <div style={styles.tabs}>
// //                 {['Daily', 'Monthly', 'Yearly'].map((tab) => (
// //                   <button
// //                     key={tab}
// //                     onClick={() => setActiveTab(tab)}
// //                     style={{
// //                       ...styles.tab,
// //                       ...(activeTab === tab ? styles.activeTab : {})
// //                     }}
// //                   >
// //                     {tab}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             <div style={styles.chartArea}>
// //               <svg width="100%" height="300" style={{marginTop: '20px'}}>
// //                 <defs>
// //                   <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
// //                     <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
// //                     <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
// //                   </linearGradient>
// //                 </defs>

// //                 <polyline
// //                   points="0,250 80,220 160,200 240,190 320,210 400,180 480,170 560,160 640,150 720,140 800,120 880,110 960,100 1040,90 1120,80 1200,70"
// //                   fill="url(#gradient)"
// //                 />

// //                 <polyline
// //                   points="0,250 80,220 160,200 240,190 320,210 400,180 480,170 560,160 640,150 720,140 800,120 880,110 960,100 1040,90 1120,80 1200,70"
// //                   fill="none"
// //                   stroke="#10b981"
// //                   strokeWidth="3"
// //                 />

// //                 {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
// //                   <text key={i} x={i * 100 + 20} y="285" fontSize="12" fill="#9ca3af" textAnchor="middle">
// //                     {month}
// //                   </text>
// //                 ))}
// //               </svg>
// //             </div>
// //           </div>

// //           <div style={styles.salesMetricsGrid}>
// //             {salesMetrics.map((metric, index) => (
// //               <div key={index} style={styles.salesMetricCard}>
// //                 <div style={{...styles.metricIcon, backgroundColor: metric.iconBg, color: metric.iconColor}}>
// //                   {metric.icon}
// //                 </div>
// //                 <div style={styles.metricContent}>
// //                   <p style={styles.salesMetricLabel}>{metric.label}</p>
// //                   <p style={styles.salesMetricValue}>{metric.value}</p>
// //                   <p style={{...styles.salesMetricChange, color: metric.changeColor}}>
// //                     {metric.change}
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </>
// //       );
// //     }

// //     if (activeReport === 'Product') {
// //       return (
// //         <div style={styles.contentSection}>
// //           <div style={styles.sectionHeader}>
// //             <Box size={20} />
// //             <h2 style={styles.sectionTitle}>Top Performing Products</h2>
// //           </div>
// //           <div style={styles.table}>
// //             <div style={styles.tableHeader}>
// //               <div style={{...styles.tableCell, width: '10%'}}>RANK</div>
// //               <div style={{...styles.tableCell, width: '40%'}}>PRODUCT</div>
// //               <div style={{...styles.tableCell, width: '20%'}}>UNITS SOLD</div>
// //               <div style={{...styles.tableCell, width: '20%'}}>REVENUE</div>
// //               <div style={{...styles.tableCell, width: '10%'}}>TREND</div>
// //             </div>
// //             {dashboardData.topProducts.length > 0 ? (
// //               dashboardData.topProducts.map((product, index) => (
// //                 <div key={index} style={styles.tableRow}>
// //                   <div style={{...styles.tableCell, width: '10%', fontWeight: '600'}}>{product.rank}</div>
// //                   <div style={{...styles.tableCell, width: '40%', color: '#111827'}}>{product.name}</div>
// //                   <div style={{...styles.tableCell, width: '20%'}}>{product.units}</div>
// //                   <div style={{...styles.tableCell, width: '20%', fontWeight: '600'}}>{product.revenue}</div>
// //                   <div style={{...styles.tableCell, width: '10%', color: '#10b981', fontWeight: '500'}}>{product.trend}</div>
// //                 </div>
// //               ))
// //             ) : (
// //               <div style={styles.noData}>
// //                 <p>No product sales data available</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       );
// //     }

// //     if (activeReport === 'Inventory') {
// //       return (
// //         <div style={styles.contentSection}>
// //           <div style={styles.sectionHeader}>
// //             <FileText size={20} />
// //             <h2 style={styles.sectionTitle}>Inventory Overview by Category</h2>
// //           </div>
// //           <div style={styles.categoryList}>
// //             {dashboardData.inventory.length > 0 ? (
// //               dashboardData.inventory.map((category, index) => (
// //                 <div key={index} style={styles.categoryItem}>
// //                   <div style={styles.categoryLeft}>
// //                     <p style={styles.categoryName}>{category.name}</p>
// //                     <p style={styles.categoryItems}>{category.items}</p>
// //                   </div>
// //                   <div style={styles.categoryRight}>
// //                     <p style={styles.categoryValue}>{category.value}</p>
// //                     <span style={{...styles.categoryStatus, color: category.statusColor}}>
// //                       {category.status}
// //                     </span>
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <div style={styles.noData}>
// //                 <p>No inventory data available</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       );
// //     }

// //     if (activeReport === 'Customer') {
// //       return (
// //         <div style={styles.customerMetricsGrid}>
// //           {customerMetrics.map((metric, index) => (
// //             <div key={index} style={styles.metricCard}>
// //               <p style={styles.metricLabel}>{metric.label}</p>
// //               <p style={styles.metricValue}>
// //                 {metric.value}
// //                 <span style={{...styles.metricChange, color: metric.changeColor}}>
// //                   {' '}{metric.change}
// //                 </span>
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       );
// //     }

// //     return null;
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <div style={styles.header}>
// //         <div>
// //           <h1 style={styles.title}>Reports & Analytics</h1>
// //           <p style={styles.subtitle}>Generate and analyze business reports</p>
// //         </div>
// //         <button style={styles.exportButton}>
// //           <Download size={16} />
// //           Export All Reports
// //         </button>
// //       </div>

// //       <div style={styles.cardsGrid}>
// //         {reportCards.map((card, index) => (
// //           <div
// //             key={index}
// //             onClick={() => setActiveReport(card.id)}
// //             style={{
// //               ...styles.reportCard,
// //               border: activeReport === card.id ? `2px solid ${card.iconColor}` : '2px solid transparent',
// //               cursor: 'pointer'
// //             }}
// //           >
// //             <div style={styles.cardContent}>
// //               <p style={styles.cardTitle}>{card.title}</p>
// //               <p style={styles.cardValue}>{card.value}</p>
// //             </div>
// //             <div style={{...styles.cardIcon, backgroundColor: card.bgColor, color: card.iconColor}}>
// //               {card.icon}
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {renderContent()}
// //     </div>
// //   );
// // }

// // const styles = {
// //   container: {
// //     padding: '24px',
// //     backgroundColor: '#f9fafb',
// //     minHeight: '100vh',
// //     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
// //   },
// //   loading: {
// //     display: 'flex',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     height: '200px',
// //     fontSize: '16px',
// //     color: '#6b7280'
// //   },
// //   noData: {
// //     textAlign: 'center',
// //     padding: '40px',
// //     color: '#6b7280'
// //   },
// //   header: {
// //     display: 'flex',
// //     justifyContent: 'space-between',
// //     alignItems: 'flex-start',
// //     marginBottom: '24px'
// //   },
// //   title: {
// //     fontSize: '24px',
// //     fontWeight: '600',
// //     color: '#111827',
// //     margin: '0 0 4px 0'
// //   },
// //   subtitle: {
// //     fontSize: '14px',
// //     color: '#6b7280',
// //     margin: 0
// //   },
// //   exportButton: {
// //     padding: '10px 20px',
// //     backgroundColor: '#10b981',
// //     color: 'white',
// //     border: 'none',
// //     borderRadius: '6px',
// //     fontSize: '14px',
// //     fontWeight: '500',
// //     cursor: 'pointer',
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: '8px'
// //   },
// //   cardsGrid: {
// //     display: 'grid',
// //     gridTemplateColumns: 'repeat(4, 1fr)',
// //     gap: '20px',
// //     marginBottom: '24px'
// //   },
// //   reportCard: {
// //     backgroundColor: 'white',
// //     padding: '20px',
// //     borderRadius: '12px',
// //     display: 'flex',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     transition: 'all 0.2s'
// //   },
// //   cardContent: {
// //     flex: 1
// //   },
// //   cardTitle: {
// //     fontSize: '13px',
// //     color: '#6b7280',
// //     margin: '0 0 8px 0'
// //   },
// //   cardValue: {
// //     fontSize: '28px',
// //     fontWeight: '700',
// //     color: '#111827',
// //     margin: 0
// //   },
// //   cardIcon: {
// //     width: '56px',
// //     height: '56px',
// //     borderRadius: '12px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     flexShrink: 0
// //   },
// //   chartSection: {
// //     backgroundColor: 'white',
// //     padding: '24px',
// //     borderRadius: '12px',
// //     marginBottom: '24px',
// //     border: '1px solid #e5e7eb'
// //   },
// //   chartHeader: {
// //     display: 'flex',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: '20px'
// //   },
// //   chartTitle: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: '10px'
// //   },
// //   chartHeading: {
// //     fontSize: '16px',
// //     fontWeight: '600',
// //     color: '#111827',
// //     margin: 0
// //   },
// //   tabs: {
// //     display: 'flex',
// //     gap: '8px',
// //     backgroundColor: '#f3f4f6',
// //     padding: '4px',
// //     borderRadius: '8px'
// //   },
// //   tab: {
// //     padding: '8px 20px',
// //     backgroundColor: 'transparent',
// //     border: 'none',
// //     borderRadius: '6px',
// //     fontSize: '13px',
// //     fontWeight: '500',
// //     color: '#6b7280',
// //     cursor: 'pointer',
// //     transition: 'all 0.2s'
// //   },
// //   activeTab: {
// //     backgroundColor: '#10b981',
// //     color: 'white'
// //   },
// //   chartArea: {
// //     width: '100%',
// //     height: '300px',
// //     position: 'relative'
// //   },
// //   salesMetricsGrid: {
// //     display: 'grid',
// //     gridTemplateColumns: 'repeat(3, 1fr)',
// //     gap: '20px'
// //   },
// //   salesMetricCard: {
// //     backgroundColor: 'white',
// //     padding: '24px',
// //     borderRadius: '12px',
// //     border: '1px solid #e5e7eb',
// //     display: 'flex',
// //     gap: '16px'
// //   },
// //   metricIcon: {
// //     width: '48px',
// //     height: '48px',
// //     borderRadius: '10px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     flexShrink: 0
// //   },
// //   metricContent: {
// //     flex: 1
// //   },
// //   salesMetricLabel: {
// //     fontSize: '13px',
// //     color: '#6b7280',
// //     margin: '0 0 8px 0'
// //   },
// //   salesMetricValue: {
// //     fontSize: '32px',
// //     fontWeight: '700',
// //     color: '#111827',
// //     margin: '0 0 6px 0'
// //   },
// //   salesMetricChange: {
// //     fontSize: '13px',
// //     fontWeight: '500',
// //     margin: 0
// //   },
// //   contentSection: {
// //     backgroundColor: 'white',
// //     padding: '24px',
// //     borderRadius: '12px',
// //     border: '1px solid #e5e7eb'
// //   },
// //   sectionHeader: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: '10px',
// //     marginBottom: '24px'
// //   },
// //   sectionTitle: {
// //     fontSize: '16px',
// //     fontWeight: '600',
// //     color: '#111827',
// //     margin: 0
// //   },
// //   table: {
// //     width: '100%'
// //   },
// //   tableHeader: {
// //     display: 'flex',
// //     padding: '12px 0',
// //     borderBottom: '2px solid #e5e7eb'
// //   },
// //   tableRow: {
// //     display: 'flex',
// //     padding: '16px 0',
// //     borderBottom: '1px solid #f3f4f6',
// //     alignItems: 'center'
// //   },
// //   tableCell: {
// //     fontSize: '13px',
// //     color: '#6b7280',
// //     textTransform: 'uppercase',
// //     letterSpacing: '0.5px'
// //   },
// //   categoryList: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     gap: '0'
// //   },
// //   categoryItem: {
// //     display: 'flex',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     padding: '24px 0',
// //     borderBottom: '1px solid #f3f4f6'
// //   },
// //   categoryLeft: {
// //     flex: 1
// //   },
// //   categoryName: {
// //     fontSize: '15px',
// //     fontWeight: '600',
// //     color: '#111827',
// //     margin: '0 0 4px 0'
// //   },
// //   categoryItems: {
// //     fontSize: '13px',
// //     color: '#6b7280',
// //     margin: 0
// //   },
// //   categoryRight: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'flex-end',
// //     gap: '4px'
// //   },
// //   categoryValue: {
// //     fontSize: '20px',
// //     fontWeight: '700',
// //     color: '#111827',
// //     margin: 0
// //   },
// //   categoryStatus: {
// //     fontSize: '12px',
// //     fontWeight: '500'
// //   },
// //   customerMetricsGrid: {
// //     display: 'grid',
// //     gridTemplateColumns: 'repeat(2, 1fr)',
// //     gap: '20px'
// //   },
// //   metricCard: {
// //     backgroundColor: 'white',
// //     padding: '24px',
// //     borderRadius: '12px',
// //     border: '1px solid #e5e7eb'
// //   },
// //   metricLabel: {
// //     fontSize: '13px',
// //     color: '#6b7280',
// //     margin: '0 0 12px 0'
// //   },
// //   metricValue: {
// //     fontSize: '36px',
// //     fontWeight: '700',
// //     color: '#111827',
// //     margin: 0
// //   },
// //   metricChange: {
// //     fontSize: '16px',
// //     fontWeight: '500',
// //     marginLeft: '8px'
// //   }
// // };
// import React, { useState, useEffect } from 'react';
// import { TrendingUp, Package, FileText, Users, Download, Box, DollarSign, Calendar } from 'lucide-react';

// export default function ReportsAnalytics() {
//   const [activeReport, setActiveReport] = useState('Sales');
//   const [activeTab, setActiveTab] = useState('Monthly');
//   const [loading, setLoading] = useState(true);
//   const [dashboardData, setDashboardData] = useState({
//     sales: { today: 0, month: 0, year: 0, allTime: 0, dailyData: [], monthlyData: [], yearlyData: [] },
//     products: [],
//     inventory: [],
//     customers: { total: 0, new: 0, active: 0, returningRate: 0, avgOrderValue: 0 },
//     topProducts: [],
//     deliveredOrders: []
//   });

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);

//         // Fetch orders using public endpoint
//         const ordersResponse = await fetch('http://localhost:5000/api/orders/public');
//         if (!ordersResponse.ok) {
//           throw new Error(`Orders API error: ${ordersResponse.status}`);
//         }
//         const ordersData = await ordersResponse.json();
//         const orders = ordersData.orders || ordersData || [];

//         // Fetch products (public endpoint)
//         const productsResponse = await fetch('http://localhost:5000/api/products');
//         if (!productsResponse.ok) {
//           throw new Error(`Products API error: ${productsResponse.status}`);
//         }
//         const productsData = await productsResponse.json();
//         const products = productsData.products || productsData || [];

//         processReportsData(orders, products);
//       } catch (error) {
//         console.error('Error fetching reports data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const processReportsData = (orders, products) => {
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//     const currentYear = new Date(now.getFullYear(), 0, 1);

//     // Calculate sales
//     let todaySales = 0;
//     let monthSales = 0;
//     let yearSales = 0;
//     let allTimeSales = 0;

//     // For chart data
//     const dailyData = Array(7).fill(0).map((_, i) => ({ day: i, sales: 0 }));
//     const monthlyData = Array(12).fill(0).map((_, i) => ({ month: i, sales: 0 }));
//     const yearlyData = Array(5).fill(0).map((_, i) => ({ year: now.getFullYear() - 4 + i, sales: 0 }));

//     // Calculate product sales and units sold
//     const productSales = {};
//     const customerOrders = {};
//     const customerFirstOrder = {};
//     const customerTotalSpent = {};
//     const deliveredOrders = [];

//     orders.forEach(order => {
//       const orderDate = new Date(order.createdAt || order.orderDate || order.date);
//       const orderAmount = parseFloat(order.totalAmount || order.amount || 0);
//       const customerId = order.userId || order.user?.id || 'unknown';
//       const orderStatus = (order.status || '').toLowerCase();

//       // Track delivered orders for product reports
//       if (orderStatus.includes('delivered') || orderStatus.includes('completed')) {
//         deliveredOrders.push(order);
//       }

//       // Calculate sales by time period
//       if (orderDate >= today) todaySales += orderAmount;
//       if (orderDate >= currentMonth) monthSales += orderAmount;
//       if (orderDate >= currentYear) yearSales += orderAmount;
//       allTimeSales += orderAmount;

//       // Chart data
//       const dayOfWeek = orderDate.getDay();
//       const month = orderDate.getMonth();
//       const year = orderDate.getFullYear();

//       if (orderDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)) {
//         dailyData[dayOfWeek].sales += orderAmount;
//       }
//       if (orderDate >= currentYear) {
//         monthlyData[month].sales += orderAmount;
//       }
//       const yearIndex = yearlyData.findIndex(y => y.year === year);
//       if (yearIndex !== -1) {
//         yearlyData[yearIndex].sales += orderAmount;
//       }

//       // Track customer data
//       if (!customerOrders[customerId]) {
//         customerOrders[customerId] = 0;
//         customerFirstOrder[customerId] = orderDate;
//         customerTotalSpent[customerId] = 0;
//       }
//       customerOrders[customerId]++;
//       customerTotalSpent[customerId] += orderAmount;

//       // Calculate product sales from delivered orders only
//       if ((orderStatus.includes('delivered') || orderStatus.includes('completed')) && order.items && Array.isArray(order.items)) {
//         order.items.forEach(item => {
//           const productId = item.product?._id || item.productId || item.name;
//           if (!productSales[productId]) {
//             productSales[productId] = {
//               name: item.product?.name || item.name || 'Unknown Product',
//               unitsSold: 0,
//               revenue: 0
//             };
//           }
//           productSales[productId].unitsSold += item.quantity || 1;
//           productSales[productId].revenue += (item.price || 0) * (item.quantity || 1);
//         });
//       }
//     });

//     // Calculate inventory by category
//     const inventoryByCategory = {};
//     let totalInventoryValue = 0;

//     products.forEach(product => {
//       const category = product.category || 'Uncategorized';
//       const stock = parseFloat(product.stockQuantity || product.quantity || product.stock || 0);
//       const price = parseFloat(product.price || 0);
//       const productValue = stock * price;

//       if (!inventoryByCategory[category]) {
//         inventoryByCategory[category] = {
//           items: 0,
//           totalStock: 0,
//           totalValue: 0
//         };
//       }
//       inventoryByCategory[category].items++;
//       inventoryByCategory[category].totalStock += stock;
//       inventoryByCategory[category].totalValue += productValue;
//       totalInventoryValue += productValue;
//     });

//     // Calculate customer metrics
//     const totalCustomers = Object.keys(customerOrders).length;
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

//     let newCustomers = 0;
//     let activeCustomers = 0;
//     let returningCustomers = 0;
//     let totalOrderValue = 0;

//     Object.keys(customerOrders).forEach(customerId => {
//       const firstOrderDate = customerFirstOrder[customerId];
//       const orderCount = customerOrders[customerId];
//       const totalSpent = customerTotalSpent[customerId];

//       totalOrderValue += totalSpent;

//       // New customers (first order in last 30 days)
//       if (firstOrderDate >= thirtyDaysAgo) newCustomers++;

//       // Active customers (ordered in last 30 days)
//       const lastOrderDate = firstOrderDate; // This should be the latest order date
//       if (lastOrderDate >= thirtyDaysAgo) activeCustomers++;

//       // Returning customers (more than 1 order)
//       if (orderCount > 1) returningCustomers++;
//     });

//     const returningRate = totalCustomers > 0 ? (returningCustomers / totalCustomers) * 100 : 0;
//     const avgOrderValue = totalCustomers > 0 ? totalOrderValue / totalCustomers : 0;

//     // Prepare top products (only from delivered orders)
//     const topProducts = Object.values(productSales)
//       .sort((a, b) => b.revenue - a.revenue)
//       .slice(0, 5)
//       .map((product, index) => ({
//         rank: `#${index + 1}`,
//         name: product.name,
//         units: product.unitsSold.toString(),
//         revenue: `₹${product.revenue.toFixed(2)}`,
//         trend: '+15%'
//       }));

//     // Prepare inventory categories
//     const inventoryCategories = Object.entries(inventoryByCategory).map(([category, data]) => {
//       let status = 'Healthy';
//       let statusColor = '#10b981';
//       const avgStockPerItem = data.items > 0 ? data.totalStock / data.items : 0;

//       if (avgStockPerItem < 5) {
//         status = 'Low Stock';
//         statusColor = '#ef4444';
//       } else if (avgStockPerItem > 50) {
//         status = 'Overstock';
//         statusColor = '#f59e0b';
//       }

//       return {
//         name: category,
//         items: `${data.items} items`,
//         totalStock: data.totalStock,
//         value: `₹${data.totalValue.toFixed(2)}`,
//         status,
//         statusColor
//       };
//     });

//     setDashboardData({
//       sales: {
//         today: todaySales,
//         month: monthSales,
//         year: yearSales,
//         allTime: allTimeSales,
//         dailyData,
//         monthlyData,
//         yearlyData
//       },
//       products: products,
//       inventory: inventoryCategories,
//       customers: {
//         total: totalCustomers,
//         new: newCustomers,
//         active: activeCustomers,
//         returningRate: returningRate,
//         avgOrderValue: avgOrderValue
//       },
//       topProducts: topProducts,
//       deliveredOrders: deliveredOrders,
//       totalInventoryValue: totalInventoryValue
//     });
//   };

//   const generateChartPoints = (data, maxValue) => {
//     if (!data || data.length === 0) return "20,200 100,180 180,150 260,170 340,120 420,140 500,100 580,90 660,110 740,80 820,95 900,60";

//     const points = data.map((item, index) => {
//       const x = 20 + (index * (1160 / (data.length - 1)));
//       const y = maxValue > 0 ? 200 - (item.sales / maxValue * 160) : 200;
//       return `${x},${y}`;
//     });

//     return points.join(' ');
//   };

//   const getChartData = () => {
//     switch (activeTab) {
//       case 'Daily':
//         return {
//           data: dashboardData.sales.dailyData,
//           labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//           maxValue: Math.max(...dashboardData.sales.dailyData.map(d => d.sales))
//         };
//       case 'Monthly':
//         return {
//           data: dashboardData.sales.monthlyData,
//           labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//           maxValue: Math.max(...dashboardData.sales.monthlyData.map(d => d.sales))
//         };
//       case 'Yearly':
//         return {
//           data: dashboardData.sales.yearlyData,
//           labels: dashboardData.sales.yearlyData.map(d => d.year.toString()),
//           maxValue: Math.max(...dashboardData.sales.yearlyData.map(d => d.sales))
//         };
//       default:
//         return {
//           data: dashboardData.sales.monthlyData,
//           labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//           maxValue: Math.max(...dashboardData.sales.monthlyData.map(d => d.sales))
//         };
//     }
//   };

//   const exportToExcel = () => {
//     // Create CSV content
//     let csvContent = "data:text/csv;charset=utf-8,";

//     // Add headers
//     csvContent += "Report Type,Data\n";

//     // Add sales data
//     csvContent += "Sales Report,\n";
//     csvContent += "Today's Sales,₹" + dashboardData.sales.today.toLocaleString() + "\n";
//     csvContent += "This Month,₹" + dashboardData.sales.month.toLocaleString() + "\n";
//     csvContent += "This Year,₹" + dashboardData.sales.year.toLocaleString() + "\n";
//     csvContent += "All Time,₹" + dashboardData.sales.allTime.toLocaleString() + "\n\n";

//     // Add product data
//     csvContent += "Top Products Report,\n";
//     csvContent += "Rank,Product Name,Units Sold,Revenue\n";
//     dashboardData.topProducts.forEach(product => {
//       csvContent += `${product.rank},${product.name},${product.units},${product.revenue}\n`;
//     });
//     csvContent += "\n";

//     // Add inventory data
//     csvContent += "Inventory Report,\n";
//     csvContent += "Category,Items,Total Stock,Total Value,Status\n";
//     dashboardData.inventory.forEach(category => {
//       csvContent += `${category.name},${category.items},${category.totalStock},${category.value},${category.status}\n`;
//     });
//     csvContent += "\n";

//     // Add customer data
//     csvContent += "Customer Report,\n";
//     csvContent += "Metric,Value\n";
//     csvContent += `Total Customers,${dashboardData.customers.total}\n`;
//     csvContent += `New Customers,${dashboardData.customers.new}\n`;
//     csvContent += `Active Customers,${dashboardData.customers.active}\n`;
//     csvContent += `Returning Rate,${dashboardData.customers.returningRate.toFixed(1)}%\n`;
//     csvContent += `Average Order Value,₹${dashboardData.customers.avgOrderValue.toFixed(2)}\n`;

//     // Create download link
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "business_reports.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const reportCards = [
//     {
//       id: 'Sales',
//       title: 'Sales Reports',
//       value: `₹${dashboardData.sales.allTime.toLocaleString()}`,
//       icon: <TrendingUp size={24} />,
//       bgColor: '#d4f4dd',
//       iconColor: '#10b981'
//     },
//     {
//       id: 'Product',
//       title: 'Product Reports',
//       value: dashboardData.topProducts.length.toString(),
//       icon: <Package size={24} />,
//       bgColor: '#dae6ff',
//       iconColor: '#3b82f6'
//     },
//     {
//       id: 'Inventory',
//       title: 'Inventory Reports',
//       value: `₹${dashboardData.totalInventoryValue?.toLocaleString() || '0'}`,
//       icon: <FileText size={24} />,
//       bgColor: '#f3e8ff',
//       iconColor: '#a855f7'
//     },
//     {
//       id: 'Customer',
//       title: 'Customer Reports',
//       value: dashboardData.customers.total.toString(),
//       icon: <Users size={24} />,
//       bgColor: '#fef3c7',
//       iconColor: '#f59e0b'
//     }
//   ];

//   const salesMetrics = [
//     {
//       icon: <DollarSign size={20} />,
//       iconBg: '#d4f4dd',
//       iconColor: '#10b981',
//       label: "Today's Sales",
//       value: `₹${dashboardData.sales.today.toLocaleString()}`,
//       change: '+12.5% from yesterday',
//       changeColor: '#10b981'
//     },
//     {
//       icon: <Calendar size={20} />,
//       iconBg: '#dae6ff',
//       iconColor: '#3b82f6',
//       label: 'This Month',
//       value: `₹${dashboardData.sales.month.toLocaleString()}`,
//       change: '+18.2% from last month',
//       changeColor: '#10b981'
//     },
//     {
//       icon: <TrendingUp size={20} />,
//       iconBg: '#f3e8ff',
//       iconColor: '#a855f7',
//       label: 'This Year',
//       value: `₹${dashboardData.sales.year.toLocaleString()}`,
//       change: '+22.8% from last year',
//       changeColor: '#10b981'
//     }
//   ];

//   const customerMetrics = [
//     { 
//       label: 'New Customers', 
//       value: dashboardData.customers.new.toString(), 
//       change: '+23%', 
//       changeColor: '#10b981' 
//     },
//     { 
//       label: 'Active Customers', 
//       value: dashboardData.customers.active.toString(), 
//       change: '+12%', 
//       changeColor: '#10b981' 
//     },
//     { 
//       label: 'Returning Rate', 
//       value: `${dashboardData.customers.returningRate.toFixed(1)}%`, 
//       change: '+5%', 
//       changeColor: '#10b981' 
//     },
//     { 
//       label: 'Avg Order Value', 
//       value: `₹${dashboardData.customers.avgOrderValue.toFixed(2)}`, 
//       change: '+8%', 
//       changeColor: '#10b981' 
//     }
//   ];

//   const renderContent = () => {
//     if (loading) {
//       return (
//         <div style={styles.loading}>
//           <p>Loading reports data...</p>
//         </div>
//       );
//     }

//     if (activeReport === 'Sales') {
//       const chartData = getChartData();

//       return (
//         <>
//           <div style={styles.chartSection}>
//             <div style={styles.chartHeader}>
//               <div style={styles.chartTitle}>
//                 <TrendingUp size={20} />
//                 <h2 style={styles.chartHeading}>Sales Performance</h2>
//               </div>
//               <div style={styles.tabs}>
//                 {['Daily', 'Monthly', 'Yearly'].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     style={{
//                       ...styles.tab,
//                       ...(activeTab === tab ? styles.activeTab : {})
//                     }}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div style={styles.chartArea}>
//               <svg width="100%" height="300" style={{marginTop: '20px'}}>
//                 <defs>
//                   <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                     <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
//                     <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
//                   </linearGradient>
//                 </defs>

//                 <polyline
//                   points={generateChartPoints(chartData.data, chartData.maxValue)}
//                   fill="url(#gradient)"
//                 />

//                 <polyline
//                   points={generateChartPoints(chartData.data, chartData.maxValue)}
//                   fill="none"
//                   stroke="#10b981"
//                   strokeWidth="3"
//                 />

//                 {chartData.labels.map((label, i) => (
//                   <text key={i} x={20 + (i * (1160 / (chartData.labels.length - 1)))} y="285" fontSize="12" fill="#9ca3af" textAnchor="middle">
//                     {label}
//                   </text>
//                 ))}
//               </svg>
//             </div>
//           </div>

//           <div style={styles.salesMetricsGrid}>
//             {salesMetrics.map((metric, index) => (
//               <div key={index} style={styles.salesMetricCard}>
//                 <div style={{...styles.metricIcon, backgroundColor: metric.iconBg, color: metric.iconColor}}>
//                   {metric.icon}
//                 </div>
//                 <div style={styles.metricContent}>
//                   <p style={styles.salesMetricLabel}>{metric.label}</p>
//                   <p style={styles.salesMetricValue}>{metric.value}</p>
//                   <p style={{...styles.salesMetricChange, color: metric.changeColor}}>
//                     {metric.change}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       );
//     }

//     if (activeReport === 'Product') {
//       return (
//         <div style={styles.contentSection}>
//           <div style={styles.sectionHeader}>
//             <Box size={20} />
//             <h2 style={styles.sectionTitle}>Top Performing Products (Delivered Orders)</h2>
//           </div>
//           <div style={styles.table}>
//             <div style={styles.tableHeader}>
//               <div style={{...styles.tableCell, width: '10%'}}>RANK</div>
//               <div style={{...styles.tableCell, width: '40%'}}>PRODUCT</div>
//               <div style={{...styles.tableCell, width: '20%'}}>UNITS SOLD</div>
//               <div style={{...styles.tableCell, width: '20%'}}>REVENUE</div>
//               <div style={{...styles.tableCell, width: '10%'}}>TREND</div>
//             </div>
//             {dashboardData.topProducts.length > 0 ? (
//               dashboardData.topProducts.map((product, index) => (
//                 <div key={index} style={styles.tableRow}>
//                   <div style={{...styles.tableCell, width: '10%', fontWeight: '600'}}>{product.rank}</div>
//                   <div style={{...styles.tableCell, width: '40%', color: '#111827'}}>{product.name}</div>
//                   <div style={{...styles.tableCell, width: '20%'}}>{product.units}</div>
//                   <div style={{...styles.tableCell, width: '20%', fontWeight: '600'}}>{product.revenue}</div>
//                   <div style={{...styles.tableCell, width: '10%', color: '#10b981', fontWeight: '500'}}>{product.trend}</div>
//                 </div>
//               ))
//             ) : (
//               <div style={styles.noData}>
//                 <p>No delivered product sales data available</p>
//               </div>
//             )}
//           </div>
//         </div>
//       );
//     }

//     if (activeReport === 'Inventory') {
//       return (
//         <div style={styles.contentSection}>
//           <div style={styles.sectionHeader}>
//             <FileText size={20} />
//             <h2 style={styles.sectionTitle}>Inventory Overview by Category</h2>
//           </div>
//           <div style={styles.categoryList}>
//             {dashboardData.inventory.length > 0 ? (
//               dashboardData.inventory.map((category, index) => (
//                 <div key={index} style={styles.categoryItem}>
//                   <div style={styles.categoryLeft}>
//                     <p style={styles.categoryName}>{category.name}</p>
//                     <p style={styles.categoryItems}>{category.items} • {category.totalStock} total stock</p>
//                   </div>
//                   <div style={styles.categoryRight}>
//                     <p style={styles.categoryValue}>{category.value}</p>
//                     <span style={{...styles.categoryStatus, color: category.statusColor}}>
//                       {category.status}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div style={styles.noData}>
//                 <p>No inventory data available</p>
//               </div>
//             )}
//           </div>
//         </div>
//       );
//     }

//     if (activeReport === 'Customer') {
//       return (
//         <div style={styles.customerMetricsGrid}>
//           {customerMetrics.map((metric, index) => (
//             <div key={index} style={styles.metricCard}>
//               <p style={styles.metricLabel}>{metric.label}</p>
//               <p style={styles.metricValue}>
//                 {metric.value}
//                 <span style={{...styles.metricChange, color: metric.changeColor}}>
//                   {' '}{metric.change}
//                 </span>
//               </p>
//             </div>
//           ))}
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <div>
//           <h1 style={styles.title}>Reports & Analytics</h1>
//           <p style={styles.subtitle}>Generate and analyze business reports</p>
//         </div>
//         <button style={styles.exportButton} onClick={exportToExcel}>
//           <Download size={16} />
//           Export All Reports
//         </button>
//       </div>

//       <div style={styles.cardsGrid}>
//         {reportCards.map((card, index) => (
//           <div
//             key={index}
//             onClick={() => setActiveReport(card.id)}
//             style={{
//               ...styles.reportCard,
//               border: activeReport === card.id ? `2px solid ${card.iconColor}` : '2px solid transparent',
//               cursor: 'pointer'
//             }}
//           >
//             <div style={styles.cardContent}>
//               <p style={styles.cardTitle}>{card.title}</p>
//               <p style={styles.cardValue}>{card.value}</p>
//             </div>
//             <div style={{...styles.cardIcon, backgroundColor: card.bgColor, color: card.iconColor}}>
//               {card.icon}
//             </div>
//           </div>
//         ))}
//       </div>

//       {renderContent()}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: '24px',
//     backgroundColor: '#f9fafb',
//     minHeight: '100vh',
//     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
//   },
//   loading: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '200px',
//     fontSize: '16px',
//     color: '#6b7280'
//   },
//   noData: {
//     textAlign: 'center',
//     padding: '40px',
//     color: '#6b7280'
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: '24px'
//   },
//   title: {
//     fontSize: '24px',
//     fontWeight: '600',
//     color: '#111827',
//     margin: '0 0 4px 0'
//   },
//   subtitle: {
//     fontSize: '14px',
//     color: '#6b7280',
//     margin: 0
//   },
//   exportButton: {
//     padding: '10px 20px',
//     backgroundColor: '#10b981',
//     color: 'white',
//     border: 'none',
//     borderRadius: '6px',
//     fontSize: '14px',
//     fontWeight: '500',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px'
//   },
//   cardsGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(4, 1fr)',
//     gap: '20px',
//     marginBottom: '24px'
//   },
//   reportCard: {
//     backgroundColor: 'white',
//     padding: '20px',
//     borderRadius: '12px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     transition: 'all 0.2s'
//   },
//   cardContent: {
//     flex: 1
//   },
//   cardTitle: {
//     fontSize: '13px',
//     color: '#6b7280',
//     margin: '0 0 8px 0'
//   },
//   cardValue: {
//     fontSize: '28px',
//     fontWeight: '700',
//     color: '#111827',
//     margin: 0
//   },
//   cardIcon: {
//     width: '56px',
//     height: '56px',
//     borderRadius: '12px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexShrink: 0
//   },
//   chartSection: {
//     backgroundColor: 'white',
//     padding: '24px',
//     borderRadius: '12px',
//     marginBottom: '24px',
//     border: '1px solid #e5e7eb'
//   },
//   chartHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '20px'
//   },
//   chartTitle: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '10px'
//   },
//   chartHeading: {
//     fontSize: '16px',
//     fontWeight: '600',
//     color: '#111827',
//     margin: 0
//   },
//   tabs: {
//     display: 'flex',
//     gap: '8px',
//     backgroundColor: '#f3f4f6',
//     padding: '4px',
//     borderRadius: '8px'
//   },
//   tab: {
//     padding: '8px 20px',
//     backgroundColor: 'transparent',
//     border: 'none',
//     borderRadius: '6px',
//     fontSize: '13px',
//     fontWeight: '500',
//     color: '#6b7280',
//     cursor: 'pointer',
//     transition: 'all 0.2s'
//   },
//   activeTab: {
//     backgroundColor: '#10b981',
//     color: 'white'
//   },
//   chartArea: {
//     width: '100%',
//     height: '300px',
//     position: 'relative'
//   },
//   salesMetricsGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 1fr)',
//     gap: '20px'
//   },
//   salesMetricCard: {
//     backgroundColor: 'white',
//     padding: '24px',
//     borderRadius: '12px',
//     border: '1px solid #e5e7eb',
//     display: 'flex',
//     gap: '16px'
//   },
//   metricIcon: {
//     width: '48px',
//     height: '48px',
//     borderRadius: '10px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexShrink: 0
//   },
//   metricContent: {
//     flex: 1
//   },
//   salesMetricLabel: {
//     fontSize: '13px',
//     color: '#6b7280',
//     margin: '0 0 8px 0'
//   },
//   salesMetricValue: {
//     fontSize: '32px',
//     fontWeight: '700',
//     color: '#111827',
//     margin: '0 0 6px 0'
//   },
//   salesMetricChange: {
//     fontSize: '13px',
//     fontWeight: '500',
//     margin: 0
//   },
//   contentSection: {
//     backgroundColor: 'white',
//     padding: '24px',
//     borderRadius: '12px',
//     border: '1px solid #e5e7eb'
//   },
//   sectionHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '10px',
//     marginBottom: '24px'
//   },
//   sectionTitle: {
//     fontSize: '16px',
//     fontWeight: '600',
//     color: '#111827',
//     margin: 0
//   },
//   table: {
//     width: '100%'
//   },
//   tableHeader: {
//     display: 'flex',
//     padding: '12px 0',
//     borderBottom: '2px solid #e5e7eb'
//   },
//   tableRow: {
//     display: 'flex',
//     padding: '16px 0',
//     borderBottom: '1px solid #f3f4f6',
//     alignItems: 'center'
//   },
//   tableCell: {
//     fontSize: '13px',
//     color: '#6b7280',
//     textTransform: 'uppercase',
//     letterSpacing: '0.5px'
//   },
//   categoryList: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '0'
//   },
//   categoryItem: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '24px 0',
//     borderBottom: '1px solid #f3f4f6'
//   },
//   categoryLeft: {
//     flex: 1
//   },
//   categoryName: {
//     fontSize: '15px',
//     fontWeight: '600',
//     color: '#111827',
//     margin: '0 0 4px 0'
//   },
//   categoryItems: {
//     fontSize: '13px',
//     color: '#6b7280',
//     margin: 0
//   },
//   categoryRight: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-end',
//     gap: '4px'
//   },
//   categoryValue: {
//     fontSize: '20px',
//     fontWeight: '700',
//     color: '#111827',
//     margin: 0
//   },
//   categoryStatus: {
//     fontSize: '12px',
//     fontWeight: '500'
//   },
//   customerMetricsGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(2, 1fr)',
//     gap: '20px'
//   },
//   metricCard: {
//     backgroundColor: 'white',
//     padding: '24px',
//     borderRadius: '12px',
//     border: '1px solid #e5e7eb'
//   },
//   metricLabel: {
//     fontSize: '13px',
//     color: '#6b7280',
//     margin: '0 0 12px 0'
//   },
//   metricValue: {
//     fontSize: '36px',
//     fontWeight: '700',
//     color: '#111827',
//     margin: 0
//   },
//   metricChange: {
//     fontSize: '16px',
//     fontWeight: '500',
//     marginLeft: '8px'
//   }
// };









import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, FileText, Users, Download, Box, DollarSign, Calendar } from 'lucide-react';

export default function ReportsAnalytics() {
  const [activeReport, setActiveReport] = useState('Sales');
  const [activeTab, setActiveTab] = useState('Monthly');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    sales: { today: 0, month: 0, year: 0, allTime: 0, dailyData: [], monthlyData: [], yearlyData: [] },
    products: [],
    inventory: [],
    customers: { total: 0, new: 0, active: 0, returningRate: 0, avgOrderValue: 0 },
    topProducts: [],
    deliveredOrders: [],
    deliveredProducts: []
  });

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

        processReportsData(orders, products);
      } catch (error) {
        console.error('Error fetching reports data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const processReportsData = (orders, products) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentYear = new Date(now.getFullYear(), 0, 1);

    // Calculate sales
    let todaySales = 0;
    let monthSales = 0;
    let yearSales = 0;
    let allTimeSales = 0;

    // For chart data
    const dailyData = Array(7).fill(0).map((_, i) => ({ day: i, sales: 0 }));
    const monthlyData = Array(12).fill(0).map((_, i) => ({ month: i, sales: 0 }));
    const yearlyData = Array(5).fill(0).map((_, i) => ({ year: now.getFullYear() - 4 + i, sales: 0 }));

    // Calculate product sales and units sold
    const productSales = {};
    const customerOrders = {};
    const customerFirstOrder = {};
    const customerTotalSpent = {};
    const deliveredOrders = [];
    const deliveredProducts = [];

    orders.forEach(order => {
      const orderDate = new Date(order.createdAt || order.orderDate || order.date);
      const orderAmount = parseFloat(order.totalAmount || order.amount || 0);
      const customerId = order.userId || order.user?.id || 'unknown';
      const orderStatus = (order.status || '').toLowerCase();

      // Track delivered orders for product reports
      if (orderStatus.includes('delivered') || orderStatus.includes('completed')) {
        deliveredOrders.push(order);

        // Extract all products from delivered orders
        if (order.items && Array.isArray(order.items)) {
          order.items.forEach(item => {
            deliveredProducts.push({
              orderId: order.orderNumber || order._id,
              productName: item.product?.name || item.name || 'Unknown Product',
              quantity: item.quantity || 1,
              price: item.price || 0,
              total: (item.price || 0) * (item.quantity || 1),
              orderDate: orderDate,
              customer: order.user?.name || order.customerName || 'Unknown Customer'
            });
          });
        }
      }

      // Calculate sales by time period
      if (orderDate >= today) todaySales += orderAmount;
      if (orderDate >= currentMonth) monthSales += orderAmount;
      if (orderDate >= currentYear) yearSales += orderAmount;
      allTimeSales += orderAmount;

      // Chart data
      const dayOfWeek = orderDate.getDay();
      const month = orderDate.getMonth();
      const year = orderDate.getFullYear();

      if (orderDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)) {
        dailyData[dayOfWeek].sales += orderAmount;
      }
      if (orderDate >= currentYear) {
        monthlyData[month].sales += orderAmount;
      }
      const yearIndex = yearlyData.findIndex(y => y.year === year);
      if (yearIndex !== -1) {
        yearlyData[yearIndex].sales += orderAmount;
      }

      // Track customer data
      if (!customerOrders[customerId]) {
        customerOrders[customerId] = 0;
        customerFirstOrder[customerId] = orderDate;
        customerTotalSpent[customerId] = 0;
      }
      customerOrders[customerId]++;
      customerTotalSpent[customerId] += orderAmount;

      // Calculate product sales from delivered orders only
      if ((orderStatus.includes('delivered') || orderStatus.includes('completed')) && order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          const productId = item.product?._id || item.productId || item.name;
          if (!productSales[productId]) {
            productSales[productId] = {
              name: item.product?.name || item.name || 'Unknown Product',
              unitsSold: 0,
              revenue: 0
            };
          }
          productSales[productId].unitsSold += item.quantity || 1;
          productSales[productId].revenue += (item.price || 0) * (item.quantity || 1);
        });
      }
    });

    // Calculate inventory by category
    const inventoryByCategory = {};
    let totalInventoryValue = 0;

    products.forEach(product => {
      const category = product.category || 'Uncategorized';
      const stock = parseFloat(product.stockQuantity || product.quantity || product.stock || 0);
      const price = parseFloat(product.price || 0);
      const productValue = stock * price;

      if (!inventoryByCategory[category]) {
        inventoryByCategory[category] = {
          items: 0,
          totalStock: 0,
          totalValue: 0
        };
      }
      inventoryByCategory[category].items++;
      inventoryByCategory[category].totalStock += stock;
      inventoryByCategory[category].totalValue += productValue;
      totalInventoryValue += productValue;
    });

    // Calculate customer metrics
    const totalCustomers = Object.keys(customerOrders).length;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    let newCustomers = 0;
    let activeCustomers = 0;
    let returningCustomers = 0;
    let totalOrderValue = 0;

    Object.keys(customerOrders).forEach(customerId => {
      const firstOrderDate = customerFirstOrder[customerId];
      const orderCount = customerOrders[customerId];
      const totalSpent = customerTotalSpent[customerId];

      totalOrderValue += totalSpent;

      // New customers (first order in last 30 days)
      if (firstOrderDate >= thirtyDaysAgo) newCustomers++;

      // Active customers (ordered in last 30 days)
      const lastOrderDate = firstOrderDate; // This should be the latest order date
      if (lastOrderDate >= thirtyDaysAgo) activeCustomers++;

      // Returning customers (more than 1 order)
      if (orderCount > 1) returningCustomers++;
    });

    const returningRate = totalCustomers > 0 ? (returningCustomers / totalCustomers) * 100 : 0;
    const avgOrderValue = totalCustomers > 0 ? totalOrderValue / totalCustomers : 0;

    // Prepare top products (only from delivered orders)
    const topProducts = Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
      .map((product, index) => ({
        rank: `#${index + 1}`,
        name: product.name,
        units: product.unitsSold.toString(),
        revenue: `₹${product.revenue.toFixed(2)}`,
        trend: '+15%'
      }));

    // Prepare inventory categories
    const inventoryCategories = Object.entries(inventoryByCategory).map(([category, data]) => {
      let status = 'Healthy';
      let statusColor = '#10b981';
      const avgStockPerItem = data.items > 0 ? data.totalStock / data.items : 0;

      if (avgStockPerItem < 5) {
        status = 'Low Stock';
        statusColor = '#ef4444';
      } else if (avgStockPerItem > 50) {
        status = 'Overstock';
        statusColor = '#f59e0b';
      }

      return {
        name: category,
        items: `${data.items} items`,
        totalStock: data.totalStock,
        value: `₹${data.totalValue.toFixed(2)}`,
        status,
        statusColor
      };
    });

    setDashboardData({
      sales: {
        today: todaySales,
        month: monthSales,
        year: yearSales,
        allTime: allTimeSales,
        dailyData,
        monthlyData,
        yearlyData
      },
      products: products,
      inventory: inventoryCategories,
      customers: {
        total: totalCustomers,
        new: newCustomers,
        active: activeCustomers,
        returningRate: returningRate,
        avgOrderValue: avgOrderValue
      },
      topProducts: topProducts,
      deliveredOrders: deliveredOrders,
      deliveredProducts: deliveredProducts,
      totalInventoryValue: totalInventoryValue,
      inventoryByCategory: inventoryByCategory
    });
  };

  const generateChartPoints = (data, maxValue) => {
    if (!data || data.length === 0) return "20,200 100,180 180,150 260,170 340,120 420,140 500,100 580,90 660,110 740,80 820,95 900,60";

    const points = data.map((item, index) => {
      const x = 20 + (index * (1160 / (data.length - 1)));
      const y = maxValue > 0 ? 200 - (item.sales / maxValue * 160) : 200;
      return `${x},${y}`;
    });

    return points.join(' ');
  };

  const getChartData = () => {
    switch (activeTab) {
      case 'Daily':
        return {
          data: dashboardData.sales.dailyData,
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          maxValue: Math.max(...dashboardData.sales.dailyData.map(d => d.sales))
        };
      case 'Monthly':
        return {
          data: dashboardData.sales.monthlyData,
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          maxValue: Math.max(...dashboardData.sales.monthlyData.map(d => d.sales))
        };
      case 'Yearly':
        return {
          data: dashboardData.sales.yearlyData,
          labels: dashboardData.sales.yearlyData.map(d => d.year.toString()),
          maxValue: Math.max(...dashboardData.sales.yearlyData.map(d => d.sales))
        };
      default:
        return {
          data: dashboardData.sales.monthlyData,
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          maxValue: Math.max(...dashboardData.sales.monthlyData.map(d => d.sales))
        };
    }
  };

  const exportToExcel = () => {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add headers
    csvContent += "BUSINESS REPORTS - COMPLETE DATA\n\n";

    // Add sales data
    csvContent += "SALES REPORT\n";
    csvContent += "Metric,Amount\n";
    csvContent += "Today's Sales,₹" + dashboardData.sales.today.toFixed(2) + "\n";
    csvContent += "This Month,₹" + dashboardData.sales.month.toFixed(2) + "\n";
    csvContent += "This Year,₹" + dashboardData.sales.year.toFixed(2) + "\n";
    csvContent += "All Time Sales,₹" + dashboardData.sales.allTime.toFixed(2) + "\n\n";

    // Add product data - All delivered products
    csvContent += "ALL DELIVERED PRODUCTS REPORT\n";
    csvContent += "Order ID,Product Name,Quantity,Price,Total Amount,Customer,Order Date\n";
    dashboardData.deliveredProducts.forEach(product => {
      const orderDate = new Date(product.orderDate).toLocaleDateString();
      csvContent += `${product.orderId},${product.productName},${product.quantity},₹${product.price.toFixed(2)},₹${product.total.toFixed(2)},${product.customer},${orderDate}\n`;
    });
    csvContent += "\n";

    // Add top products summary
    csvContent += "TOP PERFORMING PRODUCTS SUMMARY\n";
    csvContent += "Rank,Product Name,Units Sold,Total Revenue\n";
    dashboardData.topProducts.forEach(product => {
      csvContent += `${product.rank},${product.name},${product.units},${product.revenue}\n`;
    });
    csvContent += "\n";

    // Add inventory data
    csvContent += "INVENTORY REPORT BY CATEGORY\n";
    csvContent += "Category,Number of Items,Total Stock,Total Value,Status\n";
    dashboardData.inventory.forEach(category => {
      csvContent += `${category.name},${category.items},${category.totalStock},${category.value},${category.status}\n`;
    });
    csvContent += `TOTAL INVENTORY VALUE,,,₹${dashboardData.totalInventoryValue.toFixed(2)},\n\n`;

    // Add customer data
    csvContent += "CUSTOMER REPORT\n";
    csvContent += "Metric,Value\n";
    csvContent += `Total Customers,${dashboardData.customers.total}\n`;
    csvContent += `New Customers (Last 30 days),${dashboardData.customers.new}\n`;
    csvContent += `Active Customers,${dashboardData.customers.active}\n`;
    csvContent += `Returning Rate,${dashboardData.customers.returningRate.toFixed(1)}%\n`;
    csvContent += `Average Order Value,₹${dashboardData.customers.avgOrderValue.toFixed(2)}\n`;

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "complete_business_reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reportCards = [
    {
      id: 'Sales',
      title: 'Sales Reports',
      value: `₹${dashboardData.sales.allTime.toLocaleString()}`,
      icon: <TrendingUp size={24} />,
      bgColor: '#d4f4dd',
      iconColor: '#10b981'
    },
    {
      id: 'Product',
      title: 'Product Reports',
      value: dashboardData.deliveredProducts.length.toString(),
      icon: <Package size={24} />,
      bgColor: '#dae6ff',
      iconColor: '#3b82f6'
    },
    {
      id: 'Inventory',
      title: 'Inventory Reports',
      value: `${dashboardData.inventory.length}`,
      icon: <FileText size={24} />,
      bgColor: '#f3e8ff',
      iconColor: '#a855f7'
    },
    {
      id: 'Customer',
      title: 'Customer Reports',
      value: dashboardData.customers.total.toString(),
      icon: <Users size={24} />,
      bgColor: '#fef3c7',
      iconColor: '#f59e0b'
    }
  ];

  const salesMetrics = [
    {
      icon: <DollarSign size={20} />,
      iconBg: '#d4f4dd',
      iconColor: '#10b981',
      label: "Today's Sales",
      value: `₹${dashboardData.sales.today.toLocaleString()}`,
      change: '+12.5% from yesterday',
      changeColor: '#10b981'
    },
    {
      icon: <Calendar size={20} />,
      iconBg: '#dae6ff',
      iconColor: '#3b82f6',
      label: 'This Month',
      value: `₹${dashboardData.sales.month.toLocaleString()}`,
      change: '+18.2% from last month',
      changeColor: '#10b981'
    },
    {
      icon: <TrendingUp size={20} />,
      iconBg: '#f3e8ff',
      iconColor: '#a855f7',
      label: 'This Year',
      value: `₹${dashboardData.sales.year.toLocaleString()}`,
      change: '+22.8% from last year',
      changeColor: '#10b981'
    }
  ];

  const customerMetrics = [
    {
      label: 'New Customers',
      value: dashboardData.customers.new.toString(),
      change: '+23%',
      changeColor: '#10b981'
    },
    {
      label: 'Active Customers',
      value: dashboardData.customers.active.toString(),
      change: '+12%',
      changeColor: '#10b981'
    },
    {
      label: 'Returning Rate',
      value: `${dashboardData.customers.returningRate.toFixed(1)}%`,
      change: '+5%',
      changeColor: '#10b981'
    },
    {
      label: 'Avg Order Value',
      value: `₹${dashboardData.customers.avgOrderValue.toFixed(2)}`,
      change: '+8%',
      changeColor: '#10b981'
    }
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div style={styles.loading}>
          <p>Loading reports data...</p>
        </div>
      );
    }

    if (activeReport === 'Sales') {
      const chartData = getChartData();

      return (
        <>
          <div style={styles.chartSection}>
            <div style={styles.chartHeader}>
              <div style={styles.chartTitle}>
                <TrendingUp size={20} />
                <h2 style={styles.chartHeading}>Sales Performance</h2>
              </div>
              <div style={styles.tabs}>
                {['Daily', 'Monthly', 'Yearly'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      ...styles.tab,
                      ...(activeTab === tab ? styles.activeTab : {})
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.chartArea}>
              <svg width="100%" height="300" style={{ marginTop: '20px' }}>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <polyline
                  points={generateChartPoints(chartData.data, chartData.maxValue)}
                  fill="url(#gradient)"
                />

                <polyline
                  points={generateChartPoints(chartData.data, chartData.maxValue)}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                />

                {chartData.labels.map((label, i) => (
                  <text key={i} x={20 + (i * (1160 / (chartData.labels.length - 1)))} y="285" fontSize="12" fill="#9ca3af" textAnchor="middle">
                    {label}
                  </text>
                ))}
              </svg>
            </div>
          </div>

          <div style={styles.salesMetricsGrid}>
            {salesMetrics.map((metric, index) => (
              <div key={index} style={styles.salesMetricCard}>
                <div style={{ ...styles.metricIcon, backgroundColor: metric.iconBg, color: metric.iconColor }}>
                  {metric.icon}
                </div>
                <div style={styles.metricContent}>
                  <p style={styles.salesMetricLabel}>{metric.label}</p>
                  <p style={styles.salesMetricValue}>{metric.value}</p>
                  <p style={{ ...styles.salesMetricChange, color: metric.changeColor }}>
                    {metric.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }

    if (activeReport === 'Product') {
      return (
        <div style={styles.contentSection}>
          <div style={styles.sectionHeader}>
            <Box size={20} />
            <h2 style={styles.sectionTitle}>All Delivered Products</h2>
          </div>
          <div style={styles.table}>
            <div style={styles.tableHeader}>
              <div style={{ ...styles.tableCell, width: '15%' }}>ORDER ID</div>
              <div style={{ ...styles.tableCell, width: '25%' }}>PRODUCT NAME</div>
              <div style={{ ...styles.tableCell, width: '10%' }}>QUANTITY</div>
              <div style={{ ...styles.tableCell, width: '15%' }}>PRICE</div>
              <div style={{ ...styles.tableCell, width: '15%' }}>TOTAL AMOUNT</div>
              <div style={{ ...styles.tableCell, width: '20%' }}>CUSTOMER</div>
            </div>
            {dashboardData.deliveredProducts.length > 0 ? (
              dashboardData.deliveredProducts.map((product, index) => (
                <div key={index} style={styles.tableRow}>
                  <div style={{ ...styles.tableCell, width: '15%', fontWeight: '600' }}>{product.orderId}</div>
                  <div style={{ ...styles.tableCell, width: '25%', color: '#111827' }}>{product.productName}</div>
                  <div style={{ ...styles.tableCell, width: '10%' }}>{product.quantity}</div>
                  <div style={{ ...styles.tableCell, width: '15%' }}>₹{product.price.toFixed(2)}</div>
                  <div style={{ ...styles.tableCell, width: '15%', fontWeight: '600' }}>₹{product.total.toFixed(2)}</div>
                  <div style={{ ...styles.tableCell, width: '20%' }}>{product.customer}</div>
                </div>
              ))
            ) : (
              <div style={styles.noData}>
                <p>No delivered products available</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (activeReport === 'Inventory') {
      return (
        <div style={styles.contentSection}>
          <div style={styles.sectionHeader}>
            <FileText size={20} />
            <h2 style={styles.sectionTitle}>Inventory Overview by Category</h2>
          </div>
          <div style={styles.categoryList}>
            {dashboardData.inventory.length > 0 ? (
              dashboardData.inventory.map((category, index) => (
                <div key={index} style={styles.categoryItem}>
                  <div style={styles.categoryLeft}>
                    <p style={styles.categoryName}>{category.name}</p>
                    <p style={styles.categoryItems}>{category.items} • {category.totalStock} total stock</p>
                  </div>
                  <div style={styles.categoryRight}>
                    <p style={styles.categoryValue}>{category.value}</p>
                    <span style={{ ...styles.categoryStatus, color: category.statusColor }}>
                      {category.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.noData}>
                <p>No inventory data available</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (activeReport === 'Customer') {
      return (
        <div style={styles.customerMetricsGrid}>
          {customerMetrics.map((metric, index) => (
            <div key={index} style={styles.metricCard}>
              <p style={styles.metricLabel}>{metric.label}</p>
              <p style={styles.metricValue}>
                {metric.value}
                <span style={{ ...styles.metricChange, color: metric.changeColor }}>
                  {' '}{metric.change}
                </span>
              </p>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Reports & Analytics</h1>
          <p style={styles.subtitle}>Generate and analyze business reports</p>
        </div>
        <button style={styles.exportButton} onClick={exportToExcel}>
          <Download size={16} />
          Export All Reports
        </button>
      </div>

      <div style={styles.cardsGrid}>
        {reportCards.map((card, index) => (
          <div
            key={index}
            onClick={() => setActiveReport(card.id)}
            style={{
              ...styles.reportCard,
              border: activeReport === card.id ? `2px solid ${card.iconColor}` : '2px solid transparent',
              cursor: 'pointer'
            }}
          >
            <div style={styles.cardContent}>
              <p style={styles.cardTitle}>{card.title}</p>
              <p style={styles.cardValue}>{card.value}</p>
            </div>
            <div style={{ ...styles.cardIcon, backgroundColor: card.bgColor, color: card.iconColor }}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {renderContent()}
    </div>
  );
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
    padding: '40px',
    color: '#6b7280'
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
  exportButton: {
    padding: '10px 20px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '24px'
  },
  reportCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.2s'
  },
  cardContent: {
    flex: 1
  },
  cardTitle: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 8px 0'
  },
  cardValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111827',
    margin: 0
  },
  cardIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  chartSection: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '24px',
    border: '1px solid #e5e7eb'
  },
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  chartTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  chartHeading: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    margin: 0
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    backgroundColor: '#f3f4f6',
    padding: '4px',
    borderRadius: '8px'
  },
  tab: {
    padding: '8px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#6b7280',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  activeTab: {
    backgroundColor: '#10b981',
    color: 'white'
  },
  chartArea: {
    width: '100%',
    height: '300px',
    position: 'relative'
  },
  salesMetricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px'
  },
  salesMetricCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    display: 'flex',
    gap: '16px'
  },
  metricIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  metricContent: {
    flex: 1
  },
  salesMetricLabel: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 8px 0'
  },
  salesMetricValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 6px 0'
  },
  salesMetricChange: {
    fontSize: '13px',
    fontWeight: '500',
    margin: 0
  },
  contentSection: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    margin: 0
  },
  table: {
    width: '100%'
  },
  tableHeader: {
    display: 'flex',
    padding: '12px 0',
    borderBottom: '2px solid #e5e7eb'
  },
  tableRow: {
    display: 'flex',
    padding: '16px 0',
    borderBottom: '1px solid #f3f4f6',
    alignItems: 'center'
  },
  tableCell: {
    fontSize: '13px',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0'
  },
  categoryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 0',
    borderBottom: '1px solid #f3f4f6'
  },
  categoryLeft: {
    flex: 1
  },
  categoryName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 4px 0'
  },
  categoryItems: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0
  },
  categoryRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px'
  },
  categoryValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
    margin: 0
  },
  categoryStatus: {
    fontSize: '12px',
    fontWeight: '500'
  },
  customerMetricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px'
  },
  metricCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  },
  metricLabel: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 12px 0'
  },
  metricValue: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#111827',
    margin: 0
  },
  metricChange: {
    fontSize: '16px',
    fontWeight: '500',
    marginLeft: '8px'
  }
};