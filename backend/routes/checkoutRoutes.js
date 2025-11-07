const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes in this file
router.use(authMiddleware.authenticate);

// Route to verify UPI ID
router.post('/verify-upi', checkoutController.verifyUpiId);

// Route to place an order
router.post('/place-order', checkoutController.placeOrder);

module.exports = router;
