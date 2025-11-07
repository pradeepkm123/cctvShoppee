const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

// Create an order
router.post('/create-order', authMiddleware.authenticate, paymentController.createOrder);

// Verify payment
router.post('/verify-payment', authMiddleware.authenticate, paymentController.verifyPayment);

// Send payment link
router.post('/payment-link', authMiddleware.authenticate, paymentController.sendPaymentLink);

module.exports = router;
