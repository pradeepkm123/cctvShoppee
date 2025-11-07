import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import '../Pages/Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://cctvshoppee.onrender.com/api/categories');
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <main>
        {/* Breadcrumb Section */}
        <section className="breadcrumb__area include-bg pt-100 pb-50">
          <div className="container" style={{ maxWidth: '1320px' }}>
            <div className="row">
              <div className="col-xxl-12">
                <div className="breadcrumb__content p-relative z-index-1">
                  <h3 className="breadcrumb__title">Only Categories</h3>
                  <div className="breadcrumb__list">
                    <span><Link to="/">Home</Link></span>
                    <span>Only Categories</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Banner Section */}
        <section className="tp-banner-area pb-30">
          <div className="container" style={{ maxWidth: '1320px' }}>
            <div className="row">
              <div className="col-xl-8 col-lg-7">
                <div className="tp-banner-item tp-banner-height has-square p-relative mb-30 z-index-1 fix">
                  <div className="tp-banner-thumb include-bg transition-3" id="banner1"></div>
                  <div className="tp-banner-content">
                    <span>Sale 20% off all store</span>
                    <h3 className="tp-banner-title">
                      <Link to="/product-details">Smartphone <br /> BLU G91 Pro 2022</Link>
                    </h3>
                    <div className="tp-banner-btn">
                      <Link to="/product-details" className="tp-link-btn">Shop Now</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5">
                <div className="tp-banner-item tp-banner-item-sm has-square tp-banner-height p-relative mb-30 z-index-1 fix">
                  <div className="tp-banner-thumb include-bg transition-3" id="banner2"></div>
                  <div className="tp-banner-content">
                    <h3 className="tp-banner-title">
                      <Link to="/product-details">HyperX Cloud II <br /> Wireless</Link>
                    </h3>
                    <p>Sale 35% off</p>
                    <div className="tp-banner-btn">
                      <Link to="/product-details" className="tp-link-btn">Shop Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Category Listing */}
        <section className="tp-category-area pb-120">
          <div className="container" style={{ maxWidth: '1320px' }}>
            <div className="row">
              {categories.map((category, index) => (
                <div className="col-lg-4 col-sm-6" key={index}>
                  <div className="tp-category-main-box mb-25 p-relative fix" style={{background:'#f3f5f7',borderRadius:'10px'}}>
                    <Link to={`/product?category=${encodeURIComponent(category.name)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div
                        className="tp-category-main-thumb include-bg transition-3"
                        style={{
                          backgroundImage: `url(https://cctvshoppee.onrender.com${category.image})`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          height: '200px',
                          marginTop:'15%'
                        }}
                      ></div>
                      <div className="tp-category-main-content" style={{ padding: '20px' }}>
                        <h3 className="tp-category-main-title">
                          {category.name}
                        </h3>
                        <span
                          className="tp-category-main-item"
                          style={{ display: 'block', marginTop: '5px', fontWeight: '500', color: '#333' }}
                        >
                          {category.productCount || 0} Products
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {/* Bottom Info */}
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-category-main-result text-center mb-35 mt-35">
                  <p>Showing {categories.length} of {categories.length} categories</p>
                  <div className="tp-category-main-result-bar">
                    <span data-width="100%"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Category;
