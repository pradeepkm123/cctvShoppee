// import React, { useState } from 'react';
// import { MapPin, Star, Download, Filter, Search } from 'lucide-react';

// const shipmentsData = [
//   {
//     id: 'SHIP-1234',
//     orderId: '#ORD-1234',
//     status: 'Delivered',
//     customer: 'John Doe',
//     carrier: 'FedEx',
//     destination: 'New York, NY 10001',
//     trackingNumber: 'FEDX12345789',
//     shipped: '2025-10-20',
//     delivered: '2025-10-25'
//   },
//   {
//     id: 'SHIP-1235',
//     orderId: '#ORD-1235',
//     status: 'In Transit',
//     customer: 'Jane Smith',
//     carrier: 'UPS',
//     destination: 'Los Angeles, CA 90001',
//     trackingNumber: 'UPS987654321',
//     shipped: '2025-10-26'
//   },
//   {
//     id: 'SHIP-1236',
//     orderId: '#ORD-1236',
//     status: 'Shipped',
//     customer: 'Bob Johnson',
//     carrier: 'USPS',
//     destination: 'Chicago, IL 60601',
//     trackingNumber: 'USPS555444333',
//     shipped: '2025-10-27'
//   },
//   {
//     id: 'SHIP-1237',
//     orderId: '#ORD-1237',
//     status: 'Processing',
//     customer: 'Alice Brown',
//     carrier: 'DHL',
//     destination: 'Houston, TX 77001',
//     trackingNumber: 'DHL888777666',
//     shipped: '2025-10-28'
//   },
//   {
//     id: 'SHIP-1238',
//     orderId: '#ORD-1238',
//     status: 'In Transit',
//     customer: 'Charlie Davis',
//     carrier: 'FedEx',
//     destination: 'Miami, FL 33101',
//     trackingNumber: 'FEDX11222333',
//     shipped: '2025-10-25'
//   }
// ];

// const shippingPartners = [
//   { name: 'FedEx', rating: 4.5, activeShipments: 145 },
//   { name: 'UPS', rating: 4.7, activeShipments: 234 },
//   { name: 'USPS', rating: 4.2, activeShipments: 189 },
//   { name: 'DHL', rating: 4.6, activeShipments: 98 }
// ];

// const shippingZones = [
//   { name: 'Zone 1 (Local)', range: '0-50 miles', rate: '$5.99', delivery: '1-2 days' },
//   { name: 'Zone 2 (Regional)', range: '51-200 miles', rate: '$9.99', delivery: '2-3 days' },
//   { name: 'Zone 3 (National)', range: '201-1000 miles', rate: '$14.99', delivery: '3-5 days' },
//   { name: 'Zone 4 (Extended)', range: '1000+ miles', rate: '$19.99', delivery: '5-7 days' }
// ];

// const ShippingDelivery = () => {
//   const [activeTab, setActiveTab] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');

//   const getStatusStyle = (status) => {
//     const styles = {
//       'Delivered': { bg: '#d1fae5', color: '#059669', icon: '✓' },
//       'In Transit': { bg: '#e0e7ff', color: '#6366f1', icon: '🚚' },
//       'Shipped': { bg: '#dbeafe', color: '#3b82f6', icon: '📦' },
//       'Processing': { bg: '#fef3c7', color: '#d97706', icon: '⏳' }
//     };
//     return styles[status] || styles['Processing'];
//   };

//   const filteredShipments = shipmentsData.filter(shipment => {
//     const matchesTab = activeTab === 'All' || shipment.status === activeTab;
//     const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          shipment.orderId.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesTab && matchesSearch;
//   });

//   const StatCard = ({ label, value, change, isPositive }) => (
//     <div style={{
//       backgroundColor: 'white',
//       borderRadius: '8px',
//       padding: '24px',
//       boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//       border: '1px solid #e5e7eb'
//     }}>
//       <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{label}</div>
//       <div style={{ fontSize: '32px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>{value}</div>
//       <div style={{ fontSize: '13px', color: isPositive ? '#059669' : '#dc2626' }}>
//         {change}
//       </div>
//     </div>
//   );

//   const ShipmentCard = ({ shipment }) => {
//     const statusStyle = getStatusStyle(shipment.status);
//     return (
//       <div style={{
//         backgroundColor: 'white',
//         borderRadius: '8px',
//         padding: '20px',
//         marginBottom: '12px',
//         border: '1px solid #e5e7eb',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start'
//       }}>
//         <div style={{ flex: 1 }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
//             <span style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
//               {shipment.id}
//             </span>
//             <span style={{
//               fontSize: '12px',
//               fontWeight: '500',
//               padding: '4px 10px',
//               borderRadius: '12px',
//               backgroundColor: statusStyle.bg,
//               color: statusStyle.color,
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: '4px'
//             }}>
//               {statusStyle.icon} {shipment.status}
//             </span>
//           </div>
//           <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>
//             Order: <span style={{ color: '#3b82f6', fontWeight: '500' }}>{shipment.orderId}</span>
//           </div>
//           <div style={{ fontSize: '13px', color: '#374151', marginBottom: '8px' }}>
//             Customer<br/>
//             <span style={{ fontWeight: '500' }}>{shipment.customer}</span>
//           </div>
//           <div style={{ fontSize: '13px', color: '#374151', marginBottom: '8px' }}>
//             Carrier<br/>
//             <span style={{ fontWeight: '500' }}>{shipment.carrier}</span>
//           </div>
//           <div style={{ fontSize: '13px', color: '#6b7280' }}>
//             {shipment.delivered ? 
//               `Shipped ${shipment.shipped}   Delivered: ${shipment.delivered}` :
//               `Shipped ${shipment.shipped}`
//             }
//           </div>
//         </div>

//         <div style={{ flex: 1, paddingLeft: '40px' }}>
//           <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Destination</div>
//           <div style={{ fontSize: '14px', color: '#111827', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
//             <MapPin size={16} color="#6b7280" />
//             {shipment.destination}
//           </div>
//           <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Tracking Number</div>
//           <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>
//             {shipment.trackingNumber}
//           </div>
//         </div>

//         <div>
//           <button style={{
//             color: '#059669',
//             background: 'none',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '14px',
//             fontWeight: '500',
//             padding: '4px 8px'
//           }}>
//             Track
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div style={{
//       padding: '32px',
//       backgroundColor: '#f9fafb',
//       minHeight: '100vh',
//       fontFamily: 'system-ui, -apple-system, sans-serif'
//     }}>
//       <div style={{ margin: '0 auto' }}>
//         {/* Header */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
//           <div>
//             <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
//               Shipping & Delivery
//             </h1>
//             <p style={{ color: '#6b7280', fontSize: '14px' }}>Manage shipments and delivery tracking</p>
//           </div>
//           <button style={{
//             backgroundColor: '#059669',
//             color: 'white',
//             border: 'none',
//             borderRadius: '6px',
//             padding: '10px 20px',
//             fontSize: '14px',
//             fontWeight: '500',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '6px'
//           }}>
//             + Create Shipment
//           </button>
//         </div>

//         {/* Stats Cards */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
//           <StatCard label="Total Shipments" value="1,234" change="+12.5% from last month" isPositive={true} />
//           <StatCard label="In Transit" value="145" change="+8.2% from last month" isPositive={true} />
//           <StatCard label="Delivered Today" value="67" change="+15.3% from last month" isPositive={true} />
//           <StatCard label="Avg Delivery Time" value="3.2 days" change="-5.1% from last month" isPositive={true} />
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
//           {/* Main Content */}
//           <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
//             {/* Tabs */}
//             <div style={{
//               display: 'flex',
//               gap: '8px',
//               padding: '20px 20px 0 20px',
//               borderBottom: '1px solid #e5e7eb'
//             }}>
//               {['All', 'Processing', 'Shipped', 'Delivered'].map(tab => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   style={{
//                     padding: '10px 20px',
//                     border: 'none',
//                     background: activeTab === tab ? '#d1fae5' : 'transparent',
//                     color: activeTab === tab ? '#059669' : '#6b7280',
//                     borderRadius: '6px 6px 0 0',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                     fontWeight: '500',
//                     transition: 'all 0.2s'
//                   }}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             {/* Search and Filters */}
//             <div style={{
//               padding: '16px 20px',
//               borderBottom: '1px solid #e5e7eb',
//               display: 'flex',
//               gap: '12px',
//               alignItems: 'center'
//             }}>
//               <div style={{ position: 'relative', flex: 1 }}>
//                 <Search size={18} style={{
//                   position: 'absolute',
//                   left: '12px',
//                   top: '50%',
//                   transform: 'translateY(-50%)',
//                   color: '#9ca3af'
//                 }} />
//                 <input
//                   type="text"
//                   placeholder="Search shipments..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   style={{
//                     width: '100%',
//                     padding: '10px 12px 10px 40px',
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '6px',
//                     fontSize: '14px'
//                   }}
//                 />
//               </div>
//               <button style={{
//                 padding: '10px 16px',
//                 border: '1px solid #e5e7eb',
//                 borderRadius: '6px',
//                 background: 'white',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '6px'
//               }}>
//                 <Filter size={16} />
//               </button>
//               <button style={{
//                 padding: '10px 16px',
//                 border: '1px solid #e5e7eb',
//                 borderRadius: '6px',
//                 background: 'white',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '6px'
//               }}>
//                 <Download size={16} />
//               </button>
//             </div>

//             {/* Shipments List */}
//             <div style={{ padding: '20px' }}>
//               {filteredShipments.map(shipment => (
//                 <ShipmentCard key={shipment.id} shipment={shipment} />
//               ))}
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div>
//             {/* Shipping Partners */}
//             <div style={{
//               backgroundColor: 'white',
//               borderRadius: '8px',
//               boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//               padding: '20px',
//               marginBottom: '20px'
//             }}>
//               <h3 style={{
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 color: '#111827',
//                 marginBottom: '16px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px'
//               }}>
//                 📦 Shipping Partners
//               </h3>
//               {shippingPartners.map((partner, idx) => (
//                 <div key={idx} style={{
//                   padding: '12px 0',
//                   borderBottom: idx < shippingPartners.length - 1 ? '1px solid #e5e7eb' : 'none',
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center'
//                 }}>
//                   <div>
//                     <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '4px' }}>
//                       {partner.name}
//                     </div>
//                     <div style={{ fontSize: '12px', color: '#6b7280' }}>
//                       Active Shipments
//                     </div>
//                   </div>
//                   <div style={{ textAlign: 'right' }}>
//                     <div style={{
//                       fontSize: '12px',
//                       color: '#f59e0b',
//                       marginBottom: '4px',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '4px'
//                     }}>
//                       <Star size={14} fill="#f59e0b" /> {partner.rating}
//                     </div>
//                     <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
//                       {partner.activeShipments}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Shipping Zones */}
//             <div style={{
//               backgroundColor: 'white',
//               borderRadius: '8px',
//               boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//               padding: '20px'
//             }}>
//               <h3 style={{
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 color: '#111827',
//                 marginBottom: '16px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px'
//               }}>
//                 <MapPin size={18} /> Shipping Zones
//               </h3>
//               {shippingZones.map((zone, idx) => (
//                 <div key={idx} style={{
//                   padding: '16px 0',
//                   borderBottom: idx < shippingZones.length - 1 ? '1px solid #e5e7eb' : 'none'
//                 }}>
//                   <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
//                     {zone.name}
//                   </div>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
//                     <span style={{ fontSize: '12px', color: '#6b7280' }}>Range:</span>
//                     <span style={{ fontSize: '12px', color: '#374151' }}>{zone.range}</span>
//                   </div>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
//                     <span style={{ fontSize: '12px', color: '#6b7280' }}>Rate:</span>
//                     <span style={{ fontSize: '12px', color: '#374151' }}>{zone.rate}</span>
//                   </div>
//                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <span style={{ fontSize: '12px', color: '#6b7280' }}>Delivery:</span>
//                     <span style={{ fontSize: '12px', color: '#374151' }}>{zone.delivery}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShippingDelivery;














import React, { useState, useEffect } from 'react';
import { MapPin, Star, Download, Filter, Search } from 'lucide-react';

const shippingPartners = [
  { name: 'FedEx', rating: 4.5, activeShipments: 145 },
  { name: 'UPS', rating: 4.7, activeShipments: 234 },
  { name: 'USPS', rating: 4.2, activeShipments: 189 },
  { name: 'DHL', rating: 4.6, activeShipments: 98 }
];

const shippingZones = [
  { name: 'Zone 1 (Local)', range: '0-50 miles', rate: '₹99', delivery: '1-2 days' },
  { name: 'Zone 2 (Regional)', range: '51-200 miles', rate: '₹199', delivery: '2-3 days' },
  { name: 'Zone 3 (National)', range: '201-1000 miles', rate: '₹299', delivery: '3-5 days' },
  { name: 'Zone 4 (Extended)', range: '1000+ miles', rate: '₹499', delivery: '5-7 days' }
];

const ShippingDelivery = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [shipmentsData, setShipmentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShippingData = async () => {
      try {
        setLoading(true);
        
        // Fetch orders using public endpoint
        const ordersResponse = await fetch('http://localhost:5000/api/orders/public');
        if (!ordersResponse.ok) {
          throw new Error(`Orders API error: ${ordersResponse.status}`);
        }
        const ordersData = await ordersResponse.json();
        const orders = ordersData.orders || ordersData || [];

        // Process orders into shipment data
        const processedShipments = orders.map(order => {
          const orderDate = new Date(order.createdAt || order.orderDate || order.date);
          const status = (order.status || '').toLowerCase();
          
          // Determine shipment status based on order status
          let shipmentStatus = 'Processing';
          let shippedDate = '';
          let deliveredDate = '';
          
          if (status.includes('delivered') || status.includes('completed')) {
            shipmentStatus = 'Delivered';
            shippedDate = new Date(orderDate.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 3 days before delivery
            deliveredDate = orderDate.toISOString().split('T')[0];
          } else if (status.includes('shipped') || status.includes('transit')) {
            shipmentStatus = 'In Transit';
            shippedDate = orderDate.toISOString().split('T')[0];
          } else if (status.includes('confirmed') || status.includes('processing')) {
            shipmentStatus = 'Shipped';
            shippedDate = orderDate.toISOString().split('T')[0];
          }

          // Mock carrier data based on order ID
          const carriers = ['FedEx', 'UPS', 'USPS', 'DHL'];
          const carrier = carriers[Math.floor(Math.random() * carriers.length)];
          
          // Mock tracking number
          const trackingPrefix = {
            'FedEx': 'FEDX',
            'UPS': 'UPS',
            'USPS': 'USPS',
            'DHL': 'DHL'
          };
          const trackingNumber = trackingPrefix[carrier] + Math.random().toString().slice(2, 11);

          // Mock destination (in real app, this would come from order.shippingAddress)
          const cities = [
            'New Delhi, DL 110001',
            'Mumbai, MH 400001', 
            'Bangalore, KA 560001',
            'Chennai, TN 600001',
            'Kolkata, WB 700001',
            'Hyderabad, TS 500001'
          ];
          const destination = cities[Math.floor(Math.random() * cities.length)];

          return {
            id: `SHIP-${(order.orderNumber || order._id || '').toString().slice(-4)}`,
            orderId: `#${order.orderNumber || order._id || 'ORD-' + Math.random().toString(36).substr(2, 6)}`,
            status: shipmentStatus,
            customer: order.user?.name || order.customerName || `${order.userId?.firstName || ''} ${order.userId?.lastName || ''}`.trim() || 'Unknown Customer',
            carrier: carrier,
            destination: destination,
            trackingNumber: trackingNumber,
            shipped: shippedDate,
            delivered: deliveredDate,
            originalOrder: order
          };
        });

        setShipmentsData(processedShipments);
      } catch (error) {
        console.error('Error fetching shipping data:', error);
        // Fallback to sample data if API fails
        setShipmentsData([
          {
            id: 'SHIP-1234',
            orderId: '#ORD-1234',
            status: 'Delivered',
            customer: 'John Doe',
            carrier: 'FedEx',
            destination: 'New Delhi, DL 110001',
            trackingNumber: 'FEDX12345789',
            shipped: '2025-10-20',
            delivered: '2025-10-25'
          },
          {
            id: 'SHIP-1235',
            orderId: '#ORD-1235',
            status: 'In Transit',
            customer: 'Jane Smith',
            carrier: 'UPS',
            destination: 'Mumbai, MH 400001',
            trackingNumber: 'UPS987654321',
            shipped: '2025-10-26'
          },
          {
            id: 'SHIP-1236',
            orderId: '#ORD-1236',
            status: 'Shipped',
            customer: 'Bob Johnson',
            carrier: 'USPS',
            destination: 'Bangalore, KA 560001',
            trackingNumber: 'USPS555444333',
            shipped: '2025-10-27'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchShippingData();
  }, []);

  // Calculate shipping statistics from real data
  const totalShipments = shipmentsData.length;
  const inTransitCount = shipmentsData.filter(s => s.status === 'In Transit').length;
  
  // Calculate delivered today
  const today = new Date().toISOString().split('T')[0];
  const deliveredTodayCount = shipmentsData.filter(s => 
    s.status === 'Delivered' && s.delivered === today
  ).length;

  // Calculate average delivery time (for delivered orders)
  const deliveredOrders = shipmentsData.filter(s => s.status === 'Delivered' && s.shipped && s.delivered);
  const totalDeliveryDays = deliveredOrders.reduce((total, shipment) => {
    const shippedDate = new Date(shipment.shipped);
    const deliveredDate = new Date(shipment.delivered);
    const diffTime = Math.abs(deliveredDate - shippedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return total + diffDays;
  }, 0);
  const avgDeliveryTime = deliveredOrders.length > 0 ? (totalDeliveryDays / deliveredOrders.length).toFixed(1) : 0;

  const getStatusStyle = (status) => {
    const styles = {
      'Delivered': { bg: '#d1fae5', color: '#059669', icon: '✓' },
      'In Transit': { bg: '#e0e7ff', color: '#6366f1', icon: '🚚' },
      'Shipped': { bg: '#dbeafe', color: '#3b82f6', icon: '📦' },
      'Processing': { bg: '#fef3c7', color: '#d97706', icon: '⏳' }
    };
    return styles[status] || styles['Processing'];
  };

  const filteredShipments = shipmentsData.filter(shipment => {
    const matchesTab = activeTab === 'All' || shipment.status === activeTab;
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const StatCard = ({ label, value, change, isPositive }) => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontSize: '32px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>{value}</div>
      <div style={{ fontSize: '13px', color: isPositive ? '#059669' : '#dc2626' }}>
        {change}
      </div>
    </div>
  );

  const ShipmentCard = ({ shipment }) => {
    const statusStyle = getStatusStyle(shipment.status);
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '12px',
        border: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
              {shipment.id}
            </span>
            <span style={{
              fontSize: '12px',
              fontWeight: '500',
              padding: '4px 10px',
              borderRadius: '12px',
              backgroundColor: statusStyle.bg,
              color: statusStyle.color,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              {statusStyle.icon} {shipment.status}
            </span>
          </div>
          <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>
            Order: <span style={{ color: '#3b82f6', fontWeight: '500' }}>{shipment.orderId}</span>
          </div>
          <div style={{ fontSize: '13px', color: '#374151', marginBottom: '8px' }}>
            Customer<br/>
            <span style={{ fontWeight: '500' }}>{shipment.customer}</span>
          </div>
          <div style={{ fontSize: '13px', color: '#374151', marginBottom: '8px' }}>
            Carrier<br/>
            <span style={{ fontWeight: '500' }}>{shipment.carrier}</span>
          </div>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>
            {shipment.delivered ? 
              `Shipped ${shipment.shipped}   Delivered: ${shipment.delivered}` :
              `Shipped ${shipment.shipped}`
            }
          </div>
        </div>

        <div style={{ flex: 1, paddingLeft: '40px' }}>
          <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Destination</div>
          <div style={{ fontSize: '14px', color: '#111827', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={16} color="#6b7280" />
            {shipment.destination}
          </div>
          <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Tracking Number</div>
          <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>
            {shipment.trackingNumber}
          </div>
        </div>

        <div>
          <button style={{
            color: '#059669',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            padding: '4px 8px'
          }}>
            Track
          </button>
        </div>
      </div>
    );
  };

  const exportToExcel = () => {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add headers
    csvContent += "Shipment ID,Order ID,Status,Customer,Carrier,Destination,Tracking Number,Shipped Date,Delivered Date\n";
    
    // Add shipment data
    shipmentsData.forEach(shipment => {
      csvContent += `${shipment.id},${shipment.orderId},${shipment.status},${shipment.customer},${shipment.carrier},${shipment.destination},${shipment.trackingNumber},${shipment.shipped},${shipment.delivered || ''}\n`;
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "shipping_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <p>Loading shipping data...</p>
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
              Shipping & Delivery
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Manage shipments and delivery tracking</p>
          </div>
          <button style={{
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
            gap: '6px'
          }}>
            + Create Shipment
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          <StatCard 
            label="Total Shipments" 
            value={totalShipments.toString()} 
            change="+12.5% from last month" 
            isPositive={true} 
          />
          <StatCard 
            label="In Transit" 
            value={inTransitCount.toString()} 
            change="+8.2% from last month" 
            isPositive={true} 
          />
          <StatCard 
            label="Delivered Today" 
            value={deliveredTodayCount.toString()} 
            change="+15.3% from last month" 
            isPositive={true} 
          />
          <StatCard 
            label="Avg Delivery Time" 
            value={`${avgDeliveryTime} days`} 
            change="-5.1% from last month" 
            isPositive={true} 
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
          {/* Main Content */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            {/* Tabs */}
            <div style={{
              display: 'flex',
              gap: '8px',
              padding: '20px 20px 0 20px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              {['All', 'Processing', 'Shipped', 'In Transit', 'Delivered'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    background: activeTab === tab ? '#d1fae5' : 'transparent',
                    color: activeTab === tab ? '#059669' : '#6b7280',
                    borderRadius: '6px 6px 0 0',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab} {tab !== 'All' && `(${shipmentsData.filter(s => s.status === tab).length})`}
                </button>
              ))}
            </div>

            {/* Search and Filters */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={18} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type="text"
                  placeholder="Search shipments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 40px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <button style={{
                padding: '10px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                background: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Filter size={16} />
              </button>
              <button 
                onClick={exportToExcel}
                style={{
                  padding: '10px 16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  background: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Download size={16} />
              </button>
            </div>

            {/* Shipments List */}
            <div style={{ padding: '20px' }}>
              {filteredShipments.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                  No shipments found
                </div>
              ) : (
                filteredShipments.map(shipment => (
                  <ShipmentCard key={shipment.id} shipment={shipment} />
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Shipping Partners */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                📦 Shipping Partners
              </h3>
              {shippingPartners.map((partner, idx) => (
                <div key={idx} style={{
                  padding: '12px 0',
                  borderBottom: idx < shippingPartners.length - 1 ? '1px solid #e5e7eb' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '4px' }}>
                      {partner.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      Active Shipments
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#f59e0b',
                      marginBottom: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Star size={14} fill="#f59e0b" /> {partner.rating}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                      {partner.activeShipments}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Zones */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              padding: '20px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <MapPin size={18} /> Shipping Zones
              </h3>
              {shippingZones.map((zone, idx) => (
                <div key={idx} style={{
                  padding: '16px 0',
                  borderBottom: idx < shippingZones.length - 1 ? '1px solid #e5e7eb' : 'none'
                }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
                    {zone.name}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>Range:</span>
                    <span style={{ fontSize: '12px', color: '#374151' }}>{zone.range}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>Rate:</span>
                    <span style={{ fontSize: '12px', color: '#374151' }}>{zone.rate}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>Delivery:</span>
                    <span style={{ fontSize: '12px', color: '#374151' }}>{zone.delivery}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDelivery;