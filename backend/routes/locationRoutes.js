const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Get all locations
router.get('/', locationController.getAllLocations);

// Get a single location
router.get('/:id', locationController.getLocation);

// Create a new location
router.post('/', locationController.createLocation);

// Update a location
router.put('/:id', locationController.updateLocation);

// Delete a location
router.delete('/:id', locationController.deleteLocation);

module.exports = router;
