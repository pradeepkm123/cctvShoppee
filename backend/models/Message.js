// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
//   sender: { type: String, enum: ['user', 'admin'], required: true },
//   text: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
// }, { timestamps: true });

// module.exports = mongoose.model('Message', messageSchema);




const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender: { type: String, enum: ['user', 'admin'], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false }, // Soft delete
  deletedBy: { type: String, enum: ['user', 'admin'] }, // Who deleted
  deletedAt: Date,
  originalText: String // Store original message before deletion
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);