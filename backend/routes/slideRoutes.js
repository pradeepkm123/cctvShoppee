const express = require('express');
const router = express.Router();
const slideController = require('../controllers/slideController');

// Get all slides for a store
router.get('/store/:storeId', slideController.getSlidesByStore);

// Get slide by ID
router.get('/:id', slideController.getSlideById);

// Create new slide
router.post('/', slideController.createSlide);

// Update slide
router.put('/:id', slideController.updateSlide);

// Delete slide
router.delete('/:id', slideController.deleteSlide);

// Reorder slides
router.put('/reorder/slides', slideController.reorderSlides);

// Get all stores
router.get('/stores/all', slideController.getStores);

module.exports = router;