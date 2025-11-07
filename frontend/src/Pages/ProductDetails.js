import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import RelatedProduct from '../Components/RelatedProduct';
import '../Pages/ProductDetails.css';

const API_BASE = 'https://cctvshoppee.onrender.com/api';
const FILE_HOST = 'https://cctvshoppee.onrender.com';
const specUrl = 'https://cctvshoppee.onrender.com/api';
const VISIBLE_THUMBS = 5;

// ---- Helpers ----
const toAbsUrl = (u) => {
  if (!u) return '';
  const s = String(u).trim();
  if (/^https?:\/\//i.test(s)) return s;
  const clean = s.replace(/\\/g, '/').replace(/^\/?uploads\/?/i, 'uploads/');
  return `${FILE_HOST}/${clean.replace(/^\/+/, '')}`;
};

// ---- Custom Hooks ----
const useRatingStats = (reviews) => {
  return useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let sum = 0;
    reviews.forEach((r) => {
      const val = Math.min(5, Math.max(1, Number(r?.rating) || 0));
      counts[val] += 1;
      sum += val;
    });
    const total = reviews.length;
    const average = total ? sum / total : 0;
    let highestStar = 0;
    let highestCount = -1;
    for (let s = 1; s <= 5; s++) {
      if (counts[s] > highestCount || (counts[s] === highestCount && s > highestStar)) {
        highestCount = counts[s];
        highestStar = s;
      }
    }
    return { counts, total, average, highestStar };
  }, [reviews]);
};

const useProductMedia = (product) => {
  return useMemo(() => {
    if (!product) return { thumbs: [], activeMedia: null };
    const thumbs = [];
    if (product.media?.length) {
      product.media.forEach((m) => thumbs.push({ type: m.type, url: toAbsUrl(m.file) }));
    } else {
      (product.images || []).forEach((u) => thumbs.push({ type: 'image', url: toAbsUrl(u) }));
      (product.videos || []).forEach((u) => thumbs.push({ type: 'video', url: toAbsUrl(u) }));
    }
    const activeMedia = thumbs[0] || null;
    return { thumbs, activeMedia };
  }, [product]);
};

// ---- Sub-components ----
const MediaViewer = ({ activeMedia, mainVideoRef, productName }) => (
  <div className="tp-media-viewer">
    {activeMedia?.type === 'image' && (
      <img
        src={activeMedia.url}
        alt={productName}
        className="tp-media-main"
        draggable="false"
        loading="lazy"
      />
    )}
    {activeMedia?.type === 'video' && (
      <video
        className="tp-media-main"
        src={activeMedia.url}
        ref={mainVideoRef}
        controls
        preload="metadata"
        aria-label="Product video"
      />
    )}
  </div>
);

const ThumbnailRail = ({
  thumbs,
  activeMedia,
  onThumbClick,
  thumbStart,
  setThumbStart,
  VISIBLE_THUMBS,
}) => {
  const canMoveUp = thumbStart > 0;
  const canMoveDown = thumbs.length > VISIBLE_THUMBS && thumbStart < thumbs.length - VISIBLE_THUMBS;
  const moveUp = () => setThumbStart((s) => Math.max(0, s - 1));
  const moveDown = () => setThumbStart((s) => Math.min(Math.max(0, thumbs.length - VISIBLE_THUMBS), s + 1));

  return (
    <div className="tp-media-thumbs no-scroll">
      <button
        type="button"
        className="tp-thumb-nav tp-thumb-nav-up"
        onClick={moveUp}
        disabled={!canMoveUp}
        aria-label="Previous thumbnails"
        title="Up"
      >
        ▲
      </button>
      <div className="tp-thumb-window">
        {thumbs.slice(thumbStart, thumbStart + VISIBLE_THUMBS).map((m, i) => {
          const idx = thumbStart + i;
          const isActive = activeMedia?.url === m.url;
          return (
            <button
              key={`${m.type}-${idx}`}
              className={`tp-thumb ${isActive ? 'active' : ''}`}
              onClick={() => onThumbClick(m)}
              title={m.type === 'image' ? 'Image' : 'Video'}
              type="button"
              aria-label={m.type === 'image' ? 'Image thumbnail' : 'Video thumbnail'}
            >
              {m.type === 'image' ? (
                <img src={m.url} alt={`thumb-${idx}`} loading="lazy" />
              ) : (
                <div className="tp-thumb-video">
                  <video src={m.url} muted aria-label="Video thumbnail" />
                  <span className="tp-thumb-badge" aria-hidden="true">▶</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="tp-thumb-nav tp-thumb-nav-down"
        onClick={moveDown}
        disabled={!canMoveDown}
        aria-label="Next thumbnails"
        title="Down"
      >
        ▼
      </button>
    </div>
  );
};

const RatingBreakdown = ({ ratingStats }) => {
  const percent = (count, total) => (total ? Math.round((count / total) * 100) : 0);
  return (
    <div className="rating-breakdown">
      {[5, 4, 3, 2, 1].map((star) => {
        const c = ratingStats.counts[star] || 0;
        const p = percent(c, ratingStats.total);
        return (
          <div key={star} className="breakdown-row" style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
            <div style={{ width: 40, textAlign: 'right' }}>{star}★</div>
            <div className="bar-wrap" style={{ flex: 1, height: 10, background: '#eee', borderRadius: 999 }}>
              <div
                className="bar"
                style={{
                  width: `${p}%`,
                  height: '100%',
                  borderRadius: 999,
                  background: '#f59e0b',
                }}
                aria-label={`${p}% of users rated ${star} stars`}
              />
            </div>
            <div style={{ width: 40, textAlign: 'left' }}>{c}</div>
          </div>
        );
      })}
    </div>
  );
};

const ReviewForm = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div className="tp-product-details-review-form-rating align-items-center">
      <p>Your Rating:</p>
      <div className="tp-product-details-review-form-rating-icon align-items-center">
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          placeholder="Enter your rating here!"
          required
          aria-label="Your rating"
        />
      </div>
    </div>
    <div className="tp-product-details-review-input-wrapper">
      <div className="tp-product-details-review-input-box">
        <div className="tp-product-details-review-input">
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Your Name"
            required
            aria-label="Your name"
          />
        </div>
        <div className="tp-product-details-review-input-title">
          <label htmlFor="name">Your Name</label>
        </div>
      </div>
      <div className="tp-product-details-review-input-box">
        <div className="tp-product-details-review-input">
          <textarea
            id="comment"
            name="comment"
            placeholder="Write your review here..."
            required
            aria-label="Your review"
          ></textarea>
        </div>
        <div className="tp-product-details-review-input-title">
          <label htmlFor="comment">Your comment</label>
        </div>
      </div>
    </div>
    <div className="tp-product-details-review-btn-wrapper">
      <button type="submit" className="tp-product-details-review-btn" aria-label="Submit review">
        <i className="las la-check"></i> Submit
      </button>
    </div>
  </form>
);

const LoginDialog = ({ show, onClose, onLogin, action }) => (
  show ? (
    <div className="login-dialog-overlay" role="dialog" aria-modal="true">
      <div className="login-dialog" role="document">
        <button className="login-dialog-close" onClick={onClose} aria-label="Close dialog">
          &times;
        </button>
        <h3>Please Log In</h3>
        <p>
          You need to log in to {action === 'cart' ? 'add this product to your cart.' : 'add this product to your wishlist.'}
        </p>
        <div className="dialog-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onLogin}>Log In</button>
        </div>
      </div>
    </div>
  ) : null
);

// ---- Main Component ----
export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(null);
  const [activeMedia, setActiveMedia] = useState(null);
  const [thumbStart, setThumbStart] = useState(0);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const mainVideoRef = useRef(null);

  const { thumbs } = useProductMedia(product);
  const ratingStats = useRatingStats(reviews);

  // Fetch product and reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));
            setUserId(payload.userId);
            localStorage.setItem('userId', payload.userId);
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
        const [productRes, reviewsRes] = await Promise.all([
          axios.get(`${API_BASE}/products/${id}`),
          axios.get(`${API_BASE}/reviews/${id}`),
        ]);
        setProduct(productRes.data);
        setReviews(Array.isArray(reviewsRes.data) ? reviewsRes.data : []);
        if (productRes.data) {
          const firstMedia =
            (productRes.data.media && productRes.data.media[0]) ||
            (productRes.data.images && { type: 'image', file: productRes.data.images[0] }) ||
            (productRes.data.videos && { type: 'video', file: productRes.data.videos[0] }) ||
            null;
          if (firstMedia) {
            const url = toAbsUrl(firstMedia.file || firstMedia);
            const typeGuess =
              firstMedia.type || (productRes.data.images?.some((x) => toAbsUrl(x) === url) ? 'image' : 'video');
            setActiveMedia({ type: typeGuess, url });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.response?.data?.message || 'Failed to load product details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Auto-play video
  useEffect(() => {
    if (activeMedia?.type === 'video' && mainVideoRef.current) {
      const timer = setTimeout(() => {
        try {
          mainVideoRef.current.play().catch(() => {});
        } catch (e) {
          console.error('Error playing video:', e);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeMedia]);

  // Handlers
  const isLoggedIn = () => localStorage.getItem('token') !== null;
  const handleQuantityChange = (e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1));
  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));
  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      setDialogAction('cart');
      setShowLoginDialog(true);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_BASE}/cart/add`,
        { productId: id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Product added to cart!');
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.response?.data?.message || 'Failed to add product to cart.');
    }
  };
  const handleBuyNow = () => {
    if (!isLoggedIn()) {
      toast.error('You need to login to buy products.');
      navigate('/login');
      return;
    }
    const productWithQuantity = { ...product, quantity };
    localStorage.setItem('buyNow', JSON.stringify([productWithQuantity]));
    navigate('/checkout');
  };
  const handleAddToWishlist = async () => {
    if (!isLoggedIn()) {
      setDialogAction('wishlist');
      setShowLoginDialog(true);
      return;
    }
    try {
      const { data } = await axios.post(`${API_BASE}/wishlist/add`, {
        userId,
        productId: id,
      });
      if (data.message === 'Product added to wishlist') toast.success('Product added to wishlist!');
      else if (data.message === 'Product already in wishlist') toast.info('Product is already in the wishlist!');
      else toast.error('Unexpected response from server.');
      navigate('/wishlist');
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      toast.error(error.response?.data?.message || 'Failed to add product to wishlist.');
    }
  };
  const handleCompare = () => navigate('/compare');
  const handleShareOnWhatsApp = (e) => {
    e.preventDefault();
    const productUrl = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this product: ${productUrl}`)}`, '_blank');
  };
  const handleShareOnYouTube = (e) => {
    e.preventDefault();
    const productUrl = window.location.href;
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(`Check out this product: ${productUrl}`)}`, '_blank');
  };
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const { name, rating, comment } = e.target.elements;
    try {
      const response = await axios.post(`${API_BASE}/reviews`, {
        productId: id,
        name: name.value,
        rating: parseInt(rating.value, 10),
        comment: comment.value,
      });
      if (response.status === 201) {
        toast.success('Review submitted successfully!');
        setReviews((prev) => [...prev, response.data]);
        e.target.reset();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error.response?.data?.message || 'Failed to submit review.');
    }
  };

  // Modal handlers
  const handleDialogClose = () => {
    setShowLoginDialog(false);
    setDialogAction(null);
  };
  const handleDialogLogin = () => {
    setShowLoginDialog(false);
    navigate('/login');
  };

  // Render
  if (isLoading) return <div className="skeleton-loader">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div>No product found.</div>;

  const displayCategory = product.category
    ? (typeof product.category === 'string' ? product.category.toUpperCase() : product.category?.name?.toUpperCase())
    : 'DEFAULT CATEGORY';
  const specUrl = product.specification ? toAbsUrl(product.specification) : null;
  const brochureUrl = product.brochure ? toAbsUrl(product.brochure) : null;

  return (
    <div>
      <Navbar />
      <main>
        {/* Breadcrumb */}
        <section className="breadcrumb__area breadcrumb__style-2 include-bg pt-50 pb-20">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="breadcrumb__content p-relative z-index-1">
                  <div className="breadcrumb__list has-icon">
                    <span className="breadcrumb-icon"><i className="las la-home"></i></span>
                    <span><a href="/">Home</a></span>
                    <span><a href="#!">{displayCategory}</a></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product top */}
        <section className="tp-product-details-area">
          <div className="tp-product-details-top pb-40">
            <div className="container">
              <div className="row">
                {/* LEFT: Thumbs + Viewer */}
                <div className="col-xl-7 col-lg-6">
                  <div className="tp-media-wrapper">
                    <ThumbnailRail
                      thumbs={thumbs}
                      activeMedia={activeMedia}
                      onThumbClick={setActiveMedia}
                      thumbStart={thumbStart}
                      setThumbStart={setThumbStart}
                      VISIBLE_THUMBS={VISIBLE_THUMBS}
                    />
                    <MediaViewer activeMedia={activeMedia} mainVideoRef={mainVideoRef} productName={product.name} />
                  </div>
                </div>

                {/* RIGHT: Details */}
                <div className="col-xl-5 col-lg-6">
                  <div className="tp-product-details-wrapper">
                    <div className="tp-product-details-category">
                      <span>{displayCategory}</span>
                    </div>
                    <h3 className="tp-product-details-title">{product.name}</h3>
                    <div className="tp-product-details-inventory d-flex align-items-center mb-10">
                      <div className="tp-product-details-stock mb-10">
                        <span className={`inline-flex px-2 text-xs font-medium leading-5 rounded-full ${product.stock > 0 ? 'text-emerald-600 bg-emerald-100' : 'text-red-600 bg-red-100'}`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <div className="tp-product-details-rating-wrapper d-flex align-items-center mb-10" style={{ gap: 10, marginLeft: 12 }}>
                        <div className="tp-product-details-rating" title={`Most common rating: ${ratingStats.highestStar}★`}>
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i} aria-hidden="true">
                              {i < ratingStats.highestStar ? '★' : '☆'}
                            </span>
                          ))}
                        </div>
                        <div className="tp-product-details-reviews">
                          <span>({ratingStats.total} Reviews)</span>
                        </div>
                      </div>
                    </div>
                    <p>{product.description}</p>
                    <div className="tp-product-details-price-wrapper mb-20">
                      {product.newPrice != null && (
                        <span className="tp-product-details-price new-price">₹ {Number(product.newPrice).toLocaleString('en-IN')}</span>
                      )}
                      {product.oldPrice != null && (
                        <span className="tp-product-details-price old-price">₹ {Number(product.oldPrice).toLocaleString('en-IN')}</span>
                      )}
                      {product.offers && (
                        <span className="product-offers">
                          <i className="las la-gift"></i> {product.offers} offer
                        </span>
                      )}
                    </div>
                    <div className="tp-product-details-action-wrapper">
                      <h3 className="tp-product-details-action-title">Quantity</h3>
                      <div className="qty-box">
                        <button onClick={handleDecrement} type="button" aria-label="Decrease quantity">−</button>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={handleQuantityChange}
                          aria-label="Product quantity"
                        />
                        <button onClick={handleIncrement} type="button" aria-label="Increase quantity">+</button>
                      </div>
                      <div className="tp-product-details-action-item-wrapper d-flex align-items-center">
                        <div className="tp-product-details-add-to-cart mb-15 w-100">
                          <button className="tp-product-details-add-to-cart-btn w-100" onClick={handleAddToCart} type="button" aria-label="Add to cart">
                            <i className="las la-shopping-cart" style={{ fontSize: '20px' }}></i> Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="tp-product-details-action-sm">
                      <button type="button" className="tp-product-details-action-sm-btn" onClick={handleAddToWishlist} aria-label="Add to wishlist">
                        <i className="las la-heart"></i> Add to Wishlist
                      </button>
                      <button type="button" className="tp-product-details-action-sm-btn" aria-label="Ask a question">
                        <i className="las la-question-circle"></i> Ask a question
                      </button>
                    </div>
                    <div className="tp-product-details-query">
                      <div className="tp-product-details-query-item d-flex align-items-center">
                        <span>Product SKU: {product.sku}</span>
                      </div>
                      <div className="tp-product-details-query-item d-flex align-items-center">
                        <span>Category: {displayCategory}</span>
                      </div>
                    </div>
                    <div className="tp-product-details-social">
                      <span>Share: </span>
                      <a href="#!" onClick={handleShareOnWhatsApp} aria-label="Share on WhatsApp">
                        <i className="lab la-whatsapp" style={{ fontSize: '25px', color: 'green' }}></i>
                      </a>
                      <a href="#!" onClick={handleShareOnYouTube} aria-label="Share on YouTube">
                        <i className="lab la-youtube" style={{ fontSize: '25px', color: '#c50000' }}></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Tabs */}
        <section>
          <div className="tp-product-details-bottom pb-80">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="tp-product-details-tab-nav tp-tab">
                    <nav>
                      <div className="nav nav-tabs justify-content-center p-relative tp-product-tab" id="navPresentationTab" role="tablist">
                        <button className="nav-link" id="nav-description-tab" data-bs-toggle="tab" data-bs-target="#nav-description" type="button" role="tab" aria-controls="nav-description" aria-selected="false">Download Brochure</button>
                        <button className="nav-link active" id="nav-addInfo-tab" data-bs-toggle="tab" data-bs-target="#nav-addInfo" type="button" role="tab" aria-controls="nav-addInfo" aria-selected="true">Specifications</button>
                        <button className="nav-link" id="nav-review-tab" data-bs-toggle="tab" data-bs-target="#nav-review" type="button" role="tab" aria-controls="nav-review" aria-selected="false">Reviews ({reviews.length})</button>
                        <span id="productTabMarker" className="tp-product-details-tab-line"></span>
                      </div>
                    </nav>
                    <div className="tab-content" id="navPresentationTabContent">
                      {/* Download Brochure */}
                      <div className="tab-pane fade" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab">
                        <div className="tp-product-details-desc-wrapper pt-80">
                          <div className="row justify-content-center">
                            <div className="col-xl-10 brochure-box">
                              <div className="brochure-copy">
                                <h3>Discover More About Us</h3>
                                <p>Download our brochure to explore products, services, and pricing in detail.</p>
                              </div>
                              {brochureUrl ? (
                                <a target="_blank" href={brochureUrl} className="download-button-svg" rel="noreferrer" download aria-label="Download brochure">
                                  <svg className="download-svg" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                                  </svg>
                                  <span className="download-text">Download</span>
                                </a>
                              ) : (
                                <p className="muted">No brochure uploaded.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Specifications */}
                      <div className="tab-pane fade show active" id="nav-addInfo" role="tabpanel" aria-labelledby="nav-addInfo-tab">
                        <div className="tp-product-details-additional-info">
                          <div className="row justify-content-center">
                            <div className="col-xl-10">
                              {specUrl ? (
                                <div className="brochure-embed">
                                  <iframe
                                    src={`${specUrl}#toolbar=1`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 'none' }}
                                    title="Product Specification"
                                    aria-label="Product specification PDF"
                                  />
                                </div>
                              ) : (
                                <p className="muted">No specification PDF uploaded.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Reviews */}
                      <div className="tab-pane fade" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab">
                        <div className="tp-product-details-review-wrapper pt-60">
                          <div className="row">
                            {/* LEFT: Stats + Breakdown */}
                            <div className="col-lg-6 review-left">
                              <div className="tp-product-details-review-statics">
                                <h3 className="tp-product-details-review-title">Rating &amp; Review</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                                  <div style={{ fontSize: 22, fontWeight: 600 }}>
                                    {ratingStats.total ? ratingStats.average.toFixed(1) : '0.0'}
                                  </div>
                                  <div style={{ fontSize: 18 }}>
                                    {Array.from({ length: 5 }, (_, i) => (
                                      <span key={i} aria-hidden="true">
                                        {i < Math.round(ratingStats.average) ? '★' : '☆'}
                                      </span>
                                    ))}
                                  </div>
                                  <div style={{ color: '#666' }}>({ratingStats.total} ratings)</div>
                                </div>
                                <RatingBreakdown ratingStats={ratingStats} />
                                <div style={{ marginTop: 8, color: '#444' }}>
                                  Most people rated: <strong>{ratingStats.highestStar}★</strong> ({ratingStats.counts[ratingStats.highestStar] || 0} votes)
                                </div>
                                <div className="tp-product-details-review-list pr-110 review-scroll" style={{ marginTop: 20, overflowY: 'scroll', height: '250px' }}>
                                  {reviews.map((review, index) => (
                                    <div key={index} className="tp-product-details-review-avater d-flex align-items-start review-item" style={{ marginBottom: '20px' }}>
                                      <div className="tp-product-details-review-avater-content">
                                        <div className="tp-product-details-review-avater-rating d-flex align-items-center">
                                          {Array.from({ length: 5 }, (_, i) => (
                                            <span key={i} aria-hidden="true">
                                              {i < review.rating ? '★' : '☆'}
                                            </span>
                                          ))}
                                        </div>
                                        <h3 className="tp-product-details-review-avater-title">{review.name}</h3>
                                        <span className="tp-product-details-review-avater-meta">
                                          {review.date ? new Date(review.date).toLocaleDateString() : ''}
                                        </span>
                                        <div className="tp-product-details-review-avater-comment">
                                          <p>{review.comment}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* RIGHT: Submit form */}
                            <div className="col-lg-6">
                              <div className="tp-product-details-review-form">
                                <h3 className="tp-product-details-review-form-title">Review this product</h3>
                                <ReviewForm onSubmit={handleSubmitReview} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related products */}
        <RelatedProduct productId={id} />
      </main>

      <Footer />

      {/* Login Dialog */}
      <LoginDialog
        show={showLoginDialog}
        onClose={handleDialogClose}
        onLogin={handleDialogLogin}
        action={dialogAction}
      />
    </div>
  );
}
