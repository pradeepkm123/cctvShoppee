// routes/adminOrderRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const {
  updateOrderStatus,
  processRefund,
  cancelOrder,
} = require('../controllers/orderController');

// 🔒 All admin order routes need authentication
router.use(authenticate);

// ✅ Update order status
router.post('/update-status', updateOrderStatus);

// ✅ Process refund
router.post('/process-refund', processRefund);

// ✅ Cancel order
router.post('/cancel-order', cancelOrder);

module.exports = router;
