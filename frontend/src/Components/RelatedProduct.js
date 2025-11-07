// src/Components/RelatedProduct.jsx
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

// ---- Adjust if your server hosts files elsewhere ----
const API_BASE = 'http://localhost:5000/api';
const FILE_HOST = 'http://localhost:5000';
// -----------------------------------------------------

/** Normalize upload path to a full URL */
const getImageUrl = (img) => {
  if (!img) return '/no-image.png';
  const file = String(img)
    .replace(/\\/g, '/')
    .replace(/^\/?uploads\/?/i, '')
    .split('/')
    .pop();
  return `${FILE_HOST}/uploads/${file}`;
};

/**
 * Props:
 * - productId: string (required) -> the product being viewed on details page
 * - title?: string -> section title override
 * - maxItems?: number -> limit related items
 */
export default function RelatedProduct({ productId, title = 'Related Products', maxItems = 12 }) {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [error, setError] = useState(null);

  // Fetch current product + all products
  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const [curRes, allRes] = await Promise.all([
          axios.get(`${API_BASE}/products/${productId}`),
          axios.get(`${API_BASE}/products`),
        ]);

        if (!cancelled) {
          setCurrentProduct(curRes.data);
          setAllProducts(Array.isArray(allRes.data) ? allRes.data : allRes.data?.data || []);
        }
      } catch (e) {
        if (!cancelled) setError(e?.response?.data?.message || e.message || 'Failed to load related products');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (productId) run();
    return () => { cancelled = true; };
  }, [productId]);

  // Filter same-category products, excluding the current one
  const related = useMemo(() => {
    if (!currentProduct || !allProducts?.length) return [];
    const currentId = String(currentProduct._id || currentProduct.id || '');
    const currentCategoryId = String(
      currentProduct.category?._id ||
      currentProduct.category?.id ||
      currentProduct.category ||
      ''
    );

    const list = allProducts
      .filter(p => {
        const pid = String(p._id || p.id || '');
        if (!pid || pid === currentId) return false;

        const catId = String(p.category?._id || p.category?.id || p.category || '');
        return catId && catId === currentCategoryId;
      })
      .slice(0, maxItems);

    return list;
  }, [currentProduct, allProducts, maxItems]);

  if (!productId) return null;

  return (
    <section className="tp-related-product pt-95 pb-120">
      <div className="container">
        <div className="row">
          <div className="tp-section-title-wrapper-6 text-center mb-40">
            <h3 className="tp-section-title-6">{title}</h3>
            {loading && <p style={{ marginTop: 8 }}>Loading…</p>}
            {error && <p style={{ marginTop: 8, color: 'crimson' }}>{error}</p>}
            {!loading && !error && related.length === 0 && (
              <p style={{ marginTop: 8 }}>No related products in this category.</p>
            )}
          </div>
        </div>

        {!loading && !error && related.length > 0 && (
          <div className="row">
            <Swiper
              modules={[Scrollbar]}
              spaceBetween={24}
              slidesPerView={4}
              scrollbar={{ draggable: true }}
              className="tp-product-related-slider-active mb-10"
              breakpoints={{
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 }
              }}
            >
              {related.map((p) => {
                const pid = String(p._id || p.id);
                const name = p.name || p.title || 'Product';
                const price = p.newPrice ?? p.price ?? p.salePrice ?? null;
                const oldPrice = p.oldPrice ?? null;

                // try common image fields
                const img =
                  p.image?.url ||
                  p.image ||
                  p.images?.[0] ||
                  p.productImage ||
                  p.thumbnail ||
                  null;

                const href = `/product/${pid}`; // adjust to your route
                return (
                  <SwiperSlide key={pid}>
                    <div className="tp-product-item-3 tp-product-style-primary mb-50" style={{border:'1px solid #e8e8e8',padding:'20px',borderRadius:'10px'}}>
                      <div className="tp-product-thumb-3 mb-15 fix p-relative z-index-1">
                        <a href={href}>
                          <img src={getImageUrl(img)} alt={name} />
                        </a>

                        {/* action buttons (wire these up to your handlers if needed) */}
                        {/* <div className="tp-product-action-3 tp-product-action-4 has-shadow tp-product-action-primaryStyle">
                          <div className="tp-product-action-item-3 d-flex flex-column">
                            <button type="button" className="tp-product-action-btn-3 tp-product-add-cart-btn" onClick={(e)=>{e.preventDefault();}}>
                              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.34706 4.53799L3.85961 10.6239C3.89701 11.0923 4.28036 11.4436 4.74871 11.4436H4.75212H14.0265H14.0282C14.4711 11.4436 14.8493 11.1144 14.9122 10.6774L15.7197 5.11162C15.7384 4.97924 15.7053 4.84687 15.6245 4.73995C15.5446 4.63218 15.4273 4.5626 15.2947 4.54393C15.1171 4.55072 7.74498 4.54054 3.34706 4.53799ZM4.74722 12.7162C3.62777 12.7162 2.68001 11.8438 2.58906 10.728L1.81046 1.4837L0.529505 1.26308C0.181854 1.20198 -0.0501969 0.873587 0.00930333 0.526523C0.0705036 0.17946 0.406255 -0.0462578 0.746256 0.00805037L2.51426 0.313534C2.79901 0.363599 3.01576 0.5995 3.04042 0.888012L3.24017 3.26484C15.3748 3.26993 15.4139 3.27587 15.4726 3.28266C15.946 3.3514 16.3625 3.59833 16.6464 3.97849C16.9303 4.35779 17.0493 4.82535 16.9813 5.29376L16.1747 10.8586C16.0225 11.9177 15.1011 12.7162 14.0301 12.7162H14.0259H4.75402H4.74722Z" fill="currentColor"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.6629 7.67446H10.3067C9.95394 7.67446 9.66919 7.38934 9.66919 7.03804C9.66919 6.68673 9.95394 6.40161 10.3067 6.40161H12.6629C13.0148 6.40161 13.3004 6.68673 13.3004 7.03804C13.3004 7.38934 13.0148 7.67446 12.6629 7.67446Z" fill="currentColor"/>
                              </svg>
                              <span className="tp-product-tooltip">Add to Cart</span>
                            </button>

                            <button type="button" className="tp-product-action-btn-3 tp-product-quick-view-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
                              <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.99948 5.06828C7.80247 5.06828 6.82956 6.04044 6.82956 7.23542C6.82956 8.42951 7.80247 9.40077 8.99948 9.40077C10.1965 9.40077 11.1703 8.42951 11.1703 7.23542C11.1703 6.04044 10.1965 5.06828 8.99948 5.06828ZM8.99942 10.7482C7.0581 10.7482 5.47949 9.17221 5.47949 7.23508C5.47949 5.29705 7.0581 3.72021 8.99942 3.72021C10.9407 3.72021 12.5202 5.29705 12.5202 7.23508C12.5202 9.17221 10.9407 10.7482 8.99942 10.7482Z" fill="currentColor"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.41273 7.2346C3.08674 10.9265 5.90646 13.1215 8.99978 13.1224C12.0931 13.1215 14.9128 10.9265 16.5868 7.2346C14.9128 3.54363 12.0931 1.34863 8.99978 1.34773C5.90736 1.34863 3.08674 3.54363 1.41273 7.2346ZM9.00164 14.4703H8.99804H8.99714C5.27471 14.4676 1.93209 11.8629 0.0546754 7.50073C-0.0182251 7.33091 -0.0182251 7.13864 0.0546754 6.96883C1.93209 2.60759 5.27561 0.00288103 8.99714 0.000185582C8.99894 -0.000712902 8.99894 -0.000712902 8.99984 0.000185582C9.00164 -0.000712902 9.00164 -0.000712902 9.00254 0.000185582C12.725 0.00288103 16.0676 2.60759 17.945 6.96883C18.0188 7.13864 18.0188 7.33091 17.945 7.50073C16.0685 11.8629 12.725 14.4676 9.00254 14.4703H9.00164Z" fill="currentColor"/>
                              </svg>
                              <span className="tp-product-tooltip">Quick View</span>
                            </button>

                            <button type="button" className="tp-product-action-btn-3 tp-product-add-to-wishlist-btn" onClick={(e)=>{e.preventDefault(); }}>
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.60355 7.98635C2.83622 11.8048 7.7062 14.8923 9.0004 15.6565C10.299 14.8844 15.2042 11.7628 16.3973 7.98985C17.1806 5.55102 16.4535 2.46177 13.5644 1.53473C12.1647 1.08741 10.532 1.35966 9.40484 2.22804C9.16921 2.40837 8.84214 2.41187 8.60476 2.23329C7.41078 1.33952 5.85105 1.07778 4.42936 1.53473C1.54465 2.4609 0.820172 5.55014 1.60355 7.98635ZM9.00138 17.0711C8.89236 17.0711 8.78421 17.0448 8.68574 16.9914C8.41055 16.8417 1.92808 13.2841 0.348132 8.3872C0.347252 8.3872 0.347252 8.38633 0.347252 8.38633C-0.644504 5.30321 0.459792 1.42874 4.02502 0.284605C5.69904 -0.254635 7.52342 -0.0174044 8.99874 0.909632C10.4283 0.00973263 12.3275 -0.238878 13.9681 0.284605C17.5368 1.43049 18.6446 5.30408 17.6538 8.38633C16.1248 13.2272 9.59485 16.8382 9.3179 16.9896C9.21943 17.0439 9.1104 17.0711 9.00138 17.0711Z" fill="currentColor"/>
                              </svg>
                              <span className="tp-product-tooltip">Add To Wishlist</span>
                            </button>
                          </div>
                        </div> */}

                        {/* <div className="tp-product-add-cart-btn-large-wrapper">
                          <a href={href} className="tp-product-add-cart-btn-large">
                            View Details
                          </a>
                        </div> */}
                      </div>

                      <div className="tp-product-content-3">
                        <div className="tp-product-tag-3">
                          <span>{p.category?.name || p.categoryName || 'Category'}</span>
                        </div>
                        <h3 className="tp-product-title-3">
                          <a href={href}>{name}</a>
                        </h3>
                        <div className="tp-product-price-wrapper-3">
                          {price != null && <span className="tp-product-price-3 new-price">₹{Number(price).toLocaleString('en-IN')}</span>}
                          {oldPrice != null && <span className="tp-product-price-3 old-price">₹{Number(oldPrice).toLocaleString('en-IN')}</span>}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}
