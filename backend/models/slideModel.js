const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: true,
    index: true
  },
  image: {
    type: String,
    required: true
  },
  eyebrow: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  blurb: {
    type: String,
    default: ''
  },
  ctaText: {
    type: String,
    default: 'Shop Now'
  },
  ctaHref: {
    type: String,
    default: '/'
  },
  backgroundColor: {
    type: String,
    default: ''
  },
  lightText: {
    type: Boolean,
    default: true
  },
  badge: {
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
slideSchema.index({ storeId: 1, isActive: 1, order: 1 });

module.exports = mongoose.model('Slide', slideSchema);