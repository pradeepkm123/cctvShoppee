const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  websiteUrl: {
    type: String,
    default: '#'
  },
  altText: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create index for better performance
clientSchema.index({ storeId: 1, isActive: 1, order: 1 });

module.exports = mongoose.model('Client', clientSchema);