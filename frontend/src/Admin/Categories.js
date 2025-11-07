// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Drawer, Box, Typography, Switch, Divider, Button
// } from '@mui/material';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Categories.css';
// import axios from 'axios';

// function Categories() {
//   const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
//   const [switchChecked, setSwitchChecked] = useState(true);
//   const [categoryName, setCategoryName] = useState('');
//   const [categoryImage, setCategoryImage] = useState(null);
//   const [categoryDescription, setCategoryDescription] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredCategories, setFilteredCategories] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingCategoryId, setEditingCategoryId] = useState(null);

//   const fileInputRef = useRef(null);

//   const categoriesPerPage = 10;

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/categories');
//       setCategories(response.data);
//       setFilteredCategories(response.data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       toast.error('Failed to fetch categories');
//     }
//   };

//   const toggleRightDrawer = () => {
//     setRightDrawerOpen(!rightDrawerOpen);
//     if (!rightDrawerOpen) {
//       resetForm();
//     }
//   };

//   const resetForm = () => {
//     setCategoryName('');
//     setCategoryImage(null);
//     setCategoryDescription('');
//     setSwitchChecked(true);
//     setIsEditMode(false);
//     setEditingCategoryId(null);

//     if (fileInputRef.current) {
//       fileInputRef.current.value = ''; // Clear file input
//     }
//   };

//   const handleSwitchChange = (event) => {
//     setSwitchChecked(event.target.checked);
//   };

//   const handleCategoryNameChange = (event) => {
//     setCategoryName(event.target.value);
//   };

//   const handleCategoryImageChange = (event) => {
//     setCategoryImage(event.target.files[0]);
//   };

//   const handleCategoryDescriptionChange = (event) => {
//     setCategoryDescription(event.target.value);
//   };

//   const handleSaveCategory = async () => {
//     if (!categoryName || (!categoryImage && !isEditMode) || !categoryDescription) {
//       toast.error('Please fill in all required fields.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', categoryName);
//     formData.append('description', categoryDescription);
//     formData.append('published', switchChecked);
//     if (categoryImage) {
//       formData.append('image', categoryImage);
//     }

//     try {
//       let response;
//       if (isEditMode) {
//         response = await axios.put(`http://localhost:5000/api/categories/${editingCategoryId}`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         const updatedCategory = response.data;
//         const updatedCategories = categories.map(cat =>
//           cat._id === editingCategoryId ? updatedCategory : cat
//         );
//         setCategories(updatedCategories);
//         setFilteredCategories(updatedCategories);
//         toast.success('Category updated successfully!');
//       } else {
//         response = await axios.post('http://localhost:5000/api/categories', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });

//         // Check if response.data has valid _id
//         if (!response.data || !response.data._id) {
//           throw new Error('Invalid response from server on adding category');
//         }

//         setCategories(prev => [...prev, response.data]);
//         setFilteredCategories(prev => [...prev, response.data]);
//         toast.success('Category added successfully!');
//       }

//       resetForm();
//       // Optionally, keep the drawer open for adding another category
//       // setRightDrawerOpen(false);
//     } catch (error) {
//       console.error('Error saving category:', error.response?.data || error.message);
//       toast.error(`Error ${isEditMode ? 'updating' : 'adding'} category: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   const handleSearch = () => {
//     const filtered = categories.filter(category =>
//       category.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredCategories(filtered);
//     setCurrentPage(1); // reset to first page on search
//   };

//   const handleReset = () => {
//     setSearchTerm('');
//     setFilteredCategories(categories);
//     setCurrentPage(1);
//   };

//   const handleDeleteCategory = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/categories/${id}`);
//       const updatedCategories = categories.filter(category => category._id !== id);
//       setCategories(updatedCategories);
//       setFilteredCategories(updatedCategories);
//       toast.success('Category deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting category:', error);
//       toast.error('Error deleting category.');
//     }
//   };

//   const handleEditCategory = (id) => {
//     const category = categories.find(cat => cat._id === id);
//     if (category) {
//       setCategoryName(category.name);
//       setCategoryDescription(category.description);
//       setSwitchChecked(category.published);
//       setCategoryImage(null); // Cannot load file into input, leave as null
//       setEditingCategoryId(id);
//       setIsEditMode(true);
//       setRightDrawerOpen(true);

//       // Also clear file input on edit mode
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }
//   };

//   const indexOfLastCategory = currentPage * categoriesPerPage;
//   const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
//   const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
//   const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

//   const paginate = (pageNumber) => {
//     if (pageNumber < 1 || pageNumber > totalPages) return;
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div>
//       <div className="container-fluid py-4">
//         {/* Header and Action Buttons */}
//         <div className="row mb-3 tal">
//           <div className="col-md-6 mb-2 mb-md-0">
//             <div className="d-flex gap-2">
//               <button className="btn btn-export btn-sm">Export</button>
//               <button className="btn btn-import btn-sm">Import</button>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="action-buttons">
//               <button className="btn btn-delete btn-sm">Delete</button>
//               <button className="btn btn-add btn-sm" onClick={toggleRightDrawer}>
//                 <i className="las la-plus"></i> Add Category
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="row search-container tal">
//           <div className="col-md-8 mb-2 mb-md-0">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by Category name"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="col-md-4">
//             <div className="d-flex gap-2">
//               <button className="btn btn-filter flex-grow-1" onClick={handleSearch}>Search</button>
//               <button className="btn btn-reset flex-grow-1" onClick={handleReset}>Reset</button>
//             </div>
//           </div>
//         </div>

//         {/* Categories Table */}
//         <div className="table-responsive mt-3">
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th><input type="checkbox" /></th>
//                 <th>ID</th>
//                 <th>Image</th>
//                 <th>NAME</th>
//                 {/* <th>DESCRIPTION</th> */}
//                 <th>PUBLISHED</th>
//                 <th>ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentCategories.map((category) => (
//                 <tr key={category._id}>
//                   <td><input type="checkbox" /></td>
//                   <td>{category._id}</td>
//                   <td>
//                     <img
//                       src={`http://localhost:5000${category.image}`}
//                       alt={category.name}
//                       style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//                     />

//                   </td>
//                   <td>{category.name}</td>
//                   {/* <td>{category.description}</td> */}
//                   <td>
//                     <input type="checkbox" checked={category.published} readOnly />
//                   </td>
//                   <td>
//                     <a href="#" onClick={(e) => { e.preventDefault(); handleEditCategory(category._id); }}>
//                       <i className="las la-pen"></i>
//                     </a>
//                     &nbsp;&nbsp;
//                     <a href="#" onClick={(e) => { e.preventDefault(); handleDeleteCategory(category._id); }}>
//                       <i className="las la-trash-alt"></i>
//                     </a>
//                   </td>
//                 </tr>
//               ))}
//               {currentCategories.length === 0 && (
//                 <tr>
//                   <td colSpan="7" style={{ textAlign: 'center' }}>No categories found.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="d-flex justify-content-between align-items-center mt-3">
//           <div>
//             Showing {filteredCategories.length === 0 ? 0 : indexOfFirstCategory + 1}-
//             {Math.min(indexOfLastCategory, filteredCategories.length)} of {filteredCategories.length}
//           </div>
//           <ul className="pagination">
//             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//               <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); paginate(currentPage - 1); }}>&laquo;</a>
//             </li>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
//                 <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); paginate(i + 1); }}>{i + 1}</a>
//               </li>
//             ))}
//             <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//               <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); paginate(currentPage + 1); }}>&raquo;</a>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Drawer */}
//       <Drawer anchor="right" open={rightDrawerOpen} onClose={toggleRightDrawer}>
//         <Box sx={{ width: 500, p: 2, position: 'relative', height: '100%' }}>
//           <Typography variant="h6" sx={{ mt: 5 }}>
//             {isEditMode ? 'Edit Category' : 'Add Category'}
//             <p>Fill in category details below</p>
//           </Typography>

//           <div className="form-group">
//             <label>Name</label>
//             <input
//               type="text"
//               className="form-control"
//               value={categoryName}
//               onChange={handleCategoryNameChange}
//             />
//           </div>

//           <div className="form-group mt-3">
//             <label>Category Image</label>
//             <input
//               type="file"
//               className="form-control"
//               accept=".jpeg,.jpg,.png,.webp"
//               onChange={handleCategoryImageChange}
//               ref={fileInputRef}
//             />
//           </div>

//           <div className="form-group mt-3">
//             <label>Description</label>
//             <textarea
//               className="form-control"
//               value={categoryDescription}
//               onChange={handleCategoryDescriptionChange}
//             />
//           </div>

//           <Divider className="my-3" />

//           <div className="form-group">
//             <label>Published</label>
//             <Switch checked={switchChecked} onChange={handleSwitchChange} color="success" />
//           </div>

//           <Box sx={{ position: 'absolute', bottom: 20, width: '90%', display: 'flex', gap: 1 }}>
//             <Button fullWidth onClick={toggleRightDrawer}>Cancel</Button>
//             <Button fullWidth variant="contained" color="primary" onClick={handleSaveCategory}>
//               {isEditMode ? 'Update Category' : 'Add Category'}
//             </Button>
//           </Box>
//         </Box>
//       </Drawer>

//       <ToastContainer position="top-center" />
//     </div>
//   );
// }

// export default Categories;

















import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Card, Typography, Switch, Button, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Chip, Avatar, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TablePagination,
  Tooltip, Alert, InputAdornment
} from '@mui/material';
import {
  Add, Search, Delete, Edit, Visibility, VisibilityOff,
  CloudUpload, CloudDownload, FilterList, Clear,
  CheckCircle, Cancel, Image as ImageIcon
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    published: true,
    image: null
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/api/categories`);
      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) handleInputChange('image', file);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', published: true, image: null });
    setSelectedCategory(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const openAddDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
      published: category.published,
      image: null
    });
    setSelectedCategory(category);
    setDialogOpen(true);
  };

  const openDeleteDialog = (category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleSaveCategory = async () => {
    const { name, description, image, published } = formData;
    if (!name || !description) return toast.error('All fields are required.');

    const saveData = new FormData();
    saveData.append('name', name);
    saveData.append('description', description);
    saveData.append('published', published);
    if (image) saveData.append('image', image);

    try {
      if (selectedCategory) {
        await axios.put(`${API_BASE}/api/categories/${selectedCategory._id}`, saveData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Category updated successfully!');
      } else {
        await axios.post(`${API_BASE}/api/categories`, saveData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Category added successfully!');
      }
      setDialogOpen(false);
      fetchCategories();
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error('Failed to save category');
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(`${API_BASE}/api/categories/${selectedCategory._id}`);
      toast.success('Category deleted successfully!');
      setDeleteDialogOpen(false);
      fetchCategories();
    } catch (error) {
      toast.error('Error deleting category');
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Card sx={{ p: 3, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Categories Management</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={openAddDialog}>Add Category</Button>
        </Box>

        <Box mt={2} display="flex" gap={2}>
          <TextField
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"><Search /></InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm('')}>
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Card>

      <Card>
        <TableContainer>
          <Table>
            <TableHead sx={{ background: '#1976d2' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Category</TableCell>
                <TableCell sx={{ color: 'white' }}>Description</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCategories.map(cat => (
                <TableRow key={cat._id}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar src={`${API_BASE}${cat.image}`} />
                      <Typography>{cat.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{cat.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={cat.published ? 'Published' : 'Draft'}
                      color={cat.published ? 'success' : 'default'}
                      icon={cat.published ? <CheckCircle /> : <Cancel />}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit"><IconButton onClick={() => openEditDialog(cat)}><Edit /></IconButton></Tooltip>
                    <Tooltip title="Delete"><IconButton color="error" onClick={() => openDeleteDialog(cat)}><Delete /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{selectedCategory ? 'Edit Category' : 'Add Category'}</DialogTitle>
        <DialogContent>
          <TextField label="Name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} fullWidth sx={{ mt: 2 }} />
          <TextField label="Description" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} fullWidth sx={{ mt: 2 }} multiline rows={3} />
          <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
            Upload Image
            <input type="file" hidden ref={fileInputRef} onChange={handleImageChange} accept="image/*" />
          </Button>
          <Switch checked={formData.published} onChange={(e) => handleInputChange('published', e.target.checked)} /> {formData.published ? 'Published' : 'Draft'}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveCategory}>{selectedCategory ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>Are you sure you want to delete "{selectedCategory?.name}"?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDeleteCategory}>Delete</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-center" />
    </Box>
  );
}

export default Categories;
