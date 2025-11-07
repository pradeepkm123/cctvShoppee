import React, { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';
import axios from 'axios';

const WarehouseDetails = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });

  // Fetch warehouses from the backend
  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('https://cctvshoppee.onrender.com/api/warehouses');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const filteredWarehouses = warehouses.filter(
    (warehouse) =>
      warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWarehouses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWarehouses = filteredWarehouses.slice(startIndex, endIndex);

  const handleAddWarehouse = () => {
    setCurrentWarehouse(null);
    setFormData({
      name: '',
      contact: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    });
    setIsModalOpen(true);
  };

  const handleEditWarehouse = (warehouse) => {
    setCurrentWarehouse(warehouse);
    setFormData({ ...warehouse });
    setIsModalOpen(true);
  };

  const handleDeleteWarehouse = (warehouse) => {
    setCurrentWarehouse(warehouse);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentWarehouse) {
        // Update existing warehouse
        await axios.put(`https://cctvshoppee.onrender.com/api/warehouses/${currentWarehouse._id}`, formData);
      } else {
        // Add new warehouse
        await axios.post('https://cctvshoppee.onrender.com/api/warehouses', formData);
      }
      fetchWarehouses();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`https://cctvshoppee.onrender.com/api/warehouses/${currentWarehouse._id}`);
      fetchWarehouses();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting warehouse:', error);
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        * {
          box-sizing: border-box;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .warehouse-row {
          transition: all 0.3s ease;
        }
        .warehouse-row:hover {
          background-color: #f8f9fa;
          transform: translateX(4px);
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
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
        }
        .search-input:focus {
          outline: none;
          border-color: #0066ff;
          box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
        }
        .pagination-btn {
          transition: all 0.2s ease;
        }
        .pagination-btn:hover:not(:disabled) {
          background-color: #e9ecef;
          transform: scale(1.05);
        }
        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2>{currentWarehouse ? 'Edit Warehouse' : 'Add Warehouse'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={styles.closeButton}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label>Warehouse Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Contact Person</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Phone No</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Zip Code</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  style={styles.input}
                />
              </div>
              <button type="submit" style={styles.submitButton}>
                {currentWarehouse ? 'Update' : 'Add'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2>Confirm Deletion</h2>
              <button onClick={() => setIsDeleteModalOpen(false)} style={styles.closeButton}>
                <X size={20} />
              </button>
            </div>
            <p>Are you sure you want to delete this warehouse?</p>
            <div style={styles.modalActions}>
              <button onClick={() => setIsDeleteModalOpen(false)} style={styles.cancelButton}>
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} style={styles.deleteButton}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Warehouse Details</h1>
        <button style={styles.addButton} className="add-btn" onClick={handleAddWarehouse}>
          <Plus size={18} style={{ marginRight: '8px' }} />
          ADD WAREHOUSE
        </button>
      </div>

      {/* Search */}
      <div style={styles.searchContainer}>
        <div style={styles.searchWrapper}>
          <Search size={20} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search Warehouses"
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
              <th style={styles.tableHeader}>Warehouse</th>
              <th style={styles.tableHeader}>Contact Person</th>
              <th style={styles.tableHeader}>Phone No</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={{ ...styles.tableHeader, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentWarehouses.map((warehouse, index) => (
              <tr
                key={warehouse._id}
                style={{
                  ...styles.tableRow,
                  animation: `fadeIn 0.3s ease ${index * 0.1}s both`
                }}
                className="warehouse-row"
              >
                <td style={styles.tableCell}>{warehouse.name}</td>
                <td style={styles.tableCell}>{warehouse.contact}</td>
                <td style={styles.tableCell}>{warehouse.phone}</td>
                <td style={styles.tableCell}>{warehouse.email}</td>
                <td style={{ ...styles.tableCell, textAlign: 'right' }}>
                  <div style={styles.actionButtons}>
                    <button
                      style={styles.iconButton}
                      className="action-btn"
                      onClick={() => handleEditWarehouse(warehouse)}
                    >
                      <Edit2 size={16} color="#6c757d" />
                    </button>
                    <button
                      style={styles.iconButton}
                      className="action-btn"
                      onClick={() => handleDeleteWarehouse(warehouse)}
                    >
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
            {startIndex + 1}–{Math.min(endIndex, filteredWarehouses.length)} of {filteredWarehouses.length}
          </span>
          <button
            style={styles.paginationButton}
            className="pagination-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            style={styles.paginationButton}
            className="pagination-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    padding: '24px',
    backgroundColor: '#ffffff',
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
  },
  tableContainer: {
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
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tableRow: {
    borderBottom: '1px solid #dee2e6',
  },
  tableCell: {
    padding: '16px',
    fontSize: '14px',
    color: '#212529',
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
  modal: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '8px',
    width: '500px',
    maxWidth: '90%',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    fontSize: '14px',
  },
  submitButton: {
    backgroundColor: '#0066ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '16px',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '20px',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    color: '#6c757d',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default WarehouseDetails;
