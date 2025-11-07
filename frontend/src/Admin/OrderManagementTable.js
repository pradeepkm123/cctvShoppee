// // import React, { useState, useEffect } from "react";
// // import { Search, Eye, Download, MoreVertical, Trash, Filter, ChevronDown, ChevronUp } from "lucide-react";
// // import PropTypes from "prop-types";
// // import axios from "axios";

// // const OrderManagementTable = ({ onOrderClick }) => {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [filteredOrders, setFilteredOrders] = useState([]);
// //   const [statusFilter, setStatusFilter] = useState("All Status");
// //   const [paymentFilter, setPaymentFilter] = useState("All Payments");
// //   const [timeFilter, setTimeFilter] = useState("All Time");
// //   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [selectedOrders, setSelectedOrders] = useState([]);
// //   const [selectAll, setSelectAll] = useState(false);

// //   // Helper function to format shipping address
// //   const formatAddress = (address) => {
// //     if (!address) return "N/A";
// //     return `${address.street || ""}, ${address.city || ""}, ${address.state || ""}, ${address.postcode || ""}, ${address.country || ""}`
// //       .replace(/,\s*,/g, ", ")
// //       .replace(/^, |, $/g, "");
// //   };

// //   useEffect(() => {
// //     const fetchOrders = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         const role = localStorage.getItem("role");
// //         if (!token) throw new Error("No token found");

// //         const endpoint = role === "admin" ? "http://localhost:5000/api/orders/all" : "http://localhost:5000/api/orders";
// //         const response = await axios.get(endpoint, { headers: { Authorization: `Bearer ${token}` } });
// //         const data = Array.isArray(response.data) ? response.data : response.data.orders || [];
// //         setOrders(data);
// //       } catch (err) {
// //         console.error("Error fetching orders:", err.response ? err.response.data : err.message);
// //         setError(err.response?.data?.message || "Failed to fetch orders");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchOrders();
// //   }, []);

// //   useEffect(() => {
// //     let result = [...orders];

// //     // Search
// //     if (searchTerm) {
// //       result = result.filter(
// //         (order) =>
// //           order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           (order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //           (order.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //           (order.user?.phone?.includes(searchTerm)) ||
// //           (order.userId?.phone?.includes(searchTerm)) ||
// //           (order.awbNumber && order.awbNumber.toLowerCase().includes(searchTerm.toLowerCase()))
// //       );
// //     }

// //     // Status Filter
// //     if (statusFilter !== "All Status") {
// //       result = result.filter((order) => order.status === statusFilter);
// //     }

// //     // Payment Filter
// //     if (paymentFilter !== "All Payments") {
// //       result = result.filter((order) => order.paymentStatus === paymentFilter);
// //     }

// //     // Time Filter
// //     if (timeFilter === "Last 7 Days") {
// //       const sevenDaysAgo = new Date();
// //       sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
// //       result = result.filter((order) => new Date(order.createdAt) >= sevenDaysAgo);
// //     } else if (timeFilter === "Last 30 Days") {
// //       const thirtyDaysAgo = new Date();
// //       thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
// //       result = result.filter((order) => new Date(order.createdAt) >= thirtyDaysAgo);
// //     }

// //     // Sorting
// //     if (sortConfig.key) {
// //       result.sort((a, b) => {
// //         if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
// //         if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
// //         return 0;
// //       });
// //     }

// //     setFilteredOrders(result);
// //   }, [searchTerm, orders, statusFilter, paymentFilter, timeFilter, sortConfig]);

// //   const requestSort = (key) => {
// //     let direction = 'ascending';
// //     if (sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
// //     setSortConfig({ key, direction });
// //   };

// //   const toggleSelectAll = () => {
// //     if (selectAll) setSelectedOrders([]);
// //     else setSelectedOrders(filteredOrders.map((order) => order._id));
// //     setSelectAll(!selectAll);
// //   };

// //   const toggleOrderSelection = (orderId) => {
// //     if (selectedOrders.includes(orderId)) setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
// //     else setSelectedOrders([...selectedOrders, orderId]);
// //   };

// //   const getStatusStyle = (status) => {
// //     const styles = {
// //       Shipped: { backgroundColor: "#FEF3C7", color: "#D97706" },
// //       Packed: { backgroundColor: "#E5E7EB", color: "#374151" },
// //       Delivered: { backgroundColor: "#D1FAE5", color: "#059669" },
// //       Confirmed: { backgroundColor: "#DBEAFE", color: "#2563EB" },
// //       Cancelled: { backgroundColor: "#FEE2E2", color: "#DC2626" },
// //       Processing: { backgroundColor: "#DDD6FE", color: "#7C3AED" },
// //       Created: { backgroundColor: "#d8e3ff", color: "#002ea5" },
// //       "Item Out to Delivery": { backgroundColor: "#FFF7ED", color: "#EA580C" },
// //       Allocated: { backgroundColor: "#F3E8FF", color: "#9333EA" },
// //       "Cancelled by admin": { backgroundColor: "#FECACA", color: "#B91C1C" },
// //       "Shipment Created": { backgroundColor: "#E0F2FE", color: "#0284C7" },
// //       Pending: { backgroundColor: "#F3F4F6", color: "#6B7280" },
// //     };
// //     return {
// //       ...(styles[status] || styles["Pending"]),
// //       padding: "4px 8px",
// //       borderRadius: "4px",
// //       fontSize: "12px",
// //       fontWeight: "500",
// //       display: "inline-block",
// //     };
// //   };

// //   const getPaymentStyle = (payment) => {
// //     const styles = {
// //       Paid: { backgroundColor: "#D1FAE5", color: "#059669" },
// //       Captured: { backgroundColor: "#D1FAE5", color: "#059669" },
// //       Pending: { backgroundColor: "#FEF3C7", color: "#D97706" },
// //       Refunded: { backgroundColor: "#FCE7F3", color: "#BE185D" },
// //       Failed: { backgroundColor: "#FEE2E2", color: "#DC2626" },
// //     };
// //     return {
// //       ...(styles[payment] || styles["Pending"]),
// //       padding: "4px 8px",
// //       borderRadius: "4px",
// //       fontSize: "12px",
// //       fontWeight: "500",
// //       display: "inline-block",
// //     };
// //   };

// //   if (loading) {
// //     return (
// //       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
// //         <div>Loading orders...</div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", color: "red" }}>
// //         Error: {error}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", backgroundColor: "#F9FAFB", minHeight: "100vh", padding: "20px" }}>
// //       {/* Header */}
// //       <div style={{ marginBottom: "20px" }}>
// //         <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>Order Management</h1>
// //         <p style={{ color: "#6B7280", marginTop: "4px" }}>Manage and track all your orders in one place</p>
// //       </div>

// //       {/* Search & Filters */}
// //       <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "16px 24px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
// //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: showFilters ? "16px" : "0" }}>
// //           <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
// //             <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", width: "16px", height: "16px" }} />
// //             <input
// //               type="text"
// //               placeholder="Search by order ID, customer name, phone, or AWB number..."
// //               style={{ width: "100%", padding: "10px 12px 10px 36px", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "14px", color: "#374151", outline: "none" }}
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //             />
// //           </div>
// //           <button
// //             onClick={() => setShowFilters(!showFilters)}
// //             style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", backgroundColor: "#F9FAFB", border: "1px solid #D1D5DB", borderRadius: "6px", cursor: "pointer", color: "#374151", fontSize: "14px" }}
// //           >
// //             <Filter size={16} /> Filters {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
// //           </button>
// //         </div>

// //         {/* Expanded Filters */}
// //         {showFilters && (
// //           <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", paddingTop: "16px", borderTop: "1px solid #E5E7EB" }}>
// //             <div>
// //               <label style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>Order Status</label>
// //               <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: "8px 12px", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "14px", minWidth: "140px" }}>
// //                 <option>All Status</option>
// //                 <option>Pending</option>
// //                 <option>Confirmed</option>
// //                 <option>Processing</option>
// //                 <option>Shipped</option>
// //                 <option>Delivered</option>
// //                 <option>Cancelled</option>
// //               </select>
// //             </div>
// //             <div>
// //               <label style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>Payment Status</label>
// //               <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} style={{ padding: "8px 12px", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "14px", minWidth: "140px" }}>
// //                 <option>All Payments</option>
// //                 <option>Pending</option>
// //                 <option>Paid</option>
// //                 <option>Captured</option>
// //                 <option>Refunded</option>
// //                 <option>Failed</option>
// //               </select>
// //             </div>
// //             <div>
// //               <label style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>Time Period</label>
// //               <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} style={{ padding: "8px 12px", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "14px", minWidth: "140px" }}>
// //                 <option>All Time</option>
// //                 <option>Last 7 Days</option>
// //                 <option>Last 30 Days</option>
// //               </select>
// //             </div>
// //             <div style={{ display: "flex", alignItems: "flex-end" }}>
// //               <button
// //                 onClick={() => {
// //                   setStatusFilter("All Status");
// //                   setPaymentFilter("All Payments");
// //                   setTimeFilter("All Time");
// //                 }}
// //                 style={{ padding: "8px 16px", backgroundColor: "#F3F4F6", border: "1px solid #D1D5DB", borderRadius: "6px", cursor: "pointer", color: "#374151", fontSize: "14px" }}
// //               >
// //                 Clear Filters
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Orders Table */}
// //       <div style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", overflow: "hidden" }}>
// //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #E5E7EB" }}>
// //           <div style={{ color: "#374151", fontSize: "14px" }}>{filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found</div>
// //           {selectedOrders.length > 0 && (
// //             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// //               <span style={{ color: "#374151", fontSize: "14px" }}>{selectedOrders.length} selected</span>
// //               <button style={{ padding: "6px 12px", backgroundColor: "#EF4444", color: "white", border: "none", borderRadius: "4px", fontSize: "14px", cursor: "pointer" }}>Bulk Actions</button>
// //             </div>
// //           )}
// //         </div>

// //         {filteredOrders.length === 0 ? (
// //           <div style={{ padding: "40px 20px", textAlign: "center", color: "#6B7280" }}>No orders found. Try adjusting your search or filters.</div>
// //         ) : (
// //           <div style={{ overflowX: "auto" }}>
// //             <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1000px" }}>
// //               <thead>
// //                 <tr style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
// //                   <th style={{ padding: "12px 16px", width: "40px" }}><input type="checkbox" checked={selectAll} onChange={toggleSelectAll} /></th>
// //                   <th style={{ padding: "12px 16px", textAlign: "center", cursor: "pointer" }} onClick={() => requestSort('_id')}>ORDER ID {sortConfig.key === '_id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
// //                   <th style={{ padding: "12px 16px", textAlign: "center", cursor: "pointer" }} onClick={() => requestSort('user.name')}>CUSTOMER {sortConfig.key === 'user.name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
// //                   <th style={{ padding: "12px 16px", textAlign: "center", cursor: "pointer" }} onClick={() => requestSort('totalAmount')}>AMOUNT {sortConfig.key === 'totalAmount' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
// //                   <th style={{ padding: "12px 16px", textAlign: "center", cursor: "pointer" }} onClick={() => requestSort('status')}>STATUS {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
// //                   <th style={{ padding: "12px 16px", textAlign: "center", cursor: "pointer" }} onClick={() => requestSort('paymentStatus')}>PAYMENT {sortConfig.key === 'paymentStatus' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
// //                   <th style={{ padding: "12px 16px", textAlign: "center", cursor: "pointer" }} onClick={() => requestSort('createdAt')}>DATE {sortConfig.key === 'createdAt' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
// //                   <th style={{ padding: "12px 16px", textAlign: "center" }}>ACTIONS</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {filteredOrders.map((order, index) => (
// //                   <tr key={order._id} style={{ backgroundColor: selectedOrders.includes(order._id) ? "#F0F9FF" : "white", borderBottom: index === filteredOrders.length - 1 ? "none" : "1px solid #F3F4F6" }}>
// //                     <td style={{ padding: "16px" }}><input type="checkbox" checked={selectedOrders.includes(order._id)} onChange={() => toggleOrderSelection(order._id)} /></td>
// //                     <td style={{ padding: "16px" }}>
// //                       <div>
// //                         <div onClick={() => onOrderClick(order)} style={{ color: "#10B981", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>#{order._id}</div>
// //                       </div>
// //                     </td>
// //                     <td style={{ padding: "16px" }}>
// //                       <div>
// //                         <div>
// //                           {order.user?.name ||
// //                             order.userId?.name ||
// //                             order.shippingAddress?.firstName ||
// //                             "Unknown"}
// //                         </div>
// //                         <div style={{ color: "#9CA3AF", fontSize: "12px", marginTop: "2px" }}>{formatAddress(order.shippingAddress)}</div>
// //                       </div>
// //                     </td>
// //                     <td style={{ padding: "16px" }}>
// //                       <div>
// //                         <div style={{ color: "#374151", fontSize: "14px", fontWeight: "600" }}>₹{order.totalAmount ? order.totalAmount.toLocaleString('en-IN') : "0"}</div>
// //                       </div>
// //                     </td>
// //                     <td style={{ padding: "16px" }}><span style={getStatusStyle(order.status)}>{order.status || "Created"}</span></td>
// //                     <td style={{ padding: "16px" }}><span style={getPaymentStyle(order.paymentStatus)}>{order.paymentStatus}</span></td>
// //                     <td style={{ padding: "16px" }}>
// //                       <div>
// //                         <div style={{ color: "#374151", fontSize: "13px" }}>{new Date(order.createdAt).toLocaleDateString('en-IN')}</div>
// //                         <div style={{ color: "#9CA3AF", fontSize: "12px", marginTop: "2px" }}>{new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: "2-digit", minute: "2-digit" })}</div>
// //                       </div>
// //                     </td>
// //                     <td style={{ padding: "16px", justifyItems: 'center' }}>
// //                       <div style={{ display: "flex", gap: "12px" }}>
// //                         <button onClick={() => onOrderClick(order)} style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px", borderRadius: "4px", backgroundColor: "#F0FDF4" }} title="View Details"><Eye size={16} color="#10B981" /></button>
// //                         <button style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px", borderRadius: "4px", backgroundColor: "#FFFBEB" }} title="Download Invoice"><Download size={16} color="#F59E0B" /></button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // OrderManagementTable.propTypes = {
// //   onOrderClick: PropTypes.func.isRequired,
// // };

// // export default OrderManagementTable;








// import React, { useState, useEffect } from "react";
// import { Search, Eye, Download, MoreVertical, Trash, Filter, ChevronDown, ChevronUp } from "lucide-react";
// import PropTypes from "prop-types";
// import axios from "axios";

// const OrderManagementTable = ({ onOrderClick }) => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("All Status");
//   const [paymentFilter, setPaymentFilter] = useState("All Payments");
//   const [timeFilter, setTimeFilter] = useState("All Time");
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedOrders, setSelectedOrders] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);

//   // Helper function to format shipping address
//   const formatAddress = (address) => {
//     if (!address) return "N/A";
//     return `${address.street || ""}, ${address.city || ""}, ${address.state || ""}, ${address.postcode || ""}, ${address.country || ""}`
//       .replace(/,\s*,/g, ", ")
//       .replace(/^, |, $/g, "");
//   };

//   // Function to download invoice
//   const handleDownloadInvoice = async (orderId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`http://localhost:5000/api/orders/${orderId}/invoice`, {
//         headers: { Authorization: `Bearer ${token}` },
//         responseType: 'blob',
//       });

//       // Create blob link to download
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `invoice-${orderId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Error downloading invoice:', error);
//       alert('Failed to download invoice');
//     }
//   };

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const role = localStorage.getItem("role");
//         if (!token) throw new Error("No token found");
//         const endpoint = role === "admin" ? "http://localhost:5000/api/orders/all" : "http://localhost:5000/api/orders";
//         const response = await axios.get(endpoint, { headers: { Authorization: `Bearer ${token}` } });
//         const data = Array.isArray(response.data) ? response.data : response.data.orders || [];
//         setOrders(data);
//       } catch (err) {
//         console.error("Error fetching orders:", err.response ? err.response.data : err.message);
//         setError(err.response?.data?.message || "Failed to fetch orders");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     let result = [...orders];
//     // Search
//     if (searchTerm) {
//       result = result.filter(
//         (order) =>
//           order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (order.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (order.user?.phone?.includes(searchTerm)) ||
//           (order.userId?.phone?.includes(searchTerm)) ||
//           (order.awbNumber && order.awbNumber.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//     }
//     // Status Filter
//     if (statusFilter !== "All Status") {
//       result = result.filter((order) => order.status === statusFilter);
//     }
//     // Payment Filter
//     if (paymentFilter !== "All Payments") {
//       result = result.filter((order) => order.paymentStatus === paymentFilter);
//     }
//     // Time Filter
//     if (timeFilter === "Last 7 Days") {
//       const sevenDaysAgo = new Date();
//       sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//       result = result.filter((order) => new Date(order.createdAt) >= sevenDaysAgo);
//     } else if (timeFilter === "Last 30 Days") {
//       const thirtyDaysAgo = new Date();
//       thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
//       result = result.filter((order) => new Date(order.createdAt) >= thirtyDaysAgo);
//     }
//     // Sorting
//     if (sortConfig.key) {
//       result.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
//         if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
//         return 0;
//       });
//     }
//     setFilteredOrders(result);
//   }, [searchTerm, orders, statusFilter, paymentFilter, timeFilter, sortConfig]);

//   const requestSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
//     setSortConfig({ key, direction });
//   };

//   const toggleSelectAll = () => {
//     if (selectAll) setSelectedOrders([]);
//     else setSelectedOrders(filteredOrders.map((order) => order._id));
//     setSelectAll(!selectAll);
//   };

//   const toggleOrderSelection = (orderId) => {
//     if (selectedOrders.includes(orderId)) setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
//     else setSelectedOrders([...selectedOrders, orderId]);
//   };

//   const getStatusStyle = (status) => {
//     const styles = {
//       Shipped: { backgroundColor: "#FEF3C7", color: "#D97706" },
//       Packed: { backgroundColor: "#E5E7EB", color: "#374151" },
//       Delivered: { backgroundColor: "#D1FAE5", color: "#059669" },
//       Confirmed: { backgroundColor: "#DBEAFE", color: "#2563EB" },
//       Cancelled: { backgroundColor: "#FEE2E2", color: "#DC2626" },
//       Processing: { backgroundColor: "#DDD6FE", color: "#7C3AED" },
//       Created: { backgroundColor: "#d8e3ff", color: "#002ea5" },
//       "Item Out to Delivery": { backgroundColor: "#FFF7ED", color: "#EA580C" },
//       Allocated: { backgroundColor: "#F3E8FF", color: "#9333EA" },
//       "Cancelled by admin": { backgroundColor: "#FECACA", color: "#B91C1C" },
//       "Shipment Created": { backgroundColor: "#E0F2FE", color: "#0284C7" },
//       Pending: { backgroundColor: "#F3F4F6", color: "#6B7280" },
//     };
//     return {
//       ...(styles[status] || styles["Pending"]),
//       padding: "4px 8px",
//       borderRadius: "4px",
//       fontSize: "12px",
//       fontWeight: "500",
//       display: "inline-block",
//     };
//   };

//   const getPaymentStyle = (payment) => {
//     const styles = {
//       Paid: { backgroundColor: "#D1FAE5", color: "#059669" },
//       Captured: { backgroundColor: "#D1FAE5", color: "#059669" },
//       Pending: { backgroundColor: "#FEF3C7", color: "#D97706" },
//       Refunded: { backgroundColor: "#FCE7F3", color: "#BE185D" },
//       Failed: { backgroundColor: "#FEE2E2", color: "#DC2626" },
//     };
//     return {
//       ...(styles[payment] || styles["Pending"]),
//       padding: "4px 8px",
//       borderRadius: "4px",
//       fontSize: "12px",
//       fontWeight: "500",
//       display: "inline-block",
//     };
//   };

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
//         <div>Loading orders...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", color: "red" }}>
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", backgroundColor: "#F9FAFB", minHeight: "100vh", padding: "20px" }}>
//       {/* Header */}
//       <div style={{ marginBottom: "20px" }}>
//         <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>Order Management</h1>
//         <p style={{ color: "#6B7280", marginTop: "4px" }}>Manage and track all your orders in one place</p>
//       </div>

//       {/* Search & Filters */}
//       <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "16px 24px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: showFilters ? "16px" : "0" }}>
//           <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
//             <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", width: "16px", height: "16px" }} />
//             <input
//               type="text"
//               placeholder="Search by order ID, customer name, phone, or AWB number..."
//               style={{ width: "100%", padding: "10px 12px 10px 36px", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "14px", color: "#374151", outline: "none" }}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", backgroundColor: "#F9FAFB", border: "1px solid #D1D5DB", borderRadius: "6px", cursor: "pointer", color: "#374151", fontSize: "14px" }}
//           >
//             <Filter size={16} /> Filters {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//           </button>
//         </div>

//         {/* Expanded Filters */}
//         {showFilters && (
//           <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", paddingTop: "16px", borderTop: "1px solid #E5E7EB" }}>
//             <div>
//               <label style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>Order Status</label>
//               <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: "8px 12px", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "14px", minWidth: "140px" }}>
//                 <option>All Status</option>
//                 <option>Pending</option>
//                 <option>Confirmed</option>
//                 <option>Processing</option>
//                 <option>Shipped</option>
//                 <option>Delivered</option>
//                 <option>Cancelled</option>
//               </select>
//             </div>
//             <div>
//               <label style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>Payment Status</label>
//               <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} style={{ padding: "8px 12px", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "14px", minWidth: "140px" }}>
//                 <option>All Payments</option>
//                 <option>Pending</option>
//                 <option>Paid</option>
//                 <option>Captured</option>
//                 <option>Refunded</option>
//                 <option>Failed</option>
//               </select>
//             </div>
//             <div>
//               <label style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>Time Period</label>
//               <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} style={{ padding: "8px 12px", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "14px", minWidth: "140px" }}>
//                 <option>All Time</option>
//                 <option>Last 7 Days</option>
//                 <option>Last 30 Days</option>
//               </select>
//             </div>
//             <div style={{ display: "flex", alignItems: "flex-end" }}>
//               <button
//                 onClick={() => {
//                   setStatusFilter("All Status");
//                   setPaymentFilter("All Payments");
//                   setTimeFilter("All Time");
//                 }}
//                 style={{ padding: "8px 16px", backgroundColor: "#F3F4F6", border: "1px solid #D1D5DB", borderRadius: "6px", cursor: "pointer", color: "#374151", fontSize: "14px" }}
//               >
//                 Clear Filters
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Orders Table */}
//       <div style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", overflow: "hidden" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #E5E7EB" }}>
//           <div style={{ color: "#374151", fontSize: "14px" }}>{filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found</div>
//           {selectedOrders.length > 0 && (
//             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//               <span style={{ color: "#374151", fontSize: "14px" }}>{selectedOrders.length} selected</span>
//               <button style={{ padding: "6px 12px", backgroundColor: "#EF4444", color: "white", border: "none", borderRadius: "4px", fontSize: "14px", cursor: "pointer" }}>Bulk Actions</button>
//             </div>
//           )}
//         </div>

//         {filteredOrders.length === 0 ? (
//           <div style={{ padding: "40px 20px", textAlign: "center", color: "#6B7280" }}>No orders found. Try adjusting your search or filters.</div>
//         ) : (
//           <div style={{ overflowX: "auto" }}>
//             <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1000px" }}>
//               <thead>
//                 <tr style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
//                   <th style={{ padding: "12px 16px", width: "40px" }}><input type="checkbox" checked={selectAll} onChange={toggleSelectAll} /></th>
//                   <th style={{ padding: "12px 16px", textAlign: "center", cursor: "pointer" }} onClick={() => requestSort('_id')}>ORDER ID {sortConfig.key === '_id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
//                   <th style={{ padding: "12px 16px", textAlign: "center", cursor: "pointer" }} onClick={() => requestSort('user.name')}>CUSTOMER {sortConfig.key === 'user.name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
//                   <th style={{ padding: "12px 16px", textAlign: "center", cursor: "pointer" }} onClick={() => requestSort('totalAmount')}>AMOUNT {sortConfig.key === 'totalAmount' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
//                   <th style={{ padding: "12px 16px", textAlign: "center", cursor: "pointer" }} onClick={() => requestSort('status')}>STATUS {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
//                   <th style={{ padding: "12px 16px", textAlign: "center", cursor: "pointer" }} onClick={() => requestSort('paymentStatus')}>PAYMENT {sortConfig.key === 'paymentStatus' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
//                   <th style={{ padding: "12px 16px", textAlign: "center", cursor: "pointer" }} onClick={() => requestSort('createdAt')}>DATE {sortConfig.key === 'createdAt' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
//                   <th style={{ padding: "12px 16px", textAlign: "center" }}>ACTIONS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredOrders.map((order, index) => (
//                   <tr key={order._id} style={{ backgroundColor: selectedOrders.includes(order._id) ? "#F0F9FF" : "white", borderBottom: index === filteredOrders.length - 1 ? "none" : "1px solid #F3F4F6" }}>
//                     <td style={{ padding: "16px" }}><input type="checkbox" checked={selectedOrders.includes(order._id)} onChange={() => toggleOrderSelection(order._id)} /></td>
//                     <td style={{ padding: "16px" }}>
//                       <div>
//                         <div onClick={() => onOrderClick(order)} style={{ color: "#10B981", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>#{order._id}</div>
//                       </div>
//                     </td>
//                     <td style={{ padding: "16px" }}>
//                       <div>
//                         <div>
//                           {order.user?.name ||
//                             order.userId?.name ||
//                             order.shippingAddress?.firstName ||
//                             "Unknown"}
//                         </div>
//                         <div style={{ color: "#9CA3AF", fontSize: "12px", marginTop: "2px" }}>{formatAddress(order.shippingAddress)}</div>
//                       </div>
//                     </td>
//                     <td style={{ padding: "16px" }}>
//                       <div>
//                         <div style={{ color: "#374151", fontSize: "14px", fontWeight: "600" }}>₹{order.totalAmount ? order.totalAmount.toLocaleString('en-IN') : "0"}</div>
//                       </div>
//                     </td>
//                     <td style={{ padding: "16px" }}><span style={getStatusStyle(order.status)}>{order.status || "Created"}</span></td>
//                     <td style={{ padding: "16px" }}><span style={getPaymentStyle(order.paymentStatus)}>{order.paymentStatus}</span></td>
//                     <td style={{ padding: "16px" }}>
//                       <div>
//                         <div style={{ color: "#374151", fontSize: "13px" }}>{new Date(order.createdAt).toLocaleDateString('en-IN')}</div>
//                         <div style={{ color: "#9CA3AF", fontSize: "12px", marginTop: "2px" }}>{new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: "2-digit", minute: "2-digit" })}</div>
//                       </div>
//                     </td>
//                     <td style={{ padding: "16px", justifyItems: 'center' }}>
//                       <div style={{ display: "flex", gap: "12px" }}>
//                         <button onClick={() => onOrderClick(order)} style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px", borderRadius: "4px", backgroundColor: "#F0FDF4" }} title="View Details"><Eye size={16} color="#10B981" /></button>
//                         {order.status === 'Delivered' && (
//                           <button
//                             onClick={() => handleDownloadInvoice(order._id)}
//                             style={{
//                               background: "transparent",
//                               border: "none",
//                               cursor: "pointer",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               padding: "6px",
//                               borderRadius: "4px",
//                               backgroundColor: "#FFFBEB"
//                             }}
//                             title="Download Invoice"
//                           >
//                             <Download size={16} color="#F59E0B" />
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// OrderManagementTable.propTypes = {
//   onOrderClick: PropTypes.func.isRequired,
// };

// export default OrderManagementTable;









import React, { useState, useEffect } from "react";
import { Search, Eye, Download, Filter, ChevronDown, ChevronUp } from "lucide-react";
import PropTypes from "prop-types";
import axios from "axios";

const OrderManagementTable = ({ onOrderClick }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [paymentFilter, setPaymentFilter] = useState("All Payments");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const API_BASE = "http://localhost:5000/api";

  // ✅ Format address safely
  const formatAddress = (address) => {
    if (!address) return "N/A";
    return `${address.street || ""}, ${address.city || ""}, ${address.state || ""}, ${address.postcode || ""}, ${address.country || ""}`
      .replace(/,\s*,/g, ", ")
      .replace(/^, |, $/g, "");
  };

  // ✅ Download invoice
  const handleDownloadInvoice = async (orderId) => {
    try {
      const response = await axios.get(`${API_BASE}/orders/${orderId}/invoice`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading invoice:", error);
      alert("Failed to download invoice");
    }
  };

  // ✅ Fetch orders without login
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE}/orders/public`);
        const data = Array.isArray(response.data) ? response.data : response.data.orders || [];
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // ✅ Filter, search, sort
  useEffect(() => {
    let result = [...orders];

    if (searchTerm) {
      result = result.filter(
        (order) =>
          order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.user?.phone?.includes(searchTerm) ||
          order.userId?.phone?.includes(searchTerm) ||
          (order.awbNumber && order.awbNumber.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== "All Status") {
      result = result.filter((order) => order.status === statusFilter);
    }

    if (paymentFilter !== "All Payments") {
      result = result.filter((order) => order.paymentStatus === paymentFilter);
    }

    if (timeFilter === "Last 7 Days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      result = result.filter((order) => new Date(order.createdAt) >= sevenDaysAgo);
    } else if (timeFilter === "Last 30 Days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      result = result.filter((order) => new Date(order.createdAt) >= thirtyDaysAgo);
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        const getVal = (obj, path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
        const aVal = sortConfig.key.includes(".") ? getVal(a, sortConfig.key) ?? "" : a[sortConfig.key];
        const bVal = sortConfig.key.includes(".") ? getVal(b, sortConfig.key) ?? "" : b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    setFilteredOrders(result);
  }, [searchTerm, orders, statusFilter, paymentFilter, timeFilter, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") direction = "descending";
    setSortConfig({ key, direction });
  };

  const toggleSelectAll = () => {
    if (selectAll) setSelectedOrders([]);
    else setSelectedOrders(filteredOrders.map((order) => order._id));
    setSelectAll(!selectAll);
  };

  const toggleOrderSelection = (orderId) => {
    if (selectedOrders.includes(orderId)) setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    else setSelectedOrders([...selectedOrders, orderId]);
  };

  const getStatusStyle = (status) => {
    const styles = {
      Shipped: { backgroundColor: "#FEF3C7", color: "#D97706" },
      Packed: { backgroundColor: "#E5E7EB", color: "#374151" },
      Delivered: { backgroundColor: "#D1FAE5", color: "#059669" },
      Confirmed: { backgroundColor: "#DBEAFE", color: "#2563EB" },
      Cancelled: { backgroundColor: "#FEE2E2", color: "#DC2626" },
      Processing: { backgroundColor: "#DDD6FE", color: "#7C3AED" },
      Created: { backgroundColor: "#d8e3ff", color: "#002ea5" },
      "Item Out to Delivery": { backgroundColor: "#FFF7ED", color: "#EA580C" },
      Allocated: { backgroundColor: "#F3E8FF", color: "#9333EA" },
      "Cancelled by admin": { backgroundColor: "#FECACA", color: "#B91C1C" },
      "Shipment Created": { backgroundColor: "#E0F2FE", color: "#0284C7" },
      Pending: { backgroundColor: "#F3F4F6", color: "#6B7280" },
    };
    return {
      ...(styles[status] || styles["Pending"]),
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "500",
      display: "inline-block",
    };
  };

  const getPaymentStyle = (payment) => {
    const styles = {
      Paid: { backgroundColor: "#D1FAE5", color: "#059669" },
      Captured: { backgroundColor: "#D1FAE5", color: "#059669" },
      Pending: { backgroundColor: "#FEF3C7", color: "#D97706" },
      Refunded: { backgroundColor: "#FCE7F3", color: "#BE185D" },
      Failed: { backgroundColor: "#FEE2E2", color: "#DC2626" },
    };
    return {
      ...(styles[payment] || styles["Pending"]),
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "500",
      display: "inline-block",
    };
  };

  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <div>Loading orders...</div>
      </div>
    );

  if (error)
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", color: "red" }}>
        Error: {error}
      </div>
    );

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", backgroundColor: "#F9FAFB", minHeight: "100vh", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>Order Management</h1>
        <p style={{ color: "#6B7280", marginTop: "4px" }}>View all customer orders (no login required)</p>
      </div>

      {/* Search & Filters */}
      <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "16px 24px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: showFilters ? "16px" : "0" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
            <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", width: "16px", height: "16px" }} />
            <input
              type="text"
              placeholder="Search by order ID, name, phone, or AWB number..."
              style={{ width: "100%", padding: "10px 12px 10px 36px", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "14px", color: "#374151" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", backgroundColor: "#F9FAFB", border: "1px solid #D1D5DB", borderRadius: "6px", cursor: "pointer", color: "#374151", fontSize: "14px" }}
          >
            <Filter size={16} /> Filters {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {showFilters && (
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", paddingTop: "16px", borderTop: "1px solid #E5E7EB" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>Order Status</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: "8px 12px", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "14px" }}>
                <option>All Status</option>
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>Payment Status</label>
              <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} style={{ padding: "8px 12px", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "14px" }}>
                <option>All Payments</option>
                <option>Pending</option>
                <option>Paid</option>
                <option>Refunded</option>
                <option>Failed</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>Time Period</label>
              <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} style={{ padding: "8px 12px", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "14px" }}>
                <option>All Time</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button
                onClick={() => {
                  setStatusFilter("All Status");
                  setPaymentFilter("All Payments");
                  setTimeFilter("All Time");
                }}
                style={{ padding: "8px 16px", backgroundColor: "#F3F4F6", border: "1px solid #D1D5DB", borderRadius: "6px", cursor: "pointer", color: "#374151", fontSize: "14px" }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #E5E7EB" }}>
          <div style={{ color: "#374151", fontSize: "14px" }}>{filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"} found</div>
        </div>

        {filteredOrders.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center", color: "#6B7280" }}>No orders found.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1000px" }}>
              <thead>
                <tr style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                  <th style={{ padding: "12px 16px" }}>ORDER ID</th>
                  <th style={{ padding: "12px 16px" }}>CUSTOMER</th>
                  <th style={{ padding: "12px 16px" }}>AMOUNT</th>
                  <th style={{ padding: "12px 16px" }}>STATUS</th>
                  <th style={{ padding: "12px 16px" }}>PAYMENT</th>
                  <th style={{ padding: "12px 16px" }}>DATE</th>
                  <th style={{ padding: "12px 16px" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <td style={{ padding: "16px" }}>
                      <span
                        onClick={() => onOrderClick(order)}
                        style={{ color: "#10B981", fontWeight: "600", cursor: "pointer" }}
                      >
                        #{order._id}
                      </span>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div>{order.user?.name || order.userId?.name || "Unknown"}</div>
                      <div style={{ fontSize: "12px", color: "#9CA3AF" }}>{formatAddress(order.shippingAddress)}</div>
                    </td>
                    <td style={{ padding: "16px", fontWeight: "600" }}>₹{order.totalAmount?.toLocaleString("en-IN") || "0"}</td>
                    <td style={{ padding: "16px" }}><span style={getStatusStyle(order.status)}>{order.status || "Created"}</span></td>
                    <td style={{ padding: "16px" }}><span style={getPaymentStyle(order.paymentStatus)}>{order.paymentStatus}</span></td>
                    <td style={{ padding: "16px" }}>
                      <div>{new Date(order.createdAt).toLocaleDateString("en-IN")}</div>
                      <div style={{ fontSize: "12px", color: "#9CA3AF" }}>{new Date(order.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</div>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => onOrderClick(order)}
                          style={{
                            backgroundColor: "#F0FDF4",
                            border: "none",
                            padding: "6px",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          title="View Details"
                        >
                          <Eye size={16} color="#10B981" />
                        </button>
                        {order.status === "Delivered" && (
                          <button
                            onClick={() => handleDownloadInvoice(order._id)}
                            style={{
                              backgroundColor: "#FFFBEB",
                              border: "none",
                              padding: "6px",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                            title="Download Invoice"
                          >
                            <Download size={16} color="#F59E0B" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

OrderManagementTable.propTypes = {
  onOrderClick: PropTypes.func.isRequired,
};

export default OrderManagementTable;
