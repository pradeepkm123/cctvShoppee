import React, { useState } from 'react';
import { RotateCw, Plus, Trash2, X, Save } from 'lucide-react';

const StockOutwardApp = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    email: '',
    phone: '',
    storeName: ''
  });
  const [models, setModels] = useState([
    {
      id: 1,
      modelNo: '',
      salesPerson: '',
      quantity: 0,
      pricePerUnit: 0,
      currentStock: 0,
      scannedCodes: [],
      afterOutward: 0
    }
  ]);

  const handleStartScanning = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleModelChange = (index, field, value) => {
    const updatedModels = [...models];
    updatedModels[index][field] = value;
    setModels(updatedModels);
  };

  const addModel = () => {
    setModels([...models, {
      id: models.length + 1,
      modelNo: '',
      salesPerson: '',
      quantity: 0,
      pricePerUnit: 0,
      currentStock: 0,
      scannedCodes: [],
      afterOutward: 0
    }]);
  };

  const removeModel = (index) => {
    if (models.length > 1) {
      setModels(models.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', { formData, models });
    // Handle form submission
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Stock Outward</h1>
        <p style={styles.subtitle}>Scan products to remove them from inventory</p>
      </div>

      <div style={styles.scanCard}>
        <div style={styles.iconWrapper}>
          <RotateCw size={48} color="#e74c3c" className="scan-icon" />
        </div>
        <h2 style={styles.scanTitle}>Scan Product Barcode</h2>
        <p style={styles.scanSubtitle}>Use your camera or enter barcode manually</p>
        <button style={styles.scanButton} onClick={handleStartScanning}>
          START SCANNING
        </button>
      </div>

      {/* Dialog Modal */}
      {isDialogOpen && (
        <div style={styles.overlay} onClick={handleCloseDialog}>
          <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <div style={styles.dialogHeader}>
              <h2 style={styles.dialogTitle}>Stock Outward</h2>
              <button style={styles.addButton} onClick={addModel}>+</button>
            </div>

            <div style={styles.dialogContent}>
              {/* Customer Information */}
              <div style={styles.formSection}>
                <select 
                  name="customerName"
                  style={styles.select}
                  value={formData.customerName}
                  onChange={handleInputChange}
                >
                  <option value="">Customer Name *</option>
                  <option value="customer1">Customer 1</option>
                  <option value="customer2">Customer 2</option>
                </select>

                <div style={styles.formRow}>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    style={styles.input}
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    style={styles.input}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    style={styles.input}
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="storeName"
                    placeholder="Store Name"
                    style={styles.input}
                    value={formData.storeName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Models */}
              {models.map((model, index) => (
                <div key={model.id} style={styles.modelCard}>
                  <div style={styles.modelHeader}>
                    <h3 style={styles.modelTitle}>Model #{model.id}</h3>
                    {models.length > 1 && (
                      <button 
                        style={styles.deleteButton}
                        onClick={() => removeModel(index)}
                      >
                        🗑️
                      </button>
                    )}
                  </div>

                  <div style={styles.modelRow}>
                    <div style={styles.formGroup}>
                      <select
                        style={styles.select}
                        value={model.modelNo}
                        onChange={(e) => handleModelChange(index, 'modelNo', e.target.value)}
                      >
                        <option value="">Model No *</option>
                        <option value="model1">Model 1</option>
                        <option value="model2">Model 2</option>
                      </select>
                      <p style={styles.stockInfo}>Current stock: {model.currentStock}</p>
                    </div>

                    <select
                      style={styles.select}
                      value={model.salesPerson}
                      onChange={(e) => handleModelChange(index, 'salesPerson', e.target.value)}
                    >
                      <option value="">Sales Person *</option>
                      <option value="person1">Person 1</option>
                      <option value="person2">Person 2</option>
                    </select>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Quantity</label>
                      <input
                        type="number"
                        style={styles.input}
                        value={model.quantity}
                        onChange={(e) => handleModelChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      />
                      <p style={styles.helpText}>
                        Typed value caps how many barcodes you can scan for this row
                      </p>
                      <div style={styles.stockStatus}>
                        <span>After outward: {model.afterOutward}</span>
                        <span>No scan limit (uses scanned count)</span>
                      </div>
                    </div>
                  </div>

                  <div style={styles.modelRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Price per Unit</label>
                      <input
                        type="number"
                        style={styles.input}
                        value={model.pricePerUnit}
                        onChange={(e) => handleModelChange(index, 'pricePerUnit', parseFloat(e.target.value) || 0)}
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Scan barcode</label>
                      <input
                        type="text"
                        style={styles.input}
                        placeholder="Scan or enter barcode"
                      />
                      <p style={styles.helpText}>
                        Barcode must include any continuous 5 or 4 chars from Model No
                      </p>
                    </div>
                  </div>

                  <div style={styles.scannedSection}>
                    <label style={styles.label}>Scanned Codes</label>
                    <div style={styles.scannedBox}>
                      {model.scannedCodes.length === 0 ? (
                        <p style={styles.emptyText}>No codes scanned yet</p>
                      ) : (
                        model.scannedCodes.map((code, i) => (
                          <span key={i} style={styles.codeChip}>{code}</span>
                        ))
                      )}
                    </div>
                    <p style={styles.stockInfo}>Total scanned: {model.scannedCodes.length}</p>
                  </div>
                </div>
              ))}

              {/* Selected Products Preview */}
              <div style={styles.previewSection}>
                <h3 style={styles.previewTitle}>Selected Products Preview</h3>
                <div style={styles.previewBox}>
                  {/* Preview content will go here */}
                </div>
              </div>
            </div>

            <div style={styles.dialogFooter}>
              <button style={styles.cancelButton} onClick={handleCloseDialog}>
                CANCEL
              </button>
              <button style={styles.submitButton} onClick={handleSubmit}>
                SUBMIT
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
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
    color: 'white'
  },
  title: {
    fontSize: '48px',
    fontWeight: '700',
    margin: '0 0 10px 0',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
  },
  subtitle: {
    fontSize: '18px',
    opacity: '0.95',
    margin: '0'
  },
  scanCard: {
    maxWidth: '600px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '20px',
    padding: '60px 40px',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  iconWrapper: {
    width: '120px',
    height: '120px',
    margin: '0 auto 30px',
    background: 'linear-gradient(135deg, #ffeef8 0%, #ffe0f0 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: '60px',
    height: '60px',
    color: '#e74c3c'
  },
  scanTitle: {
    fontSize: '32px',
    fontWeight: '600',
    margin: '0 0 10px 0',
    color: '#2c3e50'
  },
  scanSubtitle: {
    fontSize: '16px',
    color: '#7f8c8d',
    margin: '0 0 40px 0'
  },
  scanButton: {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '16px 48px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(231, 76, 60, 0.4)',
    letterSpacing: '0.5px'
  },
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    zIndex: '1000',
    animation: 'fadeIn 0.3s ease'
  },
  dialog: {
    background: 'white',
    borderRadius: '16px',
    maxWidth: '1200px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
    animation: 'slideUp 0.3s ease'
  },
  dialogHeader: {
    padding: '24px 32px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f8f9fa'
  },
  dialogTitle: {
    fontSize: '24px',
    fontWeight: '600',
    margin: '0',
    color: '#2c3e50'
  },
  addButton: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    border: 'none',
    background: '#667eea',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
  },
  dialogContent: {
    flex: '1',
    overflow: 'auto',
    padding: '32px'
  },
  formSection: {
    marginBottom: '32px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginTop: '16px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    outline: 'none'
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    outline: 'none'
  },
  modelCard: {
    background: '#f8f9fa',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    border: '2px solid #e9ecef'
  },
  modelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  modelTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0',
    color: '#2c3e50'
  },
  deleteButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'all 0.3s ease'
  },
  modelRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#495057',
    marginBottom: '4px'
  },
  stockInfo: {
    fontSize: '13px',
    color: '#6c757d',
    margin: '4px 0 0 0'
  },
  helpText: {
    fontSize: '12px',
    color: '#6c757d',
    margin: '4px 0 0 0',
    lineHeight: '1.4'
  },
  stockStatus: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#6c757d',
    marginTop: '4px'
  },
  scannedSection: {
    marginTop: '20px'
  },
  scannedBox: {
    minHeight: '80px',
    border: '2px dashed #dee2e6',
    borderRadius: '8px',
    padding: '16px',
    background: 'white',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    alignItems: 'flex-start'
  },
  emptyText: {
    width: '100%',
    textAlign: 'center',
    color: '#adb5bd',
    margin: '20px 0',
    fontSize: '14px'
  },
  codeChip: {
    background: '#667eea',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500'
  },
  previewSection: {
    marginTop: '32px',
    paddingTop: '32px',
    borderTop: '2px solid #dee2e6'
  },
  previewTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#2c3e50'
  },
  previewBox: {
    minHeight: '100px',
    border: '2px solid #e9ecef',
    borderRadius: '8px',
    padding: '20px',
    background: '#f8f9fa'
  },
  dialogFooter: {
    padding: '20px 32px',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    background: '#f8f9fa'
  },
  cancelButton: {
    padding: '12px 32px',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    background: 'white',
    color: '#495057',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px'
  },
  submitButton: {
    padding: '12px 32px',
    border: 'none',
    borderRadius: '8px',
    background: '#667eea',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
    letterSpacing: '0.5px'
  }
};

export default StockOutwardApp;