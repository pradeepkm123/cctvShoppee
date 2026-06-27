// src/Components/Navbar.jsx
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartDialog from './CartDialog';
import Logo from '../Image/logo.png';
import Call from '../Image/icons8-call.gif';
import { WishlistContext } from '../Components/WishlistContext';


const API_BASE = 'https://api.cctvshoppee.com/api';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const { wishlistCount } = useContext(WishlistContext) || {};
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // --- Search states ---
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTouched, setSearchTouched] = useState(false);
  const searchBoxRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isLoggedIn = () => {
    const t = localStorage.getItem('token');
    return t && t !== 'undefined';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCart([]);
    setWishlist([]);
    navigate('/login');
  };

  const fetchCartData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || token === 'undefined') return;

      const response = await axios.get(`${API_BASE}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const fetchWishlistData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || token === 'undefined') return;

      const response = await axios.get(`${API_BASE}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWishlist(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching wishlist data:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || token === 'undefined') return;

      const response = await axios.get(`${API_BASE}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = Array.isArray(response.data) ? response.data : [];
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.isRead).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      fetchCartData();
      fetchWishlistData();
      fetchNotifications();
    } else {
      setCart([]);
      setWishlist([]);
      setNotifications([]);
      setUnreadCount(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    document.body.style.overflow = 'auto';
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const handleRemoveItem = async (productId) => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart((prev) => prev.filter((item) => item.product._id !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleIncrement = async (index) => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const productId = cart[index].product._id;
      const updatedCart = [...cart];
      updatedCart[index].quantity += 1;

      await axios.put(
        `${API_BASE}/cart/update/${productId}`,
        { quantity: updatedCart[index].quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(updatedCart);
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const handleDecrement = async (index) => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const productId = cart[index].product._id;
      const updatedCart = [...cart];

      if (updatedCart[index].quantity > 1) {
        updatedCart[index].quantity -= 1;

        await axios.put(
          `${API_BASE}/cart/update/${productId}`,
          { quantity: updatedCart[index].quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCart(updatedCart);
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + (item?.product?.newPrice || 0) * (item?.quantity || 0), 0);

  // --- Badge values ---
  const wishlistCountToShow = isLoggedIn()
    ? (typeof wishlistCount === 'number' ? wishlistCount : (Array.isArray(wishlist) ? wishlist.length : 0))
    : 0;

  const cartCountToShow = isLoggedIn()
    ? cart.reduce((total, item) => total + (item?.quantity || 0), 0)
    : 0;

  // ---------------------------
  // Search helpers
  // ---------------------------
  const norm = (v) => (v ?? '').toString().toLowerCase().trim();

  const productMatches = (p, q) => {
    const fields = [
      p?.name,
      p?.brand,
      p?.category,
      p?.productType,
      p?.nightVision,
      p?.cameraType,
      p?.megaPixel,
      p?.audioChannel,
      p?.model,
    ];
    return fields.some((f) => norm(f).includes(q));
  };

  const runSearch = async (term) => {
    const q = norm(term);
    setSearchTouched(true);

    if (q.length < 2) {
      setSearchResults([]);
      setSearchOpen(!!q);
      return;
    }

    try {
      setSearchLoading(true);
      const { data } = await axios.get(`${API_BASE}/products`);

      const list = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
      const filtered = list.filter((p) => productMatches(p, q)).slice(0, 10);

      setSearchResults(filtered);
      setSearchOpen(true);
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
      setSearchOpen(true);
    } finally {
      setSearchLoading(false);
    }
  };

  const onSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    runSearch(val);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      // Navigate to products page with search query
      navigate(`/product?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm('');
      closeMobileMenu();
    }
  };

  const handleSearchItemClick = (productId) => {
    setSearchOpen(false);
    setSearchTerm('');
    navigate(`/product/${productId}`);
    closeMobileMenu();
  };

  const handleViewAllResults = () => {
    if (searchTerm.trim()) {
      navigate(`/product?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm('');
      closeMobileMenu();
    }
  };


  const closeSearchIfClickedOutside = (e) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
      setSearchOpen(false);
    }
  };

  const closeNotificationIfClickedOutside = (e) => {
    if (notificationRef.current && !notificationRef.current.contains(e.target)) {
      setShowNotifications(false);
    }
  };

  const closeMobileMenuIfClickedOutside = (e) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target) && isMenuOpen) {
      closeMobileMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeSearchIfClickedOutside);
    document.addEventListener('mousedown', closeMobileMenuIfClickedOutside);
    document.addEventListener('mousedown', closeNotificationIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', closeSearchIfClickedOutside);
      document.removeEventListener('mousedown', closeMobileMenuIfClickedOutside);
      document.removeEventListener('mousedown', closeNotificationIfClickedOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleMarkAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE}/notifications/read-all`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE}/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const goToProduct = (id) => {
    setSearchOpen(false);
    setSearchTerm('');
    navigate(`/product/${id}`);
    closeMobileMenu();
  };

  // Mobile menu navigation structure
  const mobileMenuItems = [
    {
      label: "Home",
      path: "/",
      type: "link"
    },
    {
      label: "Surveillance",
      type: "dropdown",
      items: [
        { label: "CCTV Camera", path: "/product?category=CCTV Camera" },
        { label: "HD Camera", path: "/product?category=HD Camera" },
        { label: "IP Camera", path: "/product?category=IP Camera" },
        { label: "PTZ Camera", path: "/product?category=PTZ Camera" },
        { label: "Wifi Camera", path: "/product?category=Wifi Camera" },
        { label: "4G Camera", path: "/product?category=4G Camera" },
        { label: "Recorders", path: "/product?category=Recorders" },
        { label: "DVR", path: "/product?category=DVR" },
        { label: "NVR", path: "/product?category=NVR" },
      ]
    },
    {
      label: "New Products",
      path: "/shop",
      type: "link"
    },
    {
      label: "LED",
      path: "/coupon",
      type: "link"
    },
    {
      label: "Accessories",
      type: "dropdown",
      items: [
        { label: "Cables", path: "/product?category=Cables" },
        { label: "Networking", path: "/product?category=Networking" },
      ]
    },
    {
      label: "Access Control",
      type: "dropdown",
      items: [
        { label: "Biometric", path: "/product?category=Biometric" },
        { label: "Video DOP", path: "/product?category=Video DOP" },
      ]
    },
    {
      label: "Security Products",
      type: "dropdown",
      items: [
        { label: "Boom Barrier", path: "/product?category=Boom Barrier" },
        { label: "Fire Alarm System", path: "/product?category=Fire Alarm System" },
      ]
    },
    {
      label: "Shop by Brands",
      type: "dropdown",
      items: [
        { label: "Secura", path: "/product?brand=Secura" },
        { label: "CP Plus", path: "/product?brand=CP Plus" },
      ]
    },
    {
      label: "Contact",
      path: "/contact",
      type: "link"
    },
  ];

  return (
    <div>
      <header>
        <div className="tp-header-area p-relative z-index-11">
          <div className="tp-header-main tp-header-sticky">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div
                  className="col-xl-4 col-lg-2 col-md-4 col-6"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="logo"
                    style={{
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <Link to="/" style={{ display: "inline-block" }}>
                      <img
                        src={Logo}
                        alt="logo"
                        style={{
                          width: "250px",
                          maxWidth: "100%",
                          height: "auto",
                          transition: "all 0.3s ease",
                        }}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                </div>



                {/* SEARCH - Updated with better routing */}
                <div className="col-xl-4 col-lg-7 d-none d-lg-block" ref={searchBoxRef}>
                  <div className="tp-header-search pl-70">
                    <form onSubmit={onSearchSubmit}>
                      <div className="tp-header-search-wrapper d-flex align-items-center" style={{ position: 'relative' }}>
                        <div className="tp-header-search-box">
                          <input
                            type="text"
                            placeholder="Search by Brand, Category, Type, Night Vision, Camera Type..."
                            value={searchTerm}
                            onChange={onSearchChange}
                            onFocus={() => searchTerm && setSearchOpen(true)}
                          />
                        </div>
                        <div className="tp-header-search-btn">
                          <button type="submit">
                            <i className="las la-search" style={{ color: '#fff', fontSize: '20px' }}></i>
                          </button>
                        </div>

                        {searchOpen && (
                          <div
                            className="search-dropdown"
                            style={{
                              position: 'absolute',
                              top: '100%',
                              left: 0,
                              right: 0,
                              background: '#fff',
                              border: '1px solid #eee',
                              borderTop: 'none',
                              zIndex: 1000,
                              maxHeight: 400,
                              overflowY: 'auto',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                              borderRadius: '0 0 8px 8px'
                            }}
                          >
                            {searchLoading ? (
                              <div style={{ padding: '12px 16px', color: '#666' }}>
                                <i className="las la-spinner la-spin" style={{ marginRight: '8px' }}></i>
                                Searching...
                              </div>
                            ) : searchTerm.trim().length < 2 ? (
                              <div style={{ padding: '12px 16px', color: '#666' }}>
                                Type at least 2 characters to search.
                              </div>
                            ) : searchResults.length === 0 ? (
                              <div style={{ padding: '12px 16px' }}>
                                No products found for "<strong>{searchTerm}</strong>".
                              </div>
                            ) : (
                              <>
                                {searchResults.map((p) => (
                                  <button
                                    key={p._id}
                                    type="button"
                                    onClick={() => handleSearchItemClick(p._id)}
                                    style={{
                                      display: 'flex',
                                      width: '100%',
                                      textAlign: 'left',
                                      padding: '12px 16px',
                                      borderBottom: '1px solid #f3f3f3',
                                      background: 'transparent',
                                      cursor: 'pointer',
                                      transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                  >
                                    <div style={{ flex: 1 }}>
                                      <div style={{ fontWeight: 600, color: '#333' }}>
                                        {p?.name || 'Unnamed Product'}
                                      </div>
                                      <div style={{ fontSize: 12, color: '#666', marginTop: '4px' }}>
                                        {p?.brand ? `${p.brand} • ` : ''}
                                        {p?.category || p?.productType || ''}
                                      </div>
                                    </div>
                                    <div style={{ marginLeft: 12, whiteSpace: 'nowrap', fontWeight: 600, color: '#007bff' }}>
                                      {typeof p?.newPrice === 'number' ? `₹${p.newPrice}` : 'Price N/A'}
                                    </div>
                                  </button>
                                ))}
                                {/* View All Results Button */}
                                <div style={{ padding: '12px 16px', borderTop: '1px solid #eee' }}>
                                  <button
                                    onClick={handleViewAllResults}
                                    style={{
                                      width: '100%',
                                      padding: '10px',
                                      background: '#007bff',
                                      color: 'white',
                                      border: 'none',
                                      borderRadius: '4px',
                                      cursor: 'pointer',
                                      fontWeight: '500',
                                      transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                                  >
                                    View All Results ({searchResults.length})
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>


                <div className="col-xl-2 col-lg-3 col-md-8 col-6">
                  <div className="tp-header-main-right d-flex align-items-center justify-content-center">
                    <div className="tp-header-action d-flex align-items-center">
                      <div className="tp-header-action-item">
                        <Link to={isLoggedIn() ? "/account" : "/login"} className="d-flex align-items-center">
                          <div className="tp-header-login-icon">
                            <i className="las la-user-circle"></i>
                          </div>
                        </Link>
                      </div>
                      <div className="tp-header-action-item d-none d-lg-block">
                        <Link to="/wishlist" className="tp-header-action-btn">
                          <i className="lar la-heart"></i>
                          <span className="tp-header-action-badge">{wishlistCountToShow}</span>
                        </Link>
                      </div>
                      <div className="tp-header-action-item" style={{ position: 'relative' }} ref={notificationRef}>
                        <button
                          type="button"
                          className="tp-header-action-btn"
                          onClick={() => setShowNotifications(!showNotifications)}
                        >
                          <i className="las la-bell"></i>
                          {unreadCount > 0 && <span className="tp-header-action-badge" style={{ backgroundColor: '#EF4444' }}>{unreadCount}</span>}
                        </button>

                        {showNotifications && (
                          <div
                            className="notification-dropdown"
                            style={{
                              position: 'absolute',
                              top: '120%',
                              right: 0,
                              width: '320px',
                              background: '#fff',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                              borderRadius: '8px',
                              zIndex: 1001,
                              overflow: 'hidden'
                            }}
                          >
                            <div style={{ padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <h6 style={{ margin: 0, fontWeight: 700 }}>Notifications</h6>
                              {unreadCount > 0 && (
                                <button
                                  onClick={handleMarkAllAsRead}
                                  style={{ background: 'none', border: 'none', color: '#2563EB', fontSize: '12px', cursor: 'pointer', padding: 0 }}
                                >
                                  Mark all as read
                                </button>
                              )}
                            </div>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                              {notifications.length === 0 ? (
                                <div style={{ padding: '30px 15px', textAlign: 'center', color: '#6B7280' }}>
                                  <i className="las la-bell-slash" style={{ fontSize: '32px', marginBottom: '10px', display: 'block' }}></i>
                                  No notifications yet
                                </div>
                              ) : (
                                notifications.map((n) => (
                                  <div
                                    key={n._id}
                                    onClick={() => {
                                      if (!n.isRead) handleMarkAsRead(n._id);
                                      if (n.link) navigate(n.link);
                                      setShowNotifications(false);
                                    }}
                                    style={{
                                      padding: '12px 15px',
                                      borderBottom: '1px solid #f3f4f6',
                                      backgroundColor: n.isRead ? 'transparent' : '#F3F4F6',
                                      cursor: 'pointer',
                                      transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = n.isRead ? '#f9fafb' : '#e5e7eb'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = n.isRead ? 'transparent' : '#F3F4F6'}
                                  >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                      <span style={{ fontWeight: 600, fontSize: '14px', color: '#111827' }}>{n.title}</span>
                                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{new Date(n.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '13px', color: '#4B5563', lineHeight: '1.4' }}>{n.message}</p>
                                  </div>
                                ))
                              )}
                            </div>
                            <div style={{ padding: '10px', textAlign: 'center', borderTop: '1px solid #eee' }}>
                              <Link to="/notifications" onClick={() => setShowNotifications(false)} style={{ fontSize: '13px', color: '#2563EB', textDecoration: 'none' }}>View all notifications</Link>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="tp-header-action-item">
                        <button
                          type="button"
                          className="tp-header-action-btn cartmini-open-btn"
                          onClick={toggleCart}
                        >
                          <i className="las la-shopping-cart"></i>
                          <span className="tp-header-action-badge">{cartCountToShow}</span>
                        </button>
                      </div>
                      <div className="tp-header-action-item d-lg-none">
                        <button
                          type="button"
                          className="tp-header-action-btn tp-offcanvas-open-btn"
                          onClick={toggleMenu}
                        >
                          <i className="las la-bars"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-2 col-lg-3 col-md-8 col-6 d-none">
                  <div className="tp-header-contact d-flex align-items-center">
                    <div className="tp-header-contact-icon">
                      <span>
                        <img src={Call} alt="Call Ringing" style={{ width: '35px' }} />
                      </span>
                    </div>
                    <div className="tp-header-contact-content">
                      <h5>Help Line:</h5>
                      <p><a href="tel:402-763-282-46">+(402) 763 282 46</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Header bottom section - Desktop only */}
          <div className="tp-header-bottom tp-header-bottom-border d-none d-lg-block">
            <div className="container-fluid">
              <div className="tp-mega-menu-wrapper p-relative">
                <div className="row align-items-center">
                  <div className="col-xl-12 col-lg-6" style={{ justifyItems: 'center' }}>
                    <div className="main-menu menu-style-1">
                      <nav className="tp-main-menu-content">
                        <ul>
                          <li className="has-dropdown has-mega-menu"><Link to="/">Home</Link></li>
                          <li className="has-dropdown">
                            <a href="#">Surveillance <i className="las la-angle-down"></i></a>
                            <ul className="tp-submenu">
                              <li><Link to="/product?category=CCTV Camera">CCTV Camera</Link></li>
                              <li><Link to="/product?category=HD Camera">HD Camera</Link></li>
                              <li><Link to="/product?category=IP Camera">IP Camera</Link></li>
                              <li><Link to="/product?category=PTZ Camera">PTZ Camera</Link></li>
                              <li><Link to="/product?category=Wifi Camera">Wifi Camera</Link></li>
                              <li><Link to="/product?category=4G Camera">4G Camera</Link></li>
                              <li><Link to="/product?category=Recorders">Recorders</Link></li>
                              <li><Link to="/product?category=DVR">DVR</Link></li>
                              <li><Link to="/product?category=NVR">NVR</Link></li>
                            </ul>
                          </li>
                          <li className="has-dropdown has-mega-menu"><Link to="/shop">New Products</Link></li>
                          <li><Link to="/coupon">LED</Link></li>
                          <li className="has-dropdown">
                            <Link to="/product?category=Accessories">Accessories <i className="las la-angle-down"></i></Link>
                            <ul className="tp-submenu">
                              <li><Link to="/product?category=Cables">Cables</Link></li>
                              <li><Link to="/product?category=Networking">Networking</Link></li>
                            </ul>
                          </li>
                          <li className="has-dropdown">
                            <Link to="/product?category=Access Control">Access Control <i className="las la-angle-down"></i></Link>
                            <ul className="tp-submenu">
                              <li><Link to="/product?category=Biometric">Biometric</Link></li>
                              <li><Link to="/product?category=Video DOP">Video DOP</Link></li>
                            </ul>
                          </li>
                          <li className="has-dropdown">
                            <Link to="/product?category=Security products">Security Products <i className="las la-angle-down"></i></Link>
                            <ul className="tp-submenu">
                              <li><Link to="/product?category=Boom Barrier">Boom Barrier</Link></li>
                              <li><Link to="/product?category=Fire Alarm System">Fire Alarm System</Link></li>
                            </ul>
                          </li>
                          <li className="has-dropdown">
                            <Link to="/product?category=Brand">Shop by Brands <i className="las la-angle-down"></i></Link>
                            <ul className="tp-submenu">
                              <li><Link to="/product?brand=Secura">Secura</Link></li>
                              <li><Link to="/product?brand=CP Plus">CP Plus</Link></li>
                            </ul>
                          </li>
                          <li><Link to="/contact">Contact</Link></li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="mobile-menu-overlay"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 9998,
            }}
            onClick={closeMobileMenu}
          />
        )}

        {/* Mobile Menu Sidebar */}
        <div
          ref={mobileMenuRef}
          className="mobile-menu-sidebar"
          style={{
            position: 'fixed',
            top: 0,
            right: isMenuOpen ? 0 : '-100%',
            width: '85%',
            maxWidth: '400px',
            height: '100%',
            backgroundColor: '#fff',
            zIndex: 9999,
            transition: 'right 0.3s ease-in-out',
            boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header with Close Button */}
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #eee',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f8f9fa'
          }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>Menu</h3>
            <button
              onClick={closeMobileMenu}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#333',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>

          {/* User Info */}
          <div style={{
            padding: '15px 20px',
            borderBottom: '1px solid #eee',
            backgroundColor: '#fff'
          }}>
            {isLoggedIn() ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500' }}>Welcome!</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link
                    to="/profile"
                    style={{
                      color: '#007bff',
                      textDecoration: 'none',
                      fontSize: '14px'
                    }}
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#dc3545',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                style={{
                  color: '#007bff',
                  textDecoration: 'none',
                  fontWeight: '500',
                  display: 'block',
                  textAlign: 'center'
                }}
                onClick={closeMobileMenu}
              >
                Login / Register
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <nav style={{ flex: 1, overflowY: 'auto' }}>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              backgroundColor: '#fff'
            }}>
              {mobileMenuItems.map((item, index) => (
                <li key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  {item.type === 'link' ? (
                    <Link
                      to={item.path}
                      onClick={closeMobileMenu}
                      style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: '#333',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '15px 20px',
                          background: 'none',
                          border: 'none',
                          color: '#333',
                          fontSize: '16px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        <span>{item.label}</span>
                        <i
                          className={`las la-angle-${activeDropdown === item.label ? 'up' : 'down'}`}
                          style={{ transition: 'transform 0.2s' }}
                        ></i>
                      </button>

                      {activeDropdown === item.label && (
                        <ul style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          backgroundColor: '#f8f9fa',
                          borderTop: '1px solid #e9ecef'
                        }}>
                          {item.items.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.path}
                                onClick={closeMobileMenu}
                                style={{
                                  display: 'block',
                                  padding: '12px 20px 12px 35px',
                                  color: '#666',
                                  textDecoration: 'none',
                                  fontSize: '14px',
                                  borderBottom: '1px solid #e9ecef',
                                  transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#e9ecef'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Actions Footer */}
          <div style={{
            padding: '20px',
            borderTop: '1px solid #eee',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            <Link
              to="/wishlist"
              onClick={closeMobileMenu}
              style={{
                color: '#333',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '12px'
              }}
            >
              <i className="lar la-heart" style={{ fontSize: '20px', marginBottom: '5px' }}></i>
              Wishlist
              <span style={{
                background: '#dc3545',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                marginTop: '2px'
              }}>
                {wishlistCountToShow}
              </span>
            </Link>

            <Link
              to="/cart"
              onClick={closeMobileMenu}
              style={{
                color: '#333',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '12px'
              }}
            >
              <i className="las la-shopping-cart" style={{ fontSize: '20px', marginBottom: '5px' }}></i>
              Cart
              <span style={{
                background: '#007bff',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                marginTop: '2px'
              }}>
                {cartCountToShow}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Cart Dialog Component */}
      <CartDialog
        cart={cart}
        isCartOpen={isCartOpen}
        toggleCart={toggleCart}
        handleRemoveItem={handleRemoveItem}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        calculateTotal={calculateTotal}
      />
    </div>
  );
}

export default Navbar;
