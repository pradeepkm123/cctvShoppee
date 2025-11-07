import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FilterCheckbox from './FilterCheckbox';
import '../Pages/Home.css';
import { useLocation, Link } from 'react-router-dom';

function Product() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    productType: [],
    nightVersion: [],
    cameraType: [],
    audioChannel: [],
    megaPixel: [],
    brand: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Default Sorting');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 10;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');


  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      let url = 'https://cctvshoppee.onrender.com/api/products';
      if (category) {
        url += `?category=${encodeURIComponent(category)}`;
      }
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const applyFilters = (products) => {
    let filtered = products.filter(product => {
      return (
        (filters.productType.length > 0 ? filters.productType.includes(product.productType) : true) &&
        (filters.nightVersion.length > 0 ? filters.nightVersion.includes(product.nightVersion) : true) &&
        (filters.cameraType.length > 0 ? filters.cameraType.includes(product.cameraType) : true) &&
        (filters.audioChannel.length > 0 ? filters.audioChannel.includes(product.audioChannel) : true) &&
        (filters.megaPixel.length > 0 ? filters.megaPixel.includes(product.megaPixel) : true) &&
        (filters.brand.length > 0 ? filters.brand.includes(product.brand) : true)
      );
    });

    // Sorting logic
    switch (sortBy) {
      case 'Low to High':
        filtered.sort((a, b) => a.newPrice - b.newPrice);
        break;
      case 'High to Low':
        filtered.sort((a, b) => b.newPrice - a.newPrice);
        break;
      case 'New Added':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'On Sale':
        filtered = filtered.filter(product => product.oldPrice > product.newPrice);
        break;
      default:
        // Default sorting: by price (low to high)
        filtered.sort((a, b) => a.newPrice - b.newPrice);
        break;
    }

    console.log('Filtered Products:', filtered); // Debugging log
    return filtered;
  };

  const filteredProducts = applyFilters(products);
  console.log('Current Filtered Products:', filteredProducts); // Debugging log

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  console.log('Current Items:', currentItems); // Debugging log
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <main>
        <section className="breadcrumb__area include-bg pt-100 pb-50">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="breadcrumb__content p-relative z-index-1">
                  <h3 className="breadcrumb__title">Shop Grid</h3>
                  <div className="breadcrumb__list">
                    <span><a href="#">Home</a></span>
                    <span>Shop Grid</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="tp-shop-area pb-120">
          <div className="container">
            <div className="row">
              {/* Sidebar for Desktop */}
              <div className="col-xl-3 col-lg-4 d-none d-lg-block">
                <div className="tp-shop-sidebar mr-10">
                  <div className="tp-shop-widget mb-10">
                    <FilterCheckbox
                      label="Product Type"
                      options={['HD', 'wireless']}
                      selectedOptions={filters.productType}
                      onChange={(selected) => setFilters({ ...filters, productType: selected })}
                    />
                    <hr />
                  </div>
                  <div className="tp-shop-widget mb-10">
                    <FilterCheckbox
                      label="Night Version"
                      options={['24/7 Full Color', 'Smart Dual Color', 'Normal IR']}
                      selectedOptions={filters.nightVersion}
                      onChange={(selected) => setFilters({ ...filters, nightVersion: selected })}
                    />
                    <hr />
                  </div>
                  <div className="tp-shop-widget mb-10">
                    <FilterCheckbox
                      label="Camera Type"
                      options={['Demo', 'Bullet']}
                      selectedOptions={filters.cameraType}
                      onChange={(selected) => setFilters({ ...filters, cameraType: selected })}
                    />
                    <hr />
                  </div>
                  <div className="tp-shop-widget mb-10">
                    <FilterCheckbox
                      label="Audio Channel"
                      options={['Build in Speaker', 'In Bulit Audio', 'Without Audio']}
                      selectedOptions={filters.audioChannel}
                      onChange={(selected) => setFilters({ ...filters, audioChannel: selected })}
                    />
                    <hr />
                  </div>
                  <div className="tp-shop-widget mb-10">
                    <FilterCheckbox
                      label="Mega Pixel"
                      options={['1 MP', '2 MP', '2.4 MP', '4 MP', '5 MP', '8 MP']}
                      selectedOptions={filters.megaPixel}
                      onChange={(selected) => setFilters({ ...filters, megaPixel: selected })}
                    />
                    <hr />
                  </div>
                  <div className="tp-shop-widget mb-10">
                    <FilterCheckbox
                      label="Brand"
                      options={['secura', 'coloron']}
                      selectedOptions={filters.brand}
                      onChange={(selected) => setFilters({ ...filters, brand: selected })}
                    />
                    <hr />
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-xl-9 col-lg-8 col-12">
                <div className="tp-shop-main-wrapper">
                  <div className="tp-shop-top mb-45">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="tp-shop-top-left d-flex align-items-center">
                          <div className="tp-shop-top-result">
                            <p>
                              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} results
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="tp-shop-top-right d-sm-flex align-items-center justify-content-xl-end">
                          <div className="tp-shop-top-select">
                            <select
                              value={sortBy}
                              onChange={(e) => setSortBy(e.target.value)}
                              style={{ display: 'none' }}
                            >
                              <option value="Default Sorting">Default Sorting</option>
                              <option value="Low to High">Low to High</option>
                              <option value="High to Low">High to Low</option>
                              <option value="New Added">New Added</option>
                              <option value="On Sale">On Sale</option>
                            </select>
                            <div
                              className="nice-select"
                              tabIndex="0"
                              style={{
                                position: 'relative',
                                display: 'inline-block',
                                cursor: 'pointer',
                                userSelect: 'none',
                              }}
                            >
                              <span
                                className="current" 
                               
                              >
                                {sortBy}
                                <i className="fas fa-arrow-down" style={{ marginLeft: '8px' }}></i>
                              </span>

                              <ul
                                className="list"
                                style={{
                                  position: 'absolute',
                                  top: '100%',
                                  left: 0,
                                  right: 0,
                                  background: '#fff',
                                  border: '1px solid #ddd',
                                  zIndex: 10,
                                  display: 'block',
                                }}
                              >
                                {['Default Sorting', 'Low to High', 'High to Low', 'New Added', 'On Sale'].map(
                                  (option) => (
                                    <li
                                      key={option}
                                      className={`option ${sortBy === option ? 'selected' : ''}`}
                                      style={{
                                        padding: '8px 12px',
                                        cursor: 'pointer',
                                        backgroundColor: sortBy === option ? '#f0f0f0' : '#fff',
                                      }}
                                      onClick={() => setSortBy(option)}
                                    >
                                      {option}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>

                          </div>
                          <div className="tp-shop-top-filter d-lg-none">
                            <button
                              type="button"
                              className="tp-filter-btn filter-open-btn"
                              onClick={() => setIsFilterOpen(true)}
                            >
                              <span>
                                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M14.9998 3.45001H10.7998" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M3.8 3.45001H1" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M6.5999 5.9C7.953 5.9 9.0499 4.8031 9.0499 3.45C9.0499 2.0969 7.953 1 6.5999 1C5.2468 1 4.1499 2.0969 4.1499 3.45C4.1499 4.8031 5.2468 5.9 6.5999 5.9Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M15.0002 11.15H12.2002" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M5.2 11.15H1" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M9.4002 13.6C10.7533 13.6 11.8502 12.5031 11.8502 11.15C11.8502 9.79691 10.7533 8.70001 9.4002 8.70001C8.0471 8.70001 6.9502 9.79691 6.9502 11.15C6.9502 12.5031 8.0471 13.6 9.4002 13.6Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                              Filter
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Grid */}
                  <div className="tp-shop-items-wrapper tp-shop-item-primary">
                    <div className="tab-content" id="productTabContent">
                      <div className="tab-pane fade show active" id="grid-tab-pane" role="tabpanel" aria-labelledby="grid-tab" tabIndex="0">
                        <div className="row infinite-container">
                          {currentItems.length > 0 ? (
                            currentItems.map((product) => (
                              <div className="col-xl-4 col-md-6 col-sm-6 infinite-item" key={product._id}>
                                <div className="tp-product-item-2 mb-40">
                                  <div className="tp-product-thumb-2 p-relative z-index-1 fix w-img">
                                    <Link to={`/product/${product._id}`}>
                                      <img src={product.image} alt={product.name} />
                                    </Link>
                                    <div className="tp-product-action-2 tp-product-action-blackStyle">
                                      <div className="tp-product-action-item-2 d-flex flex-column">
                                        <button type="button" className="tp-product-action-btn-2 tp-product-add-cart-btn">
                                          <i className="las la-shopping-cart"></i>
                                          <span className="tp-product-tooltip tp-product-tooltip-right">Add to Cart</span>
                                        </button>
                                        <button type="button" className="tp-product-action-btn-2 tp-product-add-to-wishlist-btn">
                                          <i className="las la-heart"></i>
                                          <span className="tp-product-tooltip tp-product-tooltip-right">Add To Wishlist</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="tp-product-content-2 pt-15">
                                    <div className="tp-product-tag-2">
                                      <a href="#">{typeof product.category === 'string' ? product.category : 'Default Category'}</a>
                                    </div>
                                    <h3 className="tp-product-title-2">
                                      <a href="product-details.html">{product.name}</a>
                                    </h3>
                                    <div className="tp-product-rating-icon tp-product-rating-icon-2">
                                      <span><i className="fa-solid fa-star"></i></span>
                                      <span><i className="fa-solid fa-star"></i></span>
                                      <span><i className="fa-solid fa-star"></i></span>
                                      <span><i className="fa-solid fa-star"></i></span>
                                      <span><i className="fa-solid fa-star"></i></span>
                                    </div>
                                    <div className="tp-product-price-wrapper-2">
                                      <span className="tp-product-price-2 new-price">₹{product.newPrice}</span>
                                      <span className="tp-product-price-2 old-price">₹{product.oldPrice}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="no-products-message">
                              No products found
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="row">
                      <div className="col-12">
                        <nav aria-label="Page navigation" style={{ justifySelf: 'end' }}>
                          <ul className="pagination justify-content-center">
                            {Array.from({ length: totalPages }, (_, index) => (
                              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button onClick={() => paginate(index + 1)} className="page-link">
                                  {index + 1}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filter Modal */}
        {isFilterOpen && (
          <div className="filter-modal-overlay">
            <div className="filter-modal">
              <button
                className="filter-close-btn"
                onClick={() => setIsFilterOpen(false)}
              >
                <i className="las la-times"></i>
              </button>
              <div className="tp-shop-sidebar mr-10">
                <div className="tp-shop-widget mb-10">
                  <FilterCheckbox
                    label="Product Type"
                    options={['HD', 'wireless']}
                    selectedOptions={filters.productType}
                    onChange={(selected) => setFilters({ ...filters, productType: selected })}
                  />
                  <hr />
                </div>
                <div className="tp-shop-widget mb-10">
                  <FilterCheckbox
                    label="Night Version"
                    options={['24/7 Full Color', 'Smart Dual Color', 'Normal IR']}
                    selectedOptions={filters.nightVersion}
                    onChange={(selected) => setFilters({ ...filters, nightVersion: selected })}
                  />
                  <hr />
                </div>
                <div className="tp-shop-widget mb-10">
                  <FilterCheckbox
                    label="Camera Type"
                    options={['Demo', 'Bullet']}
                    selectedOptions={filters.cameraType}
                    onChange={(selected) => setFilters({ ...filters, cameraType: selected })}
                  />
                  <hr />
                </div>
                <div className="tp-shop-widget mb-10">
                  <FilterCheckbox
                    label="Audio Channel"
                    options={['Build in Speaker', 'In Bulit Audio', 'Without Audio']}
                    selectedOptions={filters.audioChannel}
                    onChange={(selected) => setFilters({ ...filters, audioChannel: selected })}
                  />
                  <hr />
                </div>
                <div className="tp-shop-widget mb-10">
                  <FilterCheckbox
                    label="Mega Pixel"
                    options={['1 MP', '2 MP', '2.4 MP', '4 MP', '5 MP', '8 MP']}
                    selectedOptions={filters.megaPixel}
                    onChange={(selected) => setFilters({ ...filters, megaPixel: selected })}
                  />
                  <hr />
                </div>
                <div className="tp-shop-widget mb-10">
                  <FilterCheckbox
                    label="Brand"
                    options={['secura', 'coloron']}
                    selectedOptions={filters.brand}
                    onChange={(selected) => setFilters({ ...filters, brand: selected })}
                  />
                  <hr />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Product;
