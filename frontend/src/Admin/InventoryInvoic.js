import React, { useState, useEffect } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showElements, setShowElements] = useState({
    header: false,
    search: false
  });
  const [visibleRows, setVisibleRows] = useState([]);

  useEffect(() => {
    const delays = [
      { key: 'header', delay: 100 },
      { key: 'search', delay: 300 }
    ];

    delays.forEach(({ key, delay }) => {
      setTimeout(() => {
        setShowElements(prev => ({ ...prev, [key]: true }));
      }, delay);
    });

    // Animate table rows one by one
    setTimeout(() => {
      filteredInvoices.forEach((_, index) => {
        setTimeout(() => {
          setVisibleRows(prev => [...prev, index]);
        }, 500 + (index * 150));
      });
    }, 500);
  }, []);

  const invoices = [
    {
      id: 'INV044',
      customerName: 'LOOKMAN DISTRIBUTION PVT LTD',
      price: 5500,
      quantity: 180,
      salesPerson: 'ANIL',
      dispatchDate: '9/22/2025',
      barcodeScanned: 'SEIP C2M20076477,SIP-20EH537W-D3S,Dome 2MP IP camera Varifocal lens...',
      invoiceDate: '9/22/2025',
      storeName: 'LOOKMAN JAYPEE BRANCH',
      address: 'NARASIMHA TANK, NADI, INDIA, 600055',
      from: {
        name: 'GEETHANJALI',
        company: 'LOOKMAN DISTRIBUTION PVT LTD',
        email: 'demo@lookman.xyz',
        phone: '7047574236'
      },
      to: {
        company: 'LOOKMAN DISTRIBUTION PVT LTD',
        address: 'Bangalore',
        email: 'qbilling@lookman.xyz'
      },
      items: [
        { model: 'SIP-VB001', qty: 180, price: 3500, barcode: 'SEIP C2M20076477,SIP-20EH537W-D3S,Dome 2MP IP camera Varifocal lens, SEIP C2M20076478,SIP-20EH537W-D3S,Dome 2MP IP camera Varifocal lens...', total: 630000 }
      ],
      subtotal: 990000,
      discount: 0,
      total: 990000
    },
    {
      id: 'INV043',
      customerName: 'SARTHI SYSTEMS',
      price: 4200,
      quantity: 150,
      salesPerson: 'RAMESH',
      dispatchDate: '9/20/2025',
      barcodeScanned: 'SEIP C2M20076488,SIP-20EH537W-D3S,Dome 2MP IP camera Varifocal lens...',
      invoiceDate: '9/20/2025',
      storeName: 'SARTHI CHENNAI',
      address: 'ANNA NAGAR, CHENNAI, INDIA, 600040',
      from: {
        name: 'KUMAR',
        company: 'SARTHI SYSTEMS',
        email: 'kumar@sarthi.xyz',
        phone: '9876543210'
      },
      to: {
        company: 'SARTHI SYSTEMS',
        address: 'Chennai',
        email: 'billing@sarthi.xyz'
      },
      items: [
        { model: 'SIP-VD401MA', qty: 150, price: 4200, barcode: 'SEIP C2M20076488,SIP-20EH537W-D3S,Dome 2MP IP camera Varifocal lens', total: 630000 }
      ],
      subtotal: 630000,
      discount: 0,
      total: 630000
    },
    {
      id: 'INV042',
      customerName: 'TECH SOLUTIONS',
      price: 6800,
      quantity: 200,
      salesPerson: 'VIJAY',
      dispatchDate: '9/18/2025',
      barcodeScanned: 'SEIP C2M20076495,SIP-20EH537W-D3S,Dome 2MP IP camera Varifocal lens...',
      invoiceDate: '9/18/2025',
      storeName: 'TECH SOLUTIONS MAIN',
      address: 'MG ROAD, BANGALORE, INDIA, 560001',
      from: {
        name: 'PRAKASH',
        company: 'TECH SOLUTIONS',
        email: 'prakash@tech.xyz',
        phone: '8765432109'
      },
      to: {
        company: 'TECH SOLUTIONS',
        address: 'Bangalore',
        email: 'sales@tech.xyz'
      },
      items: [
        { model: 'CO-N-322', qty: 200, price: 6800, barcode: 'SEIP C2M20076495,SIP-20EH537W-D3S,Dome 2MP IP camera Varifocal lens', total: 1360000 }
      ],
      subtotal: 1360000,
      discount: 0,
      total: 1360000
    }
  ];

  const filteredInvoices = invoices.filter(invoice =>
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (invoiceId) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      // Handle delete logic here
      console.log('Delete invoice:', invoiceId);
    }
  };

  const InvoiceDialog = ({ invoice, onClose }) => {
    if (!invoice) return null;

    return (
      <div className="dialog-overlay" onClick={onClose}>
        <div className="invoice-dialog" onClick={(e) => e.stopPropagation()}>
          <button className="dialog-close" onClick={onClose}>✕</button>
          
          <div className="invoice-header-section">
            <button className="back-btn" onClick={onClose}>
              <span>←</span> GO BACK TO INVOICE
            </button>
            <div className="invoice-info-bar">
              <div className="info-item">
                <span className="label">Invoice for:</span>
                <span className="value">{invoice.id}</span>
              </div>
              <div className="info-item">
                <span className="label">Invoice Date:</span>
                <span className="value">{invoice.invoiceDate}</span>
              </div>
              <div className="info-item">
                <span className="label">Store Name:</span>
                <span className="value">{invoice.storeName}</span>
              </div>
            </div>
          </div>

          <div className="invoice-body">
            <div className="company-header">
              <h1 className="company-name">LOOKMAN</h1>
              <p className="company-subtitle">LOOKMAN DISTRIBUTION PVT LTD, {invoice.address}</p>
            </div>

            <div className="parties-section">
              <div className="party-box">
                <h3>From</h3>
                <p className="party-name">{invoice.from.name}</p>
                <p>{invoice.from.company}</p>
                <p>Email: {invoice.from.email}</p>
                <p>Phone No: {invoice.from.phone}</p>
              </div>
              <div className="party-box">
                <h3>To</h3>
                <p className="party-name">{invoice.to.company}</p>
                <p>{invoice.to.address}</p>
                <p>Email: {invoice.to.email}</p>
              </div>
            </div>

            <div className="invoice-type">
              <strong>Invoice For:</strong> Product Purchase
            </div>

            <div className="items-table-wrapper">
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Model No</th>
                    <th>Qty</th>
                    <th>Single/Pc Price</th>
                    <th>Barcode(s)</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.model}</td>
                      <td>{item.qty}</td>
                      <td>₹{item.price.toLocaleString()}</td>
                      <td className="barcode-text">{item.barcode}</td>
                      <td className="total-cell">₹{item.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="totals-section">
              <div className="total-line">
                <span>Sub Total:</span>
                <span>₹{invoice.subtotal.toLocaleString()}</span>
              </div>
              <div className="total-line">
                <span>Discount (0%):</span>
                <span>₹{invoice.discount}</span>
              </div>
              <div className="total-line grand">
                <span>Total Amount:</span>
                <span>₹{invoice.total.toLocaleString()}.00</span>
              </div>
              <p className="amount-in-words">Amount In Words (Lacs): xxx Twenty Thousand Rs terms only</p>
            </div>

            <div className="signature-area">
              <div>
                <p className="signer-name">GEETHANJALI</p>
                <p className="signer-title">Assistant Manager</p>
              </div>
              <div className="footer-logo">LOOKMAN</div>
            </div>
          </div>

          <div className="invoice-actions">
            <button className="btn-action btn-print">
              <span>🖨</span> PRINT INVOICE
            </button>
            <button className="btn-action btn-download">
              <span>⬇</span> DOWNLOAD INVOICE
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          background: #f0f2f5;
          min-height: 100vh;
        }

        .app {
          padding: 30px;
          margin: 0 auto;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .page-header {
          margin-bottom: 30px;
          opacity: 0;
        }

        .page-header.show {
          animation: slideDown 0.5s ease-out forwards;
        }

        .page-header h1 {
          font-size: 28px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 5px;
        }

        .page-header p {
          color: #7f8c8d;
          font-size: 14px;
        }

        .search-box {
          margin-bottom: 20px;
          opacity: 0;
        }

        .search-box.show {
          animation: slideDown 0.5s ease-out 0.2s forwards;
        }

        .search-input {
          width: 350px;
          padding: 12px 16px;
          border: 1px solid #dfe6e9;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
          background: white;
        }

        .search-input:focus {
          outline: none;
          border-color: #0984e3;
          box-shadow: 0 0 0 3px rgba(9, 132, 227, 0.1);
        }

        .table-wrapper {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .main-table {
          width: 100%;
          border-collapse: collapse;
        }

        .main-table tbody tr {
          opacity: 0;
          transform: translateX(-20px);
        }

        .main-table tbody tr.visible {
          animation: slideInRow 0.5s ease-out forwards;
        }

        @keyframes slideInRow {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .main-table thead {
          background: #ecf0f1;
        }

        .main-table th {
          text-align: left;
          padding: 16px;
          font-size: 12px;
          font-weight: 700;
          color: #2c3e50;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid #dfe6e9;
        }

        .main-table td {
          padding: 18px 16px;
          font-size: 14px;
          color: #2c3e50;
          border-bottom: 1px solid #ecf0f1;
        }

        .main-table tbody tr {
          transition: background 0.2s ease;
        }

        .main-table tbody tr:hover {
          background: #f8f9fa;
        }

        .main-table tbody tr:last-child td {
          border-bottom: none;
        }

        .barcode-column {
          max-width: 500px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
          color: #636e72;
        }

        .view-btn {
          background: #f5f5ff;
          color: #3b47aa;
          border: none;
          width: 38px;
          height: 38px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-size: 18px;
        }

        .view-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
        }

        .delete-btn {
          background: #ff000029;
          color: #740a0a;
          border: none;
          width: 38px;
          height: 38px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-size: 18px;
        }

        .delete-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(238, 90, 111, 0.4);
        }

        .action-buttons {
          display: flex;
          gap: 10px;
        }

        /* Invoice Dialog */
        .dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
          overflow-y: auto;
          padding: 20px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .invoice-dialog {
          background: white;
          width: 100%;
          max-width: 1100px;
          margin: 40px auto;
          position: relative;
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }

        @keyframes slideUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .dialog-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 20px;
          color: #2c3e50;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-weight: 700;
          z-index: 10;
        }

        .dialog-close:hover {
          background: white;
          transform: rotate(90deg);
        }

        .invoice-header-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px 30px;
        }

        .back-btn {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 10px 18px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          margin-bottom: 15px;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .invoice-info-bar {
          display: flex;
          gap: 40px;
        }

        .info-item {
          display: flex;
          gap: 10px;
          color: white;
          font-size: 13px;
        }

        .info-item .label {
          font-weight: 600;
        }

        .invoice-body {
          padding: 40px;
        }

        .company-header {
          text-align: center;
          padding-bottom: 30px;
          border-bottom: 1px solid #ecf0f1;
          margin-bottom: 30px;
        }

        .company-name {
          font-size: 38px;
          font-weight: 700;
          color: #e74c3c;
          margin-bottom: 8px;
          letter-spacing: 2px;
        }

        .company-subtitle {
          color: #7f8c8d;
          font-size: 13px;
        }

        .parties-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          margin-bottom: 30px;
          padding-bottom: 30px;
          border-bottom: 1px dashed #dfe6e9;
        }

        .party-box h3 {
          font-size: 13px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .party-box p {
          color: #636e72;
          font-size: 13px;
          margin-bottom: 6px;
        }

        .party-name {
          font-weight: 700;
          color: #2c3e50 !important;
        }

        .invoice-type {
          background: #f8f9fa;
          padding: 15px 20px;
          margin-bottom: 25px;
          border-left: 4px solid #667eea;
          font-size: 14px;
          color: #2c3e50;
        }

        .items-table-wrapper {
          margin-bottom: 30px;
          overflow-x: auto;
        }

        .items-table {
          width: 100%;
          border-collapse: collapse;
        }

        .items-table thead {
          background: #2c3e50;
        }

        .items-table th {
          text-align: left;
          padding: 14px;
          font-size: 12px;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .items-table td {
          padding: 16px 14px;
          font-size: 13px;
          color: #2c3e50;
          border-bottom: 1px solid #ecf0f1;
        }

        .barcode-text {
          font-size: 11px;
          color: #636e72;
          line-height: 1.5;
          max-width: 500px;
        }

        .total-cell {
          font-weight: 600;
        }

        .totals-section {
          background: #f8f9fa;
          padding: 25px 30px;
          margin-bottom: 30px;
        }

        .total-line {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          font-size: 14px;
          color: #2c3e50;
        }

        .total-line.grand {
          font-size: 18px;
          font-weight: 700;
          padding-top: 15px;
          border-top: 2px solid #dfe6e9;
          margin-top: 10px;
        }

        .amount-in-words {
          text-align: right;
          font-size: 12px;
          color: #7f8c8d;
          margin-top: 10px;
          font-style: italic;
        }

        .signature-area {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 30px;
          border-top: 1px dashed #dfe6e9;
        }

        .signer-name {
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 5px;
        }

        .signer-title {
          color: #7f8c8d;
          font-size: 13px;
        }

        .footer-logo {
          font-size: 28px;
          font-weight: 700;
          color: #e74c3c;
          letter-spacing: 2px;
        }

        .invoice-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
          padding: 25px;
          background: #f8f9fa;
          border-top: 1px solid #ecf0f1;
        }

        .btn-action {
          padding: 13px 30px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          border: none;
        }

        .btn-print {
          background: #00b894;
          color: white;
        }

        .btn-print:hover {
          background: #00a383;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 184, 148, 0.3);
        }

        .btn-download {
          background: #0984e3;
          color: white;
        }

        .btn-download:hover {
          background: #0770ca;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(9, 132, 227, 0.3);
        }
      `}</style>

      <div className={`page-header ${showElements.header ? 'show' : ''}`}>
        <h1>Invoices</h1>
        <p>Manage your stock invoices</p>
      </div>

      <div className={`search-box ${showElements.search ? 'show' : ''}`}>
        <input
          type="text"
          className="search-input"
          placeholder="Filter by Customer Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={`table-wrapper`}>
        <table className="main-table">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Customer Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sales Person</th>
              <th>Barcode Scanned</th>
              <th>Dispatch Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice, index) => (
              <tr key={invoice.id} className={visibleRows.includes(index) ? 'visible' : ''}>
                <td><strong>{invoice.id}</strong></td>
                <td>{invoice.customerName}</td>
                <td>₹{invoice.price.toLocaleString()}</td>
                <td>{invoice.quantity}</td>
                <td>{invoice.salesPerson}</td>
                <td className="barcode-column">{invoice.barcodeScanned}</td>
                <td>{invoice.dispatchDate}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="view-btn"
                      onClick={() => setSelectedInvoice(invoice)}
                      title="View Invoice"
                    >
                      👁
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(invoice.id)}
                      title="Delete Invoice"
                    >
                      🗑
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedInvoice && (
        <InvoiceDialog
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
};

export default App;