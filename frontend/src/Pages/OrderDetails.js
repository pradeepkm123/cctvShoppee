// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './Orders.css';
// import Navbar from '../Components/Navbar';
// import Footer from '../Components/Footer';
// import TrackingPopup from '../Components/Trackingpopup';
// import ChatModal from '../Components/ChatModal';
// import html2pdf from 'html2pdf.js';
// import cctvshop from '../assets/img/cctv_logo.png';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function OrderDetails() {
//     const { orderId } = useParams();
//     const [order, setOrder] = useState(null);
//     const [timelineData, setTimelineData] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showTrackingPopup, setShowTrackingPopup] = useState(false);
//     const [showCancelDialog, setShowCancelDialog] = useState(false);
//     const [showReturnDialog, setShowReturnDialog] = useState(false);
//     const [showChatDialog, setShowChatDialog] = useState(false);
//     const [showInvoiceModal, setShowInvoiceModal] = useState(false);

//     // Cancel order states
//     const [cancelReason, setCancelReason] = useState('');
//     const [otherReason, setOtherReason] = useState('');
//     const [additionalComments, setAdditionalComments] = useState('');

//     // Return order states
//     const [returnReason, setReturnReason] = useState('');
//     const [issueDescription, setIssueDescription] = useState('');
//     const [returnImages, setReturnImages] = useState([]);
//     const [refundChoice, setRefundChoice] = useState('refund');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     const currentUserId = storedUser?._id;
//     const currentUserRole = storedUser?.role || 'user';

//     // Define the order of statuses for delivery flow only
//     const deliveryStatusOrder = [
//         'Created',
//         'Confirmed',
//         'Allocated',
//         'Packed',
//         'Shipment Created',
//         'Item Out to Delivery',
//         'Delivered'
//     ];

//     // Cancel reasons
//     const cancelReasons = [
//         'Ordered by mistake',
//         'Price is too high',
//         'Found cheaper elsewhere',
//         'Need has changed / no longer required',
//         'Delivery is delayed',
//         'Duplicate order',
//         'Other'
//     ];

//     // Return reasons
//     const returnReasons = [
//         'Defective / Damaged item',
//         'Product not working as expected',
//         'Wrong item delivered',
//         'Missing accessories',
//         'Other'
//     ];

//     // Helper function to safely get nested values
//     const getNestedValue = (obj, path, defaultValue = '') => {
//         const keys = path.split('.');
//         let result = obj;
//         for (const key of keys) {
//             if (!result || typeof result !== 'object') return defaultValue;
//             result = result[key];
//         }
//         return result !== undefined ? result : defaultValue;
//     };

//     // Calculate if order is within 7 days for cancellation
//     const isWithinCancellationPeriod = () => {
//         if (!order?.createdAt) return false;
//         const orderDate = new Date(order.createdAt);
//         const currentDate = new Date();
//         const diffTime = currentDate - orderDate;
//         const diffDays = diffTime / (1000 * 60 * 60 * 24);
//         return diffDays <= 7;
//     };

//     // Calculate if order is within 3 days for return
//     const isWithinReturnPeriod = () => {
//         if (!order?.createdAt) return false;
//         const orderDate = new Date(order.createdAt);
//         const currentDate = new Date();
//         const diffTime = currentDate - orderDate;
//         const diffDays = diffTime / (1000 * 60 * 60 * 24);
//         return diffDays <= 3;
//     };

//     // Fetch order and timeline data
//     useEffect(() => {
//         const fetchOrderAndTimeline = async () => {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 toast.error('No token found. Redirecting to login.');
//                 return;
//             }
//             try {
//                 const [orderResponse, timelineResponse] = await Promise.all([
//                     axios.get(`http://localhost:5000/api/orders/${orderId}`, {
//                         headers: { Authorization: `Bearer ${token}` },
//                     }),
//                     axios.get(`http://localhost:5000/api/orders/${orderId}/timeline`, {
//                         headers: { Authorization: `Bearer ${token}` },
//                     }),
//                 ]);
//                 setOrder(orderResponse.data);
//                 setTimelineData(timelineResponse.data.timeline || []);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setError(error.response?.data?.message || 'Failed to fetch data');
//                 toast.error(error.response?.data?.message || 'Failed to fetch data');
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchOrderAndTimeline();
//     }, [orderId]);

//     // Handle cancel order submission
//     const handleCancelOrder = async () => {
//         if (!cancelReason) {
//             toast.error('Please select a reason for cancellation');
//             return;
//         }
//         setIsSubmitting(true);
//         try {
//             const token = localStorage.getItem('token');
//             const cancelData = {
//                 reason: cancelReason,
//                 otherReason: cancelReason === 'Other' ? otherReason : '',
//                 additionalComments,
//             };
//             const response = await axios.post(
//                 `http://localhost:5000/api/orders/${orderId}/cancel`,
//                 cancelData,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setOrder(response.data.order);
//             setShowCancelDialog(false);
//             toast.success('Order cancelled successfully');
//             setCancelReason('');
//             setOtherReason('');
//             setAdditionalComments('');
//         } catch (error) {
//             console.error('Error cancelling order:', error);
//             toast.error(error.response?.data?.message || 'Failed to cancel order');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleReturnOrder = async () => {
//         if (!returnReason || !issueDescription || returnImages.length === 0) {
//             toast.error('Please fill all required fields and upload at least one image');
//             return;
//         }

//         setIsSubmitting(true);
//         try {
//             const token = localStorage.getItem('token');
//             const formData = new FormData();

//             // Create return data JSON string
//             formData.append('data', JSON.stringify({
//                 reason: returnReason,
//                 issueDescription,
//                 refundChoice,
//             }));

//             // Append JSON as 'data' (important for backend JSON.parse(req.body.data))


//             // Append images
//             returnImages.forEach((file) => {
//                 formData.append('images', file);
//             });

//             const response = await axios.post(
//                 `http://localhost:5000/api/orders/${orderId}/return`,
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 }
//             );

//             setOrder(response.data.order);
//             setShowReturnDialog(false);
//             toast.success('Return request submitted successfully');
//             setReturnReason('');
//             setIssueDescription('');
//             setReturnImages([]);
//             setRefundChoice('refund');
//         } catch (error) {
//             console.error('Error submitting return:', error);
//             toast.error(error.response?.data?.message || 'Failed to submit return request');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };



//     // Handle image upload for return
//     const handleImageUpload = (e) => {
//         const files = Array.from(e.target.files);
//         setReturnImages((prev) => [...prev, ...files]);
//     };

//     // Remove image from return
//     const removeImage = (index) => {
//         setReturnImages((prev) => prev.filter((_, i) => i !== index));
//     };

//     // Handle invoice preview and download
//     const handleDownloadInvoice = () => {
//         setShowInvoiceModal(true);
//     };

//     // Download invoice as PDF
//     const downloadInvoicePDF = () => {
//         const element = document.getElementById('invoice-modal-content');
//         const opt = {
//             margin: 10,
//             filename: `invoice-${order._id}.pdf`,
//             image: { type: 'jpeg', quality: 0.98 },
//             html2canvas: { scale: 2 },
//             jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//         };
//         html2pdf().from(element).set(opt).save();
//     };

//     // Deduplicate timeline data
//     const deduplicateTimelineData = (data) => {
//         return data.reduce((acc, current) => {
//             const isDuplicate = acc.some(
//                 (item) =>
//                     item.timestamp === current.timestamp &&
//                     item.status === current.status &&
//                     item.description === current.description
//             );
//             if (!isDuplicate) {
//                 acc.push(current);
//             }
//             return acc;
//         }, []);
//     };

//     const uniqueTimelineData = deduplicateTimelineData(timelineData);

//     // Get the current status from the order object
//     const currentStatus = order?.status || 'Created';

//     // Find the description and timestamp for a given status from timelineData
//     const getStatusDetails = (status) => {
//         const entry = uniqueTimelineData.find((item) => item.status === status);
//         return {
//             description: entry?.description || '',
//             timestamp: entry?.timestamp ? new Date(entry.timestamp).toLocaleString() : null,
//         };
//     };

//     // Check if order is delivered
//     const isDelivered = currentStatus === 'Delivered';

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;
//     if (!order) return <div>No order found.</div>;

//     return (
//         <div>
//             <Navbar />
//             <ToastContainer />
//             <div className="container mt-5 mb-5 py-5">
//                 <nav aria-label="breadcrumb">
//                     <ol className="breadcrumb">
//                         <li className="breadcrumb-item">
//                             <a href="#" className="text-decoration-none">
//                                 Home
//                             </a>
//                         </li>
//                         <li className="breadcrumb-item">
//                             <a href="#" className="text-decoration-none">
//                                 My Account
//                             </a>
//                         </li>
//                         <li className="breadcrumb-item">
//                             <a href="#" className="text-decoration-none">
//                                 My Orders
//                             </a>
//                         </li>
//                         <li className="breadcrumb-item active" aria-current="page">
//                             {order._id}
//                         </li>
//                     </ol>
//                 </nav>
//                 <div className="row">
//                     <div className="col-lg-8 mb-4">
//                         {order.items.map((item, index) => (
//                             <div className="delivery-card p-4 mb-4" key={index}>
//                                 <div className="row align-items-center">
//                                     <div className="col-md-8">
//                                         <h6 className="mb-2">{item.productId?.name || 'Product Name'}</h6>
//                                         <p className="text-muted small mb-1">Color: {item.color || 'Black'}</p>
//                                         <p className="text-muted small mb-1">Sold by: {item.seller || 'Nehru Fashion'}</p>
//                                         <p className="fw-bold mb-0">₹{item.price || '0'}</p>
//                                     </div>
//                                     <div className="col-md-4 text-center">
//                                         <img
//                                             src={`http://localhost:5000/uploads/${item.productId?.image || 'no-image.png'}`}
//                                             alt={item.productId?.name || 'Product'}
//                                             style={{ width: '100px', height: 'auto', objectFit: 'contain' }}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                         <div className="delivery-card p-4">
//                             <div className="status-timeline">
//                                 {deliveryStatusOrder.map((status, index) => {
//                                     const currentStatusIndex = deliveryStatusOrder.indexOf(currentStatus);
//                                     const statusIndex = deliveryStatusOrder.indexOf(status);
//                                     const isCompleted = statusIndex <= currentStatusIndex;
//                                     const isCurrent = status === currentStatus;
//                                     const isCancelled = order.status === 'Cancelled';
//                                     const { description, timestamp } = getStatusDetails(status);
//                                     return (
//                                         <div className="status-item" key={index}>
//                                             <div
//                                                 className={`status-icon ${isCancelled
//                                                     ? 'status-cancelled'
//                                                     : isCompleted
//                                                         ? 'status-confirmed'
//                                                         : isCurrent
//                                                             ? 'status-active'
//                                                             : 'status-inactive'
//                                                     }`}
//                                             >
//                                                 <i
//                                                     className={`las ${isCancelled
//                                                         ? 'la-times-circle'
//                                                         : isCompleted
//                                                             ? 'la-check-circle'
//                                                             : isCurrent
//                                                                 ? 'la-check-circle'
//                                                                 : 'la-circle'
//                                                         }`}
//                                                 ></i>
//                                             </div>
//                                             <div>
//                                                 <div className={`fw-bold ${isCurrent ? 'text-success' : ''}`}>{status}</div>
//                                                 {description && <small className="text-muted">{description}</small>}
//                                                 {timestamp && <small className="text-muted d-block">{timestamp}</small>}
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-4">
//                         <div className="delivery-card p-4 mb-4">
//                             <h6 className="mb-3">Delivery details</h6>
//                             <div className="mb-3" id="hd">
//                                 <div className="d-flex align-items-center mb-2">
//                                     <i className="las la-building me-2"></i>
//                                     <small className="text-muted">Work</small>
//                                 </div>
//                                 <div className="ps-3">
//                                     <small>
//                                         {getNestedValue(order, 'shippingAddress.street', '17 10, GT Nagar, Nandanam saidapet, Chennai')}
//                                     </small>
//                                 </div>
//                             </div>
//                             <div className="mb-4" id="hd">
//                                 <div className="d-flex align-items-center mb-2">
//                                     <i className="las la-user me-2"></i>
//                                     <small className="text-muted">
//                                         {getNestedValue(order, 'shippingAddress.firstName', 'Pradeep')}{' '}
//                                         {getNestedValue(order, 'shippingAddress.lastName', 'Kumar')}
//                                     </small>
//                                 </div>
//                                 <div className="ps-3">
//                                     <small>{getNestedValue(order, 'shippingAddress.phone', '9123200396')}</small>
//                                 </div>
//                             </div>
//                             <h6 className="mb-3">Price Details</h6>
//                             <div className="price-row">
//                                 <span className="price-label">List price</span>
//                                 <span className="price-value">₹{order.listPrice || '2,990'}</span>
//                             </div>
//                             <div className="price-row">
//                                 <span className="price-label">Selling price</span>
//                                 <span className="price-value">₹{order.sellingPrice || '999'}</span>
//                             </div>
//                             <div className="price-row">
//                                 <span className="price-label">Extra Discount</span>
//                                 <span className="price-value text-success">- ₹{order.extraDiscount || '252'}</span>
//                             </div>
//                             <div className="price-row">
//                                 <span className="price-label">
//                                     Special Price <i className="las la-question-circle"></i>
//                                 </span>
//                                 <span className="price-value">₹{order.specialPrice || '747'}</span>
//                             </div>
//                             <div className="price-row">
//                                 <span className="price-label">Payment Handling Fee</span>
//                                 <span className="price-value">₹{order.paymentHandlingFee || '10'}</span>
//                             </div>
//                             <div className="price-row">
//                                 <span className="price-label">Protect Promise Fee</span>
//                                 <span className="price-value">₹{order.protectPromiseFee || '9'}</span>
//                             </div>
//                             <div className="price-row total-amount">
//                                 <span>Total Amount</span>
//                                 <span>₹{order.totalAmount || '766'}</span>
//                             </div>
//                             <div className="mt-3">
//                                 <small className="text-success">
//                                     <i className="las la-dot-circle"></i> {order.paymentMethod || 'Cash On Delivery'}: ₹
//                                     {order.totalAmount || '766.0'}
//                                 </small>
//                             </div>
//                             {/* Invoice Download Button - Show only if order is delivered */}
//                             {isDelivered && (
//                                 <div className="mt-4 pt-3 border-top">
//                                     <button
//                                         className="btn btn-success w-100 d-flex align-items-center justify-content-center"
//                                         onClick={handleDownloadInvoice}
//                                     >
//                                         <i className="las la-download me-2"></i>
//                                         Download Invoice
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                         {/* Action Buttons */}
//                         <div className="d-flex gap-2 mb-3">
//                             {/* Cancel Order Button: Show only if not Delivered, not Cancelled, and not Return Requested */}
//                             {currentStatus !== 'Delivered' &&
//                                 currentStatus !== 'Cancelled' &&
//                                 currentStatus !== 'Return Requested' &&
//                                 isWithinCancellationPeriod() && (
//                                     <button
//                                         className="btn btn-light flex-fill d-flex align-items-center justify-content-center"
//                                         onClick={() => setShowCancelDialog(true)}
//                                     >
//                                         <i className="las la-times-circle me-2"></i>
//                                         Cancel Order
//                                     </button>
//                                 )}
//                             {/* Return Order Button: Show only if Delivered and within return period */}
//                             {currentStatus === 'Delivered' && isWithinReturnPeriod() && (
//                                 <button
//                                     className="btn btn-light flex-fill d-flex align-items-center justify-content-center"
//                                     onClick={() => setShowReturnDialog(true)}
//                                 >
//                                     <i className="las la-sync me-2"></i>
//                                     Return Order
//                                 </button>
//                             )}
//                             {/* Chat Button: Always visible */}
//                             <button
//                                 className="btn btn-light flex-fill d-flex align-items-center justify-content-center"
//                                 onClick={() => setShowChatDialog(true)}
//                             >
//                                 <i className="las la-comments me-2"></i>
//                                 Chat with Us
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Invoice Modal */}
//             {showInvoiceModal && (
//                 <div className="modal-overlay">
//                     <div className="modal-dialog modal-lg">
//                         <div className="modal-content">
//                             <div className="modal-body">
//                                 <div
//                                     id="invoice-modal-content"
//                                     style={{
//                                         fontFamily: 'Arial, sans-serif',
//                                         color: '#000',
//                                         padding: '40px',
//                                         maxWidth: '800px',
//                                         margin: '0 auto',
//                                         backgroundColor: '#fff',
//                                     }}
//                                 >
//                                     {/* Header */}
//                                     <div
//                                         style={{
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'flex-start',
//                                             marginBottom: '30px',
//                                         }}
//                                     >
//                                         <div>
//                                             <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Invoice</h1>
//                                             <p style={{ margin: '4px 0' }}>
//                                                 <strong>Invoice number</strong> &nbsp; {order._id}
//                                             </p>
//                                             <p style={{ margin: '4px 0' }}>
//                                                 <strong>Date of issue</strong> &nbsp;
//                                                 {new Date(order.createdAt).toLocaleDateString('en-IN')}
//                                             </p>
//                                             <p style={{ margin: '4px 0' }}>
//                                                 <strong>Date due</strong> &nbsp;
//                                                 {new Date(order.createdAt).toLocaleDateString('en-IN')}
//                                             </p>
//                                         </div>
//                                         <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
//                                             <img src={cctvshop} alt="CCTV Shop Logo" width="300" />
//                                         </div>
//                                     </div>
//                                     {/* Address Section */}
//                                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
//                                         <div style={{ width: '48%' }}>
//                                             <p style={{ fontWeight: 'bold' }}>From To,</p>
//                                             <p>CCTV SHOPPEE</p>
//                                             <p>PMB 97273</p>
//                                             <p>No:6/97,Jaya Nagar,Meera Complex,Mount Poonamallee High Road Pour,Chennai - 600116</p>
//                                             <p>Tamil Nadu</p>
//                                             <p>cctvshoppee@gmail.com</p>
//                                             <p>IN GST 9921USA29044OSI</p>
//                                         </div>
//                                         <div style={{ width: '48%' }}>
//                                             <p style={{ fontWeight: 'bold' }}>Bill to</p>
//                                             <p>{order.userId?.name}</p>
//                                             <p>{order.shippingAddress?.street}</p>
//                                             <p>
//                                                 {order.shippingAddress?.city} {order.shippingAddress?.postcode}
//                                             </p>
//                                             <p>{order.shippingAddress?.state}</p>
//                                             <p>{order.shippingAddress?.country}</p>
//                                             <p>{order.userId?.email}</p>
//                                         </div>
//                                     </div>
//                                     {/* Items Table */}
//                                     <table
//                                         style={{
//                                             width: '100%',
//                                             borderCollapse: 'collapse',
//                                             marginBottom: '30px',
//                                             borderTop: '1px solid #ccc',
//                                         }}
//                                     >
//                                         <thead>
//                                             <tr>
//                                                 <th style={{ textAlign: 'center', padding: '10px 0', borderBottom: '1px solid #ccc' }}>
//                                                     Description
//                                                 </th>
//                                                 <th style={{ textAlign: 'right', padding: '10px 0', borderBottom: '1px solid #ccc' }}>Qty</th>
//                                                 <th style={{ textAlign: 'right', padding: '10px 0', borderBottom: '1px solid #ccc' }}>
//                                                     Unit price
//                                                 </th>
//                                                 <th style={{ textAlign: 'right', padding: '10px 0', borderBottom: '1px solid #ccc' }}>Tax</th>
//                                                 <th style={{ textAlign: 'right', padding: '10px 0', borderBottom: '1px solid #ccc' }}>
//                                                     Amount
//                                                 </th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {order.items.map((item, idx) => (
//                                                 <tr key={idx}>
//                                                     <td style={{ padding: '10px 0', borderBottom: '1px dotted #ccc' }}>
//                                                         {item.productId?.name || item.name}
//                                                         <br />
//                                                         <span style={{ fontSize: '13px', color: '#555' }}>
//                                                             {new Date(order.createdAt).toLocaleDateString('en-IN', {
//                                                                 month: 'short',
//                                                                 day: 'numeric',
//                                                             })}{' '}
//                                                             –{' '}
//                                                             {new Date(
//                                                                 new Date(order.createdAt).setMonth(new Date(order.createdAt).getMonth() + 1)
//                                                             ).toLocaleDateString('en-IN', {
//                                                                 month: 'short',
//                                                                 day: 'numeric',
//                                                                 year: 'numeric',
//                                                             })}
//                                                         </span>
//                                                     </td>
//                                                     <td style={{ textAlign: 'right', borderBottom: '1px dotted #ccc' }}>{item.quantity}</td>
//                                                     <td style={{ textAlign: 'right', borderBottom: '1px dotted #ccc' }}>
//                                                         ₹{item.price.toLocaleString('en-IN')}
//                                                     </td>
//                                                     <td style={{ textAlign: 'right', borderBottom: '1px dotted #ccc' }}>18%</td>
//                                                     <td style={{ textAlign: 'right', borderBottom: '1px dotted #ccc' }}>
//                                                         ₹{(item.price * item.quantity).toLocaleString('en-IN')}
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                     {/* Totals Section */}
//                                     <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                                         <table style={{ width: '50%', borderCollapse: 'collapse' }}>
//                                             <tbody>
//                                                 <tr>
//                                                     <td style={{ textAlign: 'left', padding: '5px 0' }}>Subtotal</td>
//                                                     <td style={{ textAlign: 'right', padding: '5px 0' }}>
//                                                         ₹{(order.totalAmount / 1.18).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td style={{ textAlign: 'left', padding: '5px 0' }}>Total excluding tax</td>
//                                                     <td style={{ textAlign: 'right', padding: '5px 0' }}>
//                                                         ₹{(order.totalAmount / 1.18).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td style={{ textAlign: 'left', padding: '5px 0' }}>
//                                                         IGST - India (18% on ₹
//                                                         {(order.totalAmount / 1.18).toLocaleString('en-IN', { maximumFractionDigits: 2 })})
//                                                     </td>
//                                                     <td style={{ textAlign: 'right', padding: '5px 0' }}>
//                                                         ₹{(order.totalAmount - order.totalAmount / 1.18).toLocaleString('en-IN', {
//                                                             maximumFractionDigits: 2,
//                                                         })}
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td style={{ textAlign: 'left', padding: '5px 0' }}>Total</td>
//                                                     <td style={{ textAlign: 'right', padding: '5px 0' }}>
//                                                         ₹{order.totalAmount.toLocaleString('en-IN')}
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td style={{ textAlign: 'left', padding: '5px 0', fontWeight: 'bold' }}>Amount due</td>
//                                                     <td style={{ textAlign: 'right', padding: '5px 0', fontWeight: 'bold' }}>
//                                                         ₹{order.totalAmount.toLocaleString('en-IN')}
//                                                     </td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                     {/* Footer */}
//                                     <div style={{ marginTop: '50px', fontSize: '12px', color: '#777', textAlign: 'right' }}>
//                                         Page 1 of 1
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="modal-footer">
//                                 <button type="button" className="btn btn-secondary" onClick={() => setShowInvoiceModal(false)}>
//                                     Close
//                                 </button>
//                                 <button type="button" className="btn btn-primary" onClick={downloadInvoicePDF}>
//                                     Download PDF
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Cancel Order Dialog */}
//             {showCancelDialog && (
//                 <div className="modal-overlay">
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Cancel Order</h5>
//                                 <button type="button" className="btn-close" onClick={() => setShowCancelDialog(false)}></button>
//                             </div>
//                             <div className="modal-body">
//                                 <div className="mb-3">
//                                     <label className="form-label">Reason for Cancellation *</label>
//                                     <select
//                                         className="form-select"
//                                         value={cancelReason}
//                                         onChange={(e) => setCancelReason(e.target.value)}
//                                     >
//                                         <option value="">Select a reason</option>
//                                         {cancelReasons.map((reason, index) => (
//                                             <option key={index} value={reason}>
//                                                 {reason}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 {cancelReason === 'Other' && (
//                                     <div className="mb-3">
//                                         <label className="form-label">Please specify</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             value={otherReason}
//                                             onChange={(e) => setOtherReason(e.target.value)}
//                                             placeholder="Enter your reason"
//                                         />
//                                     </div>
//                                 )}
//                                 <div className="mb-3">
//                                     <label className="form-label">Additional Comments (Optional)</label>
//                                     <textarea
//                                         className="form-control"
//                                         rows="3"
//                                         value={additionalComments}
//                                         onChange={(e) => setAdditionalComments(e.target.value)}
//                                         placeholder="Any additional comments..."
//                                     />
//                                 </div>
//                             </div>
//                             <div className="modal-footer">
//                                 <button type="button" className="btn btn-secondary" onClick={() => setShowCancelDialog(false)}>
//                                     Close
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="btn btn-danger"
//                                     onClick={handleCancelOrder}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? 'Cancelling...' : 'Confirm Cancellation'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Return Order Dialog */}
//             {showReturnDialog && (
//                 <div className="modal-overlay">
//                     <div className="modal-dialog modal-lg">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Return Order</h5>
//                                 <button type="button" className="btn-close" onClick={() => setShowReturnDialog(false)}></button>
//                             </div>
//                             <div className="modal-body">
//                                 <div className="mb-3">
//                                     <label className="form-label">Reason for Return *</label>
//                                     <select
//                                         className="form-select"
//                                         value={returnReason}
//                                         onChange={(e) => setReturnReason(e.target.value)}
//                                     >
//                                         <option value="">Select a reason</option>
//                                         {returnReasons.map((reason, index) => (
//                                             <option key={index} value={reason}>
//                                                 {reason}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="mb-3">
//                                     <label className="form-label">Describe the Issue *</label>
//                                     <textarea
//                                         className="form-control"
//                                         rows="4"
//                                         value={issueDescription}
//                                         onChange={(e) => setIssueDescription(e.target.value)}
//                                         placeholder="Please describe the issue in detail..."
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label className="form-label">Upload Images or Videos *</label>
//                                     <input
//                                         type="file"
//                                         className="form-control"
//                                         multiple
//                                         accept="image/*,video/*"
//                                         onChange={handleImageUpload}
//                                     />
//                                     <div className="form-text">Upload clear images or videos showing the issue</div>
//                                     {returnImages.length > 0 && (
//                                         <div className="mt-2">
//                                             <h6>Uploaded Files:</h6>
//                                             {returnImages.map((file, index) => (
//                                                 <div key={index} className="d-flex align-items-center justify-content-between mb-1">
//                                                     <span>{file.name}</span>
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-sm btn-outline-danger"
//                                                         onClick={() => removeImage(index)}
//                                                     >
//                                                         Remove
//                                                     </button>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div className="mb-3">
//                                     <label className="form-label">Refund / Replacement Choice *</label>
//                                     <div>
//                                         <div className="form-check">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="radio"
//                                                 name="refundChoice"
//                                                 value="refund"
//                                                 checked={refundChoice === 'refund'}
//                                                 onChange={(e) => setRefundChoice(e.target.value)}
//                                             />
//                                             <label className="form-check-label">Refund</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="radio"
//                                                 name="refundChoice"
//                                                 value="replacement"
//                                                 checked={refundChoice === 'replacement'}
//                                                 onChange={(e) => setRefundChoice(e.target.value)}
//                                             />
//                                             <label className="form-check-label">Replacement</label>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="modal-footer">
//                                 <button type="button" className="btn btn-secondary" onClick={() => setShowReturnDialog(false)}>
//                                     Close
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="btn btn-warning"
//                                     onClick={handleReturnOrder}
//                                     disabled={isSubmitting || !returnReason || !issueDescription || returnImages.length === 0}
//                                 >
//                                     {isSubmitting ? 'Submitting...' : 'Submit Return Request'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Chat Dialog */}
//             {showChatDialog && (
//                 <ChatModal orderId={orderId} userId={currentUserId} userRole={currentUserRole} onClose={() => setShowChatDialog(false)} />
//             )}

//             <Footer />
//         </div>
//     );
// }

// export default OrderDetails;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Orders.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import TrackingPopup from '../Components/Trackingpopup';
import ChatModal from '../Components/ChatModal';
import html2pdf from 'html2pdf.js';
import cctvshop from '../assets/img/cctv_logo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [timelineData, setTimelineData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTrackingPopup, setShowTrackingPopup] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [showReturnDialog, setShowReturnDialog] = useState(false);
    const [showChatDialog, setShowChatDialog] = useState(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);

    // Cancel order states
    const [cancelReason, setCancelReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [additionalComments, setAdditionalComments] = useState('');

    // Return order states
    const [returnReason, setReturnReason] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const [returnImages, setReturnImages] = useState([]);
    const [refundChoice, setRefundChoice] = useState('refund');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const currentUserId = storedUser?._id;
    const currentUserRole = storedUser?.role || 'user';

    // Define the order of statuses for delivery flow
    const deliveryStatusOrder = [
        'Created',
        'Confirmed',
        'Allocated',
        'Packed',
        'Shipment Created',
        'Item Out to Delivery',
        'Delivered',
    ];

    // Cancel reasons
    const cancelReasons = [
        'Ordered by mistake',
        'Price is too high',
        'Found cheaper elsewhere',
        'Need has changed / no longer required',
        'Delivery is delayed',
        'Duplicate order',
        'Other'
    ];

    // Return reasons
    const returnReasons = [
        'Defective / Damaged item',
        'Product not working as expected',
        'Wrong item delivered',
        'Missing accessories',
        'Other'
    ];

    // Helper function to safely get nested values
    const getNestedValue = (obj, path, defaultValue = '') => {
        const keys = path.split('.');
        let result = obj;
        for (const key of keys) {
            if (!result || typeof result !== 'object') return defaultValue;
            result = result[key];
        }
        return result !== undefined ? result : defaultValue;
    };

    // Calculate if order is within 7 days for cancellation
    const isWithinCancellationPeriod = () => {
        if (!order?.createdAt) return false;
        const orderDate = new Date(order.createdAt);
        const currentDate = new Date();
        const diffTime = currentDate - orderDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays <= 7;
    };

    // Calculate if order is within 3 days for return
    const isWithinReturnPeriod = () => {
        if (!order?.createdAt) return false;
        const orderDate = new Date(order.createdAt);
        const currentDate = new Date();
        const diffTime = currentDate - orderDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays <= 3;
    };

    // Fetch order and timeline data
    useEffect(() => {
        const fetchOrderAndTimeline = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('No token found. Redirecting to login.');
                return;
            }
            try {
                const [orderResponse, timelineResponse] = await Promise.all([
                    axios.get(`http://localhost:5000/api/orders/${orderId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`http://localhost:5000/api/orders/${orderId}/timeline`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);
                setOrder(orderResponse.data);
                setTimelineData(timelineResponse.data.timeline || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.response?.data?.message || 'Failed to fetch data');
                toast.error(error.response?.data?.message || 'Failed to fetch data');
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrderAndTimeline();
    }, [orderId]);

    // Handle cancel order submission
    const handleCancelOrder = async () => {
        if (!cancelReason) {
            toast.error('Please select a reason for cancellation');
            return;
        }
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const cancelData = {
                reason: cancelReason,
                otherReason: cancelReason === 'Other' ? otherReason : '',
                additionalComments,
            };
            const response = await axios.post(
                `http://localhost:5000/api/orders/${orderId}/cancel`,
                cancelData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setOrder(response.data.order);
            setShowCancelDialog(false);
            toast.success('Order cancelled successfully');
            setCancelReason('');
            setOtherReason('');
            setAdditionalComments('');
        } catch (error) {
            console.error('Error cancelling order:', error);
            toast.error(error.response?.data?.message || 'Failed to cancel order');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle return order submission
    const handleReturnOrder = async () => {
        if (!returnReason || !issueDescription || returnImages.length === 0) {
            toast.error('Please fill all required fields and upload at least one image');
            return;
        }
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('data', JSON.stringify({
                reason: returnReason,
                issueDescription,
                refundChoice,
            }));
            returnImages.forEach((file) => {
                formData.append('images', file);
            });
            const response = await axios.post(
                `http://localhost:5000/api/orders/${orderId}/return`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setOrder(response.data.order);
            setShowReturnDialog(false);
            toast.success('Return request submitted successfully');
            setReturnReason('');
            setIssueDescription('');
            setReturnImages([]);
            setRefundChoice('refund');
        } catch (error) {
            console.error('Error submitting return:', error);
            toast.error(error.response?.data?.message || 'Failed to submit return request');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle image upload for return
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setReturnImages((prev) => [...prev, ...files]);
    };

    // Remove image from return
    const removeImage = (index) => {
        setReturnImages((prev) => prev.filter((_, i) => i !== index));
    };

    // Handle invoice preview and download
    const handleDownloadInvoice = () => {
        setShowInvoiceModal(true);
    };

    // Download invoice as PDF
    const downloadInvoicePDF = () => {
        const element = document.getElementById('invoice-modal-content');
        const opt = {
            margin: 10,
            filename: `invoice-${order._id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
        html2pdf().from(element).set(opt).save();
    };

    // Deduplicate timeline data
    const deduplicateTimelineData = (data) => {
        return data.reduce((acc, current) => {
            const isDuplicate = acc.some(
                (item) =>
                    item.timestamp === current.timestamp &&
                    item.status === current.status &&
                    item.description === current.description
            );
            if (!isDuplicate) {
                acc.push(current);
            }
            return acc;
        }, []);
    };

    const uniqueTimelineData = deduplicateTimelineData(timelineData);

    // Get the current status from the order object
    const currentStatus = order?.status || 'Created';

    // Find the description and timestamp for a given status from timelineData
    const getStatusDetails = (status) => {
        const entry = uniqueTimelineData.find((item) => item.status === status);
        return {
            description: entry?.description || '',
            timestamp: entry?.timestamp ? new Date(entry.timestamp).toLocaleString() : null,
        };
    };

    // Check if order is delivered
    const isDelivered = currentStatus === 'Delivered';

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!order) return <div>No order found.</div>;

    return (
        <div>
            <Navbar />
            <ToastContainer />
            <div className="container mt-5 mb-5 py-5">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#" className="text-decoration-none">
                                Home
                            </a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="#" className="text-decoration-none">
                                My Account
                            </a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="#" className="text-decoration-none">
                                My Orders
                            </a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {order._id}
                        </li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-lg-8 mb-4">
                        {order.items.map((item, index) => (
                            <div className="delivery-card p-4 mb-4" key={index}>
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        <h6 className="mb-2">{item.productId?.name || 'Product Name'}</h6>
                                        <p className="text-muted small mb-1">Color: {item.color || 'Black'}</p>
                                        <p className="text-muted small mb-1">Sold by: {item.seller || 'Nehru Fashion'}</p>
                                        <p className="fw-bold mb-0">₹{item.price || '0'}</p>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <img
                                            src={`http://localhost:5000/uploads/${item.productId?.image || 'no-image.png'}`}
                                            alt={item.productId?.name || 'Product'}
                                            style={{ width: '100px', height: 'auto', objectFit: 'contain' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="delivery-card p-4">
                            <div className="status-timeline">
                                {[...deliveryStatusOrder, ...(currentStatus === 'Return Requested' ? ['Return Requested'] : [])].map((status, index) => {
                                    const allStatuses = [...deliveryStatusOrder, ...(currentStatus === 'Return Requested' ? ['Return Requested'] : [])];
                                    const currentStatusIndex = allStatuses.indexOf(currentStatus);
                                    const statusIndex = allStatuses.indexOf(status);
                                    const isCompleted = statusIndex <= currentStatusIndex;
                                    const isCurrent = status === currentStatus;
                                    const isCancelled = order.status === 'Cancelled';
                                    const isReturnRequested = status === 'Return Requested' && currentStatus === 'Return Requested';
                                    const { description, timestamp } = getStatusDetails(status);
                                    return (
                                        <div className="status-item" key={index}>
                                            <div
                                                className={`status-icon ${isCancelled
                                                    ? 'status-cancelled'
                                                    : isReturnRequested
                                                        ? 'status-returned'
                                                        : isCompleted
                                                            ? 'status-confirmed'
                                                            : isCurrent
                                                                ? 'status-active'
                                                                : 'status-inactive'
                                                    }`}
                                            >
                                                <i
                                                    className={`las ${isCancelled
                                                        ? 'la-times-circle'
                                                        : isReturnRequested
                                                            ? 'la-check-circle' // Same icon as completed/current statuses
                                                            : isCompleted
                                                                ? 'la-check-circle'
                                                                : isCurrent
                                                                    ? 'la-check-circle'
                                                                    : 'la-circle'
                                                        }`}
                                                ></i>
                                            </div>
                                            <div>
                                                <div className={`fw-bold ${isCurrent ? 'text-success' : ''}`}>{status}</div>
                                                {description && <small className="text-muted">{description}</small>}
                                                {timestamp && <small className="text-muted d-block">{timestamp}</small>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-4">
                        <div className="delivery-card p-4 mb-4">
                            <h6 className="mb-3">Delivery details</h6>
                            <div className="mb-3" id="hd">
                                <div className="d-flex align-items-center mb-2">
                                    <i className="las la-building me-2"></i>
                                    <small className="text-muted">Work</small>
                                </div>
                                <div className="ps-3">
                                    <small>
                                        {getNestedValue(order, 'shippingAddress.street', '17 10, GT Nagar, Nandanam saidapet, Chennai')}
                                    </small>
                                </div>
                            </div>
                            <div className="mb-4" id="hd">
                                <div className="d-flex align-items-center mb-2">
                                    <i className="las la-user me-2"></i>
                                    <small className="text-muted">
                                        {getNestedValue(order, 'shippingAddress.firstName', 'Pradeep')}{' '}
                                        {getNestedValue(order, 'shippingAddress.lastName', 'Kumar')}
                                    </small>
                                </div>
                                <div className="ps-3">
                                    <small>{getNestedValue(order, 'shippingAddress.phone', '9123200396')}</small>
                                </div>
                            </div>
                            <h6 className="mb-3">Price Details</h6>
                            <div className="price-row">
                                <span className="price-label">List price</span>
                                <span className="price-value">₹{order.listPrice || '2,990'}</span>
                            </div>
                            <div className="price-row">
                                <span className="price-label">Selling price</span>
                                <span className="price-value">₹{order.sellingPrice || '999'}</span>
                            </div>
                            <div className="price-row">
                                <span className="price-label">Extra Discount</span>
                                <span className="price-value text-success">- ₹{order.extraDiscount || '252'}</span>
                            </div>
                            <div className="price-row">
                                <span className="price-label">
                                    Special Price <i className="las la-question-circle"></i>
                                </span>
                                <span className="price-value">₹{order.specialPrice || '747'}</span>
                            </div>
                            <div className="price-row">
                                <span className="price-label">Payment Handling Fee</span>
                                <span className="price-value">₹{order.paymentHandlingFee || '10'}</span>
                            </div>
                            <div className="price-row">
                                <span className="price-label">Protect Promise Fee</span>
                                <span className="price-value">₹{order.protectPromiseFee || '9'}</span>
                            </div>
                            <div className="price-row total-amount">
                                <span>Total Amount</span>
                                <span>₹{order.totalAmount || '766'}</span>
                            </div>
                            <div className="mt-3">
                                <small className="text-success">
                                    <i className="las la-dot-circle"></i> {order.paymentMethod || 'Cash On Delivery'}: ₹
                                    {order.totalAmount || '766.0'}
                                </small>
                            </div>
                            {/* Invoice Download Button - Show only if order is delivered */}
                            {isDelivered && (
                                <div className="mt-4 pt-3 border-top">
                                    <button
                                        className="btn btn-success w-100 d-flex align-items-center justify-content-center"
                                        onClick={handleDownloadInvoice}
                                    >
                                        <i className="las la-download me-2"></i>
                                        Download Invoice
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* Action Buttons */}
                        <div className="d-flex gap-2 mb-3">
                            {/* Cancel Order Button: Show only if not Delivered, not Cancelled, and not Return Requested */}
                            {currentStatus !== 'Delivered' &&
                                currentStatus !== 'Cancelled' &&
                                currentStatus !== 'Return Requested' &&
                                isWithinCancellationPeriod() && (
                                    <button
                                        className="btn btn-light flex-fill d-flex align-items-center justify-content-center"
                                        onClick={() => setShowCancelDialog(true)}
                                    >
                                        <i className="las la-times-circle me-2"></i>
                                        Cancel Order
                                    </button>
                                )}
                            {/* Return Order Button: Show only if Delivered and within return period */}
                            {currentStatus === 'Delivered' && isWithinReturnPeriod() && (
                                <button
                                    className="btn btn-light flex-fill d-flex align-items-center justify-content-center"
                                    onClick={() => setShowReturnDialog(true)}
                                >
                                    <i className="las la-sync me-2"></i>
                                    Return Order
                                </button>
                            )}
                            {/* Chat Button: Always visible */}
                            <button
                                className="btn btn-light flex-fill d-flex align-items-center justify-content-center"
                                onClick={() => setShowChatDialog(true)}
                            >
                                <i className="las la-comments me-2"></i>
                                Chat with Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Invoice Modal */}
            {showInvoiceModal && (
                <div className="modal-overlay">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div
                                    id="invoice-modal-content"
                                    style={{
                                        fontFamily: 'Arial, sans-serif',
                                        color: '#000',
                                        padding: '40px',
                                        maxWidth: '800px',
                                        margin: '0 auto',
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    {/* Header */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            marginBottom: '30px',
                                        }}
                                    >
                                        <div>
                                            <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Invoice</h1>
                                            <p style={{ margin: '4px 0' }}>
                                                <strong>Invoice number</strong> &nbsp; {order._id}
                                            </p>
                                            <p style={{ margin: '4px 0' }}>
                                                <strong>Date of issue</strong> &nbsp;
                                                {new Date(order.createdAt).toLocaleDateString('en-IN')}
                                            </p>
                                            <p style={{ margin: '4px 0' }}>
                                                <strong>Date due</strong> &nbsp;
                                                {new Date(order.createdAt).toLocaleDateString('en-IN')}
                                            </p>
                                        </div>
                                        <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                                            <img src={cctvshop} alt="CCTV Shop Logo" width="300" />
                                        </div>
                                    </div>
                                    {/* Address Section */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                                        <div style={{ width: '48%' }}>
                                            <p style={{ fontWeight: 'bold' }}>From To,</p>
                                            <p>CCTV SHOPPEE</p>
                                            <p>PMB 97273</p>
                                            <p>No:6/97,Jaya Nagar,Meera Complex,Mount Poonamallee High Road Pour,Chennai - 600116</p>
                                            <p>Tamil Nadu</p>
                                            <p>cctvshoppee@gmail.com</p>
                                            <p>IN GST 9921USA29044OSI</p>
                                        </div>
                                        <div style={{ width: '48%' }}>
                                            <p style={{ fontWeight: 'bold' }}>Bill to</p>
                                            <p>{order.userId?.name}</p>
                                            <p>{order.shippingAddress?.street}</p>
                                            <p>
                                                {order.shippingAddress?.city} {order.shippingAddress?.postcode}
                                            </p>
                                            <p>{order.shippingAddress?.state}</p>
                                            <p>{order.shippingAddress?.country}</p>
                                            <p>{order.userId?.email}</p>
                                        </div>
                                    </div>
                                    {/* Items Table */}
                                    <table
                                        style={{
                                            width: '100%',
                                            borderCollapse: 'collapse',
                                            marginBottom: '30px',
                                            borderTop: '1px solid #ccc',
                                        }}
                                    >
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign: 'center', padding: '10px 0', borderBottom: '1px solid #ccc' }}>
                                                    Description
                                                </th>
                                                <th style={{ textAlign: 'right', padding: '10px 0', borderBottom: '1px solid #ccc' }}>Qty</th>
                                                <th style={{ textAlign: 'right', padding: '10px 0', borderBottom: '1px solid #ccc' }}>
                                                    Unit price
                                                </th>
                                                <th style={{ textAlign: 'right', padding: '10px 0', borderBottom: '1px solid #ccc' }}>Tax</th>
                                                <th style={{ textAlign: 'right', padding: '10px 0', borderBottom: '1px solid #ccc' }}>
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.items.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td style={{ padding: '10px 0', borderBottom: '1px dotted #ccc' }}>
                                                        {item.productId?.name || item.name}
                                                        <br />
                                                        <span style={{ fontSize: '13px', color: '#555' }}>
                                                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })}{' '}
                                                            –{' '}
                                                            {new Date(
                                                                new Date(order.createdAt).setMonth(new Date(order.createdAt).getMonth() + 1)
                                                            ).toLocaleDateString('en-IN', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                            })}
                                                        </span>
                                                    </td>
                                                    <td style={{ textAlign: 'right', borderBottom: '1px dotted #ccc' }}>{item.quantity}</td>
                                                    <td style={{ textAlign: 'right', borderBottom: '1px dotted #ccc' }}>
                                                        ₹{item.price.toLocaleString('en-IN')}
                                                    </td>
                                                    <td style={{ textAlign: 'right', borderBottom: '1px dotted #ccc' }}>18%</td>
                                                    <td style={{ textAlign: 'right', borderBottom: '1px dotted #ccc' }}>
                                                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {/* Totals Section */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <table style={{ width: '50%', borderCollapse: 'collapse' }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ textAlign: 'left', padding: '5px 0' }}>Subtotal</td>
                                                    <td style={{ textAlign: 'right', padding: '5px 0' }}>
                                                        ₹{(order.totalAmount / 1.18).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ textAlign: 'left', padding: '5px 0' }}>Total excluding tax</td>
                                                    <td style={{ textAlign: 'right', padding: '5px 0' }}>
                                                        ₹{(order.totalAmount / 1.18).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ textAlign: 'left', padding: '5px 0' }}>
                                                        IGST - India (18% on ₹
                                                        {(order.totalAmount / 1.18).toLocaleString('en-IN', { maximumFractionDigits: 2 })})
                                                    </td>
                                                    <td style={{ textAlign: 'right', padding: '5px 0' }}>
                                                        ₹{(order.totalAmount - order.totalAmount / 1.18).toLocaleString('en-IN', {
                                                            maximumFractionDigits: 2,
                                                        })}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ textAlign: 'left', padding: '5px 0' }}>Total</td>
                                                    <td style={{ textAlign: 'right', padding: '5px 0' }}>
                                                        ₹{order.totalAmount.toLocaleString('en-IN')}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ textAlign: 'left', padding: '5px 0', fontWeight: 'bold' }}>Amount due</td>
                                                    <td style={{ textAlign: 'right', padding: '5px 0', fontWeight: 'bold' }}>
                                                        ₹{order.totalAmount.toLocaleString('en-IN')}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Footer */}
                                    <div style={{ marginTop: '50px', fontSize: '12px', color: '#777', textAlign: 'right' }}>
                                        Page 1 of 1
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowInvoiceModal(false)}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={downloadInvoicePDF}>
                                    Download PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancel Order Dialog */}
            {showCancelDialog && (
                <div className="modal-overlay">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Cancel Order</h5>
                                <button type="button" className="btn-close" onClick={() => setShowCancelDialog(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Reason for Cancellation *</label>
                                    <select
                                        className="form-select"
                                        value={cancelReason}
                                        onChange={(e) => setCancelReason(e.target.value)}
                                    >
                                        <option value="">Select a reason</option>
                                        {cancelReasons.map((reason, index) => (
                                            <option key={index} value={reason}>
                                                {reason}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {cancelReason === 'Other' && (
                                    <div className="mb-3">
                                        <label className="form-label">Please specify</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={otherReason}
                                            onChange={(e) => setOtherReason(e.target.value)}
                                            placeholder="Enter your reason"
                                        />
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label className="form-label">Additional Comments (Optional)</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={additionalComments}
                                        onChange={(e) => setAdditionalComments(e.target.value)}
                                        placeholder="Any additional comments..."
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowCancelDialog(false)}>
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleCancelOrder}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Cancelling...' : 'Confirm Cancellation'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Return Order Dialog */}
            {showReturnDialog && (
                <div className="modal-overlay">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Return Order</h5>
                                <button type="button" className="btn-close" onClick={() => setShowReturnDialog(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Reason for Return *</label>
                                    <select
                                        className="form-select"
                                        value={returnReason}
                                        onChange={(e) => setReturnReason(e.target.value)}
                                    >
                                        <option value="">Select a reason</option>
                                        {returnReasons.map((reason, index) => (
                                            <option key={index} value={reason}>
                                                {reason}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Describe the Issue *</label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        value={issueDescription}
                                        onChange={(e) => setIssueDescription(e.target.value)}
                                        placeholder="Please describe the issue in detail..."
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Upload Images or Videos *</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        multiple
                                        accept="image/*,video/*"
                                        onChange={handleImageUpload}
                                    />
                                    <div className="form-text">Upload clear images or videos showing the issue</div>
                                    {returnImages.length > 0 && (
                                        <div className="mt-2">
                                            <h6>Uploaded Files:</h6>
                                            {returnImages.map((file, index) => (
                                                <div key={index} className="d-flex align-items-center justify-content-between mb-1">
                                                    <span>{file.name}</span>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Refund / Replacement Choice *</label>
                                    <div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="refundChoice"
                                                value="refund"
                                                checked={refundChoice === 'refund'}
                                                onChange={(e) => setRefundChoice(e.target.value)}
                                            />
                                            <label className="form-check-label">Refund</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="refundChoice"
                                                value="replacement"
                                                checked={refundChoice === 'replacement'}
                                                onChange={(e) => setRefundChoice(e.target.value)}
                                            />
                                            <label className="form-check-label">Replacement</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowReturnDialog(false)}>
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={handleReturnOrder}
                                    disabled={isSubmitting || !returnReason || !issueDescription || returnImages.length === 0}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Return Request'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Chat Dialog */}
            {showChatDialog && (
                <ChatModal orderId={orderId} userId={currentUserId} userRole={currentUserRole} onClose={() => setShowChatDialog(false)} />
            )}

            <Footer />
        </div>
    );
}

export default OrderDetails;
