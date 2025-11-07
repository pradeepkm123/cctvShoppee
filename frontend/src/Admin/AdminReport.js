import React, { useState, useEffect } from 'react';

// Dialog Component
const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <button className="dialog-close" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('inward');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showElements, setShowElements] = useState({
    header: false,
    tabs: false,
    stat1: false,
    stat2: false,
    stat3: false,
    filters: false,
    table: false
  });
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    brand: 'all',
    category: 'all'
  });

  useEffect(() => {
    const delays = [
      { key: 'header', delay: 100 },
      { key: 'tabs', delay: 300 },
      { key: 'stat1', delay: 500 },
      { key: 'stat2', delay: 700 },
      { key: 'stat3', delay: 900 },
      { key: 'filters', delay: 1100 },
      { key: 'table', delay: 1300 }
    ];

    delays.forEach(({ key, delay }) => {
      setTimeout(() => {
        setShowElements(prev => ({ ...prev, [key]: true }));
      }, delay);
    });
  }, []);

  const inwardData = [
    { date: '2025-09-01T08:31:04.229Z', location: 'Chennai', brand: 'Coloron', model: 'SHD-VB5011CM', category: 'cctv', quantity: 0, stock: 0, subCategory: 'Camera', price: 300 },
    { date: '2025-09-01T08:34:24.730Z', location: 'Chennai', brand: 'COLOR ON', model: 'CO-N-322', category: 'NVR', quantity: 0, stock: 0, subCategory: 'NVR', price: 50000 },
    { date: '2025-09-01T09:02:13.389Z', location: 'Chennai', brand: 'COLOR ON', model: 'CO-N-322', category: 'NVR', quantity: 33, stock: 33, subCategory: 'NVR', price: 50000 },
    { date: '2025-09-04T09:19:09.933Z', location: 'Chennai', brand: 'COLOR ON', model: 'CO-N-081', category: 'NVR', quantity: 6, stock: 6, subCategory: 'NVR', price: 2349 },
    { date: '2025-09-06T10:20:53.369Z', location: 'Chennai', brand: 'COLOR ON', model: 'CO-N-041', category: 'NVR', quantity: 56, stock: 56, subCategory: 'NVR', price: 28900 }
  ];

  const outwardData = [
    { date: '2025-09-10T10:06:18.019Z', invoice: 'INV005', customer: 'LOOKMAN DISTRIBUTION PVT LTD', email: 'qbilling@lookman.xyz', phone: '9571103521', salesPerson: 'asdasd', quantity: 30, model: 'SIP-VD401MA', price: 3100 },
    { date: '2025-09-11T11:07:25.393Z', invoice: 'INV007', customer: 'SARTHI SYSTEMS', email: 'qbilling@lookman.xyz', phone: '7305980806', salesPerson: 'RAMESH', quantity: 8, model: 'SIP-VB801A', price: 8500 },
    { date: '2025-09-11T11:07:28.315Z', invoice: 'INV008', customer: 'SARTHI SYSTEMS', email: 'qbilling@lookman.xyz', phone: '7305980806', salesPerson: 'RAMESH', quantity: 8, model: 'SIP-VB801A', price: 8500 },
    { date: '2025-09-15T11:35:38.186Z', invoice: 'INV011', customer: 'LOOKMAN DISTRIBUTION PVT LTD', email: 'qbilling@lookman.xyz', phone: '9571103521', salesPerson: 'ANIL', quantity: 40, model: 'CO-N-041', price: 2750 },
    { date: '2025-09-15T11:41:09.634Z', invoice: 'INV012', customer: 'LOOKMAN DISTRIBUTION PVT LTD', email: 'qbilling@lookman.xyz', phone: '9571103521', salesPerson: 'ANIL', quantity: 56, model: 'CO-N-081', price: 3500 }
  ];

  const inwardStats = {
    total: 7,
    quantity: 97,
    value: 3300793
  };

  const outwardStats = {
    total: 30,
    quantity: 1248,
    value: 6773480
  };

  const currentData = activeTab === 'inward' ? inwardData : outwardData;
  const currentStats = activeTab === 'inward' ? inwardStats : outwardStats;

  return (
    <div className="app">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #ffffff;
          min-height: 100vh;
        }

        .app {
          padding: 40px;
          margin: 0 auto;
        }

        .fade-in {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header-section {
          margin-bottom: 32px;
          opacity: 0;
        }

        .header-section.show {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .header-title h1 {
          font-size: 36px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 8px;
        }

        .header-title p {
          color: #6c757d;
          font-size: 16px;
        }

        .header-actions {
          display: flex;
          gap: 16px;
        }

        .btn {
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-scan {
          background: #4361ee;
          color: white;
          box-shadow: 0 4px 14px rgba(67, 97, 238, 0.25);
        }

        .btn-scan:hover {
          background: #3651de;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(67, 97, 238, 0.35);
        }

        .btn-scan:active {
          transform: translateY(0);
        }

        .btn-export {
          background: #06d6a0;
          color: white;
          box-shadow: 0 4px 14px rgba(6, 214, 160, 0.25);
        }

        .btn-export:hover {
          background: #05c792;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(6, 214, 160, 0.35);
        }

        .tabs-container {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
          opacity: 0;
        }

        .tabs-container.show {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .tab {
          padding: 16px 32px;
          border-radius: 12px;
          background: #f8f9fa;
          border: 2px solid transparent;
          font-size: 16px;
          font-weight: 600;
          color: #6c757d;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tab.active {
          background: #4361ee;
          color: white;
          border-color: #4361ee;
          box-shadow: 0 4px 14px rgba(67, 97, 238, 0.25);
        }

        .tab:hover:not(.active) {
          background: #e9ecef;
          border-color: #dee2e6;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          display: flex;
          align-items: center;
          gap: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          opacity: 0;
          border: 2px solid #f1f3f5;
        }

        .stat-card.show {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          border-color: #e9ecef;
        }

        .stat-card.purple {
          border-left: 4px solid #7209b7;
        }

        .stat-card.blue {
          border-left: 4px solid #4361ee;
        }

        .stat-card.green {
          border-left: 4px solid #06d6a0;
        }

        .stat-icon {
          width: 72px;
          height: 72px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
        }

        .stat-icon.purple {
          background: linear-gradient(135deg, #7209b7 0%, #9d4edd 100%);
          box-shadow: 0 8px 16px rgba(114, 9, 183, 0.2);
        }

        .stat-icon.blue {
          background: linear-gradient(135deg, #4361ee 0%, #7209b7 100%);
          box-shadow: 0 8px 16px rgba(67, 97, 238, 0.2);
        }

        .stat-icon.green {
          background: linear-gradient(135deg, #06d6a0 0%, #1dd3b0 100%);
          box-shadow: 0 8px 16px rgba(6, 214, 160, 0.2);
        }

        .stat-info h3 {
          color: #6c757d;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          margin-bottom: 8px;
        }

        .stat-info p {
          color: #1a1a2e;
          font-size: 34px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .filters-section {
          background: white;
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 2px solid #f1f3f5;
          opacity: 0;
        }

        .filters-section.show {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .filters {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .filter-group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #495057;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .filter-group input,
        .filter-group select {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 15px;
          background: white;
          transition: all 0.3s ease;
          color: #495057;
        }

        .filter-group input:focus,
        .filter-group select:focus {
          outline: none;
          border-color: #4361ee;
          box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
        }

        .btn-clear {
          background: #f8f9fa;
          color: #495057;
          border: 2px solid #e9ecef;
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-clear:hover {
          background: white;
          border-color: #dee2e6;
        }

        .table-container {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 2px solid #f1f3f5;
          opacity: 0;
        }

        .table-container.show {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }

        th {
          text-align: left;
          padding: 18px 24px;
          font-size: 12px;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 1.2px;
        }

        td {
          padding: 20px 24px;
          font-size: 15px;
          color: #495057;
          border-bottom: 1px solid #f1f3f5;
        }

        tbody tr {
          transition: all 0.2s ease;
        }

        tbody tr:hover {
          background: #f8f9fa;
        }

        tbody tr:last-child td {
          border-bottom: none;
        }

        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: #f8f9fa;
          border-top: 2px solid #f1f3f5;
        }

        .pagination-info {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .pagination span {
          font-size: 14px;
          color: #6c757d;
          font-weight: 500;
        }

        .pagination-btns {
          display: flex;
          gap: 10px;
        }

        .pagination button {
          background: white;
          border: 2px solid #e9ecef;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-weight: 700;
          color: #495057;
        }

        .pagination button:hover:not(:disabled) {
          background: #4361ee;
          border-color: #4361ee;
          color: white;
          transform: scale(1.05);
        }

        .pagination button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        /* Dialog Styles */
        .dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(26, 26, 46, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .dialog-content {
          background: white;
          border-radius: 20px;
          padding: 48px;
          max-width: 520px;
          width: 90%;
          position: relative;
          animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .dialog-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #f8f9fa;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 20px;
          color: #6c757d;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-weight: 700;
        }

        .dialog-close:hover {
          background: #e9ecef;
          color: #1a1a2e;
          transform: rotate(90deg);
        }

        .dialog-body {
          text-align: center;
        }

        .dialog-icon {
          width: 96px;
          height: 96px;
          margin: 0 auto 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4361ee 0%, #7209b7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          box-shadow: 0 12px 32px rgba(67, 97, 238, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .dialog-body h2 {
          font-size: 32px;
          color: #1a1a2e;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .dialog-body p {
          color: #6c757d;
          font-size: 17px;
          line-height: 1.7;
          margin-bottom: 36px;
        }

        .dialog-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        .dialog-actions button {
          padding: 16px 36px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dialog-actions .btn-primary {
          background: #4361ee;
          color: white;
          border: none;
          box-shadow: 0 4px 16px rgba(67, 97, 238, 0.3);
        }

        .dialog-actions .btn-primary:hover {
          background: #3651de;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(67, 97, 238, 0.4);
        }

        .dialog-actions .btn-secondary {
          background: white;
          color: #6c757d;
          border: 2px solid #e9ecef;
        }

        .dialog-actions .btn-secondary:hover {
          background: #f8f9fa;
          border-color: #dee2e6;
        }
      `}</style>

      <div className={`header-section ${showElements.header ? 'show' : ''}`}>
        <div className="header">
          <div className="header-title">
            <h1>Reports Dashboard</h1>
            <p>Transaction history and analytics overview</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-scan" onClick={() => setIsDialogOpen(true)}>
              <span>📷</span> Start Scanning
            </button>
            <button className="btn btn-export">
              <span>⬇</span> Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className={`tabs-container ${showElements.tabs ? 'show' : ''}`}>
        <button 
          className={`tab ${activeTab === 'inward' ? 'active' : ''}`}
          onClick={() => setActiveTab('inward')}
        >
          <span>📥</span> Inward Transactions
        </button>
        <button 
          className={`tab ${activeTab === 'outward' ? 'active' : ''}`}
          onClick={() => setActiveTab('outward')}
        >
          <span>📤</span> Outward Transactions
        </button>
      </div>

      <div className="stats">
        <div className={`stat-card purple ${showElements.stat1 ? 'show' : ''}`}>
          <div className="stat-icon purple">📊</div>
          <div className="stat-info">
            <h3>Total Transactions</h3>
            <p>{currentStats.total}</p>
          </div>
        </div>
        <div className={`stat-card blue ${showElements.stat2 ? 'show' : ''}`}>
          <div className="stat-icon blue">📦</div>
          <div className="stat-info">
            <h3>Total Quantity</h3>
            <p>{currentStats.quantity}</p>
          </div>
        </div>
        <div className={`stat-card green ${showElements.stat3 ? 'show' : ''}`}>
          <div className="stat-icon green">💰</div>
          <div className="stat-info">
            <h3>Total Value</h3>
            <p>₹{currentStats.value.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className={`filters-section ${showElements.filters ? 'show' : ''}`}>
        <div className="filters">
          <div className="filter-group">
            <label>From Date</label>
            <input 
              type="date" 
              value={filters.fromDate}
              onChange={(e) => setFilters({...filters, fromDate: e.target.value})}
            />
          </div>
          <div className="filter-group">
            <label>To Date</label>
            <input 
              type="date" 
              value={filters.toDate}
              onChange={(e) => setFilters({...filters, toDate: e.target.value})}
            />
          </div>
          <div className="filter-group">
            <label>Brand</label>
            <select 
              value={filters.brand}
              onChange={(e) => setFilters({...filters, brand: e.target.value})}
            >
              <option value="all">All Brands</option>
              <option value="coloron">Color ON</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Category</label>
            <select 
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="all">All Categories</option>
              <option value="nvr">NVR</option>
              <option value="cctv">CCTV</option>
            </select>
          </div>
        </div>
        <button className="btn-clear" onClick={() => setFilters({fromDate: '', toDate: '', brand: 'all', category: 'all'})}>
          Clear All Filters
        </button>
      </div>

      <div className={`table-container ${showElements.table ? 'show' : ''}`}>
        <table>
          <thead>
            <tr>
              {activeTab === 'inward' ? (
                <>
                  <th>Date/Time</th>
                  <th>Location</th>
                  <th>Brand</th>
                  <th>Product Model</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Stock</th>
                  <th>Sub Category</th>
                  <th>Price</th>
                </>
              ) : (
                <>
                  <th>Date/Time</th>
                  <th>Invoice No</th>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Sales Person</th>
                  <th>Quantity</th>
                  <th>Model</th>
                  <th>Price</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, idx) => (
              <tr key={idx}>
                {activeTab === 'inward' ? (
                  <>
                    <td>{new Date(row.date).toLocaleString()}</td>
                    <td>{row.location}</td>
                    <td>{row.brand}</td>
                    <td>{row.model}</td>
                    <td>{row.category}</td>
                    <td>{row.quantity}</td>
                    <td>{row.stock}</td>
                    <td>{row.subCategory}</td>
                    <td>₹{row.price}</td>
                  </>
                ) : (
                  <>
                    <td>{new Date(row.date).toLocaleString()}</td>
                    <td>{row.invoice}</td>
                    <td>{row.customer}</td>
                    <td>{row.email}</td>
                    <td>{row.phone}</td>
                    <td>{row.salesPerson}</td>
                    <td>{row.quantity}</td>
                    <td>{row.model}</td>
                    <td>₹{row.price}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <div className="pagination-info">
            <span>Rows per page: 5</span>
            <span>Showing 1-5 of {currentData.length}</span>
          </div>
          <div className="pagination-btns">
            <button disabled>←</button>
            <button>→</button>
          </div>
        </div>
      </div>

      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <div className="dialog-body">
          <div className="dialog-icon">📷</div>
          <h2>Start Scanning</h2>
          <p>Ready to scan products? Click below to open the scanner and begin capturing barcodes or QR codes.</p>
          <div className="dialog-actions">
            <button className="btn-primary">Open Scanner</button>
            <button className="btn-secondary" onClick={() => setIsDialogOpen(false)}>Cancel</button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default App;