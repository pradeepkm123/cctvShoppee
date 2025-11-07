import React, { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, Plus, ChevronLeft, ChevronRight, X, Save } from 'lucide-react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BrandManagement = () => {
  // State for brands
  const [brands, setBrands] = useState([]);
  // State for search, pagination, and modals
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    createdOn: new Date().toISOString().split('T')[0],
    status: true
  });

  // Fetch brands from backend
  const fetchBrands = async () => {
    try {
      const response = await axios.get('https://cctvshoppee.onrender.com/api/brands');
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Filter brands based on search term
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBrands = filteredBrands.slice(startIndex, endIndex);

  // Toggle checkbox for a brand
  const handleCheckbox = (id) => {
    setBrands(brands.map(brand =>
      brand._id === id ? { ...brand, checked: !brand.checked } : brand
    ));
  };

  // Open Add Brand modal
  const handleAddBrand = () => {
    setEditingBrand(null);
    setFormData({
      name: '',
      createdOn: new Date().toISOString().split('T')[0],
      status: true
    });
    setShowAddModal(true);
  };

  // Open Edit Brand modal
  const handleEditBrand = (brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      createdOn: brand.createdOn,
      status: brand.status === 'Active'
    });
    setShowAddModal(true);
  };

  // Save Brand (Add or Edit)
  const handleSaveBrand = async () => {
    if (!formData.name.trim()) {
      alert('Brand name is required!');
      return;
    }

    setIsSaving(true);
    try {
      const brandData = {
        name: formData.name,
        createdOn: formData.createdOn,
        status: formData.status ? 'Active' : 'Inactive'
      };

      if (editingBrand) {
        await axios.put(`http://localhost:5000/api/brands/${editingBrand._id}`, brandData);
        setBrands(brands.map(b => b._id === editingBrand._id ? { ...b, ...brandData } : b));
      } else {
        const response = await axios.post('http://localhost:5000/api/brands', brandData);
        setBrands([...brands, response.data]);
      }
      setShowAddModal(false);
    } catch (error) {
      console.error('Error saving brand:', error);
      alert('Failed to save brand. Please try again.');
      await fetchBrands();
    } finally {
      setIsSaving(false);
    }
  };

  // Open Delete Confirmation modal
  const handleDeleteClick = (brand) => {
    setSelectedBrand(brand);
    setShowDeleteModal(true);
  };

  // Confirm Delete Brand
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/brands/${selectedBrand._id}`);
      setBrands(brands.filter(b => b._id !== selectedBrand._id));
      setShowDeleteModal(false);
      setSelectedBrand(null);
    } catch (error) {
      console.error('Error deleting brand:', error);
      alert('Failed to delete brand. Please try again.');
      await fetchBrands();
    }
  };

  // Format date for display
  const formatDateDisplay = (dateStr) => {
    const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div style={styles.container}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .brand-row {
          transition: all 0.2s ease;
        }
        .brand-row:hover {
          background-color: #f8f9fa;
        }
        .action-btn {
          transition: all 0.2s ease;
        }
        .action-btn:hover {
          transform: scale(1.1);
        }
        .add-btn {
          transition: all 0.3s ease;
        }
        .add-btn:hover {
          background-color: #0056d2;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
        }
        .search-input:focus {
          outline: none;
          border-color: #0066ff;
          box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
        }
        .modal-overlay {
          animation: fadeIn 0.2s ease;
        }
        .modal-content {
          animation: modalFadeIn 0.3s ease;
          height: auto;
        }
        .form-input:focus {
          outline: none;
          border-color: #0066ff;
          box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
        }
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 24px;
        }
        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24px;
          transition: 0.3s;
        }
        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          border-radius: 50%;
          transition: 0.3s;
        }
        .toggle-input:checked + .toggle-slider:before {
          transform: translateX(24px);
        }
        .checkbox {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #0066ff;
        }
        .status-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }
        .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker__input-container {
          width: 100%;
        }
        .react-datepicker__input-container input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-size: 14px;
          transition: all 0.2s ease;
        }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Brand</h1>
        <button style={styles.addButton} className="add-btn" onClick={handleAddBrand}>
          <Plus size={18} style={{ marginRight: '8px' }} />
          ADD BRAND
        </button>
      </div>

      {/* Search */}
      <div style={styles.searchContainer}>
        <div style={styles.searchWrapper}>
          <Search size={20} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search Brands"
            style={styles.searchInput}
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeaderCheckbox}>Check Box</th>
              <th style={styles.tableHeader}>Brand</th>
              <th style={styles.tableHeader}>Created On</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={{ ...styles.tableHeader, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBrands.map((brand, index) => (
              <tr
                key={brand._id}
                style={{
                  ...styles.tableRow,
                  animation: `fadeIn 0.3s ease ${index * 0.1}s both`
                }}
                className="brand-row"
              >
                <td style={styles.tableCellCheckbox}>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={brand.checked}
                    onChange={() => handleCheckbox(brand._id)}
                  />
                </td>
                <td style={styles.tableCell}>{brand.name}</td>
                <td style={styles.tableCell}>{formatDateDisplay(brand.createdOn)}</td>
                <td style={styles.tableCell}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: brand.status === 'Active' ? '#d4edda' : '#f8d7da',
                    color: brand.status === 'Active' ? '#155724' : '#721c24'
                  }} className="status-badge">
                    {brand.status}
                  </span>
                </td>
                <td style={{ ...styles.tableCell, textAlign: 'right' }}>
                  <div style={styles.actionButtons}>
                    <button style={styles.iconButton} className="action-btn" onClick={() => handleEditBrand(brand)}>
                      <Edit2 size={16} color="#6c757d" />
                    </button>
                    <button style={styles.iconButton} className="action-btn" onClick={() => handleDeleteClick(brand)}>
                      <Trash2 size={16} color="#dc3545" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={styles.footer}>
        <div style={styles.rowsPerPage}>
          <span style={styles.footerText}>Rows per page:</span>
          <select
            style={styles.select}
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </div>
        <div style={styles.pagination}>
          <span style={styles.footerText}>
            {startIndex + 1}–{Math.min(endIndex, filteredBrands.length)} of {filteredBrands.length}
          </span>
          <button
            style={styles.paginationButton}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            style={styles.paginationButton}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Add/Edit Brand Modal */}
      {showAddModal && (
        <div style={styles.modalOverlay} className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div style={styles.modalContent} className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>{editingBrand ? 'Edit Brand' : 'Add Brand'}</h2>
            <div style={styles.formGroup}>
              <label style={styles.label}>Brand</label>
              <input
                type="text"
                style={styles.formInput}
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Created On</label>
              <DatePicker
                selected={new Date(formData.createdOn)}
                onChange={(date) => {
                  const formattedDate = date.toISOString().split('T')[0];
                  setFormData({ ...formData, createdOn: formattedDate });
                }}
                dateFormat="dd/MM/yyyy"
                customInput={
                  <input
                    style={styles.formInput}
                    className="form-input"
                  />
                }
              />
            </div>
            <div style={styles.modalActions}>
              <button style={styles.cancelButton} onClick={() => setShowAddModal(false)}>
                <X size={16} style={{ marginRight: '6px' }} />
                CANCEL
              </button>
              <button
                style={styles.saveButton}
                onClick={handleSaveBrand}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save size={16} style={{ marginRight: '6px' }} />
                    SAVE
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={styles.modalOverlay} className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div style={styles.deleteModalContent} className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Confirm Deletion</h2>
            <p style={styles.deleteMessage}>Are you sure you want to delete this brand?</p>
            <div style={styles.modalActions}>
              <button style={styles.cancelButton} onClick={() => setShowDeleteModal(false)}>
                CANCEL
              </button>
              <button style={styles.deleteButton} onClick={handleConfirmDelete}>
                DELETE
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
    padding: '24px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#212529',
    margin: 0,
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#0066ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    letterSpacing: '0.5px',
  },
  searchContainer: {
    marginBottom: '24px',
  },
  searchWrapper: {
    position: 'relative',
    maxWidth: '300px',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6c757d',
  },
  searchInput: {
    width: '100%',
    padding: '10px 12px 10px 40px',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    backgroundColor: '#ffffff',
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeaderRow: {
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #dee2e6',
  },
  tableHeader: {
    padding: '16px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#495057',
  },
  tableHeaderCheckbox: {
    padding: '16px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: '600',
    color: '#495057',
    width: '100px',
  },
  tableRow: {
    borderBottom: '1px solid #dee2e6',
  },
  tableCell: {
    padding: '16px',
    fontSize: '14px',
    color: '#212529',
  },
  tableCellCheckbox: {
    padding: '16px',
    fontSize: '14px',
    color: '#212529',
    width: '100px',
  },
  statusBadge: {
    display: 'inline-block',
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
  },
  rowsPerPage: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  footerText: {
    fontSize: '14px',
    color: '#6c757d',
  },
  select: {
    padding: '6px 8px',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  paginationButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6c757d',
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
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '24px',
    width: '90%',
    maxWidth: '450px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
  },
  deleteModalContent: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '24px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#212529',
    marginTop: 0,
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#495057',
    marginBottom: '8px',
  },
  formInput: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'all 0.2s ease',
  },
  toggleLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#212529',
    cursor: 'pointer',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px',
  },
  cancelButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: '#0066ff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#0066ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  deleteMessage: {
    fontSize: '14px',
    color: '#495057',
    margin: '0 0 20px 0',
  },
};

export default BrandManagement;
