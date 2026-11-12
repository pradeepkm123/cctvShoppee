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

const API_BASE = 'https://cctvshoppee.onrender.com';

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
