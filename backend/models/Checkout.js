// models/Checkout.js
const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  cart: { type: Array, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
