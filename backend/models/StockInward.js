const mongoose = require('mongoose');

const stockInwardSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  invoiceNumber: {
    type: String,
    trim: true
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    Price: {
      type: Number,
      min: 0
    }
  }],
  createdBy: {
    type: String,
    required: true,
    default: 'Admin'
  },
  totalValue: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate total value before saving
stockInwardSchema.pre('save', function(next) {
  this.totalValue = this.items.reduce((total, item) => {
    return total + (item.quantity * (item.purchasePrice || 0));
  }, 0);
  next();
});

module.exports = mongoose.model('StockInward', stockInwardSchema);