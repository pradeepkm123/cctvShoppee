import React, { useState, useEffect } from 'react';
import { Package, DollarSign, FileText } from 'lucide-react';

const SuppliersAndVendors = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    products: 0,
    value: 0,
    paymentTerms: '',
    productList: [],
  });
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch suppliers from API
  useEffect(() => {
    fetch('https://cctvshoppee.onrender.com/api/suppliers')
      .then((res) => res.json())
      .then((data) => {
        setSuppliers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching suppliers:", err);
        setLoading(false);
      });
  }, []);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalSuppliers: suppliers.length,
    activeSuppliers: suppliers.filter(s => s.products > 0).length,
    totalProducts: suppliers.reduce((sum, s) => sum + s.products, 0),
    totalValue: suppliers.reduce((sum, s) => sum + s.value, 0),
  };

  const handleAddSupplier = (e) => {
    e.preventDefault();
    fetch('https://cctvshoppee.onrender.com/api/suppliers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSupplier),
    })
      .then((res) => res.json())
      .then((data) => {
        setSuppliers([...suppliers, data]);
        setOpenDialog(false);
        setNewSupplier({
          name: '',
          contact: '',
          email: '',
          phone: '',
          products: 0,
          value: 0,
          paymentTerms: '',
          productList: [],
        });
      })
      .catch((err) => {
        console.error("Error adding supplier:", err);
      });
  };

  const StatCard = ({ label, value, icon, bgColor }) => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }}>
      <div>
        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>{label}</div>
        <div style={{ fontSize: '32px', fontWeight: '600', color: '#111827' }}>{value}</div>
      </div>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '8px',
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
    </div>
  );

  const SupplierRow = ({ supplier }) => (
    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
      <td style={{ padding: '16px' }}>
        <div style={{ fontWeight: '500', color: '#111827', marginBottom: '4px' }}>
          {supplier.name}
        </div>
        <div style={{ fontSize: '14px', color: '#6b7280' }}>{supplier.contact}</div>
      </td>
      <td style={{ padding: '16px', color: '#374151' }}>{supplier.products}</td>
      <td style={{ padding: '16px', color: '#374151' }}>
        ${supplier.value.toLocaleString()}
      </td>
      <td style={{ padding: '16px', color: '#6b7280' }}>{supplier.paymentTerms}</td>
      <td style={{ padding: '16px' }}>
        <button
          onClick={() => setSelectedSupplier(supplier)}
          style={{
            color: '#059669',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          View Details
        </button>
      </td>
    </tr>
  );

  if (selectedSupplier) {
    return (
      <div style={{ padding: '32px', backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                Suppliers & Vendors
              </h1>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>Manage your suppliers and vendor relationships</p>
            </div>
            <button
              onClick={() => setOpenDialog(true)}
              style={{
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              + Add Supplier
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
            <StatCard
              label="Total Suppliers"
              value={stats.totalSuppliers}
              icon={<FileText color="#3b82f6" size={24} />}
              bgColor="#dbeafe"
            />
            <StatCard
              label="Active Suppliers"
              value={stats.activeSuppliers}
              icon={<Package color="#10b981" size={24} />}
              bgColor="#d1fae5"
            />
            <StatCard
              label="Total Products"
              value={stats.totalProducts}
              icon={<Package color="#8b5cf6" size={24} />}
              bgColor="#ede9fe"
            />
            <StatCard
              label="Total Value"
              value={`$${stats.totalValue.toLocaleString()}`}
              icon={<DollarSign color="#059669" size={24} />}
              bgColor="#d1fae5"
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>All Suppliers</h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      placeholder="Search suppliers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        padding: '8px 12px 8px 36px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px',
                        width: '250px'
                      }}
                    />
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>🔍</span>
                  </div>
                  <button style={{
                    padding: '8px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    background: 'white',
                    cursor: 'pointer'
                  }}>⚙</button>
                  <button style={{
                    padding: '8px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    background: 'white',
                    cursor: 'pointer'
                  }}>⬇</button>
                </div>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>SUPPLIER</th>
                    <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>PRODUCTS</th>
                    <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>VALUE</th>
                    <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>PAYMENT TERMS</th>
                    <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map(supplier => (
                    <SupplierRow key={supplier._id} supplier={supplier} />
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>Supplier Details</h2>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: '600',
                  marginRight: '16px'
                }}>
                  {selectedSupplier.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
                    {selectedSupplier.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    {selectedSupplier.contact}
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Email</div>
                <div style={{ fontSize: '14px', color: '#111827' }}>{selectedSupplier.email}</div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Phone</div>
                <div style={{ fontSize: '14px', color: '#111827' }}>{selectedSupplier.phone}</div>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Payment Terms</div>
                <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>{selectedSupplier.paymentTerms}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Total Products</div>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>{selectedSupplier.products}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Total Value</div>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>
                    ${selectedSupplier.value.toLocaleString()}
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Products</h3>
                {selectedSupplier.productList.map((product, idx) => (
                  <div key={idx} style={{
                    padding: '12px 0',
                    borderBottom: idx < selectedSupplier.productList.length - 1 ? '1px solid #e5e7eb' : 'none'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{product.name}</div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>${product.price}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{product.code}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Stock: {product.stock}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  background: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Edit
                </button>
                <button style={{
                  flex: 1,
                  padding: '10px',
                  border: 'none',
                  borderRadius: '6px',
                  background: '#059669',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              Suppliers & Vendors
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Manage your suppliers and vendor relationships</p>
          </div>
          <button
            onClick={() => setOpenDialog(true)}
            style={{
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            + Add Supplier
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
          <StatCard
            label="Total Suppliers"
            value={stats.totalSuppliers}
            icon={<FileText color="#3b82f6" size={24} />}
            bgColor="#dbeafe"
          />
          <StatCard
            label="Active Suppliers"
            value={stats.activeSuppliers}
            icon={<Package color="#10b981" size={24} />}
            bgColor="#d1fae5"
          />
          <StatCard
            label="Total Products"
            value={stats.totalProducts}
            icon={<Package color="#8b5cf6" size={24} />}
            bgColor="#ede9fe"
          />
          <StatCard
            label="Total Value"
            value={`$${stats.totalValue.toLocaleString()}`}
            icon={<DollarSign color="#059669" size={24} />}
            bgColor="#d1fae5"
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>All Suppliers</h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search suppliers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: '8px 12px 8px 36px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '14px',
                      width: '250px'
                    }}
                  />
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>🔍</span>
                </div>
                <button style={{
                  padding: '8px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  background: 'white',
                  cursor: 'pointer'
                }}>⚙</button>
                <button style={{
                  padding: '8px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  background: 'white',
                  cursor: 'pointer'
                }}>⬇</button>
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>SUPPLIER</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>PRODUCTS</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>VALUE</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>PAYMENT TERMS</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Loading suppliers...</td>
                  </tr>
                ) : (
                  filteredSuppliers.map(supplier => (
                    <SupplierRow key={supplier._id} supplier={supplier} />
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <FileText size={40} color="#9ca3af" />
            </div>
            <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center' }}>
              Select a supplier to view details
            </p>
          </div>
        </div>
      </div>
      {openDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            width: '500px',
            maxWidth: '90%'
          }}>
            <h2 style={{ marginBottom: '20px' }}>Add New Supplier</h2>
            <form onSubmit={handleAddSupplier}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Name</label>
                <input
                  type="text"
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Contact</label>
                <input
                  type="text"
                  value={newSupplier.contact}
                  onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Email</label>
                <input
                  type="email"
                  value={newSupplier.email}
                  onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Phone</label>
                <input
                  type="text"
                  value={newSupplier.phone}
                  onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Products</label>
                <input
                  type="number"
                  value={newSupplier.products}
                  onChange={(e) => setNewSupplier({...newSupplier, products: parseInt(e.target.value)})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Value</label>
                <input
                  type="number"
                  value={newSupplier.value}
                  onChange={(e) => setNewSupplier({...newSupplier, value: parseInt(e.target.value)})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Payment Terms</label>
                <input
                  type="text"
                  value={newSupplier.paymentTerms}
                  onChange={(e) => setNewSupplier({...newSupplier, paymentTerms: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: 'none',
                    borderRadius: '6px',
                    background: '#059669',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setOpenDialog(false)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    background: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuppliersAndVendors;
