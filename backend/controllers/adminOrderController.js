const Order = require('../models/Order');

// Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.productId', 'name image')
      .populate('userId', 'name phone')
      .lean();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status, note } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        status,
        $push: {
          timeline: {
            status,
            note,
            timestamp: new Date()
          }
        }
      },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Process refund (Admin)
exports.processRefund = async (req, res) => {
  try {
    const { orderId, refundAmount, refundReason } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: 'Refunded',
        $push: {
          timeline: {
            status: 'Refund Processed',
            note: `Refund of ₹${refundAmount} processed. Reason: ${refundReason}`,
            timestamp: new Date()
          }
        }
      },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Cancel order (Admin)
exports.cancelOrder = async (req, res) => {
  try {
    const { orderId, reason } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        status: 'Cancelled',
        $push: {
          timeline: {
            status: 'Cancelled by admin',
            note: `Order cancelled. Reason: ${reason}`,
            timestamp: new Date()
          }
        }
      },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
