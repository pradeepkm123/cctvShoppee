import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import './Wishlist.css';
import { WishlistContext } from '../Components/WishlistContext';
import myWishlist from '../Image/mywishlist.png';

// MUI dialog for "added to cart"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Box
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const API_BASE = 'http://localhost:5000/api';
const FILE_HOST = 'http://localhost:5000';

function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const { updateWishlistCount } = useContext(WishlistContext);

  // local UI states for add-to-cart flow
  const [addingId, setAddingId] = useState(null); // which product is being added
  const [addedItem, setAddedItem] = useState(null); // product object just added
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      navigate('/login');
      return;
    }

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      const extractedUserId = payload.userId;
      setUserId(extractedUserId);
      localStorage.setItem('userId', extractedUserId);
    } catch (error) {
      console.error('Error decoding token:', error);
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE}/wishlist/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const wishlistData = response.data;
        setWishlist(wishlistData);
        localStorage.setItem('wishlist', JSON.stringify(wishlistData));
        updateWishlistCount(wishlistData.length);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setError('Failed to fetch wishlist. Please try again later.');
      }
    };

    if (userId) {
      fetchWishlist();
    }
  }, [userId, updateWishlistCount]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_BASE}/wishlist/remove`,
        { userId, productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedWishlist = wishlist.filter(item => item._id !== productId);
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      updateWishlistCount(updatedWishlist.length);
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      setError('Failed to remove product from wishlist. Please try again later.');
    }
  };

  // Add a wishlist product directly to cart, then remove from wishlist and show dialog
  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // find product details for dialog
      const product = wishlist.find(p => p._id === productId) || null;

      setAddingId(productId);

      // 1) Add to cart (adjust payload if your backend expects userId, etc.)
      await axios.post(
        `${API_BASE}/cart/add`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2) Remove from wishlist (backend + UI)
      await axios.post(
        `${API_BASE}/wishlist/remove`,
        { userId, productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedWishlist = wishlist.filter(item => item._id !== productId);
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      updateWishlistCount(updatedWishlist.length);

      // 3) Open success dialog
      setAddedItem(product);
      setDialogOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add product to cart. Please try again later.');
    } finally {
      setAddingId(null);
    }
  };

  const handleGoToCart = () => {
    setDialogOpen(false);
    navigate('/cart');
  };

  const handleContinue = () => {
    setDialogOpen(false);
    navigate('/')
  };

  return (
    <div>
      <Navbar />
      <main>
        <section className="breadcrumb__area breadcrumb__style-2 include-bg pt-50 pb-20">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="breadcrumb__content p-relative z-index-1">
                  <div className="breadcrumb__list has-icon">
                    <span className="breadcrumb-icon">
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.42393 16H15.5759C15.6884 16 15.7962 15.9584 15.8758 15.8844C15.9553 15.8104 16 15.71 16 15.6054V6.29143C16 6.22989 15.9846 6.1692 15.9549 6.11422C15.9252 6.05923 15.8821 6.01147 15.829 5.97475L8.75305 1.07803C8.67992 1.02736 8.59118 1 8.5 1C8.40882 1 8.32008 1.02736 8.24695 1.07803L1.17098 5.97587C1.11791 6.01259 1.0748 6.06035 1.04511 6.11534C1.01543 6.17033 0.999976 6.23101 1 6.29255V15.6063C1.00027 15.7108 1.04504 15.8109 1.12451 15.8847C1.20398 15.9585 1.31165 16 1.42393 16ZM10.1464 15.2107H6.85241V10.6202H10.1464V15.2107ZM1.84866 6.48977L8.4999 1.88561L15.1517 6.48977V15.2107H10.9946V10.2256C10.9946 10.1209 10.95 10.0206 10.8704 9.94654C10.7909 9.87254 10.683 9.83096 10.5705 9.83096H6.42848C6.316 9.83096 6.20812 9.87254 6.12858 9.94654C6.04904 10.0206 6.00435 10.1209 6.00435 10.2256V15.2107H1.84806L1.84866 6.48977Z" fill="#55585B" stroke="#55585B" strokeWidth="0.5" />
                      </svg>
                    </span>
                    <span><a href="#">Home</a></span>
                    <span>Wishlist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="tp-cart-area pb-120">
          <div className="container">
            {error && <div className="alert alert-danger">{error}</div>}
            {wishlist.length > 0 ? (
              <div className="row">
                <div className="col-xl-12">
                  <div className="tp-cart-list mb-45 mr-30">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="tp-cart-header-product">Image</th>
                          <th className="tp-cart-header-name">Name</th>
                          <th className="tp-cart-header-price">Price</th>
                          <th>Action</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wishlist.map((item) => (
                          <tr key={item._id}>
                            <td className="tp-cart-img">
                              <img
                                src={`${FILE_HOST}/uploads/${item.image}`}
                                alt={item.name}
                                style={{ maxWidth: 70, borderRadius: 8 }}
                                onError={(e) => { e.currentTarget.src = '/no-image.png'; }}
                              />
                            </td>
                            <td className="tp-cart-name">{item.name}</td>
                            <td className="tp-cart-price"><span>₹{item.newPrice}</span></td>
                            <td className="tp-cart-add-to-cart">
                              <button
                                type="button"
                                className="tp-btn tp-btn-2 tp-btn-blue"
                                onClick={() => handleAddToCart(item._id)}
                                disabled={addingId === item._id}
                                style={{ minWidth: 150 }}
                              >
                                {addingId === item._id ? (
                                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                    <CircularProgress size={18} />
                                    <span>Adding...</span>
                                  </Box>
                                ) : (
                                  <>
                                    <i className="las la-cart-plus" style={{ fontSize: '20px' }}></i>{' '}
                                    Add To Cart
                                  </>
                                )}
                              </button>
                            </td>
                            <td className="tp-cart-action">
                              <button
                                className="tp-cart-action-btn"
                                onClick={() => handleRemoveFromWishlist(item._id)}
                              >
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M9.53033 1.53033C9.82322 1.23744 9.82322 0.762563 9.53033 0.46967C9.23744 0.176777 8.76256 0.176777 8.46967 0.46967L5 3.93934L1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L3.93934 5L0.46967 8.46967C0.176777 8.76256 0.176777 9.23744 0.46967 9.53033C0.762563 9.82322 1.23744 9.82322 1.53033 9.53033L5 6.06066L8.46967 9.53033C8.76256 9.82322 9.23744 9.82322 9.53033 9.53033C9.82322 9.23744 9.82322 8.76256 9.53033 8.46967L6.06066 5L9.53033 1.53033Z" fill="currentColor" />
                                </svg>
                                <span style={{ margin: '0px 10px' }}>Remove</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <img src={myWishlist} alt="wishlist" className="mb-4 mx-auto" />
                <p>No products added to the wishlist.</p>
              </div>

            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* Success Dialog */}
      <Dialog open={dialogOpen} onClose={handleContinue} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', backgroundColor: '#1976d20f', color: '#1976d2' }}>
          <CheckCircleOutlineIcon />
          Product added to cart
        </DialogTitle>
        <DialogContent>
          {addedItem ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: '15px 0px 15px 0px' }}>
              <img
                src={`${FILE_HOST}/uploads/${addedItem.image}`}
                alt={addedItem.name}
                width={56}
                height={56}
                style={{ borderRadius: 8, objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.src = '/no-image.png'; }}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {addedItem.name}
                </Typography>
                <Typography variant="body2">₹ {addedItem.newPrice}</Typography>
              </Box>
            </Box>
          ) : (
            <Typography variant="body2">Item has been added to your cart.</Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleContinue} variant="outlined">Continue shopping</Button>
          <Button onClick={handleGoToCart} variant="contained">Go to cart</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Wishlist;
