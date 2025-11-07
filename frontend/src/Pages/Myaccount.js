import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { WishlistContext } from '../Components/WishlistContext';

const API_BASE = 'https://cctvshoppee.onrender.com/api';

function MyAccount() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [counts, setCounts] = useState({
    orders: 0,
    superCoins: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 👉 Consume global wishlist count from context (kept in sync by Wishlist page & Navbar)
  const { wishlistCount, updateWishlistCount } = useContext(WishlistContext);

  // --- helpers
  const safeLen = (maybeArr) => (Array.isArray(maybeArr) ? maybeArr.length : 0);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') {
      navigate('/login');
      return null;
    }

    try {
      const response = await axios.get(`${API_BASE}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.success) {
        return response.data.data; // user object
      } else {
        console.error('No user data received or request failed:', response.data);
        setError('Failed to load user data. Please try again later.');
        navigate('/login');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      setError('An error occurred while fetching user data. Please try again later.');
      navigate('/login');
      return null;
    }
  };

  const fetchOrdersCount = async () => {
    const token = localStorage.getItem('token');
    if (!token) return 0;

    // Try primary endpoint
    try {
      const res = await axios.get(`${API_BASE}/orders/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(res.data)) return res.data.length;
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data.length;
      if (typeof res.data?.count === 'number') return res.data.count;
    } catch (_) {}

    // Fallback endpoint
    try {
      const res = await axios.get(`${API_BASE}/orders?me=true`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(res.data)) return res.data.length;
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data.length;
      if (typeof res.data?.count === 'number') return res.data.count;
    } catch (_) {}

    return 0;
  };

  // 👉 Hydrate wishlist count if context was not yet set (page refresh, deep link, etc.)
  const hydrateWishlistCount = async (freshUser) => {
    // 1) localStorage quick win
    try {
      const ls = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (Array.isArray(ls) && ls.length >= 0) {
        updateWishlistCount(ls.length);
        // We still continue to API to be fully accurate.
      }
    } catch (_) {}

    // 2) API (use the SAME shape as your Wishlist page: /wishlist/:userId)
    const token = localStorage.getItem('token');
    if (!token || !freshUser?._id) return;

    try {
      const res = await axios.get(`${API_BASE}/wishlist/${freshUser._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Handle common shapes
      let count = 0;
      const d = res?.data;

      if (Array.isArray(d)) count = d.length;
      else if (Array.isArray(d?.data)) count = d.data.length;
      else if (Array.isArray(d?.items)) count = d.items.length;
      else if (Array.isArray(d?.wishlist)) count = d.wishlist.length;
      else if (typeof d?.count === 'number') count = d.count;

      updateWishlistCount(count);
    } catch (e) {
      // silent fallback — context/localStorage value remains
    }
  };

  const hydrateCounts = async (freshUser) => {
    // Fetch orders count; wishlist comes from context hydration
    const ordersCount = await fetchOrdersCount();

    setCounts({
      orders: ordersCount ?? 0,
      superCoins: Number(freshUser?.superCoins) || 0,
    });

    // If context is empty or zero but you expect items, hydrate from LS/API:
    if (wishlistCount === 0) {
      await hydrateWishlistCount(freshUser);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const u = await fetchUserData();
      if (u) {
        setUser(u);
        await hydrateCounts(u);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <main style={{ textAlign: 'center', padding: '100px' }}>
          <h2>Loading your account...</h2>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <main style={{ textAlign: 'center', padding: '100px' }}>
          <h2>{error}</h2>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div>
      <Navbar />
      <main>
        <section className="profile__area pt-120 pb-120">
          <div className="container">
            <div className="profile__inner p-relative">
              <div className="profile__shape"></div>
              <div className="row">
                <div className="col-xxl-12 col-lg-8">
                  <div className="profile__tab-content">
                    <div className="tab-content" id="profile-tabContent">
                      <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <div className="profile__main">
                          <div className="profile__main-top pb-80">
                            <div className="row align-items-center">
                              <div className="col-md-6">
                                <div className="profile__main-inner d-flex flex-wrap align-items-center">
                                  <div className="profile__main-content">
                                    <h4 className="profile__main-title">Welcome {user.name || 'User'}!</h4>
                                    <p>You have <span>08</span> notifications</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="profile__main-logout text-sm-end">
                                  <button onClick={handleLogout} className="tp-logout-btn">Logout</button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="profile__main-info">
                            <div className="row gx-3" style={{ justifyContent: 'center' }}>
                              {/* Orders */}
                              <div className="col-md-3 col-sm-6">
                                <div className="profile__main-info-item" onClick={() => handleNavigation('/orders')}>
                                  <div className="profile__main-info-icon">
                                    <span>
                                      <span className="profile-icon-count profile-order">{counts.orders}</span>
                                      <i className="las la-cube" style={{ fontSize: '50px' }}></i>
                                    </span>
                                  </div>
                                  <h4 className="profile__main-info-title">Orders</h4>
                                </div>
                              </div>

                              {/* Wishlist (reads from Context so it matches Wishlist page exactly) */}
                              <div className="col-md-3 col-sm-6">
                                <div className="profile__main-info-item" onClick={() => handleNavigation('/wishlist')}>
                                  <div className="profile__main-info-icon">
                                    <span>
                                      <span className="profile-icon-count profile-wishlist">
                                        {Number(wishlistCount) || 0}
                                      </span>
                                      <i className="las la-heart" style={{ fontSize: '50px' }}></i>
                                    </span>
                                  </div>
                                  <h4 className="profile__main-info-title">Wishlist</h4>
                                </div>
                              </div>

                              {/* Super Coin */}
                              <div className="col-md-3 col-sm-6">
                                <div className="profile__main-info-item" onClick={() => handleNavigation('/supercoinzone')}>
                                  <div className="profile__main-info-icon">
                                    <span>
                                      <span className="profile-icon-count profile-supercoin">{counts.superCoins}</span>
                                      <i className="las la-gift" style={{ fontSize: '50px' }}></i>
                                    </span>
                                  </div>
                                  <h4 className="profile__main-info-title">Super Coin</h4>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* (Optional) profile image upload kept out for brevity */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right side column placeholder if needed */}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default MyAccount;
