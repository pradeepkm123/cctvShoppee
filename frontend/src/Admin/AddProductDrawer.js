import React, { useState } from 'react';
import {
  Drawer, Box, Typography, TextField, Button, Switch,
  FormControl, InputLabel, Select, MenuItem, Grid, Chip,
  Stepper, Step, StepLabel, Card, CardContent, Divider,
  IconButton, Alert, FormHelperText
} from '@mui/material';
import { 
  Close, CloudUpload, AddPhotoAlternate, 
  Videocam, Description, Image
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_BASE = 'https://cctvshoppee.onrender.com/api';

const initialState = {
  name: '',
  description: '',
  images: [],
  videos: [],
  brochure: null,
  specification: null,
  banner1: null,
  banner2: null,
  sku: '',
  brand: '',
  category: '',
  oldPrice: '',
  newPrice: '',
  stock: '',
  status: '',
  model: '',
  productTag: '',
  productType: '',
  nightVision: '',
  audioChannel: '',
  battery: '',
  type: '',
  irRange: '',
  poePorts: '',
  ethernetPorts: '',
  offers: '',
  megaPixel: '',
  biometricType: '',
  videoChannel: '',
  cameraType: '',
  accessControl: '',
  channel: '',
  lens: '',
  communications: '',
  bodyType: '',
  upLinkPorts: '',
  sfpPorts: '',
  builtInPower: '',
  sataPorts: '',
  sdCard: '',
  isTrending: false,
  productBadge: '',
  productTab: '',
};

const steps = ['Basic Info', 'Pricing & Inventory', 'Specifications', 'Media & Files'];

export default function AddProductDrawer({ open, onClose, categories = [] }) {
  const [product, setProduct] = useState(initialState);
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((p) => ({ ...p, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileSingle = (e) => {
    const { name, files } = e.target;
    setProduct((p) => ({ ...p, [name]: files?.[0] || null }));
  };

  const handleFileMulti = (e) => {
    const { name, files } = e.target;
    setProduct((p) => ({ ...p, [name]: Array.from(files || []) }));
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setProduct((p) => ({ ...p, [name]: checked }));
  };

  const removeFile = (field, index = null) => {
    if (index !== null) {
      // Remove from array (images/videos)
      setProduct(p => ({
        ...p,
        [field]: p[field].filter((_, i) => i !== index)
      }));
    } else {
      // Remove single file
      setProduct(p => ({ ...p, [field]: null }));
    }
  };

  const resetAndClose = () => {
    setProduct(initialState);
    setActiveStep(0);
    setErrors({});
    onClose && onClose();
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Basic Info
        if (!product.name.trim()) newErrors.name = 'Product name is required';
        if (!product.category) newErrors.category = 'Category is required';
        if (!product.sku.trim()) newErrors.sku = 'SKU is required';
        break;
      
      case 1: // Pricing & Inventory
        if (!product.newPrice) newErrors.newPrice = 'Price is required';
        if (product.stock === '') newErrors.stock = 'Stock quantity is required';
        break;
      
      case 2: // Specifications
        // Add validation for required specs if needed
        break;
      
      case 3: // Media
        if (product.images.length === 0) newErrors.images = 'At least one image is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      toast.error('Please fix validation errors before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      const fd = new FormData();

      // Append primitives / singles
      const singleKeys = [
        'name','description','sku','brand','category','oldPrice','newPrice','stock','status',
        'model','productTag','productType','nightVision','audioChannel','battery','type','irRange',
        'poePorts','ethernetPorts','offers','megaPixel','biometricType','videoChannel','cameraType',
        'accessControl','channel','lens','communications','bodyType','upLinkPorts','sfpPorts',
        'builtInPower','sataPorts','sdCard','productBadge','productTab'
      ];
      singleKeys.forEach(k => {
        if (product[k] !== undefined && product[k] !== null && product[k] !== '') {
          fd.append(k, product[k]);
        }
      });

      // booleans
      fd.append('isTrending', product.isTrending ? 'true' : 'false');

      // Files: arrays
      (product.images || []).forEach(f => fd.append('images', f));
      (product.videos || []).forEach(f => fd.append('videos', f));

      // Files: singles
      if (product.brochure) fd.append('brochure', product.brochure);
      if (product.specification) fd.append('specification', product.specification);
      if (product.banner1) fd.append('banner1', product.banner1);
      if (product.banner2) fd.append('banner2', product.banner2);

      await axios.post(`${API_BASE}/products`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Product added successfully!');
      resetAndClose();
    } catch (error) {
      console.error('Error:', error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || 'Error adding product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="primary">
              Basic Information
            </Typography>
            
            <TextField 
              label="Product Name" 
              name="name" 
              value={product.name} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
              error={!!errors.name}
              helperText={errors.name}
              required
            />
            
            <TextField 
              label="Product Description" 
              name="description" 
              value={product.description} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
              multiline 
              rows={3}
            />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField 
                  label="SKU" 
                  name="sku" 
                  value={product.sku} 
                  onChange={handleChange} 
                  fullWidth 
                  margin="normal" 
                  error={!!errors.sku}
                  helperText={errors.sku}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="Brand" 
                  name="brand" 
                  value={product.brand} 
                  onChange={handleChange} 
                  fullWidth 
                  margin="normal" 
                />
              </Grid>
            </Grid>

            <FormControl fullWidth margin="normal" error={!!errors.category}>
              <InputLabel>Category *</InputLabel>
              <Select name="category" value={product.category} label="Category *" onChange={handleChange}>
                {categories.map((c) => (
                  <MenuItem key={c._id} value={c.name}>{c.name}</MenuItem>
                ))}
              </Select>
              {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
            </FormControl>

            <TextField label="Model" name="model" value={product.model} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Product Tag" name="productTag" value={product.productTag} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Product Type" name="productType" value={product.productType} onChange={handleChange} fullWidth margin="normal" />
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="primary">
              Pricing & Inventory
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField 
                  label="Old Price" 
                  name="oldPrice" 
                  value={product.oldPrice} 
                  onChange={handleChange} 
                  fullWidth 
                  margin="normal" 
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="New Price *" 
                  name="newPrice" 
                  value={product.newPrice} 
                  onChange={handleChange} 
                  fullWidth 
                  margin="normal" 
                  type="number"
                  error={!!errors.newPrice}
                  helperText={errors.newPrice}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="Stock *" 
                  name="stock" 
                  value={product.stock} 
                  onChange={handleChange} 
                  fullWidth 
                  margin="normal" 
                  type="number"
                  error={!!errors.stock}
                  helperText={errors.stock}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="Status" 
                  name="status" 
                  value={product.status} 
                  onChange={handleChange} 
                  fullWidth 
                  margin="normal" 
                />
              </Grid>
            </Grid>

            <Box mt={3}>
              <Typography variant="h6" gutterBottom color="primary">
                Product Features
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Product Badge</InputLabel>
                    <Select name="productBadge" value={product.productBadge} label="Product Badge" onChange={handleChange}>
                      <MenuItem value="Hot">Hot</MenuItem>
                      <MenuItem value="Trending">Trending</MenuItem>
                      <MenuItem value="Sale">Sale</MenuItem>
                      <MenuItem value="Upcoming">Upcoming</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Product Tab</InputLabel>
                    <Select name="productTab" value={product.productTab} label="Product Tab" onChange={handleChange}>
                      <MenuItem value="New">New</MenuItem>
                      <MenuItem value="Featured">Featured</MenuItem>
                      <MenuItem value="Top Sellers">Top Sellers</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box display="flex" alignItems="center" justifyContent="space-between" mt={2} p={2} sx={{ backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="500">Trending Product</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Feature this product in trending section
                  </Typography>
                </Box>
                <Switch 
                  name="isTrending" 
                  checked={product.isTrending} 
                  onChange={handleSwitchChange} 
                  color="primary" 
                />
              </Box>
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="primary">
              Technical Specifications
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Fill in the relevant technical specifications for your product
            </Typography>

            <Grid container spacing={2}>
              {[
                { label: 'Night Vision', name: 'nightVision' },
                { label: 'Audio Channel', name: 'audioChannel' },
                { label: 'Battery', name: 'battery' },
                { label: 'Type', name: 'type' },
                { label: 'IR Range', name: 'irRange' },
                { label: 'POE Ports', name: 'poePorts' },
                { label: 'Ethernet Ports', name: 'ethernetPorts' },
                { label: 'Offers', name: 'offers' },
                { label: 'Mega Pixel', name: 'megaPixel' },
                { label: 'Biometric Type', name: 'biometricType' },
                { label: 'Video Channel', name: 'videoChannel' },
                { label: 'Camera Type', name: 'cameraType' },
                { label: 'Access Control', name: 'accessControl' },
                { label: 'Channel', name: 'channel' },
                { label: 'Lens', name: 'lens' },
                { label: 'Communications', name: 'communications' },
                { label: 'Body Type', name: 'bodyType' },
                { label: 'Up-link Ports', name: 'upLinkPorts' },
                { label: 'SFP Ports', name: 'sfpPorts' },
                { label: 'Built-in Power', name: 'builtInPower' },
                { label: 'SATA Ports', name: 'sataPorts' },
                { label: 'SD Card', name: 'sdCard' },
              ].map((field, index) => (
                <Grid item xs={6} key={field.name}>
                  <TextField 
                    label={field.label} 
                    name={field.name} 
                    value={product[field.name]} 
                    onChange={handleChange} 
                    fullWidth 
                    size="small"
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="primary">
              Media & Documentation
            </Typography>

            {/* Images */}
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <AddPhotoAlternate color="primary" />
                  <Typography variant="h6">Product Images</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Upload product images (multiple selection supported)
                </Typography>
                
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  fullWidth
                >
                  Upload Images
                  <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleFileMulti}
                    hidden
                  />
                </Button>
                
                {errors.images && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {errors.images}
                  </Alert>
                )}

                {product.images.length > 0 && (
                  <Grid container spacing={1} sx={{ mt: 2 }}>
                    {product.images.map((file, index) => (
                      <Grid item xs={4} key={index}>
                        <Box sx={{ position: 'relative' }}>
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`preview-${index}`}
                            style={{
                              width: '100%',
                              height: 80,
                              objectFit: 'cover',
                              borderRadius: 1,
                              border: '1px solid #e0e0e0'
                            }}
                          />
                          <IconButton
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              backgroundColor: 'rgba(0,0,0,0.5)',
                              color: 'white',
                              '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
                            }}
                            onClick={() => removeFile('images', index)}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </CardContent>
            </Card>

            {/* Videos */}
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Videocam color="primary" />
                  <Typography variant="h6">Product Videos</Typography>
                </Box>
                
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  fullWidth
                >
                  Upload Videos
                  <input
                    type="file"
                    name="videos"
                    multiple
                    accept="video/*"
                    onChange={handleFileMulti}
                    hidden
                  />
                </Button>

                {product.videos.length > 0 && (
                  <Grid container spacing={1} sx={{ mt: 2 }}>
                    {product.videos.map((file, index) => (
                      <Grid item xs={6} key={index}>
                        <Box sx={{ position: 'relative' }}>
                          <video
                            src={URL.createObjectURL(file)}
                            style={{
                              width: '100%',
                              height: 100,
                              objectFit: 'cover',
                              borderRadius: 1,
                              border: '1px solid #e0e0e0'
                            }}
                            muted
                          />
                          <IconButton
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              backgroundColor: 'rgba(0,0,0,0.5)',
                              color: 'white',
                              '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
                            }}
                            onClick={() => removeFile('videos', index)}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                          <Chip 
                            label={file.name} 
                            size="small" 
                            sx={{ 
                              position: 'absolute', 
                              bottom: 4, 
                              left: 4,
                              backgroundColor: 'rgba(0,0,0,0.7)',
                              color: 'white'
                            }} 
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </CardContent>
            </Card>

            {/* Documents and Banners */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Description color="primary" />
                      <Typography variant="subtitle1">Brochure</Typography>
                    </Box>
                    <Button
                      component="label"
                      variant="outlined"
                      size="small"
                      fullWidth
                    >
                      Upload PDF
                      <input
                        type="file"
                        name="brochure"
                        accept="application/pdf"
                        onChange={handleFileSingle}
                        hidden
                      />
                    </Button>
                    {product.brochure && (
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <Chip 
                          label={product.brochure.name} 
                          size="small" 
                          onDelete={() => removeFile('brochure')}
                        />
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Description color="primary" />
                      <Typography variant="subtitle1">Specification</Typography>
                    </Box>
                    <Button
                      component="label"
                      variant="outlined"
                      size="small"
                      fullWidth
                    >
                      Upload PDF
                      <input
                        type="file"
                        name="specification"
                        accept="application/pdf"
                        onChange={handleFileSingle}
                        hidden
                      />
                    </Button>
                    {product.specification && (
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <Chip 
                          label={product.specification.name} 
                          size="small" 
                          onDelete={() => removeFile('specification')}
                        />
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Image color="primary" />
                      <Typography variant="subtitle1">Banner 1</Typography>
                    </Box>
                    <Button
                      component="label"
                      variant="outlined"
                      size="small"
                      fullWidth
                    >
                      Upload Image
                      <input
                        type="file"
                        name="banner1"
                        accept="image/*"
                        onChange={handleFileSingle}
                        hidden
                      />
                    </Button>
                    {product.banner1 && (
                      <Box sx={{ position: 'relative', mt: 1 }}>
                        <img
                          alt="banner1"
                          src={URL.createObjectURL(product.banner1)}
                          style={{ width: '100%', height: 60, objectFit: 'cover', borderRadius: 1 }}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white'
                          }}
                          onClick={() => removeFile('banner1')}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Image color="primary" />
                      <Typography variant="subtitle1">Banner 2</Typography>
                    </Box>
                    <Button
                      component="label"
                      variant="outlined"
                      size="small"
                      fullWidth
                    >
                      Upload Image
                      <input
                        type="file"
                        name="banner2"
                        accept="image/*"
                        onChange={handleFileSingle}
                        hidden
                      />
                    </Button>
                    {product.banner2 && (
                      <Box sx={{ position: 'relative', mt: 1 }}>
                        <img
                          alt="banner2"
                          src={URL.createObjectURL(product.banner2)}
                          style={{ width: '100%', height: 60, objectFit: 'cover', borderRadius: 1 }}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white'
                          }}
                          onClick={() => removeFile('banner2')}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={resetAndClose}
      PaperProps={{ sx: { width: { xs: '100%', sm: 600 } } }}
    >
      <Box sx={{ p: 3, height: '100vh', overflow: 'auto' }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="600">
            Add New Product
          </Typography>
          <IconButton onClick={resetAndClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step Content */}
        <Box sx={{ mb: 3 }}>
          {renderStepContent(activeStep)}
        </Box>

        {/* Navigation Buttons */}
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            variant="outlined"
          >
            Back
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={isSubmitting}
              sx={{ minWidth: 120 }}
            >
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              variant="contained"
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
