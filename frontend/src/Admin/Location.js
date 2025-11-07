import React, { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, Plus, ChevronLeft, ChevronRight, X, Save } from 'lucide-react';
import axios from 'axios';

const LocationManagement = () => {
  // State for locations and warehouses
  const [locations, setLocations] = useState([]);
  const [warehouses] = useState(['HEAD OFFICE', 'JAIPUR', 'porur', 'N/A']);

  // State for search, pagination, and modals
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [editingLocation, setEditingLocation] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    warehouse: '',
    createdOn: new Date().toISOString().split('T')[0],
    status: true
  });

  // Fetch locations from backend
  const fetchLocations = async () => {
    try {
      const response = await axios.get('https://cctvshoppee.onrender.com/api/locations');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Filter locations based on search term
  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.warehouse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLocations = filteredLocations.slice(startIndex, endIndex);

  // Toggle checkbox for a location
  const handleCheckbox = (id) => {
    setLocations(locations.map(location =>
      location.id === id ? { ...location, checked: !location.checked } : location
    ));
  };

  // Open Add Location modal
  const handleAddLocation = () => {
    setEditingLocation(null);
    setFormData({
      name: '',
      warehouse: '',
      createdOn: new Date().toISOString().split('T')[0],
      status: true
    });
    setShowAddModal(true);
  };

  // Open Edit Location modal
  const handleEditLocation = (location) => {
    setEditingLocation(location);
    setFormData({
      name: location.name,
      warehouse: location.warehouse,
      createdOn: location.createdOn,
      status: location.status === 'Active'
    });
    setShowAddModal(true);
  };

  // Save Location (Add or Edit)
  const handleSaveLocation = async () => {
    try {
      const locationData = {
        name: formData.name,
        warehouse: formData.warehouse,
        createdOn: formData.createdOn,
        status: formData.status ? 'Active' : 'Inactive'
      };

      if (editingLocation) {
        // Update existing location
        await axios.put(`https://cctvshoppee.onrender.com/api/locations/${editingLocation._id}`, locationData);
      } else {
        // Add new location
        await axios.post('https://cctvshoppee.onrender.com/api/locations', locationData);
      }

      // Refresh the locations list
      await fetchLocations();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  // Open Delete Confirmation modal
  const handleDeleteClick = (location) => {
    setSelectedLocation(location);
    setShowDeleteModal(true);
  };

  // Confirm Delete Location
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`https://cctvshoppee.onrender.com/api/locations/${selectedLocation._id}`);
      // Refresh the locations list
      await fetchLocations();
      setShowDeleteModal(false);
      setSelectedLocation(null);
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  // Format date for display
  const formatDateDisplay = (dateStr) => {
    const date = new Date(dateStr);
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

        .location-row {
          transition: all 0.2s ease;
        }

        .location-row:hover {
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

        .form-input:focus, .form-select:focus {
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
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }

        .cancel-btn:hover {
          background-color: #f8f9fa;
        }

        .save-btn:hover {
          background-color: #0056d2;
        }

        .delete-btn:hover {
          background-color: #c82333;
        }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Location</h1>
        <button style={styles.addButton} className="add-btn" onClick={handleAddLocation}>
          <Plus size={18} style={{ marginRight: '8px' }} />
          ADD LOCATION
        </button>
      </div>

      {/* Search */}
      <div style={styles.searchContainer}>
        <div style={styles.searchWrapper}>
          <Search size={20} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search Locations"
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
              <th style={styles.tableHeaderCheckbox}></th>
              <th style={styles.tableHeader}>Location Name</th>
              <th style={styles.tableHeader}>Warehouse</th>
              <th style={styles.tableHeader}>Created On</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={{ ...styles.tableHeader, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentLocations.map((location, index) => (
              <tr
                key={location._id}
                style={{
                  ...styles.tableRow,
                  animation: `fadeIn 0.3s ease ${index * 0.1}s both`
                }}
                className="location-row"
              >
                <td style={styles.tableCellCheckbox}>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={location.checked}
                    onChange={() => handleCheckbox(location._id)}
                  />
                </td>
                <td style={styles.tableCell}>{location.name}</td>
                <td style={styles.tableCell}>{location.warehouse}</td>
                <td style={styles.tableCell}>{formatDateDisplay(location.createdOn)}</td>
                <td style={styles.tableCell}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: location.status === 'Active' ? '#28a745' : '#dc3545',
                    color: '#ffffff'
                  }} className="status-badge">
                    {location.status}
                  </span>
                </td>
                <td style={{ ...styles.tableCell, textAlign: 'right' }}>
                  <div style={styles.actionButtons}>
                    <button style={styles.iconButton} className="action-btn" onClick={() => handleEditLocation(location)}>
                      <Edit2 size={16} color="#6c757d" />
                    </button>
                    <button style={styles.iconButton} className="action-btn" onClick={() => handleDeleteClick(location)}>
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
            {startIndex + 1}–{Math.min(endIndex, filteredLocations.length)} of {filteredLocations.length}
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

      {/* Add/Edit Location Modal */}
      {showAddModal && (
        <div style={styles.modalOverlay} className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div style={styles.modalContent} className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>{editingLocation ? 'Edit Location' : 'Add Location'}</h2>

            <div style={styles.formGroup}>
              <label style={styles.label}>Location Name</label>
              <input
                type="text"
                style={styles.formInput}
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Warehouse</label>
              <select
                style={styles.formSelect}
                className="form-select"
                value={formData.warehouse}
                onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
              >
                <option value="">Select Warehouse</option>
                {warehouses.map((wh, idx) => (
                  <option key={idx} value={wh}>{wh}</option>
                ))}
              </select>
            </div>

          <div style={styles.formGroup}>
              <label style={styles.label}>Created On</label>
              <input
                type="date"
                style={styles.formInput}
                className="form-input"
                value={formData.createdOn}
                onChange={(e) => setFormData({ ...formData, createdOn: e.target.value })}
              />
            </div>
                
            <div style={styles.modalActions}>
              <button style={styles.cancelButton} className="cancel-btn" onClick={() => setShowAddModal(false)}>
                <X size={18} style={{ marginRight: '6px' }} />
                CANCEL
              </button>
              <button style={styles.saveButton} className="save-btn" onClick={handleSaveLocation}>
                <Save size={18} style={{ marginRight: '6px' }} />
                SAVE
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
            <p style={styles.deleteMessage}>Are you sure you want to delete the selected location?</p>
            <div style={styles.modalActions}>
              <button style={styles.cancelButtonAlt} className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                CANCEL
              </button>
              <button style={styles.deleteButton} className="delete-btn" onClick={handleConfirmDelete}>
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
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
    fontSize: '13px',
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
    width: '50px',
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
    width: '50px',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
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
    borderRadius: '12px',
    padding: '32px',
    width: '90%',
    maxWidth: '600px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  },
  deleteModalContent: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '32px',
    width: '90%',
    maxWidth: '450px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#212529',
    marginTop: 0,
    marginBottom: '24px',
  },
  formGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#0066ff',
    marginBottom: '8px',
  },
  formInput: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #0066ff',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.2s ease',
  },
  formSelect: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    backgroundColor: '#ffffff',
    color: '#999',
    cursor: 'pointer',
  },
  dateInputWrapper: {
    position: 'relative',
  },
  dateDisplay: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  dateInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
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
    gap: '16px',
    marginTop: '32px',
  },
  cancelButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: '#0066ff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  cancelButtonAlt: {
    backgroundColor: 'transparent',
    color: '#0066ff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 24px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#0066ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 24px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  deleteMessage: {
    fontSize: '15px',
    color: '#495057',
    margin: '0 0 20px 0',
    lineHeight: '1.6',
  },
};

export default LocationManagement;
