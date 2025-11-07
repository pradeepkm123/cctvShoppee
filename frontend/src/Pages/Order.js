import React, { useEffect, useMemo, useState } from 'react';
import './Orders.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import OrderFilter from '../Components/OrderFilter';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Order() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoriesById, setCategoriesById] = useState({});
  const [filters, setFilters] = useState({
    status: {
      onTheWay: false,
      delivered: false,
      cancelled: false,
      returnRequested: false,
    },
    time: {
      last30days: false,
      year2024: false,
      year2023: false,
      year2022: false,
      year2021: false,
      older: false,
    },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Helper: Get CSS class for status badge
  const getStatusClass = (status) => {
    const normalizedStatus = normalizeStatus(status);
    if (normalizedStatus.includes('delivered') || normalizedStatus.includes('completed')) {
      return 'status-completed';
    } else if (normalizedStatus.includes('created') || normalizedStatus.includes('on_the_way') || normalizedStatus.includes('ontheway')) {
      return 'status-created';
    } else if (normalizedStatus.includes('cancelled') || normalizedStatus.includes('canceled')) {
      return 'status-cancelled';
    }
    return 'status-default';
  };

  // Helper: Normalize status string
  const normalizeStatus = (s = '') => s.toString().toLowerCase().replace(/\s+/g, '');

  // Helper: Map status keys to possible values
  const statusKeyToValue = {
    onTheWay: ['ontheway', 'onway', 'on_the_way', 'arriving', 'shipped'],
    delivered: ['delivered', 'completed'],
    cancelled: ['cancelled', 'canceled'],
    returned: ['returned', 'refund', 'refunded'],
  };

  // Helper: Check if order is within last 30 days
  const isWithinLast30Days = (isoDate) => {
    const orderDate = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - orderDate.getTime();
    const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
    return diffMs >= 0 && diffMs <= THIRTY_DAYS_MS;
  };

  // Helper: Get year from ISO date
  const getYear = (isoDate) => new Date(isoDate).getFullYear();

  // Helper: Resolve category name
  const resolveCategoryName = (product) => {
    const cat = product?.category ?? product?.categoryName;
    if (!cat) return '';
    if (typeof cat === 'string') {
      if (categoriesById[cat]) return categoriesById[cat];
      return cat;
    }
    if (typeof cat === 'object') {
      if (cat.name) return String(cat.name);
      if (cat._id && categoriesById[cat._id]) return categoriesById[cat._id];
    }
    return '';
  };

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token || token === 'undefined') {
        console.warn('No token found. Redirecting to login.');
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get('https://cctvshoppee.onrender.com/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(Array.isArray(response.data) ? response.data : []);
        setFilteredOrders(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error fetching orders:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.message || 'Failed to fetch orders');
      }
    };
    fetchOrders();
  }, [navigate]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://cctvshoppee.onrender.com/api/categories');
        const map = {};
        (res.data || []).forEach((c) => {
          if (c && c._id) map[c._id] = c.name || c.title || 'Unknown';
        });
        setCategoriesById(map);
      } catch (e) {
        console.warn('Failed to fetch categories:', e?.response?.data || e.message);
      }
    };
    fetchCategories();
  }, []);

  // Toggle filters
  const toggleFilters = () => setShowFilters((s) => !s);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { id, checked } = e.target;
    setFilters((prev) => {
      const next = { ...prev, status: { ...prev.status }, time: { ...prev.time } };
      if (id in next.status) next.status[id] = checked;
      else if (id in next.time) next.time[id] = checked;
      return next;
    });
  };

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim().toLowerCase()), 350);
    return () => clearTimeout(t);
  }, [search]);

  // Filter orders
  const visibleOrders = useMemo(() => {
    let result = [...orders];

    // Status filters
    const selectedStatusKeys = Object.entries(filters.status)
      .filter(([, checked]) => checked)
      .map(([key]) => key);
    if (selectedStatusKeys.length > 0) {
      result = result.filter((order) => {
        const norm = normalizeStatus(order.status);
        return selectedStatusKeys.some((key) =>
          statusKeyToValue[key]?.some((needle) => norm.includes(needle))
        );
      });
    }

    // Time filters
    const t = filters.time;
    if (t.last30days || t.year2024 || t.year2023 || t.year2022 || t.year2021 || t.older) {
      result = result.filter((order) => {
        const y = getYear(order.createdAt);
        const chosen = [];
        if (t.last30days) chosen.push(isWithinLast30Days(order.createdAt));
        if (t.year2024) chosen.push(y === 2024);
        if (t.year2023) chosen.push(y === 2023);
        if (t.year2022) chosen.push(y === 2022);
        if (t.year2021) chosen.push(y === 2021);
        if (t.older) chosen.push(y < 2021);
        return chosen.length === 0 || chosen.some(Boolean);
      });
    }

    // Search
    if (debouncedSearch) {
      result = result
        .map((order) => {
          const statusStr = (order.status || '').toString().toLowerCase();
          const statusMatches = statusStr.includes(debouncedSearch);
          const matchedItems = (order.items || []).filter((it) => {
            const p = it.productId || {};
            const name = (p.name || '').toString().toLowerCase();
            const brand = (p.brand?.name || p.brand || '').toString().toLowerCase();
            const categoryName = resolveCategoryName(p).toLowerCase();
            return (
              name.includes(debouncedSearch) ||
              brand.includes(debouncedSearch) ||
              categoryName.includes(debouncedSearch)
            );
          });
          if (statusMatches || matchedItems.length > 0) {
            return {
              ...order,
              items: statusMatches && matchedItems.length === 0 ? order.items : matchedItems,
            };
          }
          return null;
        })
        .filter(Boolean);
    }

    return result;
  }, [orders, filters, debouncedSearch, categoriesById]);

  // Update filtered orders
  useEffect(() => {
    setFilteredOrders(visibleOrders);
    setCurrentPage(1);
  }, [visibleOrders]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentItems = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle order click
  const handleOrderClick = (orderId) => navigate(`/order_details/${orderId}`);

  // Helper: Resolve image URL
  const fileUrl = (img) => {
    if (!img) return '/no-image.png';
    const safe = String(img).replace(/\\/g, '/');
    return safe.startsWith('http') ? safe : `https://cctvshoppee.onrender.com/uploads/${safe.split('/').pop()}`;
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="breadcrumb-section">
          <nav className="breadcrumb-nav">
            <a href="#">Home</a>
            <a href="#">My Account</a>
            <span className="current">My Orders</span>
          </nav>
        </div>
        <button className="filter-toggle" onClick={toggleFilters}>
          <i className="fas fa-filter" /> Filters
        </button>
        <div className="main-container mb-3">
          {/* Left filter panel */}
          <div className="sidebar-area" style={{ display: showFilters ? 'block' : undefined }}>
            <OrderFilter filters={filters} onFilterChange={handleFilterChange} />
          </div>
          <div className="content-area">
            <div className="search-section">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by product, brand, category, or order status"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="search-button"
                  onClick={() => setDebouncedSearch(search.trim().toLowerCase())}
                  type="button"
                >
                  <i className="las la-search"></i>
                  Search Orders
                </button>
              </div>
            </div>
            <div className="orders-container">
              {error ? (
                <p style={{ color: 'red' }}>Error: {error}</p>
              ) : currentItems.length > 0 ? (
                currentItems.flatMap((order) =>
                  (order.items || []).map((item, index) => {
                    const p = item.productId || {};
                    const catName = resolveCategoryName(p);
                    const brandName = p?.brand?.name || p?.brand || '';
                    return (
                      <div
                        className="order-item"
                        key={`${order._id}-${index}`}
                        onClick={() => handleOrderClick(order._id)}
                      >
                        <div className="product-image">
                          <img
                            src={fileUrl(p?.image)}
                            alt={p?.name || 'Product'}
                            style={{ width: '60px', height: 'auto' }}
                            onError={(e) => (e.currentTarget.src = '/no-image.png')}
                          />
                        </div>
                        <div className="order-content">
                          <div className="product-details">
                            <div className="product-title">{p?.name || 'Unknown Product'}</div>
                            <div className="product-color">
                              {brandName && (
                                <span style={{ marginRight: 8 }}>
                                  <strong>Brand:</strong> {brandName}
                                </span>
                              )}
                              {catName && (
                                <span>
                                  <strong>Category:</strong> {catName}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="product-price">₹{item.price}</div>
                        <div className="order-status">
                          <div className={`status-badge ${getStatusClass(order.status)}`}>
                            <span className="status-dot"></span>
                            {order.status}
                          </div>
                          <div className="status-description">
                            {order.statusDescription || 'Your order has been placed.'}
                          </div>
                          <div className="order-date">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )
              ) : (
                <p>No orders found.</p>
              )}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-end">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li
                        key={i + 1}
                        className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Order;


