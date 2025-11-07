import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const SubCategoryPage = () => {
  // State for sub-categories
  const [subCategories, setSubCategories] = useState([
    { id: 1, name: 'HD CAMERA', createdOn: '2025-08-20', image: null, status: 'Active' },
    { id: 2, name: 'IP CAMERA', createdOn: '2025-08-20', image: null, status: 'Active' },
    { id: 3, name: 'NVR', createdOn: '2025-08-20', image: null, status: 'Active' },
    { id: 4, name: 'XVR', createdOn: '2025-08-20', image: null, status: 'Active' },
    { id: 5, name: 'DVR', createdOn: '2025-08-20', image: null, status: 'Active' },
  ]);

  // State for modal and form
  const [showAddSubCategoryModal, setShowAddSubCategoryModal] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState({
    name: '',
    createdOn: new Date().toISOString().split('T')[0],
    image: null,
    status: 'Active',
  });

  // State for search and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter sub-categories
  const filteredSubCategories = subCategories.filter((subCat) =>
    subCat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredSubCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubCategories = filteredSubCategories.slice(startIndex, endIndex);

  // Handle adding a new sub-category
  const handleAddSubCategory = () => {
    setSubCategories([
      ...subCategories,
      { ...newSubCategory, id: subCategories.length + 1 }
    ]);
    setShowAddSubCategoryModal(false);
    setNewSubCategory({
      name: '',
      createdOn: new Date().toISOString().split('T')[0],
      image: null,
      status: 'Active',
    });
  };

  // Handle deleting a sub-category
  const handleDeleteSubCategory = (id) => {
    setSubCategories(subCategories.filter((subCat) => subCat.id !== id));
  };

  return (
    <div style={styles.container}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tab-button {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .tab-button::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #0066ff, #00a8ff);
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }
        .tab-button:hover {
          background-color: #f8f9fa;
          color: #0066ff;
        }
        .tab-button.active {
          color: #0066ff;
          font-weight: 600;
          background: linear-gradient(180deg, rgba(0, 102, 255, 0.05) 0%, rgba(0, 102, 255, 0) 100%);
        }
        .tab-button.active::before {
          width: 100%;
        }
        .tab-button.active::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #0066ff, transparent);
        }
        .table-row {
          transition: all 0.2s ease;
        }
        .table-row:hover {
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
      `}</style>

      <div style={styles.header}>
        <h1 style={styles.title}>Sub Category Management</h1>
      </div>

      <div style={styles.content}>
        <div style={styles.tableHeader}>
          <input
            type="text"
            placeholder="Filter Sub Category"
            style={styles.filterSearch}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            style={styles.addCategoryButton}
            className="add-btn"
            onClick={() => setShowAddSubCategoryModal(true)}
          >
            <Plus size={18} style={{ marginRight: '8px' }} />
            ADD SUB CATEGORY
          </button>
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeaderCell}>Sub Category Name</th>
                <th style={styles.tableHeaderCell}>Created On</th>
                <th style={styles.tableHeaderCell}>Sub Category Image</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSubCategories.map((subCat) => (
                <tr key={subCat.id} style={styles.tableRow} className="table-row">
                  <td style={styles.tableCell}>{subCat.name}</td>
                  <td style={styles.tableCell}>{subCat.createdOn}</td>
                  <td style={styles.tableCell}>
                    {subCat.image ? (
                      <img src={subCat.image} alt="Sub Category" style={styles.categoryImage} />
                    ) : (
                      <div style={styles.placeholderImage}>No Image</div>
                    )}
                  </td>
                  <td style={styles.tableCell}>
                    <span style={styles.statusBadge}>{subCat.status}</span>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <button style={styles.iconButton} className="action-btn">
                        <Edit2 size={16} color="#6c757d" />
                      </button>
                      <button
                        style={styles.iconButton}
                        className="action-btn"
                        onClick={() => handleDeleteSubCategory(subCat.id)}
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

        <div style={styles.pagination}>
          <div style={styles.paginationInfo}>
            <span>Rows per page:</span>
            <select
              style={styles.paginationSelect}
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
          <div style={styles.paginationControls}>
            <span>
              {startIndex + 1}–{Math.min(endIndex, filteredSubCategories.length)} of {filteredSubCategories.length}
            </span>
            <button
              style={styles.paginationButton}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              style={styles.paginationButton}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Add Sub Category Modal */}
      {showAddSubCategoryModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Add Sub Category</h3>
            <div style={styles.modalForm}>
              <label style={styles.modalLabel}>Sub Category Name:</label>
              <input
                type="text"
                style={styles.modalInput}
                value={newSubCategory.name}
                onChange={(e) => setNewSubCategory({ ...newSubCategory, name: e.target.value })}
              />
              <label style={styles.modalLabel}>Created On:</label>
              <input
                type="date"
                style={styles.modalInput}
                value={newSubCategory.createdOn}
                onChange={(e) => setNewSubCategory({ ...newSubCategory, createdOn: e.target.value })}
              />
              <label style={styles.modalLabel}>Sub Category Image:</label>
              <input
                type="file"
                style={styles.modalInput}
                onChange={(e) => setNewSubCategory({ ...newSubCategory, image: e.target.files[0] })}
              />
              <div style={styles.modalActions}>
                <button style={styles.modalButton} onClick={handleAddSubCategory}>
                  Save
                </button>
                <button
                  style={{ ...styles.modalButton, backgroundColor: '#6c757d' }}
                  onClick={() => {
                    setShowAddSubCategoryModal(false);
                    setNewSubCategory({
                      name: '',
                      createdOn: new Date().toISOString().split('T')[0],
                      image: null,
                      status: 'Active',
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
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
    padding: '24px',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#212529',
    margin: 0,
  },
  content: {
    animation: 'fadeIn 0.3s ease',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    gap: '16px',
  },
  filterSearch: {
    padding: '10px 12px',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    width: '300px',
  },
  addCategoryButton: {
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
  },
  tableContainer: {
    overflowX: 'auto',
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
  tableHeaderCell: {
    padding: '16px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: '600',
    color: '#495057',
  },
  tableRow: {
    borderBottom: '1px solid #dee2e6',
  },
  tableCell: {
    padding: '16px',
    fontSize: '14px',
    color: '#212529',
  },
  categoryImage: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  placeholderImage: {
    width: '50px',
    height: '50px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: '#6c757d',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: '#28a745',
    color: '#ffffff',
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
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
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
  },
  paginationInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    color: '#6c757d',
  },
  paginationSelect: {
    padding: '6px 8px',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
  },
  paginationControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '14px',
    color: '#6c757d',
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
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '90%',
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '16px',
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  modalLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#495057',
  },
  modalInput: {
    padding: '10px 12px',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: '#ffffff',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '16px',
  },
  modalButton: {
    padding: '8px 16px',
    backgroundColor: '#0066ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default SubCategoryPage;
