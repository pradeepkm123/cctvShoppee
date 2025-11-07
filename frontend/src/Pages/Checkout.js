// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Navbar from '../Components/Navbar';
// import Footer from '../Components/Footer';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Modal from 'react-modal';
// import Supercoin from '../assets/img/super_coin_icon.png';

// Modal.setAppElement('#root');

// function Checkout() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { cartDetails } = location.state || {};
//   const { cart = [], shippingCharges = 0, deliveryCharges = 0, packagingFee = 0, installationFee = 0, discount = 0, gst = 0, totalAmount: initialTotalAmount = 0 } = cartDetails || {};

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     phone: '',
//     email: '',
//     upiId: '',
//     state: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
//   const [isUpiVerified, setIsUpiVerified] = useState(false);
//   const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
//   const [useSuperCoins, setUseSuperCoins] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => {
//       const price = item.product?.newPrice || item.newPrice || 0;
//       return total + price * item.quantity;
//     }, 0);
//   };

//   const calculateOriginalTotal = () => {
//     return cart.reduce((total, item) => {
//       const originalPrice = item.product?.price || item.price || 0;
//       return total + originalPrice * item.quantity;
//     }, 0);
//   };

//   const calculateSavings = () => {
//     const originalTotal = calculateOriginalTotal();
//     const discountedTotal = calculateTotal();
//     return originalTotal - discountedTotal + discount;
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     let isValid = true;
//     if (!formData.firstName.trim()) {
//       newErrors.firstName = 'First name is required';
//       isValid = false;
//     }
//     if (!formData.lastName.trim()) {
//       newErrors.lastName = 'Last name is required';
//       isValid = false;
//     }
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone is required';
//       isValid = false;
//     }
//     if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Valid email is required';
//       isValid = false;
//     }
//     if (!formData.state.trim()) {
//       newErrors.state = 'State is required';
//       isValid = false;
//     }
//     if (selectedPaymentMethod === 'upi' && !formData.upiId.trim()) {
//       newErrors.upiId = 'UPI ID is required';
//       isValid = false;
//     }
//     setErrors(newErrors);
//     return isValid;
//   };

//   const verifyUpiId = async (upiId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/checkout/verify-upi', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ upiId }),
//       });
//       const data = await response.json();
//       if (data.isValid) {
//         setIsUpiVerified(true);
//         toast.success('UPI ID verified');
//       } else {
//         toast.error('Invalid UPI ID');
//       }
//     } catch (error) {
//       toast.error('Error verifying UPI ID');
//     }
//   };

//   useEffect(() => {
//     if (selectedPaymentMethod === 'upi' && formData.upiId.trim()) {
//       verifyUpiId(formData.upiId);
//     }
//   }, [formData.upiId, selectedPaymentMethod]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     if (selectedPaymentMethod === 'upi' && !isUpiVerified) {
//       toast.error('Please verify your UPI ID first');
//       return;
//     }
//     try {
//       const token = localStorage.getItem('token');
//       const paymentRes = await fetch('http://localhost:5000/api/payments/payment-link', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           upiId: formData.upiId,
//           phone: formData.phone,
//           amount: useSuperCoins ? initialTotalAmount - 50 : initialTotalAmount,
//         }),
//       });
//       const paymentData = await paymentRes.json();
//       if (!paymentData.success) {
//         toast.error('Payment link failed');
//         return;
//       }
//       const orderItems = cart.map(item => ({
//         productId: item.product?._id || item.productId,
//         quantity: item.quantity,
//         price: item.product?.newPrice || item.newPrice || 0,
//         name: item.product?.name || item.name,
//       }));
//       const orderRes = await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           items: orderItems,
//           totalAmount: useSuperCoins ? initialTotalAmount - 50 : initialTotalAmount,
//            shippingAddress: {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           phone: formData.phone,
//           email: formData.email,
//           state: formData.state,
//           streeaddress: formData.state,
//           towncity: formData.state,
//           postzip: formData.stae
//           // Add other fields as needed
//         },
//         }),
//       });
//       const orderData = await orderRes.json();
//       if (orderRes.ok) {
//         toast.success('Order placed successfully!');
//         setIsSuccessDialogOpen(true);
//         // Clear the cart
//         try {
//           await fetch('http://localhost:5000/api/cart/clear', {
//             method: 'DELETE',
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           });
//         } catch (error) {
//           console.error('Error clearing cart:', error);
//         }
//       } else {
//         toast.error(orderData.message || 'Failed to create order');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Order submission error');
//     }
//   };

//   const closeSuccessDialog = () => {
//     setIsSuccessDialogOpen(false);
//     navigate('/orderslist');
//   };

//   return (
//     <div>
//       <Navbar />
//       <main>
//         <section className="breadcrumb__area include-bg pt-95 pb-50" data-bg-color="#EFF1F5">
//           <div className="container">
//             <div className="row">
//               <div className="col-xxl-12">
//                 <div className="breadcrumb__content p-relative z-index-1">
//                   <h3 className="breadcrumb__title">Checkout</h3>
//                   <div className="breadcrumb__list">
//                     <span><a href="/">Home</a></span>
//                     <span>Checkout</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="tp-checkout-area pb-120" data-bg-color="#EFF1F5">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-7">
//                 <div className="tp-checkout-bill-area">
//                   <h3 className="tp-checkout-bill-title">Billing Details</h3>
//                   <div className="tp-checkout-bill-form">
//                     <form onSubmit={handleSubmit}>
//                       <div className="tp-checkout-bill-inner">
//                         <div className="row">
//                           <div className="col-md-6">
//                             <div className="tp-checkout-input">
//                               <label>First Name <span>*</span></label>
//                               <input
//                                 type="text"
//                                 name="firstName"
//                                 value={formData.firstName}
//                                 onChange={handleChange}
//                                 placeholder="First Name"
//                               />
//                               {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="tp-checkout-input">
//                               <label>Last Name <span>*</span></label>
//                               <input
//                                 type="text"
//                                 name="lastName"
//                                 value={formData.lastName}
//                                 onChange={handleChange}
//                                 placeholder="Last Name"
//                               />
//                               {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
//                             </div>
//                           </div>
//                           <div className="col-md-12">
//                             <div className="tp-checkout-input">
//                               <label>Company name (optional)</label>
//                               <input type="text" placeholder="Example LTD." />
//                             </div>
//                           </div>
//                           <div className="col-md-12">
//                             <div className="tp-checkout-input">
//                               <label>Country</label>
//                               <input type="text" placeholder="India" readOnly />
//                             </div>
//                           </div>
//                           <div className="col-md-12">
//                             <div className="tp-checkout-input">
//                               <label>Street address</label>
//                               <input type="text" placeholder="House number and street name" />
//                             </div>
//                             <div className="tp-checkout-input">
//                               <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" />
//                             </div>
//                           </div>
//                           <div className="col-md-12">
//                             <div className="tp-checkout-input">
//                               <label>Town / City</label>
//                               <input type="text" placeholder="" />
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="tp-checkout-input">
//                               <label>State <span>*</span></label>
//                               <select
//                                 name="state"
//                                 value={formData.state}
//                                 onChange={handleChange}
//                                 className="form-select"
//                               >
//                                 <option value="">Select State</option>
//                                 <option value="Andhra Pradesh">Andhra Pradesh</option>
//                                 <option value="Arunachal Pradesh">Arunachal Pradesh</option>
//                                 <option value="Assam">Assam</option>
//                                 <option value="Bihar">Bihar</option>
//                                 <option value="Chhattisgarh">Chhattisgarh</option>
//                                 <option value="Goa">Goa</option>
//                                 <option value="Gujarat">Gujarat</option>
//                                 <option value="Haryana">Haryana</option>
//                                 <option value="Himachal Pradesh">Himachal Pradesh</option>
//                                 <option value="Jharkhand">Jharkhand</option>
//                                 <option value="Karnataka">Karnataka</option>
//                                 <option value="Kerala">Kerala</option>
//                                 <option value="Madhya Pradesh">Madhya Pradesh</option>
//                                 <option value="Maharashtra">Maharashtra</option>
//                                 <option value="Manipur">Manipur</option>
//                                 <option value="Meghalaya">Meghalaya</option>
//                                 <option value="Mizoram">Mizoram</option>
//                                 <option value="Nagaland">Nagaland</option>
//                                 <option value="Odisha">Odisha</option>
//                                 <option value="Punjab">Punjab</option>
//                                 <option value="Rajasthan">Rajasthan</option>
//                                 <option value="Sikkim">Sikkim</option>
//                                 <option value="Tamil Nadu">Tamil Nadu</option>
//                                 <option value="Telangana">Telangana</option>
//                                 <option value="Tripura">Tripura</option>
//                                 <option value="Uttar Pradesh">Uttar Pradesh</option>
//                                 <option value="Uttarakhand">Uttarakhand</option>
//                                 <option value="West Bengal">West Bengal</option>
//                                 <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
//                                 <option value="Chandigarh">Chandigarh</option>
//                                 <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
//                                 <option value="Lakshadweep">Lakshadweep</option>
//                                 <option value="Delhi">Delhi</option>
//                                 <option value="Puducherry">Puducherry</option>
//                                 <option value="Ladakh">Ladakh</option>
//                                 <option value="Jammu and Kashmir">Jammu and Kashmir</option>
//                               </select>
//                               {errors.state && <p style={{ color: 'red' }}>{errors.state}</p>}
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="tp-checkout-input">
//                               <label>Postcode ZIP</label>
//                               <input type="text" placeholder="PinCode" name='' />
//                             </div>
//                           </div>
//                           <div className="col-md-12">
//                             <div className="tp-checkout-input">
//                               <label>Phone <span>*</span></label>
//                               <input
//                                 type="text"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 placeholder=""
//                               />
//                               {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
//                             </div>
//                           </div>
//                           <div className="col-md-12">
//                             <div className="tp-checkout-input">
//                               <label>Email address <span>*</span></label>
//                               <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 placeholder=""
//                               />
//                               {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-5">
//                 <div className="tp-checkout-place white-bg">
//                   <h3 className="tp-checkout-place-title">Your Order</h3>
//                   <div className="tp-order-info-list">
//                     <ul>
//                       <li className="tp-order-info-list-header">
//                         <h4>Product</h4>
//                         <h4>Total</h4>
//                       </li>
//                       {cart.map((item, index) => (
//                         <li key={index} className="tp-order-info-list-desc">
//                           <p>{item.product.name} <span> x {item.quantity}</span></p>
//                           <span>₹{item.product.newPrice * item.quantity}</span>
//                         </li>
//                       ))}
//                       <li className="tp-order-info-list-subtotal">
//                         <span>Subtotal</span>
//                         <span>₹{calculateTotal()}</span>
//                       </li>
//                       <li className="tp-order-info-list-desc">
//                         <p>Shipping Charges</p>
//                         <span>₹{shippingCharges}</span>
//                       </li>
//                       <li className="tp-order-info-list-desc">
//                         <p>Discount</p>
//                         <span>-₹{discount}</span>
//                       </li>
//                       <li className="tp-order-info-list-desc">
//                         <p>Delivery Charges</p>
//                         <span>₹{deliveryCharges}</span>
//                       </li>
//                       <li className="tp-order-info-list-desc">
//                         <p>Secured Packaging Fee</p>
//                         <span>₹{packagingFee}</span>
//                       </li>
//                       <li className="tp-order-info-list-desc">
//                         <p>Installation Fee</p>
//                         <span>₹{installationFee}</span>
//                       </li>
//                       <li className="tp-order-info-list-desc">
//                         <p>GST (18%)</p>
//                         <span>₹{gst}</span>
//                       </li>
//                       <li className="tp-order-info-list-desc">
//                         <p className='savemoney'>You will save on this Order</p>
//                         <span className='savemoney'>₹{calculateSavings()}</span>
//                       </li>
//                       <div className="payment-container py-3 mt-3">
//                         <div className="payment-header">
//                           <div className="payment-info">
//                             <h6 className="payment-title">Pay Using SuperCoins</h6>
//                             <div className="balance-section">
//                               <p className="balance-label">Balance:</p>
//                               <div className="coin-icon">
//                                 <img src={Supercoin} alt="SuperCoins" width={15} />
//                               </div>
//                               <span className="balance-amount">{useSuperCoins ? '180' : '0'}</span>
//                             </div>
//                           </div>
//                           <div className="toggle-container">
//                             <button
//                               className="toggle-switch"
//                               onClick={() => setUseSuperCoins(!useSuperCoins)}
//                               style={{
//                                 backgroundColor: useSuperCoins ? '#28a745' : '#ccc',
//                                 borderRadius: '20px',
//                                 width: '40px',
//                                 height: '20px',
//                                 position: 'relative',
//                                 cursor: 'pointer',
//                                 border: 'none',
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   width: '16px',
//                                   height: '16px',
//                                   backgroundColor: 'white',
//                                   borderRadius: '50%',
//                                   position: 'absolute',
//                                   top: '2px',
//                                   left: useSuperCoins ? '22px' : '2px',
//                                   transition: 'left 0.3s',
//                                 }}
//                               />
//                             </button>
//                           </div>
//                         </div>
//                         <div className="savings-section">
//                           {useSuperCoins ? (
//                             <>
//                               <p className="savings-text">
//                                 <i className="las la-check" id='tick'></i>
//                                 <span className="savings-amount">You will save 50 using 50 coins</span>
//                               </p>
//                               <button className="manage-btn" onClick={() => alert('Manage coins')}>Manage</button>
//                             </>
//                           ) : (
//                             <p className="savings-text">SuperCoins not applied</p>
//                           )}
//                         </div>
//                       </div>
//                       <li className="tp-order-info-list-total">
//                         <span>Total</span>
//                         <span>₹{useSuperCoins ? initialTotalAmount - 50 : initialTotalAmount}</span>
//                       </li>
//                     </ul>
//                   </div>
//                   <hr />
//                   <div className="tp-checkout-payment">
//                     <h3 className="tp-checkout-place-title">Payment</h3>
//                     <div className="tp-checkout-payment-item">
//                       <input
//                         type="radio"
//                         id="upi"
//                         name="payment"
//                         onChange={() => {
//                           setSelectedPaymentMethod('upi');
//                           setIsUpiVerified(false);
//                         }}
//                       />
//                       <label htmlFor="upi"><img src="https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fexb2bvgjlfysy5dkya2u.jpeg" alt="UPI" width={100} /></label>
//                     </div>
//                     {selectedPaymentMethod === 'upi' && (
//                       <div className="tp-checkout-payment-details">
//                         <div className="tp-checkout-input">
//                           <label>UPI ID</label>
//                           <input
//                             type="text"
//                             name="upiId"
//                             value={formData.upiId}
//                             onChange={handleChange}
//                             placeholder="Enter UPI ID"
//                           />
//                           {errors.upiId && <p style={{ color: 'red' }}>{errors.upiId}</p>}
//                         </div>
//                         {isUpiVerified && (
//                           <div>
//                             <button type="button" className="tp-checkout-btn w-100" onClick={handleSubmit}>
//                               Pay Now
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <Modal
//           isOpen={isSuccessDialogOpen}
//           onRequestClose={closeSuccessDialog}
//           contentLabel="Order Success"
//           style={{
//             overlay: {
//               backgroundColor: 'rgba(0, 0, 0, 0.5)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             },
//             content: {
//               background: 'white',
//               borderRadius: '16px',
//               boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
//               textAlign: 'center',
//               padding: '40px 30px 30px',
//               maxWidth: '380px',
//               width: '100%',
//               position: 'relative',
//               margin: 'auto',
//               border: 'none',
//             }
//           }}
//         >
//           <div style={{
//             width: '80px',
//             height: '80px',
//             background: '#28a745',
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             margin: '-80px 120px 30px',
//             boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
//             position: 'fixed',
//             zIndex: 1,
//           }}>
//             <i className="las la-check-circle" style={{ color: 'white', fontSize: '50px', fontWeight: 'bold' }}></i>
//           </div>
//           <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#333', margin: '20px', lineHeight: 1.2 }}>
//             Congratulations
//           </h2>
//           <p style={{ fontSize: '16px', color: '#6c757d', marginBottom: '30px', lineHeight: 1.5 }}>
//             Your order has been placed successfully!
//           </p>
//           <button
//             onClick={closeSuccessDialog}
//             style={{
//               background: '#28a745',
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               padding: '14px 0',
//               fontSize: '16px',
//               fontWeight: 600,
//               width: '100%',
//               cursor: 'pointer',
//               transition: 'all 0.3s ease',
//             }}
//             onMouseOver={(e) => {
//               e.target.style.background = '#218838';
//               e.target.style.transform = 'translateY(-1px)';
//               e.target.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.3)';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.background = '#28a745';
//               e.target.style.transform = 'translateY(0)';
//               e.target.style.boxShadow = 'none';
//             }}
//           >
//             Done
//           </button>
//         </Modal>
//       </main>
//       <Footer />
//       <ToastContainer />
//     </div>
//   );
// }

// export default Checkout;






















import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import Supercoin from '../assets/img/super_coin_icon.png';

Modal.setAppElement('#root');

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartDetails } = location.state || {};
  const {
    cart = [],
    shippingCharges = 0,
    deliveryCharges = 0,
    packagingFee = 0,
    installationFee = 0,
    discount = 0,
    gst = 0,
    totalAmount: initialTotalAmount = 0
  } = cartDetails || {};

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    upiId: '',
    state: '',
    street: '',
    city: '',
    postcode: '',
  });
  const [errors, setErrors] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [useSuperCoins, setUseSuperCoins] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isPlusMember, setIsPlusMember] = useState(false);

  // Fetch SuperCoins balance on component mount
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/supercoins/balance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setBalance(data.balance);
      } catch (err) {
        toast.error('Failed to fetch SuperCoins balance');
      }
    };
    fetchBalance();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product?.newPrice || item.newPrice || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const calculateOriginalTotal = () => {
    return cart.reduce((total, item) => {
      const originalPrice = item.product?.price || item.price || 0;
      return total + originalPrice * item.quantity;
    }, 0);
  };

  const calculateSavings = () => {
    const originalTotal = calculateOriginalTotal();
    const discountedTotal = calculateTotal();
    return originalTotal - discountedTotal + discount;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
      isValid = false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
      isValid = false;
    }
    if (!formData.street.trim()) {
      newErrors.street = 'Street address is required';
      isValid = false;
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }
    if (!formData.postcode.trim()) {
      newErrors.postcode = 'Postcode is required';
      isValid = false;
    }
    if (selectedPaymentMethod === 'upi' && !formData.upiId.trim()) {
      newErrors.upiId = 'UPI ID is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const verifyUpiId = async (upiId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/checkout/verify-upi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ upiId }),
      });
      const data = await response.json();
      if (data.isValid) {
        setIsUpiVerified(true);
        toast.success('UPI ID verified');
      } else {
        toast.error('Invalid UPI ID');
      }
    } catch (error) {
      toast.error('Error verifying UPI ID');
    }
  };

  useEffect(() => {
    if (selectedPaymentMethod === 'upi' && formData.upiId.trim()) {
      verifyUpiId(formData.upiId);
    }
  }, [formData.upiId, selectedPaymentMethod]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (selectedPaymentMethod === 'upi' && !isUpiVerified) {
      toast.error('Please verify your UPI ID first');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      // Step 1: Use SuperCoins (if selected)
      let superCoinsUsed = 0;
      if (useSuperCoins) {
        superCoinsUsed = Math.min(50, balance);
        const useSuperCoinsRes = await fetch('http://localhost:5000/api/supercoins/use', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderValue: initialTotalAmount,
            coinsUsed: superCoinsUsed,
          }),
        });
        const useSuperCoinsData = await useSuperCoinsRes.json();
        if (!useSuperCoinsData.success) {
          toast.error(useSuperCoinsData.message || 'Failed to use SuperCoins');
          return;
        }
      }

      // Step 2: Create Payment Link
      const paymentRes = await fetch('http://localhost:5000/api/payments/payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          upiId: formData.upiId,
          phone: formData.phone,
          amount: useSuperCoins ? initialTotalAmount - superCoinsUsed : initialTotalAmount,
        }),
      });
      const paymentData = await paymentRes.json();
      if (!paymentData.success) {
        toast.error('Payment link failed');
        return;
      }

      // Step 3: Create Order
      const orderItems = cart.map((item) => ({
        productId: item.product?._id || item.productId,
        quantity: item.quantity,
        price: item.product?.newPrice || item.newPrice || 0,
        name: item.product?.name || item.name,
      }));

      const orderRes = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: orderItems,
          totalAmount: useSuperCoins ? initialTotalAmount - superCoinsUsed : initialTotalAmount,
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            state: formData.state,
            street: formData.street,
            city: formData.city,
            postcode: formData.postcode,
            country: 'India',
          },
          paymentMethod: selectedPaymentMethod.toUpperCase(),
          superCoinsUsed,
        }),
      });

      const orderData = await orderRes.json();
      if (orderRes.ok) {
        toast.success('Order placed successfully!');

        // Step 4: Earn SuperCoins
        try {
          await fetch('http://localhost:5000/api/supercoins/earn', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              orderValue: initialTotalAmount,
              isPlusMember,
              orderId: orderData._id,
            }),
          });
        } catch (error) {
          console.error('Error earning SuperCoins:', error);
        }

        // Step 5: Clear Cart
        try {
          await fetch('http://localhost:5000/api/cart/clear', {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error('Error clearing cart:', error);
        }

        setIsSuccessDialogOpen(true);
      } else {
        toast.error(orderData.message || 'Failed to create order');
      }
    } catch (error) {
      console.error(error);
      toast.error('Order submission error');
    }
  };


  const closeSuccessDialog = () => {
    setIsSuccessDialogOpen(false);
    navigate('/orders');
  };

  return (
    <div>
      <Navbar />
      <main>
        {/* Breadcrumb Section */}
        <section className="breadcrumb__area include-bg pt-95 pb-50" data-bg-color="#EFF1F5">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="breadcrumb__content p-relative z-index-1">
                  <h3 className="breadcrumb__title">Checkout</h3>
                  <div className="breadcrumb__list">
                    <span><a href="/">Home</a></span>
                    <span>Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Checkout Form and Order Summary */}
        <section className="tp-checkout-area pb-120" data-bg-color="#EFF1F5">
          <div className="container">
            <div className="row">
              {/* Billing Details Form */}
              <div className="col-lg-7">
                <div className="tp-checkout-bill-area">
                  <h3 className="tp-checkout-bill-title">Billing Details</h3>
                  <div className="tp-checkout-bill-form">
                    <form onSubmit={handleSubmit}>
                      <div className="tp-checkout-bill-inner">
                        <div className="row">
                          {/* First Name */}
                          <div className="col-md-6">
                            <div className="tp-checkout-input">
                              <label>First Name <span>*</span></label>
                              <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                              />
                              {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
                            </div>
                          </div>
                          {/* Last Name */}
                          <div className="col-md-6">
                            <div className="tp-checkout-input">
                              <label>Last Name <span>*</span></label>
                              <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                              />
                              {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                            </div>
                          </div>
                          {/* Company Name (Optional) */}
                          <div className="col-md-12">
                            <div className="tp-checkout-input">
                              <label>Company name (optional)</label>
                              <input type="text" placeholder="Example LTD." />
                            </div>
                          </div>
                          {/* Country */}
                          <div className="col-md-12">
                            <div className="tp-checkout-input">
                              <label>Country</label>
                              <input type="text" placeholder="India" readOnly />
                            </div>
                          </div>
                          {/* Street Address */}
                          <div className="col-md-12">
                            <div className="tp-checkout-input">
                              <label>Street address <span>*</span></label>
                              <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                placeholder="House number and street name"
                              />
                              {errors.street && <p style={{ color: 'red' }}>{errors.street}</p>}
                            </div>
                            <div className="tp-checkout-input">
                              <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" />
                            </div>
                          </div>
                          {/* City */}
                          <div className="col-md-12">
                            <div className="tp-checkout-input">
                              <label>Town / City <span>*</span></label>
                              <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder=""
                              />
                              {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
                            </div>
                          </div>
                          {/* State */}
                          <div className="col-md-6">
                            <div className="tp-checkout-input">
                              <label>State <span>*</span></label>
                              <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="form-select"
                              >
                                <option value="">Select State</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Puducherry">Puducherry</option>
                                <option value="Ladakh">Ladakh</option>
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                              </select>
                              {errors.state && <p style={{ color: 'red' }}>{errors.state}</p>}
                            </div>
                          </div>
                          {/* Postcode */}
                          <div className="col-md-6">
                            <div className="tp-checkout-input">
                              <label>Postcode / ZIP <span>*</span></label>
                              <input
                                type="text"
                                name="postcode"
                                value={formData.postcode}
                                onChange={handleChange}
                                placeholder="PinCode"
                              />
                              {errors.postcode && <p style={{ color: 'red' }}>{errors.postcode}</p>}
                            </div>
                          </div>
                          {/* Phone */}
                          <div className="col-md-12">
                            <div className="tp-checkout-input">
                              <label>Phone <span>*</span></label>
                              <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder=""
                              />
                              {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
                            </div>
                          </div>
                          {/* Email */}
                          <div className="col-md-12">
                            <div className="tp-checkout-input">
                              <label>Email address <span>*</span></label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder=""
                              />
                              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="col-lg-5">
                <div className="tp-checkout-place white-bg">
                  <h3 className="tp-checkout-place-title">Your Order</h3>
                  <div className="tp-order-info-list">
                    <ul>
                      <li className="tp-order-info-list-header">
                        <h4>Product</h4>
                        <h4>Total</h4>
                      </li>
                      {cart.map((item, index) => (
                        <li key={index} className="tp-order-info-list-desc">
                          <p>{item.product.name} <span> x {item.quantity}</span></p>
                          <span>₹{item.product.newPrice * item.quantity}</span>
                        </li>
                      ))}
                      <li className="tp-order-info-list-subtotal">
                        <span>Subtotal</span>
                        <span>₹{calculateTotal()}</span>
                      </li>
                      <li className="tp-order-info-list-desc">
                        <p>Shipping Charges</p>
                        <span>₹{shippingCharges}</span>
                      </li>
                      <li className="tp-order-info-list-desc">
                        <p>Discount</p>
                        <span>-₹{discount}</span>
                      </li>
                      <li className="tp-order-info-list-desc">
                        <p>Delivery Charges</p>
                        <span>₹{deliveryCharges}</span>
                      </li>
                      <li className="tp-order-info-list-desc">
                        <p>Secured Packaging Fee</p>
                        <span>₹{packagingFee}</span>
                      </li>
                      <li className="tp-order-info-list-desc">
                        <p>Installation Fee</p>
                        <span>₹{installationFee}</span>
                      </li>
                      <li className="tp-order-info-list-desc">
                        <p>GST (18%)</p>
                        <span>₹{gst}</span>
                      </li>
                      <li className="tp-order-info-list-desc">
                        <p className="savemoney">You will save on this Order</p>
                        <span className="savemoney">₹{calculateSavings()}</span>
                      </li>
                      {/* SuperCoins Section */}
                      <div className="payment-container py-3 mt-3">
                        <div className="payment-header">
                          <div className="payment-info">
                            <h6 className="payment-title">Pay Using SuperCoins</h6>
                            <div className="balance-section">
                              <p className="balance-label">Balance:</p>
                              <div className="coin-icon">
                                <img src={Supercoin} alt="SuperCoins" width={15} />
                              </div>
                              <span className="balance-amount">{balance}</span>
                            </div>
                          </div>
                          <div className="toggle-container">
                            <button
                              className="toggle-switchs"
                              onClick={() => setUseSuperCoins(!useSuperCoins)}
                              style={{
                                backgroundColor: useSuperCoins ? '#28a745' : '#ccc',
                                borderRadius: '20px',
                                width: '40px',
                                height: '20px',
                                position: 'relative',
                                cursor: 'pointer',
                                border: 'none',
                              }}
                            >
                              <div
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  backgroundColor: 'white',
                                  borderRadius: '50%',
                                  position: 'absolute',
                                  top: '2px',
                                  left: useSuperCoins ? '22px' : '2px',
                                  transition: 'left 0.3s',
                                }}
                              />
                            </button>
                          </div>
                        </div>
                        <div className="savings-section">
                          {useSuperCoins ? (
                            <>
                              <p className="savings-text">
                                <i className="las la-check" id="tick"></i>
                                <span className="savings-amount">
                                  You will save {Math.min(50, balance)} using {Math.min(50, balance)} coins
                                </span>
                              </p>
                              <button className="manage-btn" onClick={() => alert('Manage coins')}>
                                Manage
                              </button>
                            </>
                          ) : (
                            <p className="savings-text">SuperCoins not applied</p>
                          )}
                        </div>
                        <p className="earn-text">
                          You will earn{' '}
                          {isPlusMember
                            ? Math.min(Math.floor(initialTotalAmount / 100) * 4, 100)
                            : Math.min(Math.floor(initialTotalAmount / 100) * 2, 50)}{' '}
                          SuperCoins for this order!
                        </p>
                      </div>
                      {/* Total Amount */}
                      <li className="tp-order-info-list-total">
                        <span>Total</span>
                        <span>₹{useSuperCoins ? initialTotalAmount - Math.min(50, balance) : initialTotalAmount}</span>
                      </li>
                    </ul>
                  </div>
                  <hr />
                  {/* Payment Methods */}
                  <div className="tp-checkout-payment">
                    <h3 className="tp-checkout-place-title">Payment</h3>
                    <div className="tp-checkout-payment-item">
                      <input
                        type="radio"
                        id="upi"
                        name="payment"
                        onChange={() => {
                          setSelectedPaymentMethod('upi');
                          setIsUpiVerified(false);
                        }}
                      />
                      <label htmlFor="upi">
                        <img
                          src="https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fexb2bvgjlfysy5dkya2u.jpeg"
                          alt="UPI"
                          width={100}
                        />
                      </label>
                    </div>
                    {selectedPaymentMethod === 'upi' && (
                      <div className="tp-checkout-payment-details">
                        <div className="tp-checkout-input">
                          <label>UPI ID</label>
                          <input
                            type="text"
                            name="upiId"
                            value={formData.upiId}
                            onChange={handleChange}
                            placeholder="Enter UPI ID"
                          />
                          {errors.upiId && <p style={{ color: 'red' }}>{errors.upiId}</p>}
                        </div>
                        {isUpiVerified && (
                          <div>
                            <button type="button" className="tp-checkout-btn w-100" onClick={handleSubmit}>
                              Pay Now
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Modal */}
        <Modal
          isOpen={isSuccessDialogOpen}
          onRequestClose={closeSuccessDialog}
          contentLabel="Order Success"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            content: {
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
              textAlign: 'center',
              padding: '40px 30px 30px',
              maxWidth: '380px',
              width: '100%',
              position: 'relative',
              margin: 'auto',
              border: 'none',
            },
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              background: '#28a745',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '-80px 120px 30px',
              boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
              position: 'fixed',
              zIndex: 1,
            }}
          >
            <i className="las la-check-circle" style={{ color: 'white', fontSize: '50px', fontWeight: 'bold' }}></i>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#333', margin: '20px', lineHeight: 1.2 }}>
            Congratulations
          </h2>
          <p style={{ fontSize: '16px', color: '#6c757d', marginBottom: '30px', lineHeight: 1.5 }}>
            Your order has been placed successfully!
          </p>
          <button
            onClick={closeSuccessDialog}
            style={{
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '14px 0',
              fontSize: '16px',
              fontWeight: 600,
              width: '100%',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#218838';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#28a745';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Done
          </button>
        </Modal>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Checkout;
