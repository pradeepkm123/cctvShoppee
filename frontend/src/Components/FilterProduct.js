import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FilterProduct() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const gadgetBannerSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://cctvshoppee.onrender.com/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products (all or by category)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'https://cctvshoppee.onrender.com/api/products';
        if (selectedCategory) {
          url += `?category=${encodeURIComponent(selectedCategory)}`;
        }
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  return (
    <div>
      <section className="tp-product-gadget-area pt-30 pb-30">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-5">
              <div className="tp-product-gadget-sidebar mb-40">
                <div className="tp-product-gadget-categories p-relative fix mb-10">
                  <div className="tp-product-gadget-thumb">
                    <img src="https://html.storebuild.shop/shofy-prv/shofy/assets/img/product/gadget/gadget-girl.png" alt="Gadget" />
                  </div>
                  <h3 className="tp-product-gadget-categories-title">Electronics <br /> Gadgets</h3>
                  <div className="tp-product-gadget-categories-list">
                    <ul>
                      <li>
                        <a
                          href="#"
                          onClick={() => setSelectedCategory(null)}
                          className={!selectedCategory ? 'active' : ''}
                        >
                          All Products
                        </a>
                      </li>
                      {categories.map((category, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            onClick={() => setSelectedCategory(category.name)}
                            className={selectedCategory === category.name ? 'active' : ''}
                          >
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="tp-product-gadget-btn">
                    <Link to="/shop-category" className="tp-link-btn">
                      More Products
                      <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.9998 6.19656L1 6.19656" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.75674 0.975394L14 6.19613L8.75674 11.4177" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
               
              </div>
            </div>
            <div className="col-xl-8 col-lg-7">
              <div className="tp-product-gadget-wrapper">
                <div className="row">
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <div className="col-xl-4 col-sm-6" key={index}>
                        <div className="tp-product-item p-relative transition-3 mb-25">
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
                              <Link to="/shop">{product.category}</Link>
                            </div>
                            <h3 className="tp-product-title">
                              <Link to={`/product-details/${product._id}`}>
                                {product.name}
                              </Link>
                            </h3>
                            <div className="tp-product-rating d-flex align-items-center">
                              <div className="tp-product-rating-icon">
                                <span><i className="fa-solid fa-star"></i></span>
                                <span><i className="fa-solid fa-star"></i></span>
                                <span><i className="fa-solid fa-star"></i></span>
                                <span><i className="fa-solid fa-star"></i></span>
                                <span><i className="fa-solid fa-star-half-stroke"></i></span>
                              </div>
                              <div className="tp-product-rating-text">
                                <span>(6 Review)</span>
                              </div>
                            </div>
                            <div className="tp-product-price-wrapper">
                              <span className="tp-product-price">₹{product.newPrice}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No products found for this category.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FilterProduct;
