import React, { useState } from 'react';

const SalesPersonManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    location: '',
    mobileNo: ''
  });

  const [employees, setEmployees] = useState([
    { id: 1, employeeName: 'John Doe', employeeId: 'EMP001', location: 'New York', mobileNo: '1234567890' },
    { id: 2, employeeName: 'Jane Smith', employeeId: 'EMP002', location: 'Los Angeles', mobileNo: '9876543210' },
    { id: 3, employeeName: 'Mike Johnson', employeeId: 'EMP003', location: 'Chicago', mobileNo: '5551234567' },
  ]);

  const handleAddEmployee = () => {
    setIsDialogOpen(true);
    setFormData({
      employeeName: '',
      employeeId: '',
      location: '',
      mobileNo: ''
    });
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

  const handleSave = () => {
    if (formData.employeeName && formData.employeeId && formData.location && formData.mobileNo) {
      const newEmployee = {
        id: employees.length + 1,
        ...formData
      };
      setEmployees([...employees, newEmployee]);
      setIsDialogOpen(false);
      setFormData({
        employeeName: '',
        employeeId: '',
        location: '',
        mobileNo: ''
      });
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filteredEmployees.map(emp => emp.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDeleteSelected = () => {
    setEmployees(employees.filter(emp => !selectedRows.includes(emp.id)));
    setSelectedRows([]);
  };

  const filteredEmployees = employees.filter(emp => {
    const nameMatch = emp.employeeName.toLowerCase().includes(filterName.toLowerCase());
    const locationMatch = emp.location.toLowerCase().includes(filterLocation.toLowerCase());
    return nameMatch && locationMatch;
  });

  const paginatedEmployees = filteredEmployees.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Sales Person Details</h1>
        <button style={styles.addButton} onClick={handleAddEmployee}>
          <span style={styles.plusIcon}>+</span> ADD EMPLOYEE
        </button>
      </div>

      <div style={styles.filterSection}>
        <input
          type="text"
          placeholder="Filter Employee Name"
          style={styles.filterInput}
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter Location"
          style={styles.filterInput}
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        />
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeader}>
                <input
                  type="checkbox"
                  style={styles.checkbox}
                  checked={selectedRows.length === filteredEmployees.length && filteredEmployees.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Employee Name</th>
              <th style={styles.tableHeader}>Employee ID</th>
              <th style={styles.tableHeader}>Location</th>
              <th style={styles.tableHeader}>Mobile No</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((employee) => (
                <tr key={employee.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>
                    <input
                      type="checkbox"
                      style={styles.checkbox}
                      checked={selectedRows.includes(employee.id)}
                      onChange={() => handleSelectRow(employee.id)}
                    />
                  </td>
                  <td style={styles.tableCell}>{employee.id}</td>
                  <td style={styles.tableCell}>{employee.employeeName}</td>
                  <td style={styles.tableCell}>{employee.employeeId}</td>
                  <td style={styles.tableCell}>{employee.location}</td>
                  <td style={styles.tableCell}>{employee.mobileNo}</td>
                  <td style={styles.tableCell}>
                    <button style={styles.actionButton}>✏️</button>
                    <button style={styles.actionButton}>🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={styles.emptyCell}>
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={styles.pagination}>
        <div style={styles.paginationLeft}>
          {selectedRows.length > 0 && (
            <button style={styles.deleteButton} onClick={handleDeleteSelected}>
              Delete Selected ({selectedRows.length})
            </button>
          )}
        </div>
        <div style={styles.paginationRight}>
          <span style={styles.paginationText}>Rows per page:</span>
          <select
            style={styles.rowsSelect}
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(0);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span style={styles.paginationText}>
            {currentPage * rowsPerPage + 1}-{Math.min((currentPage + 1) * rowsPerPage, filteredEmployees.length)} of {filteredEmployees.length}
          </span>
          <button
            style={styles.paginationButton}
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            ‹
          </button>
          <button
            style={styles.paginationButton}
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage >= totalPages - 1}
          >
            ›
          </button>
        </div>
      </div>

      {isDialogOpen && (
        <div style={styles.overlay} onClick={handleCloseDialog}>
          <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.dialogTitle}>Add Sales Person</h2>
            
            <div style={styles.formGroup}>
              <input
                type="text"
                name="employeeName"
                placeholder="Employee Name"
                style={styles.input}
                value={formData.employeeName}
                onChange={handleInputChange}
              />
            </div>

            <div style={styles.formGroup}>
              <input
                type="text"
                name="employeeId"
                placeholder="Employee ID"
                style={styles.input}
                value={formData.employeeId}
                onChange={handleInputChange}
              />
            </div>

            <div style={styles.formGroup}>
              <input
                type="text"
                name="location"
                placeholder="Location"
                style={styles.input}
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            <div style={styles.formGroup}>
              <input
                type="tel"
                name="mobileNo"
                placeholder="Mobile No"
                style={styles.input}
                value={formData.mobileNo}
                onChange={handleInputChange}
              />
            </div>

            <div style={styles.dialogFooter}>
              <button style={styles.cancelButton} onClick={handleCloseDialog}>
                <span style={styles.buttonIcon}>✕</span> CANCEL
              </button>
              <button style={styles.saveButton} onClick={handleSave}>
                <span style={styles.buttonIcon}>💾</span> SAVE
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
    background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
    padding: '30px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '0 10px'
  },
  title: {
    fontSize: '32px',
    fontWeight: '600',
    margin: '0',
    color: '#1a1a1a',
    letterSpacing: '-0.5px'
  },
  addButton: {
    background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 28px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
    letterSpacing: '0.5px'
  },
  plusIcon: {
    fontSize: '18px',
    fontWeight: '700'
  },
  filterSection: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    padding: '0 10px'
  },
  filterInput: {
    flex: '1',
    maxWidth: '300px',
    padding: '12px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    outline: 'none',
    background: 'white'
  },
  tableContainer: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    border: '1px solid #e0e0e0'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeaderRow: {
    background: 'linear-gradient(to bottom, #f8f9fa, #f1f3f5)',
    borderBottom: '2px solid #dee2e6'
  },
  tableHeader: {
    padding: '16px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: '600',
    color: '#495057',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  tableRow: {
    borderBottom: '1px solid #f1f3f5',
    transition: 'all 0.2s ease'
  },
  tableCell: {
    padding: '16px',
    fontSize: '14px',
    color: '#495057'
  },
  emptyCell: {
    padding: '40px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#adb5bd'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: '#2196F3'
  },
  actionButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '6px',
    marginRight: '4px',
    borderRadius: '6px',
    transition: 'all 0.2s ease'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    padding: '16px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  paginationLeft: {
    flex: '1'
  },
  paginationRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  paginationText: {
    fontSize: '14px',
    color: '#495057'
  },
  rowsSelect: {
    padding: '6px 12px',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none',
    background: 'white'
  },
  paginationButton: {
    width: '32px',
    height: '32px',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    background: 'white',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  },
  deleteButton: {
    background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 3px 10px rgba(244, 67, 54, 0.3)'
  },
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
    animation: 'fadeIn 0.3s ease',
    padding: '20px'
  },
  dialog: {
    background: 'white',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '600px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    animation: 'slideUp 0.3s ease'
  },
  dialogTitle: {
    fontSize: '28px',
    fontWeight: '600',
    margin: '0 0 32px 0',
    color: '#1a1a1a',
    letterSpacing: '-0.5px'
  },
  formGroup: {
    marginBottom: '24px'
  },
  input: {
    width: '100%',
    padding: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box',
    color: '#495057'
  },
  dialogFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '32px'
  },
  cancelButton: {
    padding: '12px 28px',
    border: 'none',
    borderRadius: '8px',
    background: '#f8f9fa',
    color: '#2196F3',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px'
  },
  saveButton: {
    padding: '12px 32px',
    border: 'none',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
    letterSpacing: '0.5px'
  },
  buttonIcon: {
    fontSize: '16px'
  }
};

export default SalesPersonManager;