import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link

function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('new');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://cctvshoppee.onrender.com/api/products');
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error('Unexpected API response format.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const filterProductsByTab = (tab) => {
    const filtered = products.filter(
      (product) =>
        product?.productTab?.toLowerCase() === tab &&
        product?.isTrending === true
    );
    console.log(`Filtered Products for ${tab}:`, filtered);
    return filtered;
  };

  const filteredProducts = filterProductsByTab(activeTab);

  return (
    <div>
      <section className="tp-product-area pb-55">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-xl-5 col-lg-6 col-md-5">
              <div className="tp-section-title-wrapper mb-40">
                <h3 className="tp-section-title">
                  Trending Products
                  <svg width="114" height="35" viewBox="0 0 114 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M112 23.275C1.84952 -10.6834 -7.36586 1.48086 7.50443 32.9053" stroke="currentColor" strokeWidth="4" strokeMiterlimit="3.8637" strokeLinecap="round" />
                  </svg>
                </h3>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6 col-md-7">
              <div className="tp-product-tab tp-product-tab-border mb-45 tp-tab d-flex justify-content-md-end">
                <ul className="nav nav-tabs justify-content-sm-end" id="productTab" role="tablist">
                  {['new', 'featured', 'top-sellers'].map((tab) => (
                    <li className="nav-item" role="presentation" key={tab}>
                      <button
                        className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        <span className="tp-product-tab-line">
                          <svg width="52" height="13" viewBox="0 0 52 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 8.97127C11.6061 -5.48521 33 3.99996 51 11.4635" stroke="currentColor" strokeWidth="2" strokeMiterlimit="3.8637" strokeLinecap="round" />
                          </svg>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-product-tab-content">
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" role="tabpanel">
                    <div className="row">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <div key={product._id} className="col-xl-3 col-lg-3 col-sm-6">
                            <div className="tp-product-item transition-3 mb-25">
                              <div className="tp-product-thumb p-relative fix m-img">
                                <Link to={`/product-details/${product._id}`}>
                                  <img src={product.image} alt={product.name} />
                                </Link>
                                {product.productBadge && (
                                  <div className="tp-product-badge">
                                    <span className={`product-${product.productBadge.toLowerCase()}`}>{product.productBadge}</span>
                                  </div>
                                )}
                              </div>
                              <div className="tp-product-content">
                                <div className="tp-product-category">
                                  <Link to="shop.html">{product.category}</Link>
                                </div>
                                <h3 className="tp-product-title">
                                  <Link to={`/product-details/${product._id}`}>
                                    {product.name}
                                  </Link>
                                </h3>
                                <div className="tp-product-price-wrapper">
                                  <span className="tp-product-price old-price">₹ {product.oldPrice}</span>
                                  <span className="tp-product-price new-price">₹ {product.newPrice}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12">
                          <p className="text-center">No products found for "{activeTab}".</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TrendingProducts;
