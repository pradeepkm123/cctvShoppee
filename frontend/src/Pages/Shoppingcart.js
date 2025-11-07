import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const API_URL = process.env.REACT_APP_API_URL || 'https://cctvshoppee.onrender.com';

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const navigate = useNavigate();

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await axios.get(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add or subtract quantity
  const updateCartQuantity = async (productId, quantityChange) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/api/cart/add`,
        { productId, quantity: quantityChange },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const handleIncrement = (index) => {
    const item = cart[index];
    updateCartQuantity(item.product._id, 1);
  };

  const handleDecrement = (index) => {
    const item = cart[index];
    if (item.quantity > 1) updateCartQuantity(item.product._id, -1);
  };

  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(cart.filter(item => item.product._id !== productId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Price calculations
  const calculateTotal = () =>
    cart.reduce((total, item) => total + ((item.product.newPrice ?? 0) * item.quantity), 0);

  const calculateShippingCharges = () => (calculateTotal() >= 500 ? 0 : 100);
  const calculateDiscount = (total) => (total > 1000 ? total * 0.1 : 0);
  const calculateDeliveryCharges = () => (calculateTotal() >= 2000 ? 0 : 100);
  const calculatePackagingFee = () => 80;
  const calculateInstallationFee = () =>
    includeInstallation
      ? cart.filter(item => item.product.name.toLowerCase().includes('camera')).length * 700
      : 0;
  const calculateGST = (total) => Math.round(total * 0.18);

  const totalAmount = () => {
    const total = calculateTotal();
    return Math.round(
      total +
        calculateShippingCharges() +
        calculateDeliveryCharges() +
        calculatePackagingFee() +
        calculateInstallationFee() -
        calculateDiscount(total) +
        calculateGST(total)
    );
  };

  const handleProceedToCheckout = () => {
    if (!cart.length) return alert('Your cart is empty.');
    const total = calculateTotal();
    const cartDetails = {
      cart,
      shippingCharges: calculateShippingCharges(),
      deliveryCharges: calculateDeliveryCharges(),
      packagingFee: calculatePackagingFee(),
      installationFee: calculateInstallationFee(),
      discount: calculateDiscount(total),
      gst: calculateGST(total),
      totalAmount: totalAmount(),
    };
    navigate('/checkout', { state: { cartDetails } });
  };

  return (
    <div>
      <Navbar />
      <main>
        {/* Breadcrumb */}
        <section className="breadcrumb__area include-bg pt-95 pb-50">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="breadcrumb__content p-relative z-index-1">
                  <h3 className="breadcrumb__title">Shopping Cart</h3>
                  <div className="breadcrumb__list">
                    <span><a href="/">Home</a></span>
                    <span>Shopping Cart</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cart Area */}
        <section className="tp-cart-area pb-120">
          <div className="container">
            <div className="row">
              {/* Cart Table */}
              <div className="col-xl-9 col-lg-8">
                <div className="tp-cart-list mb-25 mr-30">
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan="2" className="tp-cart-header-product">Product</th>
                        <th className="tp-cart-header-price">Price</th>
                        <th className="tp-cart-header-quantity">Quantity</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.length > 0 ? (
                        cart.map((item, index) => (
                          <tr key={item.product._id}>
                            <td className="tp-cart-img">
                              <a href={`/product-details/${item.product._id}`}>
                                <img
                                  src={`${API_URL}/uploads/${item.product.image}`}
                                  alt={item.product.name}
                                  style={{ width: '100px', height: 'auto' }}
                                />
                              </a>
                            </td>
                            <td className="tp-cart-title">
                              <a href={`/product-details/${item.product._id}`}>{item.product.name}</a>
                            </td>
                            <td className="tp-cart-price">
                              <span>₹{item.product.newPrice ?? 0}</span><br />
                              <small style={{ color: '#888' }}>
                                x {item.quantity} = ₹{(item.product.newPrice ?? 0) * item.quantity}
                              </small>
                            </td>
                            <td className="tp-cart-quantity">
                              <div className="tp-product-quantity mt-10 mb-10">
                                <span className="tp-cart-minus" onClick={() => handleDecrement(index)}>-</span>
                                <input className="tp-cart-input" type="text" readOnly value={item.quantity} />
                                <span className="tp-cart-plus" onClick={() => handleIncrement(index)}>+</span>
                              </div>
                            </td>
                            <td className="tp-cart-action">
                              <button className="tp-cart-action-btn" onClick={() => handleRemoveItem(item.product._id)}>
                                <i className="las la-trash" style={{ fontSize: '23px' }}></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5">No items in the cart.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Checkout Sidebar */}
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="tp-cart-checkout-wrapper">
                  <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between">
                    <span className="tp-cart-checkout-top-title">Price Details</span>
                  </div>
                  <div className="tp-cart-checkout-shipping">
                    <div className="tp-cart-checkout-shipping-option-wrapper">
                      <div className="tp-cart-checkout-shipping-option">
                        <label>Price ({cart.reduce((total, item) => total + item.quantity, 0)} items) <span>₹{calculateTotal()}</span></label>
                      </div>
                      <div className="tp-cart-checkout-shipping-option">
                        <label>Shipping Charges <span>₹{calculateShippingCharges()}</span></label>
                      </div>
                      <div className="tp-cart-checkout-shipping-option">
                        <label>Discount <span>₹{calculateDiscount(calculateTotal())}</span></label>
                      </div>
                      <div className="tp-cart-checkout-shipping-option">
                        <label>Delivery Charges <span>₹{calculateDeliveryCharges()}</span></label>
                      </div>
                      <div className="tp-cart-checkout-shipping-option">
                        <label>Secured Packaging Fee <span>₹{calculatePackagingFee()}</span></label>
                      </div>
                      <div className="tp-cart-checkout-shipping-option">
                        <label>
                          <input
                            type="checkbox"
                            checked={includeInstallation}
                            onChange={() => setIncludeInstallation(!includeInstallation)}
                          /> Installation Fee <span>₹{calculateInstallationFee()}</span>
                        </label>
                      </div>
                      <div className="tp-cart-checkout-shipping-option">
                        <label>GST (18%) <span>₹{calculateGST(calculateTotal())}</span></label>
                      </div>
                    </div>
                  </div>
                  <div className="tp-cart-checkout-total d-flex align-items-center justify-content-between">
                    <span>Total Amount</span>
                    <span>₹{totalAmount()}</span>
                  </div>
                  <hr />
                  <div className="tp-cart-checkout-total d-flex align-items-center justify-content-between">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-shield-fill-check" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793z"/>
                      </svg>
                    </span>
                    <p style={{ marginLeft: '35px' }}>Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
                  </div>
                  <div className="tp-cart-checkout-proceed">
                    <button onClick={handleProceedToCheckout} className="tp-cart-checkout-btn w-100">Proceed to Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ShoppingCart;
