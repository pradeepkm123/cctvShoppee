import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProductDrawer from './AddProductDrawer';
import EditProductDrawer from './EditProductDrawer';
import axios from 'axios';
import './Products.css'; // We'll create this new CSS file

const API_BASE = 'https://cctvshoppee.onrender.com/api';

function Product() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE}/categories`);
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddProduct = () => {
    setProductToEdit(null);
    setDrawerOpen(true);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setProductToEdit(null);
    fetchProducts();
  };

  const handleCheckboxChange = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(filteredProducts.map(p => p._id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleDeleteSelectedProducts = async () => {
    if (selectedProducts.length === 0) {
      toast.error('Please select at least one product to delete.');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} product(s)?`)) {
      try {
        await Promise.all(selectedProducts.map(id => axios.delete(`${API_BASE}/products/${id}`)));
        fetchProducts();
        setSelectedProducts([]);
        toast.success('Products deleted successfully');
      } catch (error) {
        console.error('Error deleting products:', error);
        toast.error(`Error deleting products: ${error.response?.data?.message || error.message || 'Unknown error'}`);
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axios.delete(`${API_BASE}/products/${productId}`);
        if (response.status === 200) {
          fetchProducts();
          toast.success('Product deleted successfully');
        } else {
          toast.error('Failed to delete the product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error(`Error deleting product: ${error.response?.data?.message || error.message || 'Unknown error'}`);
      }
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedPriceRange('');
  };

  const filteredProducts = products.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (p.name || '').toLowerCase().includes(q) ||
      (p.brand || '').toLowerCase().includes(q);

    const matchesCategory = selectedCategory
      ? (p.category === selectedCategory || p.category?.name === selectedCategory)
      : true;

    const price = Number(p.newPrice) || 0;
    const matchesPrice = selectedPriceRange
      ? (
        (selectedPriceRange === '1' && price < 25) ||
        (selectedPriceRange === '2' && price >= 25 && price < 50) ||
        (selectedPriceRange === '3' && price >= 50 && price < 100) ||
        (selectedPriceRange === '4' && price >= 100 && price < 200) ||
        (selectedPriceRange === '5' && price >= 200)
      )
      : true;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };


  return (
    <div className="products-container">
      {/* Header Section */}
      <div className="products-header">
        <div className="header-content">
          <div className="title-section">
            <h1>Products</h1>
            <p>Manage your product inventory</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary">
              <i className="fas fa-upload"></i> Export
            </button>
            <button className="btn btn-secondary">
              <i className="fas fa-download"></i> Import
            </button>
            <button className="btn btn-primary" onClick={handleAddProduct}>
              <i className="fas fa-plus"></i> Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">
            <i className="fas fa-cube"></i>
          </div>
          <div className="stat-info">
            <h3>{products.length}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h3>{products.filter(p => p.stock > 0).length}</h3>
            <p>In Stock</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <div className="stat-info">
            <h3>{products.filter(p => p.stock === 0).length}</h3>
            <p>Out of Stock</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon info">
            <i className="fas fa-tags"></i>
          </div>
          <div className="stat-info">
            <h3>{categories.length}</h3>
            <p>Categories</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-grid">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c._id} value={c.name}>{c.name}</option>
            ))}
          </select>
          <select
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
          >
            <option value="">All Prices</option>
            <option value="1">Under $25</option>
            <option value="2">$25 - $50</option>
            <option value="3">$50 - $100</option>
            <option value="4">$100 - $200</option>
            <option value="5">Over $200</option>
          </select>
          <div className="filter-actions">
            <button className="btn btn-danger" onClick={handleDeleteSelectedProducts}>
              <i className="fas fa-trash"></i> Delete Selected
            </button>
            <button className="btn btn-outline" onClick={handleReset}>
              <i className="fas fa-sync"></i> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="products-table-container">
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="table-wrapper">
            <table className="products-table">
              <thead>
                <tr>
                  <th className="checkbox-cell">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className={selectedProducts.includes(product._id) ? 'selected' : ''}>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product._id)}
                        onChange={() => handleCheckboxChange(product._id)}
                      />
                    </td>
                    <td className="product-info">
                      <div className="product-name">{product.name}</div>
                      <div className="product-description">{product.description}</div>
                    </td>
                    <td className="category-cell">
                      <span className="category-tag">{product.category?.name || product.category}</span>
                    </td>
                    <td className="price-cell">
                      <div className="price-wrapper">
                        {product.oldPrice && (
                          <span className="old-price">{formatPrice(product.oldPrice)}</span>
                        )}
                        <span className="current-price">{formatPrice(product.newPrice)}</span>
                      </div>
                    </td>
                    <td className="stock-cell">
                      <div className="stock-badge">{product.stock}</div>
                    </td>
                    <td className="status-cell">
                      <div className={`status-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </div>
                    </td>
                    <td className="actions-cell">
                      <div className="action-buttons">
                        <button
                          className="btn-icon edit-btn"
                          onClick={() => handleEditProduct(product)}
                          title="Edit product"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn-icon delete-btn"
                          onClick={() => handleDeleteProduct(product._id)}
                          title="Delete product"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fas fa-box-open"></i>
            </div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
            <button className="btn btn-primary" onClick={handleReset}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Table Footer */}
        {filteredProducts.length > 0 && (
          <div className="table-footer">
            <div className="footer-info">
              Showing {filteredProducts.length} of {products.length} products
            </div>
            <div className="pagination">
              <button className="pagination-btn" disabled>
                <i className="fas fa-chevron-left"></i>
              </button>
              <span className="pagination-page">1</span>
              <button className="pagination-btn">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Drawers */}
      {productToEdit ? (
        <EditProductDrawer
          open={drawerOpen}
          onClose={handleCloseDrawer}
          productToEdit={productToEdit}
        />
      ) : (
        <AddProductDrawer
          open={drawerOpen}
          onClose={handleCloseDrawer}
          categories={categories}
        />
      )}

      <ToastContainer position="top-right" />
    </div>
  );
}

export default Product;
