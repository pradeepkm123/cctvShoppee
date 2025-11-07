// controllers/checkoutController.js
const Checkout = require('../models/Checkout');

// Verify UPI ID
exports.verifyUpiId = async (req, res) => {
  const { upiId } = req.body;

  // Mock verification logic
  if (upiId) {
    res.json({ isValid: true, name: 'John Doe' });
  } else {
    res.status(400).json({ isValid: false, message: 'Invalid UPI ID' });
  }
};

// Place Order
exports.placeOrder = async (req, res) => {
  const { firstName, lastName, phone, email, paymentMethod, cart, total } = req.body;

  try {
    const newOrder = new Checkout({
      firstName,
      lastName,
      phone,
      email,
      paymentMethod,
      cart,
      total,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
};
