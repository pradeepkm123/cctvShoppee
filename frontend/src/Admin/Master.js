// import React, { useState } from 'react';
// import { Search, Edit2, Trash2, Plus, ChevronLeft, ChevronRight, Camera, Video, Wifi, Radio, Monitor, Cpu, Zap } from 'lucide-react';

// const MasterManagement = () => {
//   const [activeTab, setActiveTab] = useState('addProduct');
  
//   // Products data
//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       brand: 'RAYSHARP',
//       model: 'SIP-20EHS27W-D3S',
//       subCategory: 'IP CAMERA',
//       category: 'IP CAMERA',
//       quantity: 0,
//       oldPrice: 34500,
//       price: 0,
//       emailTo: '-',
//       status: 'Out of Stock',
//       image: null
//     },
//     {
//       id: 2,
//       brand: 'SECURA',
//       model: 'SNVR-E0216',
//       subCategory: 'NVR',
//       category: 'NVR',
//       quantity: 0,
//       oldPrice: 16500,
//       price: 6500,
//       emailTo: '-',
//       status: 'Out of Stock',
//       image: null
//     },
//     {
//       id: 3,
//       brand: 'RAYSHARP',
//       model: 'RS-N30DBTG-A',
//       subCategory: 'NVR',
//       category: 'NVR',
//       quantity: 0,
//       oldPrice: 12500,
//       price: 3500,
//       emailTo: '-',
//       status: 'Out of Stock',
//       image: null
//     },
//     {
//       id: 4,
//       brand: 'RAYSHARP',
//       model: 'RS-N200BTC-B',
//       subCategory: 'NVR',
//       category: 'NVR',
//       quantity: 0,
//       oldPrice: 14500,
//       price: 0,
//       emailTo: '-',
//       status: 'Out of Stock',
//       image: null
//     },
//     {
//       id: 5,
//       brand: 'RAYSHARP',
//       model: 'RS-N3004TC-A',
//       subCategory: 'NVR',
//       category: 'NVR',
//       quantity: 0,
//       oldPrice: 14500,
//       price: 3500,
//       emailTo: '-',
//       status: 'Out of Stock',
//       image: null
//     },
//     {
//       id: 6,
//       brand: 'SECURA',
//       model: 'RS-SPI-S120',
//       subCategory: 'HD CAMERA',
//       category: 'PTZ',
//       quantity: 0,
//       oldPrice: 65000,
//       price: 20500,
//       emailTo: '-',
//       status: 'Out of Stock',
//       image: null
//     }
//   ]);

//   // Categories
//   const [categories, setCategories] = useState([
//     { id: 1, name: 'All Products', count: 57, inStock: 22, low: 10, outOfStock: 25, icon: 'camera', color: '#e3f2fd' },
//     { id: 2, name: 'CCTV Camera', count: 1, inStock: 0, low: 0, outOfStock: 0, icon: 'camera', color: '#f3e5f5' },
//     { id: 3, name: 'HD Camera', count: 2, inStock: 1, low: 0, outOfStock: 2, icon: 'video', color: '#fff9c4' },
//     { id: 4, name: 'IP Camera', count: 11, inStock: 3, low: 5, outOfStock: 3, icon: 'monitor', color: '#e8f5e9' },
//     { id: 5, name: 'PTZ Camera', count: 1, inStock: 0, low: 1, outOfStock: 1, icon: 'radio', color: '#fce4ec' },
//     { id: 6, name: 'WiFi Camera', count: 0, inStock: 0, low: 0, outOfStock: 0, icon: 'wifi', color: '#e0f2f1' },
//     { id: 7, name: '4G Camera', count: 1, inStock: 0, low: 0, outOfStock: 0, icon: 'camera', color: '#e8eaf6' },
//     { id: 8, name: 'DVR', count: 6, inStock: 1, low: 0, outOfStock: 5, icon: 'monitor', color: '#fff3e0' },
//     { id: 9, name: 'NVR', count: 14, inStock: 5, low: 0, outOfStock: 9, icon: 'monitor', color: '#f1f8e9' },
//     { id: 10, name: 'XVR', count: 8, inStock: 2, low: 2, outOfStock: 4, icon: 'cpu', color: '#fce4ec' },
//     { id: 11, name: 'Power supply', count: 1, inStock: 3, low: 0, outOfStock: 0, icon: 'zap', color: '#fff9c4' },
//     { id: 12, name: 'Switch', count: 5, inStock: 3, low: 1, outOfStock: 1, icon: 'cpu', color: '#e0f2f1' },
//     { id: 13, name: 'POE Switch', count: 0, inStock: 0, low: 0, outOfStock: 0, icon: 'cpu', color: '#e8f5e9' }
//   ]);

//   // Category Details
//   const [categoryDetails, setCategoryDetails] = useState([
//     { id: 1, name: 'NVR', createdOn: '2025-07-22', image: null, status: 'Active' },
//     { id: 2, name: 'IP CAMERA', createdOn: '2025-08-20', image: null, status: 'Active' },
//     { id: 3, name: 'HD CAMERA', createdOn: '2025-08-20', image: null, status: 'Active' },
//     { id: 4, name: 'PTZ', createdOn: '2025-08-20', image: null, status: 'Active' },
//     { id: 5, name: 'XVR', createdOn: '2025-08-20', image: null, status: 'Active' }
//   ]);

//   // Sub Categories
//   const [subCategories, setSubCategories] = useState([
//     { id: 1, name: 'HD CAMERA', createdOn: '2025-08-20', image: null, status: 'Active' },
//     { id: 2, name: 'IP CAMERA', createdOn: '2025-08-20', image: null, status: 'Active' },
//     { id: 3, name: 'NVR', createdOn: '2025-08-20', image: null, status: 'Active' },
//     { id: 4, name: 'XVR', createdOn: '2025-08-20', image: null, status: 'Active' },
//     { id: 5, name: 'DVR', createdOn: '2025-08-20', image: null, status: 'Active' }
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterCategory, setFilterCategory] = useState('');
//   const [filterBrand, setFilterBrand] = useState('');
//   const [filterModel, setFilterModel] = useState('');
//   const [filterSubCategory, setFilterSubCategory] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);

//   const getIcon = (iconName) => {
//     const icons = {
//       camera: Camera,
//       video: Video,
//       wifi: Wifi,
//       radio: Radio,
//       monitor: Monitor,
//       cpu: Cpu,
//       zap: Zap
//     };
//     const IconComponent = icons[iconName] || Camera;
//     return <IconComponent size={24} />;
//   };

//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          product.model.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = !filterCategory || product.category === filterCategory;
//     const matchesBrand = !filterBrand || product.brand === filterBrand;
//     const matchesModel = !filterModel || product.model === filterModel;
//     const matchesSubCategory = !filterSubCategory || product.subCategory === filterSubCategory;
//     return matchesSearch && matchesCategory && matchesBrand && matchesModel && matchesSubCategory;
//   });

//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentProducts = filteredProducts.slice(startIndex, endIndex);

//   return (
//     <div style={styles.container}>
//       <style>{`
//         * { box-sizing: border-box; }
        
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .tab-button {
//           transition: all 0.3s ease;
//           position: relative;
//           overflow: hidden;
//         }

//         .tab-button::before {
//           content: '';
//           position: absolute;
//           bottom: 0;
//           left: 50%;
//           width: 0;
//           height: 3px;
//           background: linear-gradient(90deg, #0066ff, #00a8ff);
//           transform: translateX(-50%);
//           transition: width 0.3s ease;
//         }

//         .tab-button:hover {
//           background-color: #f8f9fa;
//           color: #0066ff;
//         }

//         .tab-button.active {
//           color: #0066ff;
//           font-weight: 600;
//           background: linear-gradient(180deg, rgba(0, 102, 255, 0.05) 0%, rgba(0, 102, 255, 0) 100%);
//         }

//         .tab-button.active::before {
//           width: 100%;
//         }

//         .tab-button.active::after {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 2px;
//           background: linear-gradient(90deg, transparent, #0066ff, transparent);
//         }

//         .category-card {
//           transition: all 0.3s ease;
//         }

//         .category-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
//         }

//         .product-card {
//           transition: all 0.2s ease;
//         }

//         .product-card:hover {
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//         }

//         .action-btn {
//           transition: all 0.2s ease;
//         }

//         .action-btn:hover {
//           transform: scale(1.1);
//         }

//         .add-btn {
//           transition: all 0.3s ease;
//         }

//         .add-btn:hover {
//           background-color: #0056d2;
//           transform: translateY(-1px);
//           box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
//         }

//         .edit-btn {
//           transition: all 0.2s ease;
//         }

//         .edit-btn:hover {
//           background-color: #e3f2fd;
//         }

//         .delete-btn {
//           transition: all 0.2s ease;
//         }

//         .delete-btn:hover {
//           background-color: #ffebee;
//         }

//         .table-row {
//           transition: all 0.2s ease;
//         }

//         .table-row:hover {
//           background-color: #f8f9fa;
//         }
//       `}</style>

//       <div style={styles.header}>
//         <h1 style={styles.title}>Master</h1>
//       </div>

//       <div style={styles.tabContainer}>
//         <button
//           style={styles.tabButton}
//           className={`tab-button ${activeTab === 'addProduct' ? 'active' : ''}`}
//           onClick={() => setActiveTab('addProduct')}
//         >
//           ADD PRODUCT
//         </button>
//         <button
//           style={styles.tabButton}
//           className={`tab-button ${activeTab === 'category' ? 'active' : ''}`}
//           onClick={() => setActiveTab('category')}
//         >
//           CATEGORY
//         </button>
//         <button
//           style={styles.tabButton}
//           className={`tab-button ${activeTab === 'subCategory' ? 'active' : ''}`}
//           onClick={() => setActiveTab('subCategory')}
//         >
//           SUB CATEGORY
//         </button>
//       </div>

//       {/* ADD PRODUCT TAB */}
//       {activeTab === 'addProduct' && (
//         <div style={styles.content}>
//           <h2 style={styles.sectionTitle}>Add Product</h2>
          
//           <div style={styles.categorySection}>
//             <h3 style={styles.categoryTitle}>List of Category</h3>
//             <div style={styles.categoryGrid}>
//               <button style={styles.scrollButton} onClick={() => {}}>
//                 <ChevronLeft size={20} />
//               </button>
//               {categories.map(cat => (
//                 <div key={cat.id} style={{...styles.categoryCard, backgroundColor: cat.color}} className="category-card">
//                   <div style={styles.categoryIcon}>{getIcon(cat.icon)}</div>
//                   <div style={styles.categoryName}>{cat.name}</div>
//                   <div style={styles.categoryCount}>{cat.count}</div>
//                   <div style={styles.categoryStats}>
//                     <span>In Stock: {cat.inStock}</span>
//                     <span>Low: {cat.low}</span>
//                     <span>Out: {cat.outOfStock}</span>
//                   </div>
//                 </div>
//               ))}
//               <button style={styles.scrollButton} onClick={() => {}}>
//                 <ChevronRight size={20} />
//               </button>
//             </div>
//           </div>

//           <div style={styles.filterSection}>
//             <button style={styles.addProductButton} className="add-btn">
//               <Plus size={18} style={{ marginRight: '8px' }} />
//               ADD PRODUCT
//             </button>
//             <div style={styles.filterInputs}>
//               <input
//                 type="text"
//                 placeholder="Category"
//                 style={styles.filterInput}
//                 value={filterCategory}
//                 onChange={(e) => setFilterCategory(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Brand"
//                 style={styles.filterInput}
//                 value={filterBrand}
//                 onChange={(e) => setFilterBrand(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Model"
//                 style={styles.filterInput}
//                 value={filterModel}
//                 onChange={(e) => setFilterModel(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Sub Category"
//                 style={styles.filterInput}
//                 value={filterSubCategory}
//                 onChange={(e) => setFilterSubCategory(e.target.value)}
//               />
//             </div>
//           </div>

//           <div style={styles.productsGrid}>
//             {currentProducts.map(product => (
//               <div key={product.id} style={styles.productCard} className="product-card">
//                 {product.status === 'Out of Stock' && (
//                   <div style={styles.outOfStockBadge}>Out of Stock</div>
//                 )}
//                 <div style={styles.productImage}>
//                   <img src="/api/placeholder/150/150" alt="Product" style={styles.productImg} />
//                 </div>
//                 <div style={styles.productInfo}>
//                   <div style={styles.productBrand}>{product.brand}</div>
//                   <div style={styles.productModel}>Model: {product.model}</div>
//                   <div style={styles.productSubCategory}>Sub-Category: {product.subCategory}</div>
//                   <div style={styles.productCategory}>Category: {product.category}</div>
//                   <div style={styles.productQuantity}>Quantity: {product.quantity}</div>
//                   <div style={styles.productPricing}>
//                     <span style={styles.oldPrice}>Old Price: ₹{product.oldPrice.toLocaleString()}</span>
//                     <span style={styles.price}>Price: {product.price > 0 ? `₹${product.price.toLocaleString()}` : '-'}</span>
//                   </div>
//                   <div style={styles.productEmail}>EmailTo: {product.emailTo}</div>
//                 </div>
//                 <div style={styles.productActions}>
//                   <button style={styles.editButton} className="edit-btn">
//                     <Edit2 size={16} />
//                     Edit
//                   </button>
//                   <button style={styles.deleteButton} className="delete-btn">
//                     <Trash2 size={16} />
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* CATEGORY TAB */}
//       {activeTab === 'category' && (
//         <div style={styles.content}>
//           <h2 style={styles.sectionTitle}>Category Details</h2>
          
//           <div style={styles.tableHeader}>
//             <input
//               type="text"
//               placeholder="Filter Category"
//               style={styles.filterSearch}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button style={styles.addCategoryButton} className="add-btn">
//               <Plus size={18} style={{ marginRight: '8px' }} />
//               ADD CATEGORY
//             </button>
//           </div>

//           <div style={styles.tableContainer}>
//             <table style={styles.table}>
//               <thead>
//                 <tr style={styles.tableHeaderRow}>
//                   <th style={styles.tableHeaderCell}><input type="checkbox" className="checkbox" /></th>
//                   <th style={styles.tableHeaderCell}>Category</th>
//                   <th style={styles.tableHeaderCell}>Created On</th>
//                   <th style={styles.tableHeaderCell}>Category Image</th>
//                   <th style={styles.tableHeaderCell}>Status</th>
//                   <th style={styles.tableHeaderCell}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {categoryDetails.map(cat => (
//                   <tr key={cat.id} style={styles.tableRow} className="table-row">
//                     <td style={styles.tableCell}><input type="checkbox" className="checkbox" /></td>
//                     <td style={styles.tableCell}>{cat.name}</td>
//                     <td style={styles.tableCell}>{cat.createdOn}</td>
//                     <td style={styles.tableCell}>
//                       <img src="/api/placeholder/50/50" alt="Category" style={styles.categoryImage} />
//                     </td>
//                     <td style={styles.tableCell}>
//                       <span style={styles.statusBadge}>{cat.status}</span>
//                     </td>
//                     <td style={styles.tableCell}>
//                       <div style={styles.actionButtons}>
//                         <button style={styles.iconButton} className="action-btn">
//                           <Edit2 size={16} color="#6c757d" />
//                         </button>
//                         <button style={styles.iconButton} className="action-btn">
//                           <Trash2 size={16} color="#dc3545" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div style={styles.pagination}>
//             <div style={styles.paginationInfo}>
//               <span>Rows per page:</span>
//               <select style={styles.paginationSelect} value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={25}>25</option>
//               </select>
//             </div>
//             <div style={styles.paginationControls}>
//               <span>1–5 of 9</span>
//               <button style={styles.paginationButton}><ChevronLeft size={18} /></button>
//               <button style={styles.paginationButton}><ChevronRight size={18} /></button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* SUB CATEGORY TAB */}
//       {activeTab === 'subCategory' && (
//         <div style={styles.content}>
//           <h2 style={styles.sectionTitle}>Sub Category</h2>
          
//           <div style={styles.tableHeader}>
//             <input
//               type="text"
//               placeholder="Filter Sub Category"
//               style={styles.filterSearch}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button style={styles.addCategoryButton} className="add-btn">
//               <Plus size={18} style={{ marginRight: '8px' }} />
//               ADD SUB CATEGORY
//             </button>
//           </div>

//           <div style={styles.tableContainer}>
//             <table style={styles.table}>
//               <thead>
//                 <tr style={styles.tableHeaderRow}>
//                   <th style={styles.tableHeaderCell}>Sub Category Name</th>
//                   <th style={styles.tableHeaderCell}>Created On</th>
//                   <th style={styles.tableHeaderCell}>Sub Category Image</th>
//                   <th style={styles.tableHeaderCell}>Status</th>
//                   <th style={styles.tableHeaderCell}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {subCategories.map(subCat => (
//                   <tr key={subCat.id} style={styles.tableRow} className="table-row">
//                     <td style={styles.tableCell}>{subCat.name}</td>
//                     <td style={styles.tableCell}>{subCat.createdOn}</td>
//                     <td style={styles.tableCell}></td>
//                     <td style={styles.tableCell}>
//                       <span style={styles.statusBadge}>{subCat.status}</span>
//                     </td>
//                     <td style={styles.tableCell}>
//                       <div style={styles.actionButtons}>
//                         <button style={styles.iconButton} className="action-btn">
//                           <Edit2 size={16} color="#6c757d" />
//                         </button>
//                         <button style={styles.iconButton} className="action-btn">
//                           <Trash2 size={16} color="#dc3545" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div style={styles.pagination}>
//             <div style={styles.paginationInfo}>
//               <span>Rows per page:</span>
//               <select style={styles.paginationSelect} value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={25}>25</option>
//               </select>
//             </div>
//             <div style={styles.paginationControls}>
//               <span>1–5 of 7</span>
//               <button style={styles.paginationButton}><ChevronLeft size={18} /></button>
//               <button style={styles.paginationButton}><ChevronRight size={18} /></button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
//     backgroundColor: '#f5f5f5',
//     minHeight: '100vh',
//     padding: '24px',
//   },
//   header: {
//     marginBottom: '24px',
//   },
//   title: {
//     fontSize: '28px',
//     fontWeight: '600',
//     color: '#212529',
//     margin: 0,
//   },
//   tabContainer: {
//     display: 'flex',
//     gap: '0',
//     borderBottom: '1px solid #dee2e6',
//     marginBottom: '24px',
//     backgroundColor: '#ffffff',
//     position: 'relative',
//   },
//   tabButton: {
//     padding: '16px 32px',
//     border: 'none',
//     background: 'none',
//     fontSize: '14px',
//     fontWeight: '500',
//     color: '#6c757d',
//     cursor: 'pointer',
//     position: 'relative',
//   },
//   content: {
//     animation: 'fadeIn 0.3s ease',
//   },
//   sectionTitle: {
//     fontSize: '22px',
//     fontWeight: '600',
//     color: '#212529',
//     marginBottom: '24px',
//   },
//   categorySection: {
//     backgroundColor: '#ffffff',
//     padding: '24px',
//     borderRadius: '8px',
//     marginBottom: '24px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
//   },
//   categoryTitle: {
//     fontSize: '16px',
//     fontWeight: '600',
//     color: '#495057',
//     marginBottom: '16px',
//   },
//   categoryGrid: {
//     display: 'flex',
//     gap: '16px',
//     overflowX: 'auto',
//     padding: '8px 0',
//     alignItems: 'center',
//   },
//   scrollButton: {
//     background: '#ffffff',
//     border: '1px solid #dee2e6',
//     borderRadius: '50%',
//     width: '40px',
//     height: '40px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     cursor: 'pointer',
//     flexShrink: 0,
//   },
//   categoryCard: {
//     minWidth: '140px',
//     padding: '16px',
//     borderRadius: '8px',
//     textAlign: 'center',
//     flexShrink: 0,
//   },
//   categoryIcon: {
//     marginBottom: '8px',
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   categoryName: {
//     fontSize: '13px',
//     fontWeight: '600',
//     color: '#212529',
//     marginBottom: '4px',
//   },
//   categoryCount: {
//     fontSize: '24px',
//     fontWeight: '700',
//     color: '#212529',
//     marginBottom: '8px',
//   },
//   categoryStats: {
//     fontSize: '11px',
//     color: '#6c757d',
//     display: 'flex',
//     justifyContent: 'space-around',
//   },
//   filterSection: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '24px',
//     gap: '16px',
//     flexWrap: 'wrap',
//   },
//   addProductButton: {
//     display: 'flex',
//     alignItems: 'center',
//     backgroundColor: '#0066ff',
//     color: '#ffffff',
//     border: 'none',
//     borderRadius: '6px',
//     padding: '10px 20px',
//     fontSize: '13px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     flexShrink: 0,
//   },
//   filterInputs: {
//     display: 'flex',
//     gap: '12px',
//     flex: 1,
//     flexWrap: 'wrap',
//   },
//   filterInput: {
//     flex: 1,
//     minWidth: '150px',
//     padding: '10px 12px',
//     border: '1px solid #dee2e6',
//     borderRadius: '6px',
//     fontSize: '14px',
//     backgroundColor: '#ffffff',
//   },
//   productsGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
//     gap: '20px',
//   },
//   productCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     padding: '16px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
//     position: 'relative',
//   },
//   outOfStockBadge: {
//     position: 'absolute',
//     top: '16px',
//     right: '16px',
//     backgroundColor: '#dc3545',
//     color: '#ffffff',
//     padding: '4px 12px',
//     borderRadius: '4px',
//     fontSize: '12px',
//     fontWeight: '600',
//   },
//   productImage: {
//     width: '100%',
//     height: '150px',
//     backgroundColor: '#f8f9fa',
//     borderRadius: '6px',
//     marginBottom: '12px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   productImg: {
//     maxWidth: '100%',
//     maxHeight: '100%',
//   },
//   productInfo: {
//     marginBottom: '12px',
//   },
//   productBrand: {
//     fontSize: '16px',
//     fontWeight: '700',
//     color: '#212529',
//     marginBottom: '4px',
//   },
//   productModel: {
//     fontSize: '13px',
//     color: '#6c757d',
//     marginBottom: '2px',
//   },
//   productSubCategory: {
//     fontSize: '13px',
//     color: '#6c757d',
//     marginBottom: '2px',
//   },
//   productCategory: {
//     fontSize: '13px',
//     color: '#6c757d',
//     marginBottom: '2px',
//   },
//   productQuantity: {
//     fontSize: '13px',
//     color: '#6c757d',
//     marginBottom: '8px',
//   },
//   productPricing: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginBottom: '4px',
//   },
//   oldPrice: {
//     fontSize: '13px',
//     color: '#6c757d',
//   },
//   price: {
//     fontSize: '13px',
//     color: '#28a745',
//     fontWeight: '600',
//   },
//   productEmail: {
//     fontSize: '13px',
//     color: '#6c757d',
//   },
//   productActions: {
//     display: 'flex',
//     gap: '8px',
//   },
//   editButton: {
//     flex: 1,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '6px',
//     padding: '8px 12px',
//     backgroundColor: '#e3f2fd',
//     color: '#0066ff',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '13px',
//     fontWeight: '600',
//     cursor: 'pointer',
//   },
//   deleteButton: {
//     flex: 1,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '6px',
//     padding: '8px 12px',
//     backgroundColor: '#ffebee',
//     color: '#dc3545',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '13px',
//     fontWeight: '600',
//     cursor: 'pointer',
//   },
//   tableHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '24px',
//     gap: '16px',
//   },
//   filterSearch: {
//     padding: '10px 12px',
//     border: '1px solid #dee2e6',
//     borderRadius: '6px',
//     fontSize: '14px',
//     backgroundColor: '#ffffff',
//     width: '300px',
//   },
//   addCategoryButton: {
//     display: 'flex',
//     alignItems: 'center',
//     backgroundColor: '#0066ff',
//     color: '#ffffff',
//     border: 'none',
//     borderRadius: '6px',
//     padding: '10px 20px',
//     fontSize: '13px',
//     fontWeight: '600',
//     cursor: 'pointer',
//   },
//   tableContainer: {
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     overflow: 'hidden',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
//     marginBottom: '16px',
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse',
//   },
//   tableHeaderRow: {
//     backgroundColor: '#f8f9fa',
//     borderBottom: '2px solid #dee2e6',
//   },
//   tableHeaderCell: {
//     padding: '16px',
//     textAlign: 'left',
//     fontSize: '13px',
//     fontWeight: '600',
//     color: '#495057',
//   },
//   tableRow: {
//     borderBottom: '1px solid #dee2e6',
//   },
//   tableCell: {
//     padding: '16px',
//     fontSize: '14px',
//     color: '#212529',
//   },
//   categoryImage: {
//     width: '50px',
//     height: '50px',
//     objectFit: 'cover',
//     borderRadius: '4px',
//   },
//   statusBadge: {
//     display: 'inline-block',
//     padding: '4px 12px',
//     borderRadius: '12px',
//     fontSize: '12px',
//     fontWeight: '600',
//     backgroundColor: '#28a745',
//     color: '#ffffff',
//   },
//   actionButtons: {
//     display: 'flex',
//     gap: '8px',
//   },
//   iconButton: {
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     padding: '6px',
//     borderRadius: '4px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   pagination: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '16px',
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//   },
//   paginationInfo: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     fontSize: '14px',
//     color: '#6c757d',
//   },
//   paginationSelect: {
//     padding: '6px 8px',
//     border: '1px solid #dee2e6',
//     borderRadius: '4px',
//     fontSize: '14px',
//     cursor: 'pointer',
//     backgroundColor: '#ffffff',
//   },
//   paginationControls: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '16px',
//     fontSize: '14px',
//     color: '#6c757d',
//   },
//   paginationButton: {
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     padding: '6px',
//     borderRadius: '4px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: '#6c757d',
//   },
// };

// export default MasterManagement;








import React, { useState } from 'react';
import { Search, Edit2, Trash2, Plus, ChevronLeft, ChevronRight, Camera, Video, Wifi, Radio, Monitor, Cpu, Zap } from 'lucide-react';

const MasterManagement = () => {
  const [activeTab, setActiveTab] = useState('addProduct');

  // Products data
  const [products, setProducts] = useState([
    {
      id: 1,
      brand: 'RAYSHARP',
      model: 'SIP-20EHS27W-D3S',
      subCategory: 'IP CAMERA',
      category: 'IP CAMERA',
      quantity: 0,
      oldPrice: 34500,
      price: 0,
      emailTo: '-',
      status: 'Out of Stock',
      image: null,
    },
    {
      id: 2,
      brand: 'SECURA',
      model: 'SNVR-E0216',
      subCategory: 'NVR',
      category: 'NVR',
      quantity: 0,
      oldPrice: 16500,
      price: 6500,
      emailTo: '-',
      status: 'Out of Stock',
      image: null,
    },
    {
      id: 3,
      brand: 'RAYSHARP',
      model: 'RS-N30DBTG-A',
      subCategory: 'NVR',
      category: 'NVR',
      quantity: 0,
      oldPrice: 12500,
      price: 3500,
      emailTo: '-',
      status: 'Out of Stock',
      image: null,
    },
    {
      id: 4,
      brand: 'RAYSHARP',
      model: 'RS-N200BTC-B',
      subCategory: 'NVR',
      category: 'NVR',
      quantity: 0,
      oldPrice: 14500,
      price: 0,
      emailTo: '-',
      status: 'Out of Stock',
      image: null,
    },
    {
      id: 5,
      brand: 'RAYSHARP',
      model: 'RS-N3004TC-A',
      subCategory: 'NVR',
      category: 'NVR',
      quantity: 0,
      oldPrice: 14500,
      price: 3500,
      emailTo: '-',
      status: 'Out of Stock',
      image: null,
    },
    {
      id: 6,
      brand: 'SECURA',
      model: 'RS-SPI-S120',
      subCategory: 'HD CAMERA',
      category: 'PTZ',
      quantity: 0,
      oldPrice: 65000,
      price: 20500,
      emailTo: '-',
      status: 'Out of Stock',
      image: null,
    },
  ]);

  // Categories
  const [categories, setCategories] = useState([
    { id: 1, name: 'All Products', count: 57, inStock: 22, low: 10, outOfStock: 25, icon: 'camera', color: '#e3f2fd' },
    { id: 2, name: 'CCTV Camera', count: 1, inStock: 0, low: 0, outOfStock: 0, icon: 'camera', color: '#f3e5f5' },
    { id: 3, name: 'HD Camera', count: 2, inStock: 1, low: 0, outOfStock: 2, icon: 'video', color: '#fff9c4' },
    { id: 4, name: 'IP Camera', count: 11, inStock: 3, low: 5, outOfStock: 3, icon: 'monitor', color: '#e8f5e9' },
    { id: 5, name: 'PTZ Camera', count: 1, inStock: 0, low: 1, outOfStock: 1, icon: 'radio', color: '#fce4ec' },
    { id: 6, name: 'WiFi Camera', count: 0, inStock: 0, low: 0, outOfStock: 0, icon: 'wifi', color: '#e0f2f1' },
    { id: 7, name: '4G Camera', count: 1, inStock: 0, low: 0, outOfStock: 0, icon: 'camera', color: '#e8eaf6' },
    { id: 8, name: 'DVR', count: 6, inStock: 1, low: 0, outOfStock: 5, icon: 'monitor', color: '#fff3e0' },
    { id: 9, name: 'NVR', count: 14, inStock: 5, low: 0, outOfStock: 9, icon: 'monitor', color: '#f1f8e9' },
    { id: 10, name: 'XVR', count: 8, inStock: 2, low: 2, outOfStock: 4, icon: 'cpu', color: '#fce4ec' },
    { id: 11, name: 'Power supply', count: 1, inStock: 3, low: 0, outOfStock: 0, icon: 'zap', color: '#fff9c4' },
    { id: 12, name: 'Switch', count: 5, inStock: 3, low: 1, outOfStock: 1, icon: 'cpu', color: '#e0f2f1' },
    { id: 13, name: 'POE Switch', count: 0, inStock: 0, low: 0, outOfStock: 0, icon: 'cpu', color: '#e8f5e9' },
  ]);

  // Category Details
  const [categoryDetails, setCategoryDetails] = useState([
    { id: 1, name: 'NVR', createdOn: '2025-07-22', image: null, status: 'Active' },
    { id: 2, name: 'IP CAMERA', createdOn: '2025-08-20', image: null, status: 'Active' },
    { id: 3, name: 'HD CAMERA', createdOn: '2025-08-20', image: null, status: 'Active' },
    { id: 4, name: 'PTZ', createdOn: '2025-08-20', image: null, status: 'Active' },
    { id: 5, name: 'XVR', createdOn: '2025-08-20', image: null, status: 'Active' },
  ]);

  // Sub Categories
  const [subCategories, setSubCategories] = useState([
    { id: 1, name: 'HD CAMERA', createdOn: '2025-08-20', image: null, status: 'Active' },
    { id: 2, name: 'IP CAMERA', createdOn: '2025-08-20', image: null, status: 'Active' },
    { id: 3, name: 'NVR', createdOn: '2025-08-20', image: null, status: 'Active' },
    { id: 4, name: 'XVR', createdOn: '2025-08-20', image: null, status: 'Active' },
    { id: 5, name: 'DVR', createdOn: '2025-08-20', image: null, status: 'Active' },
  ]);

  // Modal and form state
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddSubCategoryModal, setShowAddSubCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    createdOn: new Date().toISOString().split('T')[0],
    image: null,
    status: 'Active',
  });
  const [newSubCategory, setNewSubCategory] = useState({
    name: '',
    createdOn: new Date().toISOString().split('T')[0],
    image: null,
    status: 'Active',
  });

  // Filter and pagination state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterModel, setFilterModel] = useState('');
  const [filterSubCategory, setFilterSubCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Helper function to get icons
  const getIcon = (iconName) => {
    const icons = {
      camera: Camera,
      video: Video,
      wifi: Wifi,
      radio: Radio,
      monitor: Monitor,
      cpu: Cpu,
      zap: Zap,
    };
    const IconComponent = icons[iconName] || Camera;
    return <IconComponent size={24} />;
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    const matchesBrand = !filterBrand || product.brand === filterBrand;
    const matchesModel = !filterModel || product.model === filterModel;
    const matchesSubCategory = !filterSubCategory || product.subCategory === filterSubCategory;
    return matchesSearch && matchesCategory && matchesBrand && matchesModel && matchesSubCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Handle adding a new category
  const handleAddCategory = () => {
    const updatedCategories = [...categories, { ...newCategory, id: categories.length + 1, count: 0, inStock: 0, low: 0, outOfStock: 0, icon: 'camera', color: '#e8f5e9' }];
    setCategories(updatedCategories);
    setCategoryDetails([...categoryDetails, { ...newCategory, id: categoryDetails.length + 1 }]);
    setShowAddCategoryModal(false);
    setNewCategory({ name: '', createdOn: new Date().toISOString().split('T')[0], image: null, status: 'Active' });
  };

  // Handle adding a new sub category
  const handleAddSubCategory = () => {
    setSubCategories([...subCategories, { ...newSubCategory, id: subCategories.length + 1 }]);
    setShowAddSubCategoryModal(false);
    setNewSubCategory({ name: '', createdOn: new Date().toISOString().split('T')[0], image: null, status: 'Active' });
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
        .category-card {
          transition: all 0.3s ease;
        }
        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
        .product-card {
          transition: all 0.2s ease;
        }
        .product-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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
        .edit-btn {
          transition: all 0.2s ease;
        }
        .edit-btn:hover {
          background-color: #e3f2fd;
        }
        .delete-btn {
          transition: all 0.2s ease;
        }
        .delete-btn:hover {
          background-color: #ffebee;
        }
        .table-row {
          transition: all 0.2s ease;
        }
        .table-row:hover {
          background-color: #f8f9fa;
        }
      `}</style>

      {/* Header and Tabs */}
      <div style={styles.header}>
        <h1 style={styles.title}>Master</h1>
      </div>
      <div style={styles.tabContainer}>
        <button
          style={styles.tabButton}
          className={`tab-button ${activeTab === 'addProduct' ? 'active' : ''}`}
          onClick={() => setActiveTab('addProduct')}
        >
          ADD PRODUCT
        </button>
        <button
          style={styles.tabButton}
          className={`tab-button ${activeTab === 'category' ? 'active' : ''}`}
          onClick={() => setActiveTab('category')}
        >
          CATEGORY
        </button>
        <button
          style={styles.tabButton}
          className={`tab-button ${activeTab === 'subCategory' ? 'active' : ''}`}
          onClick={() => setActiveTab('subCategory')}
        >
          SUB CATEGORY
        </button>
      </div>

      {/* Add Product Tab */}
      {activeTab === 'addProduct' && (
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Add Product</h2>
          <div style={styles.categorySection}>
            <h3 style={styles.categoryTitle}>List of Category</h3>
            <div style={styles.categoryGrid}>
              <button style={styles.scrollButton} onClick={() => {}}>
                <ChevronLeft size={20} />
              </button>
              {categories.map((cat) => (
                <div key={cat.id} style={{ ...styles.categoryCard, backgroundColor: cat.color }} className="category-card">
                  <div style={styles.categoryIcon}>{getIcon(cat.icon)}</div>
                  <div style={styles.categoryName}>{cat.name}</div>
                  <div style={styles.categoryCount}>{cat.count}</div>
                  <div style={styles.categoryStats}>
                    <span>In Stock: {cat.inStock}</span>
                    <span>Low: {cat.low}</span>
                    <span>Out: {cat.outOfStock}</span>
                  </div>
                </div>
              ))}
              <button style={styles.scrollButton} onClick={() => {}}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div style={styles.filterSection}>
            <button style={styles.addProductButton} className="add-btn">
              <Plus size={18} style={{ marginRight: '8px' }} />
              ADD PRODUCT
            </button>
            <div style={styles.filterInputs}>
              <input
                type="text"
                placeholder="Category"
                style={styles.filterInput}
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              />
              <input
                type="text"
                placeholder="Brand"
                style={styles.filterInput}
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
              />
              <input
                type="text"
                placeholder="Model"
                style={styles.filterInput}
                value={filterModel}
                onChange={(e) => setFilterModel(e.target.value)}
              />
              <input
                type="text"
                placeholder="Sub Category"
                style={styles.filterInput}
                value={filterSubCategory}
                onChange={(e) => setFilterSubCategory(e.target.value)}
              />
            </div>
          </div>
          <div style={styles.productsGrid}>
            {currentProducts.map((product) => (
              <div key={product.id} style={styles.productCard} className="product-card">
                {product.status === 'Out of Stock' && <div style={styles.outOfStockBadge}>Out of Stock</div>}
                <div style={styles.productImage}>
                  <img src="/api/placeholder/150/150" alt="Product" style={styles.productImg} />
                </div>
                <div style={styles.productInfo}>
                  <div style={styles.productBrand}>{product.brand}</div>
                  <div style={styles.productModel}>Model: {product.model}</div>
                  <div style={styles.productSubCategory}>Sub-Category: {product.subCategory}</div>
                  <div style={styles.productCategory}>Category: {product.category}</div>
                  <div style={styles.productQuantity}>Quantity: {product.quantity}</div>
                  <div style={styles.productPricing}>
                    <span style={styles.oldPrice}>Old Price: ₹{product.oldPrice.toLocaleString()}</span>
                    <span style={styles.price}>Price: {product.price > 0 ? `₹${product.price.toLocaleString()}` : '-'}</span>
                  </div>
                  <div style={styles.productEmail}>EmailTo: {product.emailTo}</div>
                </div>
                <div style={styles.productActions}>
                  <button style={styles.editButton} className="edit-btn">
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button style={styles.deleteButton} className="delete-btn">
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Tab */}
      {activeTab === 'category' && (
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Category Details</h2>
          <div style={styles.tableHeader}>
            <input
              type="text"
              placeholder="Filter Category"
              style={styles.filterSearch}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              style={styles.addCategoryButton}
              className="add-btn"
              onClick={() => setShowAddCategoryModal(true)}
            >
              <Plus size={18} style={{ marginRight: '8px' }} />
              ADD CATEGORY
            </button>
          </div>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.tableHeaderCell}>
                    <input type="checkbox" className="checkbox" />
                  </th>
                  <th style={styles.tableHeaderCell}>Category</th>
                  <th style={styles.tableHeaderCell}>Created On</th>
                  <th style={styles.tableHeaderCell}>Category Image</th>
                  <th style={styles.tableHeaderCell}>Status</th>
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoryDetails.map((cat) => (
                  <tr key={cat.id} style={styles.tableRow} className="table-row">
                    <td style={styles.tableCell}>
                      <input type="checkbox" className="checkbox" />
                    </td>
                    <td style={styles.tableCell}>{cat.name}</td>
                    <td style={styles.tableCell}>{cat.createdOn}</td>
                    <td style={styles.tableCell}>
                      <img src="/api/placeholder/50/50" alt="Category" style={styles.categoryImage} />
                    </td>
                    <td style={styles.tableCell}>
                      <span style={styles.statusBadge}>{cat.status}</span>
                    </td>
                    <td style={styles.tableCell}>
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
              <span>1–5 of 9</span>
              <button style={styles.paginationButton}>
                <ChevronLeft size={18} />
              </button>
              <button style={styles.paginationButton}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub Category Tab */}
      {activeTab === 'subCategory' && (
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Sub Category</h2>
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
                {subCategories.map((subCat) => (
                  <tr key={subCat.id} style={styles.tableRow} className="table-row">
                    <td style={styles.tableCell}>{subCat.name}</td>
                    <td style={styles.tableCell}>{subCat.createdOn}</td>
                    <td style={styles.tableCell}></td>
                    <td style={styles.tableCell}>
                      <span style={styles.statusBadge}>{subCat.status}</span>
                    </td>
                    <td style={styles.tableCell}>
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
              <span>1–5 of 7</span>
              <button style={styles.paginationButton}>
                <ChevronLeft size={18} />
              </button>
              <button style={styles.paginationButton}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Add Category</h3>
            <div style={styles.modalForm}>
              <label style={styles.modalLabel}>Category Name:</label>
              <input
                type="text"
                style={styles.modalInput}
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
              <label style={styles.modalLabel}>Created On:</label>
              <input
                type="date"
                style={styles.modalInput}
                value={newCategory.createdOn}
                onChange={(e) => setNewCategory({ ...newCategory, createdOn: e.target.value })}
              />
              <label style={styles.modalLabel}>Category Image:</label>
              <input
                type="file"
                style={styles.modalInput}
                onChange={(e) => setNewCategory({ ...newCategory, image: e.target.files[0] })}
              />
              <div style={styles.modalActions}>
                <button style={styles.modalButton} onClick={handleAddCategory}>
                  Save
                </button>
                <button
                  style={{ ...styles.modalButton, backgroundColor: '#6c757d' }}
                  onClick={() => {
                    setShowAddCategoryModal(false);
                    setNewCategory({ name: '', createdOn: new Date().toISOString().split('T')[0], image: null, status: 'Active' });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    setNewSubCategory({ name: '', createdOn: new Date().toISOString().split('T')[0], image: null, status: 'Active' });
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
  tabContainer: {
    display: 'flex',
    gap: '0',
    borderBottom: '1px solid #dee2e6',
    marginBottom: '24px',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  tabButton: {
    padding: '16px 32px',
    border: 'none',
    background: 'none',
    fontSize: '14px',
    fontWeight: '500',
    color: '#6c757d',
    cursor: 'pointer',
    position: 'relative',
  },
  content: {
    animation: 'fadeIn 0.3s ease',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '24px',
  },
  categorySection: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '8px',
    marginBottom: '24px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  categoryTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#495057',
    marginBottom: '16px',
  },
  categoryGrid: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    padding: '8px 0',
    alignItems: 'center',
  },
  scrollButton: {
    background: '#ffffff',
    border: '1px solid #dee2e6',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
  },
  categoryCard: {
    minWidth: '140px',
    padding: '16px',
    borderRadius: '8px',
    textAlign: 'center',
    flexShrink: 0,
  },
  categoryIcon: {
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '4px',
  },
  categoryCount: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#212529',
    marginBottom: '8px',
  },
  categoryStats: {
    fontSize: '11px',
    color: '#6c757d',
    display: 'flex',
    justifyContent: 'space-around',
  },
  filterSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    gap: '16px',
    flexWrap: 'wrap',
  },
  addProductButton: {
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
    flexShrink: 0,
  },
  filterInputs: {
    display: 'flex',
    gap: '12px',
    flex: 1,
    flexWrap: 'wrap',
  },
  filterInput: {
    flex: 1,
    minWidth: '150px',
    padding: '10px 12px',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: '#ffffff',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    position: 'relative',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    backgroundColor: '#dc3545',
    color: '#ffffff',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
  },
  productImage: {
    width: '100%',
    height: '150px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImg: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  productInfo: {
    marginBottom: '12px',
  },
  productBrand: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#212529',
    marginBottom: '4px',
  },
  productModel: {
    fontSize: '13px',
    color: '#6c757d',
    marginBottom: '2px',
  },
  productSubCategory: {
    fontSize: '13px',
    color: '#6c757d',
    marginBottom: '2px',
  },
  productCategory: {
    fontSize: '13px',
    color: '#6c757d',
    marginBottom: '2px',
  },
  productQuantity: {
    fontSize: '13px',
    color: '#6c757d',
    marginBottom: '8px',
  },
  productPricing: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },
  oldPrice: {
    fontSize: '13px',
    color: '#6c757d',
  },
  price: {
    fontSize: '13px',
    color: '#28a745',
    fontWeight: '600',
  },
  productEmail: {
    fontSize: '13px',
    color: '#6c757d',
  },
  productActions: {
    display: 'flex',
    gap: '8px',
  },
  editButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: '#e3f2fd',
    color: '#0066ff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  deleteButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: '#ffebee',
    color: '#dc3545',
    border: 'none',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
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
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
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
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
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

export default MasterManagement;
