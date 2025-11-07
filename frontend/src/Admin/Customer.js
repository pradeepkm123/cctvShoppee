import React, { useState } from 'react';
import { Search, Edit2, Trash2, Plus, ChevronLeft, ChevronRight, User } from 'lucide-react';

const CustomerDetails = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      storeName: 'LOOKMAN JAIPUR BRANCH',
      customerName: 'LOOKMAN DISTRIBUTION PVT LTD',
      gstNo: '08AAFCL0861L1ZA',
      mailId: 'rjbilling@lookman.xyz',
      phoneNo: '9571103521',
      storeHandle: 'CHENNAI',
      profilePicture: null,
      checked: false
    },
    {
      id: 2,
      storeName: 'SARTHI SYSTEMS',
      customerName: 'SARTHI SYSTEMS',
      gstNo: '08ACIFS9374B1ZT',
      mailId: 'rjbilling@lookman.xyz',
      phoneNo: '7305980806',
      storeHandle: 'Geetha',
      profilePicture: null,
      checked: false
    },
    {
      id: 3,
      storeName: 'JAIPUR',
      customerName: 'pradeep kumar',
      gstNo: '12345679901234S',
      mailId: 'rolex123@gmail.com',
      phoneNo: '9123520096',
      storeHandle: 'prakii',
      profilePicture: null,
      checked: false
    },
    {
      id: 4,
      storeName: 'SREE & SREE ASSOCIATES',
      customerName: 'SREE & SREE ASSOCIATES',
      gstNo: '32FFWPS0491M1Z1',
      mailId: 'salessupport@lookman.xyz',
      phoneNo: '7907192199',
      storeHandle: 'GEETHA',
      profilePicture: null,
      checked: false
    },
    {
      id: 5,
      storeName: 'Usha Jothi Enterprises',
      customerName: 'Mr.Parthiban',
      gstNo: '123ge85901251gt',
      mailId: 'salessupport@lookman.xyz',
      phoneNo: '9940180382',
      storeHandle: 'geetha',
      profilePicture: null,
      checked: false
    }
  ]);

  const [filterName, setFilterName] = useState('');
  const [filterGST, setFilterGST] = useState('');
  const [filterPhone, setFilterPhone] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredCustomers = customers.filter(customer => {
    const matchesName = customer.customerName.toLowerCase().includes(filterName.toLowerCase()) ||
                        customer.storeName.toLowerCase().includes(filterName.toLowerCase());
    const matchesGST = customer.gstNo.toLowerCase().includes(filterGST.toLowerCase());
    const matchesPhone = customer.phoneNo.includes(filterPhone);
    return matchesName && matchesGST && matchesPhone;
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  const handleCheckbox = (id) => {
    setCustomers(customers.map(customer =>
      customer.id === id ? { ...customer, checked: !customer.checked } : customer
    ));
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setCustomers(customers.map(customer => ({ ...customer, checked: isChecked })));
  };

  return (
    <div style={styles.container}>
      <style>{`
        * { box-sizing: border-box; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .customer-row {
          transition: all 0.2s ease;
        }

        .customer-row:hover {
          background-color: #f8f9fa;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
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
          box-shadow: 0 6px 16px rgba(0, 102, 255, 0.3);
        }

        .filter-input:focus {
          outline: none;
          border-color: #0066ff;
          box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
        }

        .checkbox {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #0066ff;
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

        .profile-placeholder {
          transition: all 0.2s ease;
        }

        .profile-placeholder:hover {
          background-color: #e3f2fd;
        }
      `}</style>

      <div style={styles.header}>
        <h1 style={styles.title}>Customer Details</h1>
        <button style={styles.addButton} className="add-btn">
          <Plus size={18} style={{ marginRight: '8px' }} />
          ADD CUSTOMER
        </button>
      </div>

      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="Filter Customer Name"
          style={styles.filterInput}
          className="filter-input"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter GST No"
          style={styles.filterInput}
          className="filter-input"
          value={filterGST}
          onChange={(e) => setFilterGST(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter Phone No"
          style={styles.filterInput}
          className="filter-input"
          value={filterPhone}
          onChange={(e) => setFilterPhone(e.target.value)}
        />
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeaderCheckbox}>
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={handleSelectAll}
                />
              </th>
              <th style={styles.tableHeader}>#</th>
              <th style={styles.tableHeader}>Store Name</th>
              <th style={styles.tableHeader}>Customer Name</th>
              <th style={styles.tableHeader}>GST No</th>
              <th style={styles.tableHeader}>Mail ID</th>
              <th style={styles.tableHeader}>Phone No</th>
              <th style={styles.tableHeader}>Store Handle</th>
              <th style={styles.tableHeader}>Profile Picture</th>
              <th style={{ ...styles.tableHeader, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer, index) => (
              <tr
                key={customer.id}
                style={{
                  ...styles.tableRow,
                  animation: `slideIn 0.3s ease ${index * 0.05}s both`
                }}
                className="customer-row"
              >
                <td style={styles.tableCellCheckbox}>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={customer.checked}
                    onChange={() => handleCheckbox(customer.id)}
                  />
                </td>
                <td style={styles.tableCell}>{customer.id}</td>
                <td style={styles.tableCell}>{customer.storeName}</td>
                <td style={styles.tableCell}>{customer.customerName}</td>
                <td style={styles.tableCell}>{customer.gstNo}</td>
                <td style={styles.tableCell}>{customer.mailId}</td>
                <td style={styles.tableCell}>{customer.phoneNo}</td>
                <td style={styles.tableCell}>{customer.storeHandle}</td>
                <td style={styles.tableCell}>
                  <div style={styles.profilePlaceholder} className="profile-placeholder">
                    {customer.profilePicture ? (
                      <img src={customer.profilePicture} alt="Profile" style={styles.profileImage} />
                    ) : (
                      <div style={styles.noImageContainer}>
                        <User size={16} color="#9ca3af" />
                        <span style={styles.noImageText}>No image</span>
                      </div>
                    )}
                  </div>
                </td>
                <td style={{ ...styles.tableCell, textAlign: 'right' }}>
                  <div style={styles.actionButtons}>
                    <button style={styles.iconButton} className="action-btn">
                      <Edit2 size={16} color="#6c757d" />
                    </button>
                    <button style={styles.iconButton} className="action-btn">
                      <Trash2 size={16} color="#dc3545" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
            {startIndex + 1}–{Math.min(endIndex, filteredCustomers.length)} of {filteredCustomers.length}
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
  filterContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  filterInput: {
    flex: 1,
    minWidth: '200px',
    padding: '10px 12px',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    backgroundColor: '#ffffff',
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
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
    padding: '16px 12px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: '600',
    color: '#495057',
    whiteSpace: 'nowrap',
  },
  tableHeaderCheckbox: {
    padding: '16px 12px',
    width: '50px',
  },
  tableRow: {
    borderBottom: '1px solid #dee2e6',
  },
  tableCell: {
    padding: '16px 12px',
    fontSize: '14px',
    color: '#212529',
  },
  tableCellCheckbox: {
    padding: '16px 12px',
    width: '50px',
  },
  profilePlaceholder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    height: '40px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    border: '1px solid #e9ecef',
  },
  noImageContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  noImageText: {
    fontSize: '12px',
    color: '#9ca3af',
  },
  profileImage: {
    width: '40px',
    height: '40px',
    borderRadius: '6px',
    objectFit: 'cover',
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
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
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
};

export default CustomerDetails;