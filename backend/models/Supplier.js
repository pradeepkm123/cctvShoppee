// models/Supplier.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  code: String,
  price: Number,
  stock: Number,
});

const supplierSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: String,
  phone: String,
  products: Number,
  value: Number,
  paymentTerms: String,
  productList: [productSchema],
});

module.exports = mongoose.model('Supplier', supplierSchema);
