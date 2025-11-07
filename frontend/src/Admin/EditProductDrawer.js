import React, { useState, useEffect } from 'react';
import {
  Drawer, Box, Typography, TextField, Button, Switch,
  FormControl, InputLabel, Select, MenuItem, Grid, Chip,
  Stepper, Step, StepLabel, Card, CardContent, Divider,
  IconButton, Alert, FormHelperText, Tab, Tabs, Accordion,
  AccordionSummary, AccordionDetails, Avatar
} from '@mui/material';
import { 
  Close, CloudUpload, AddPhotoAlternate, 
  Videocam, Description, Image, ExpandMore,
  Delete, Visibility
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const EMPTY = {
  _id: '',
  name: '',
  description: '',
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
  image: null,
  brochure: null,
  specification: null,
  banner1: null,
  banner2: null,
  images: [],
  videos: [],
  media: [],
  newImages: [],
  newVideos: [],
  newBrochure: null,
  newSpecification: null,
  newBanner1: null,
  newBanner2: null,
};

const steps = ['Basic Info', 'Pricing & Features', 'Specifications', 'Media & Files'];

const EditProductDrawer = ({ open, onClose, productToEdit }) => {
  const [product, setProduct] = useState(EMPTY);
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setProduct((prev) => ({
        ...EMPTY,
        ...productToEdit,
        images: productToEdit.images || [],
        videos: productToEdit.videos || [],
        media: productToEdit.media || [],
        newImages: [],
        newVideos: [],
        newBrochure: null,
        newSpecification: null,
        newBanner1: null,
        newBanner2: null,
      }));
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((p) => ({ ...p, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setProduct((p) => ({ ...p, [name]: checked }));
  };

  const handleFileSingle = (e) => {
    const { name, files } = e.target;
    const f = files?.[0] || null;

    if (name === 'brochure') setProduct((p) => ({ ...p, newBrochure: f }));
    else if (name === 'specification') setProduct((p) => ({ ...p, newSpecification: f }));
    else if (name === 'banner1') setProduct((p) => ({ ...p, newBanner1: f }));
    else if (name === 'banner2') setProduct((p) => ({ ...p, newBanner2: f }));
  };

  const handleFileMulti = (e) => {
    const { name, files } = e.target;
    const arr = Array.from(files || []);
    if (name === 'images') {
      setProduct((p) => ({ ...p, newImages: arr }));
    } else if (name === 'videos') {
      setProduct((p) => ({ ...p, newVideos: arr }));
    }
  };

  const removeExistingImage = (index) => {
    setProduct(p => ({
      ...p,
      images: p.images.filter((_, i) => i !== index)
    }));
  };

  const removeNewImage = (index) => {
    setProduct(p => ({
      ...p,
      newImages: p.newImages.filter((_, i) => i !== index)
    }));
  };

  const removeExistingVideo = (index) => {
    setProduct(p => ({
      ...p,
      videos: p.videos.filter((_, i) => i !== index)
    }));
  };

  const removeNewVideo = (index) => {
    setProduct(p => ({
      ...p,
      newVideos: p.newVideos.filter((_, i) => i !== index)
    }));
  };

  const resetAndClose = () => {
    setProduct(EMPTY);
    setActiveStep(0);
    setActiveTab(0);
    setErrors({});
    onClose && onClose();
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 0:
        if (!product.name.trim()) newErrors.name = 'Product name is required';
        if (!product.sku.trim()) newErrors.sku = 'SKU is required';
        break;
      case 1:
        if (!product.newPrice) newErrors.newPrice = 'Price is required';
        if (product.stock === '') newErrors.stock = 'Stock quantity is required';
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

    if (!product?._id) {
      toast.error('Missing product id');
      return;
    }

    setIsSubmitting(true);
    try {
      const fd = new FormData();

      const scalars = [
        'name','description','sku','brand','category','oldPrice','newPrice','stock','status',
        'model','productTag','productType','nightVision','audioChannel','battery','type','irRange',
        'poePorts','ethernetPorts','offers','megaPixel','biometricType','videoChannel','cameraType',
        'accessControl','channel','lens','communications','bodyType','upLinkPorts','sfpPorts',
        'builtInPower','sataPorts','sdCard','productBadge','productTab'
      ];
      
      scalars.forEach(k => {
        const v = product[k];
        if (v !== undefined && v !== null && String(v).trim() !== '') {
          fd.append(k, v);
        }
      });

      fd.append('isTrending', product.isTrending ? 'true' : 'false');

      (product.newImages || []).forEach(f => fd.append('images', f));
      (product.newVideos || []).forEach(f => fd.append('videos', f));
      if (product.newBrochure) fd.append('brochure', product.newBrochure);
      if (product.newSpecification) fd.append('specification', product.newSpecification);
      if (product.newBanner1) fd.append('banner1', product.newBanner1);
      if (product.newBanner2) fd.append('banner2', product.newBanner2);

      await axios.put(`${API_BASE}/products/${product._id}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Product updated successfully!');
      resetAndClose();
    } catch (err) {
      console.error('Update error:', err?.response?.data || err.message);
      toast.error(err?.response?.data?.message || 'Error updating product');
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
              label="Product Name *" 
              name="name" 
              value={product.name || ''} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
              error={!!errors.name}
              helperText={errors.name}
            />
            
            <TextField 
              label="Product Description" 
              name="description" 
              value={product.description || ''} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
              multiline 
              rows={3}
            />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField 
                  label="SKU *" 
                  name="sku" 
                  value={product.sku || ''} 
                  onChange={handleChange} 
                  fullWidth 
                  margin="normal" 
                  error={!!errors.sku}
                  helperText={errors.sku}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="Brand" 
                  name="brand" 
                  value={product.brand || ''} 
                  onChange={handleChange} 
                  fullWidth 
                  margin="normal" 
                />
              </Grid>
            </Grid>

            <TextField 
              label="Category" 
              name="category" 
              value={product.category?.name || product.category || ''} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
            />

            <TextField label="Model" name="model" value={product.model || ''} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Product Tag" name="productTag" value={product.productTag || ''} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Product Type" name="productType" value={product.productType || ''} onChange={handleChange} fullWidth margin="normal" />
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
                  value={product.oldPrice || ''} 
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
                  value={product.newPrice || ''} 
                  onChange={handleChange} 
                  fullWidth 
                  margin="normal" 
                  type="number"
                  error={!!errors.newPrice}
                  helperText={errors.newPrice}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="Stock *" 
                  name="stock" 
                  value={product.stock || ''} 
                  onChange={handleChange} 
                  fullWidth 
                  margin="normal" 
                  type="number"
                  error={!!errors.stock}
                  helperText={errors.stock}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="Status" 
                  name="status" 
                  value={product.status || ''} 
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
                    <Select name="productBadge" value={product.productBadge || ''} label="Product Badge" onChange={handleChange}>
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
                    <Select name="productTab" value={product.productTab || ''} label="Product Tab" onChange={handleChange}>
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
                  checked={!!product.isTrending} 
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
              Update the technical specifications for your product
            </Typography>

            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography fontWeight="500">Camera & Video Specifications</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {[
                    { label: 'Night Vision', name: 'nightVision' },
                    { label: 'Audio Channel', name: 'audioChannel' },
                    { label: 'Video Channel', name: 'videoChannel' },
                    { label: 'Camera Type', name: 'cameraType' },
                    { label: 'Mega Pixel', name: 'megaPixel' },
                    { label: 'IR Range', name: 'irRange' },
                    { label: 'Lens', name: 'lens' },
                  ].map((field) => (
                    <Grid item xs={6} key={field.name}>
                      <TextField 
                        label={field.label} 
                        name={field.name} 
                        value={product[field.name] || ''} 
                        onChange={handleChange} 
                        fullWidth 
                        size="small"
                      />
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography fontWeight="500">Network & Connectivity</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {[
                    { label: 'POE Ports', name: 'poePorts' },
                    { label: 'Ethernet Ports', name: 'ethernetPorts' },
                    { label: 'Up-link Ports', name: 'upLinkPorts' },
                    { label: 'SFP Ports', name: 'sfpPorts' },
                    { label: 'Channel', name: 'channel' },
                    { label: 'Communications', name: 'communications' },
                  ].map((field) => (
                    <Grid item xs={6} key={field.name}>
                      <TextField 
                        label={field.label} 
                        name={field.name} 
                        value={product[field.name] || ''} 
                        onChange={handleChange} 
                        fullWidth 
                        size="small"
                      />
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography fontWeight="500">Hardware Specifications</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {[
                    { label: 'Battery', name: 'battery' },
                    { label: 'Type', name: 'type' },
                    { label: 'Body Type', name: 'bodyType' },
                    { label: 'Built-in Power', name: 'builtInPower' },
                    { label: 'SATA Ports', name: 'sataPorts' },
                    { label: 'SD Card', name: 'sdCard' },
                    { label: 'Access Control', name: 'accessControl' },
                    { label: 'Biometric Type', name: 'biometricType' },
                    { label: 'Offers', name: 'offers' },
                  ].map((field) => (
                    <Grid item xs={6} key={field.name}>
                      <TextField 
                        label={field.label} 
                        name={field.name} 
                        value={product[field.name] || ''} 
                        onChange={handleChange} 
                        fullWidth 
                        size="small"
                      />
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="primary">
              Media & Documentation
            </Typography>

            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
              <Tab label="Images" />
              <Tab label="Videos" />
              <Tab label="Documents" />
              <Tab label="Banners" />
            </Tabs>

            {activeTab === 0 && (
              <Box>
                {/* Existing Images */}
                {product.images.length > 0 && (
                  <Card variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Current Images ({product.images.length})
                      </Typography>
                      <Grid container spacing={1}>
                        {product.images.map((url, index) => (
                          <Grid item xs={4} key={`existing-img-${index}`}>
                            <Box sx={{ position: 'relative' }}>
                              <img
                                src={url}
                                alt={`existing-${index}`}
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
                                onClick={() => removeExistingImage(index)}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                )}

                {/* Add New Images */}
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <AddPhotoAlternate color="primary" />
                      <Typography variant="h6">Add New Images</Typography>
                    </Box>
                    
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUpload />}
                      fullWidth
                    >
                      Upload New Images
                      <input
                        type="file"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={handleFileMulti}
                        hidden
                      />
                    </Button>

                {product.newImages.length > 0 && (
                  <Grid container spacing={1} sx={{ mt: 2 }}>
                    {product.newImages.map((file, index) => (
                      <Grid item xs={4} key={`new-img-${index}`}>
                        <Box sx={{ position: 'relative' }}>
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`new-${index}`}
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
                            onClick={() => removeNewImage(index)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
                  </CardContent>
                </Card>
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                {/* Existing Videos */}
                {product.videos.length > 0 && (
                  <Card variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Current Videos ({product.videos.length})
                      </Typography>
                      <Grid container spacing={1}>
                        {product.videos.map((url, index) => (
                          <Grid item xs={6} key={`existing-vid-${index}`}>
                            <Box sx={{ position: 'relative' }}>
                              <video
                                src={url}
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
                                onClick={() => removeExistingVideo(index)}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                )}

                {/* Add New Videos */}
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <Videocam color="primary" />
                      <Typography variant="h6">Add New Videos</Typography>
                    </Box>
                    
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUpload />}
                      fullWidth
                    >
                      Upload New Videos
                      <input
                        type="file"
                        name="videos"
                        multiple
                        accept="video/*"
                        onChange={handleFileMulti}
                        hidden
                      />
                    </Button>

                    {product.newVideos.length > 0 && (
                      <Grid container spacing={1} sx={{ mt: 2 }}>
                        {product.newVideos.map((file, index) => (
                          <Grid item xs={6} key={`new-vid-${index}`}>
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
                                onClick={() => removeNewVideo(index)}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </CardContent>
                </Card>
              </Box>
            )}

            {activeTab === 2 && (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <Description color="primary" />
                        <Typography variant="h6">Brochure</Typography>
                      </Box>
                      
                      {product.brochure && (
                        <Box display="flex" alignItems="center" gap={1} mb={2} p={1} sx={{ backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                          <Description />
                          <Typography variant="body2" flex={1}>
                            Current file
                          </Typography>
                          <IconButton size="small" color="error" onClick={() => setProduct(p => ({ ...p, brochure: null }))}>
                            <Delete />
                          </IconButton>
                        </Box>
                      )}
                      
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUpload />}
                        fullWidth
                      >
                        {product.newBrochure ? 'Replace PDF' : 'Upload PDF'}
                        <input
                          type="file"
                          name="brochure"
                          accept="application/pdf"
                          onChange={handleFileSingle}
                          hidden
                        />
                      </Button>
                      
                      {product.newBrochure && (
                        <Chip 
                          label={product.newBrochure.name} 
                          onDelete={() => setProduct(p => ({ ...p, newBrochure: null }))}
                          sx={{ mt: 1 }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <Description color="primary" />
                        <Typography variant="h6">Specification</Typography>
                      </Box>
                      
                      {product.specification && (
                        <Box display="flex" alignItems="center" gap={1} mb={2} p={1} sx={{ backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                          <Description />
                          <Typography variant="body2" flex={1}>
                            Current file
                          </Typography>
                          <IconButton size="small" color="error" onClick={() => setProduct(p => ({ ...p, specification: null }))}>
                            <Delete />
                          </IconButton>
                        </Box>
                      )}
                      
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUpload />}
                        fullWidth
                      >
                        {product.newSpecification ? 'Replace PDF' : 'Upload PDF'}
                        <input
                          type="file"
                          name="specification"
                          accept="application/pdf"
                          onChange={handleFileSingle}
                          hidden
                        />
                      </Button>
                      
                      {product.newSpecification && (
                        <Chip 
                          label={product.newSpecification.name} 
                          onDelete={() => setProduct(p => ({ ...p, newSpecification: null }))}
                          sx={{ mt: 1 }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {activeTab === 3 && (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <Image color="primary" />
                        <Typography variant="h6">Banner 1</Typography>
                      </Box>
                      
                      {product.banner1 && (
                        <Box sx={{ mb: 2 }}>
                          <img
                            src={product.banner1}
                            alt="Current Banner 1"
                            style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 1 }}
                          />
                        </Box>
                      )}
                      
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUpload />}
                        fullWidth
                      >
                        {product.newBanner1 ? 'Replace Banner' : 'Upload Banner'}
                        <input
                          type="file"
                          name="banner1"
                          accept="image/*"
                          onChange={handleFileSingle}
                          hidden
                        />
                      </Button>
                      
                      {product.newBanner1 && (
                        <Box sx={{ mt: 1 }}>
                          <img
                            src={URL.createObjectURL(product.newBanner1)}
                            alt="New Banner 1"
                            style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 1 }}
                          />
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <Image color="primary" />
                        <Typography variant="h6">Banner 2</Typography>
                      </Box>
                      
                      {product.banner2 && (
                        <Box sx={{ mb: 2 }}>
                          <img
                            src={product.banner2}
                            alt="Current Banner 2"
                            style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 1 }}
                          />
                        </Box>
                      )}
                      
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUpload />}
                        fullWidth
                      >
                        {product.newBanner2 ? 'Replace Banner' : 'Upload Banner'}
                        <input
                          type="file"
                          name="banner2"
                          accept="image/*"
                          onChange={handleFileSingle}
                          hidden
                        />
                      </Button>
                      
                      {product.newBanner2 && (
                        <Box sx={{ mt: 1 }}>
                          <img
                            src={URL.createObjectURL(product.newBanner2)}
                            alt="New Banner 2"
                            style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 1 }}
                          />
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
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
      PaperProps={{ sx: { width: { xs: '100%', sm: 700 } } }}
    >
      <Box sx={{ p: 3, height: '100vh', overflow: 'auto',marginTop:'10%' }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h5" fontWeight="600">
              Edit Product
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.name || 'Update product details'}
            </Typography>
          </Box>
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
        <Box sx={{ mb: 3, maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
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
              {isSubmitting ? 'Updating...' : 'Update Product'}
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
};

export default EditProductDrawer;