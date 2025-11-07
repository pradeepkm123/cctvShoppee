const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');

// Get all warehouses
router.get('/', warehouseController.getAllWarehouses);

// Get a single warehouse
router.get('/:id', warehouseController.getWarehouse);

// Create a new warehouse
router.post('/', warehouseController.createWarehouse);

// Update a warehouse
router.put('/:id', warehouseController.updateWarehouse);

// Delete a warehouse
router.delete('/:id', warehouseController.deleteWarehouse);

module.exports = router;
