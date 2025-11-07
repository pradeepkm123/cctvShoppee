const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  warehouse: {
    type: String,
    required: true,
  },
  createdOn: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Location', LocationSchema);
