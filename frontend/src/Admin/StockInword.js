import React, { useState, useEffect } from 'react';
import { RotateCw, Plus, Trash2, X, Save, User, FileText } from 'lucide-react';

const StockInward = () => {
  const [showStockInwardModal, setShowStockInwardModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    supplier: '',
    invoiceNumber: '',
    location: ''
  });
  
  const [items, setItems] = useState([
    { id: 1, productId: '', quantity: 1, purchasePrice: '' }
  ]);

  // Fetch products, suppliers and locations from API
  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
    fetchLocations();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://cctvshoppee.onrender.com/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('https://cctvshoppee.onrender.com/api/suppliers');
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      setSuppliers([
        { _id: '1', name: 'CP Plus Distributor' },
        { _id: '2', name: 'Hikvision Supplier' },
        { _id: '3', name: 'Dahua Technology' }
      ]);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch('https://cctvshoppee.onrender.com/api/locations');
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
      alert('Failed to fetch locations');
    }
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { 
        id: Date.now(), 
        productId: '', 
        quantity: 1, 
        purchasePrice: '' 
      }
    ]);
  };

  const handleDeleteItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const getProductById = (productId) => {
    return products.find(p => p._id === productId);
  };

  const validateForm = () => {
    if (!formData.supplier) {
      alert('Please select a supplier');
      return false;
    }

    if (!formData.location) {
      alert('Please select a location');
      return false;
    }

    for (const item of items) {
      if (!item.productId) {
        alert('Please select a product for all items');
        return false;
      }
      if (!item.quantity || item.quantity <= 0) {
        alert('Please enter a valid quantity for all items');
        return false;
      }
    }

    return true;
  };

  const updateProductStock = async (productId, quantity) => {
    try {
      // First get the current product to know the current stock
      const productResponse = await fetch(`https://cctvshoppee.onrender.com/api/products/${productId}`);
      const product = await productResponse.json();
      
      const currentStock = parseFloat(product.stockQuantity || product.quantity || product.stock || 0);
      const newStock = currentStock + parseInt(quantity);
      
      // Update the product stock
      const updateResponse = await fetch(`https://cctvshoppee.onrender.com/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stockQuantity: newStock,
          quantity: newStock,
          stock: newStock
        })
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update product stock');
      }

      return true;
    } catch (error) {
      console.error('Error updating product stock:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      // Update stock for each product
      for (const item of items) {
        await updateProductStock(item.productId, item.quantity);
      }

      // Create stock inward record
      const inwardData = {
        date: new Date().toISOString().split('T')[0],
        supplier: formData.supplier,
        invoiceNumber: formData.invoiceNumber,
        location: formData.location,
        items: items.map(item => ({
          productId: item.productId,
          quantity: parseInt(item.quantity),
          purchasePrice: item.purchasePrice ? parseFloat(item.purchasePrice) : null
        })),
        createdBy: 'Admin'
      };

      const response = await fetch('https://cctvshoppee.onrender.com/api/stock-inward', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inwardData)
      });

      if (response.ok) {
        const result = await response.json();
        alert('Stock inward added successfully! Product quantities have been updated.');
        setShowStockInwardModal(false);
        resetForm();
        // Refresh products to show updated stock
        fetchProducts();
      } else {
        throw new Error('Failed to submit stock inward');
      }
    } catch (error) {
      console.error('Error submitting stock inward:', error);
      alert('Failed to submit stock inward: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      supplier: '',
      invoiceNumber: '',
      location: ''
    });
    setItems([
      { id: 1, productId: '', quantity: 1, purchasePrice: '' }
    ]);
  };

  const getTotalQuantity = () => {
    return items.reduce((total, item) => total + parseInt(item.quantity || 0), 0);
  };

  return (
    <div style={styles.container}>
      <style>{`
        * { box-sizing: border-box; }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .start-btn {
          transition: all 0.3s ease;
        }

        .start-btn:hover {
          background-color: #4285f4;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(66, 133, 244, 0.4);
        }

        .modal-overlay {
          animation: fadeIn 0.2s ease;
        }

        .modal-content {
          animation: scaleIn 0.3s ease;
        }

        .input-field:focus, .select-field:focus {
          outline: none;
          border-color: #4285f4;
          box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
        }

        .delete-btn {
          transition: all 0.2s ease;
        }

        .delete-btn:hover {
          background-color: #ffebee;
          transform: scale(1.1);
        }

        .cancel-btn:hover {
          background-color: #f5f5f5;
        }

        .submit-btn {
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          background-color: #357ae8;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(66, 133, 244, 0.3);
        }

        .add-item-btn {
          transition: all 0.2s ease;
        }

        .add-item-btn:hover {
          background-color: #4285f4;
          transform: scale(1.05);
        }
      `}</style>

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Stock Inward</h1>
          <p style={styles.subtitle}>Add new stock to inventory</p>
        </div>
      </div>

      <div style={styles.scanSection}>
        <div style={styles.scanCard}>
          <div style={styles.scanIconContainer}>
            <RotateCw size={48} color="#4285f4" />
          </div>
          <h2 style={styles.scanTitle}>Stock Inward Management</h2>
          <p style={styles.scanDescription}>Add purchased products to your inventory</p>
          <button
            style={styles.startButton}
            className="start-btn"
            onClick={() => setShowStockInwardModal(true)}
          >
            <Plus size={20} style={{ marginRight: '8px' }} />
            Add Stock Entry
          </button>
        </div>
      </div>

      {/* Stock Inward Modal */}
      {showStockInwardModal && (
        <div style={styles.modalOverlay} className="modal-overlay" onClick={() => setShowStockInwardModal(false)}>
          <div style={styles.stockInwardModal} className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Stock Inward Entry</h2>
              <button
                style={styles.addItemButton}
                className="add-item-btn"
                onClick={handleAddItem}
              >
                <Plus size={20} />
              </button>
            </div>

            <div style={styles.modalBody}>
              {/* Basic Information */}
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Basic Information</h3>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <User size={16} style={{ marginRight: '8px' }} />
                      Supplier *
                    </label>
                    <select
                      style={styles.selectField}
                      className="select-field"
                      value={formData.supplier}
                      onChange={(e) => handleFormChange('supplier', e.target.value)}
                    >
                      <option value="">Select Supplier</option>
                      {suppliers.map((supplier) => (
                        <option key={supplier._id} value={supplier._id}>
                          {supplier.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <FileText size={16} style={{ marginRight: '8px' }} />
                      Invoice Number
                    </label>
                    <input
                      type="text"
                      style={styles.inputField}
                      className="input-field"
                      placeholder="Enter invoice number"
                      value={formData.invoiceNumber}
                      onChange={(e) => handleFormChange('invoiceNumber', e.target.value)}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Location *</label>
                    <select
                      style={styles.selectField}
                      className="select-field"
                      value={formData.location}
                      onChange={(e) => handleFormChange('location', e.target.value)}
                    >
                      <option value="">Select Location</option>
                      {locations.map((location) => (
                        <option key={location._id} value={location._id}>
                          {location.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Products Section */}
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Products</h3>
                {items.map((item, index) => {
                  const product = getProductById(item.productId);
                  return (
                    <div key={item.id} style={styles.itemSection}>
                      <div style={styles.itemHeader}>
                        <h3 style={styles.itemTitle}>Product #{index + 1}</h3>
                        <button
                          style={styles.deleteButton}
                          className="delete-btn"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 size={18} color="#dc3545" />
                        </button>
                      </div>

                      <div style={styles.itemGrid}>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Product *</label>
                          <select
                            style={styles.selectField}
                            className="select-field"
                            value={item.productId}
                            onChange={(e) => handleItemChange(item.id, 'productId', e.target.value)}
                          >
                            <option value="">Select Product</option>
                            {products.map((product) => (
                              <option key={product._id} value={product._id}>
                                {product.name} - {product.modelNo} (Current Stock: {product.stockQuantity || product.quantity || product.stock || 0})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div style={styles.formGroup}>
                          <label style={styles.label}>Quantity *</label>
                          <input
                            type="number"
                            style={styles.inputField}
                            className="input-field"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                          />
                        </div>

                        <div style={styles.formGroup}>
                          <label style={styles.label}>Purchase Price (Optional)</label>
                          <input
                            type="number"
                            step="0.01"
                            style={styles.inputField}
                            className="input-field"
                            placeholder="0.00"
                            value={item.purchasePrice}
                            onChange={(e) => handleItemChange(item.id, 'purchasePrice', e.target.value)}
                          />
                        </div>
                      </div>

                      {product && (
                        <div style={styles.stockInfo}>
                          <div>Current Stock: {product.stockQuantity || product.quantity || product.stock || 0}</div>
                          <div>After Inward: {(product.stockQuantity || product.quantity || product.stock || 0) + parseInt(item.quantity || 0)}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div style={styles.summarySection}>
                <h3 style={styles.sectionTitle}>Summary</h3>
                <div style={styles.summaryGrid}>
                  <div style={styles.summaryItem}>
                    <span>Total Products:</span>
                    <span>{items.length}</span>
                  </div>
                  <div style={styles.summaryItem}>
                    <span>Total Quantity:</span>
                    <span>{getTotalQuantity()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button
                style={styles.cancelButton}
                className="cancel-btn"
                onClick={() => {
                  setShowStockInwardModal(false);
                  resetForm();
                }}
                disabled={loading}
              >
                <X size={18} style={{ marginRight: '6px' }} />
                CANCEL
              </button>
              <button
                style={styles.submitButton}
                className="submit-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RotateCw size={18} style={{ marginRight: '6px', animation: 'spin 1s linear infinite' }} />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    <Save size={18} style={{ marginRight: '6px' }} />
                    SUBMIT INWARD
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    padding: '40px 24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '48px',
    maxWidth: '1200px',
    margin: '0 auto 48px',
  },
  title: {
    fontSize: '48px',
    fontWeight: '600',
    color: '#212529',
    margin: '0 0 12px 0',
  },
  subtitle: {
    fontSize: '18px',
    color: '#6c757d',
    margin: 0,
  },
  addEntryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#4285f4',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(66, 133, 244, 0.3)',
  },
  scanSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  scanCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '64px 48px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%',
  },
  scanIconContainer: {
    width: '120px',
    height: '120px',
    backgroundColor: '#e8f0fe',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 32px',
  },
  scanTitle: {
    fontSize: '32px',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '12px',
  },
  scanDescription: {
    fontSize: '16px',
    color: '#6c757d',
    marginBottom: '32px',
  },
  startButton: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#4285f4',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(66, 133, 244, 0.3)',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  stockInwardModal: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '1000px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid #e9ecef',
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#212529',
    margin: 0,
  },
  addItemButton: {
    width: '40px',
    height: '40px',
    backgroundColor: '#4285f4',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  modalBody: {
    padding: '24px',
    overflowY: 'auto',
    flex: 1,
  },
  formSection: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '2px solid #e9ecef',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    marginBottom: '16px',
  },
  itemGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '16px',
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: '500',
    color: '#495057',
    marginBottom: '8px',
  },
  selectField: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease',
  },
  inputField: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'all 0.2s ease',
  },
  itemSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  itemTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#212529',
    margin: 0,
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#6c757d',
    marginTop: '8px',
    padding: '8px 12px',
    backgroundColor: '#e9ecef',
    borderRadius: '4px',
  },
  summarySection: {
    backgroundColor: '#e8f5e8',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '24px',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: '500',
    color: '#212529',
    padding: '8px 0',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '24px',
    borderTop: '1px solid #e9ecef',
  },
  cancelButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: '#6c757d',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#4285f4',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default StockInward;
