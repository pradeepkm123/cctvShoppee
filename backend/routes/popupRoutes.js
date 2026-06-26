const express = require('express');
const router = express.Router();
const popupController = require('../controllers/popupController');

// Public route to get active popup
router.get('/active/:storeId', popupController.getActivePopup);
router.get('/active', popupController.getActivePopup); // Default to 'default' store inside controller

// Admin routes
router.get('/', popupController.getAllPopups);
router.post('/', popupController.createPopup);
router.put('/:id', popupController.updatePopup);
router.delete('/:id', popupController.deletePopup);

module.exports = router;
