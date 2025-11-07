const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  published: { type: Boolean, default: true },
  image: { type: String },
  productCount: { type: Number, default: 0 }
  // Remove the id field unless you specifically need it
},{timestamps:true});

module.exports = mongoose.model('Category', categorySchema);
