// import React, { useState, useEffect } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import axios from 'axios';

// function FilterProduct() {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const gadgetBannerSliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/categories');
//         setCategories(response.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (selectedCategory) {
//       const fetchProductsByCategory = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5000/api/products?category=${encodeURIComponent(selectedCategory)}`);
//           setProducts(response.data);
//         } catch (error) {
//           console.error('Error fetching products:', error);
//         }
//       };

//       fetchProductsByCategory();
//     }
//   }, [selectedCategory]);

//   return (
//     <div>
//       <section className="tp-product-gadget-area pt-30 pb-30">
//         <div className="container">
//           <div className="row">
//             <div className="col-xl-4 col-lg-5">
//               <div className="tp-product-gadget-sidebar mb-40">
//                 <div className="tp-product-gadget-categories p-relative fix mb-10">
//                   <div className="tp-product-gadget-thumb">
//                     <img src="https://html.storebuild.shop/shofy-prv/shofy/assets/img/product/gadget/gadget-girl.png" alt="Gadget" />
//                   </div>
//                   <h3 className="tp-product-gadget-categories-title">Electronics <br /> Gadgets</h3>
//                   <div className="tp-product-gadget-categories-list">
//                     <ul>
//                       {categories.map((category, index) => (
//                         <li key={index}>
//                           <a href="#" onClick={() => setSelectedCategory(category.name)}>{category.name}</a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className="tp-product-gadget-btn">
//                     <a href="shop-category.html" className="tp-link-btn">
//                       More Products
//                       <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M13.9998 6.19656L1 6.19656" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                         <path d="M8.75674 0.975394L14 6.19613L8.75674 11.4177" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                       </svg>
//                     </a>
//                   </div>
//                 </div>
//                 <div className="tp-product-gadget-banner">
//                   <Slider {...gadgetBannerSliderSettings}>
//                     <div className="tp-product-gadget-banner-item include-bg" id="one">
//                       <div className="tp-product-gadget-banner-content">
//                         <span className="tp-product-gadget-banner-price">Only $99.00</span>
//                         <h3 className="tp-product-gadget-banner-title">
//                           <a href="product-details.html">Selected novelty Products</a>
//                         </h3>
//                       </div>
//                     </div>
//                     <div className="tp-product-gadget-banner-item include-bg" id="one">
//                       <div className="tp-product-gadget-banner-content">
//                         <span className="tp-product-gadget-banner-price">Only $55.00</span>
//                         <h3 className="tp-product-gadget-banner-title">
//                           <a href="product-details.html">Top Rated Products</a>
//                         </h3>
//                       </div>
//                     </div>
//                     <div className="tp-product-gadget-banner-item include-bg" id="one">
//                       <div className="tp-product-gadget-banner-content">
//                         <span className="tp-product-gadget-banner-price">Only $67.00</span>
//                         <h3 className="tp-product-gadget-banner-title">
//                           <a href="product-details.html">Top Rated Products</a>
//                         </h3>
//                       </div>
//                     </div>
//                   </Slider>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-8 col-lg-7">
//               <div className="tp-product-gadget-wrapper">
//                 <div className="row">
//                   {products.length > 0 ? (
//                     products.map((product, index) => (
//                       <div className="col-xl-4 col-sm-6" key={index}>
//                         <div className="tp-product-item p-relative transition-3 mb-25">
//                           <div className="tp-product-thumb p-relative fix m-img">
//                             <a href={`product-details.html?id=${product._id}`}>
//                               <img src={product.image} alt={product.name} />

//                             </a>
//                             {product.productBadge && (
//                                   <div className="tp-product-badge">
//                                     <span className={`product-${product.productBadge.toLowerCase()}`}>{product.productBadge}</span>
//                                   </div>
//                                 )}
//                             <div className="tp-product-action">
//                               <div className="tp-product-action-item d-flex flex-column">
//                                 <button type="button" className="tp-product-action-btn tp-product-add-cart-btn">
//                                   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path fillRule="evenodd" clipRule="evenodd" d="M3.93795 5.34749L4.54095 12.5195C4.58495 13.0715 5.03594 13.4855 5.58695 13.4855H5.59095H16.5019H16.5039C17.0249 13.4855 17.4699 13.0975 17.5439 12.5825L18.4939 6.02349C18.5159 5.86749 18.4769 5.71149 18.3819 5.58549C18.2879 5.45849 18.1499 5.37649 17.9939 5.35449C17.7849 5.36249 9.11195 5.35049 3.93795 5.34749ZM5.58495 14.9855C4.26795 14.9855 3.15295 13.9575 3.04595 12.6425L2.12995 1.74849L0.622945 1.48849C0.213945 1.41649 -0.0590549 1.02949 0.0109451 0.620487C0.082945 0.211487 0.477945 -0.054513 0.877945 0.00948704L2.95795 0.369487C3.29295 0.428487 3.54795 0.706487 3.57695 1.04649L3.81194 3.84749C18.0879 3.85349 18.1339 3.86049 18.2029 3.86849C18.7599 3.94949 19.2499 4.24049 19.5839 4.68849C19.9179 5.13549 20.0579 5.68649 19.9779 6.23849L19.0289 12.7965C18.8499 14.0445 17.7659 14.9855 16.5059 14.9855H16.5009H5.59295H5.58495Z" fill="currentColor" />
//                                   </svg>
//                                 </button>
//                                 <button type="button" className="tp-product-action-btn tp-product-quick-view-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
//                                   <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path fillRule="evenodd" clipRule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor" />
//                                   </svg>
//                                 </button>
//                                 <button type="button" className="tp-product-action-btn tp-product-add-to-wishlist-btn">
//                                   <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path fillRule="evenodd" clipRule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor" />
//                                   </svg>
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="tp-product-content">
//                             <div className="tp-product-category">
//                               <a href="shop.html">{product.category}</a>
//                             </div>
//                             <h3 className="tp-product-title">
//                               <a href={`product-details.html?id=${product._id}`}>
//                                 {product.name}
//                               </a>
//                             </h3>
//                             <div className="tp-product-rating d-flex align-items-center">
//                               <div className="tp-product-rating-icon">
//                                 <span><i className="fa-solid fa-star"></i></span>
//                                 <span><i className="fa-solid fa-star"></i></span>
//                                 <span><i className="fa-solid fa-star"></i></span>
//                                 <span><i className="fa-solid fa-star"></i></span>
//                                 <span><i className="fa-solid fa-star-half-stroke"></i></span>
//                               </div>
//                               <div className="tp-product-rating-text">
//                                 <span>(6 Review)</span>
//                               </div>
//                             </div>
//                             <div className="tp-product-price-wrapper">
//                               <span className="tp-product-price">₹{product.newPrice}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p>No products found for this category.</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default FilterProduct;







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
        const response = await axios.get('http://localhost:5000/api/categories');
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
        let url = 'http://localhost:5000/api/products';
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
                <div className="tp-product-gadget-banner">
                  <Slider {...gadgetBannerSliderSettings}>
                    <div className="tp-product-gadget-banner-item include-bg" id="one">
                      <Link to="/product">
                      <div className="tp-product-gadget-banner-content">
                        <span className="tp-product-gadget-banner-price"></span>
                        <h3 className="tp-product-gadget-banner-title">
                        </h3>
                      </div>
                      </Link>
                    </div>
                    <div className="tp-product-gadget-banner-item include-bg" id="two">
                      <Link to="/product">
                      <div className="tp-product-gadget-banner-content">
                        <span className="tp-product-gadget-banner-price"></span>
                        <h3 className="tp-product-gadget-banner-title">
                        </h3>
                      </div>
                      </Link>
                    </div>
                    <div className="tp-product-gadget-banner-item include-bg" id="three">
                      <Link to="/product">
                      <div className="tp-product-gadget-banner-content">
                        <span className="tp-product-gadget-banner-price"></span>
                        <h3 className="tp-product-gadget-banner-title">
                        </h3>
                      </div>
                      </Link>
                    </div>
                  </Slider>
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
