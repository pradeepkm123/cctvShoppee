import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No token found. Redirecting to login.');
        navigate('/login');
        return;
      }
      try {
        console.log('Using token:', token);
        const response = await axios.get('https://cctvshoppee.onrender.com/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error.response ? error.response.data : error.message);
        setError(error.response?.data?.message || 'Failed to fetch orders');
      }
    };
    fetchOrders();
  }, [navigate]);

  // Helper function to format shipping address
  const formatAddress = (address) => {
    if (!address) return 'N/A';
    return `${address.street || ''}, ${address.city || ''}, ${address.state || ''}, ${address.postcode || ''}, ${address.country || ''}`.replace(/,\s*,/g, ',').replace(/^,|,$/g, '');
  };

  return (
    <div>
      <Navbar />
      <main>
        <section className="breadcrumb__area include-bg pt-95 pb-50">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="breadcrumb__content p-relative z-index-1">
                  <h3 className="breadcrumb__title">My Orders</h3>
                  <div className="breadcrumb__list">
                    <span><a href="/">Home</a></span>
                    <span>My Orders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="tp-cart-area pb-120">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-cart-list mb-25">
                  <h2>Order History</h2>
                  {error ? (
                    <p style={{ color: 'red' }}>Error: {error}</p>
                  ) : orders.length > 0 ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total Amount</th>
                          <th>Shipping Address</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.flatMap((order) =>
                          order.items.map((item, index) => (
                            <tr key={`${order._id}-${index}`}>
                              <td>{order._id}</td>
                              <td>
                                <img
                                  src={`https://cctvshoppee.onrender.com/uploads/${item.productId?.image}`}
                                  alt={item.productId?.name}
                                  style={{ width: '50px', height: 'auto' }}
                                />
                              </td>
                              <td>{item.productId?.name || 'Unknown Product'}</td>
                              <td>₹{item.price}</td>
                              <td>{item.quantity}</td>
                              <td>₹{order.totalAmount}</td>
                              <td>{formatAddress(order.shippingAddress)}</td>
                              <td>{order.status}</td>
                              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <p>No orders found.</p>
                  )}
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

export default OrderList;
