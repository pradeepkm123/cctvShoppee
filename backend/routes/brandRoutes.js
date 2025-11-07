const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

// Get all brands
router.get('/', brandController.getAllBrands);

// Get a single brand
router.get('/:id', brandController.getBrand);

// Create a new brand
router.post('/', brandController.createBrand);

// Update a brand
router.put('/:id', brandController.updateBrand);

// Delete a brand
router.delete('/:id', brandController.deleteBrand);

module.exports = router;
