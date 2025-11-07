// const mongoose = require('mongoose');

// const chatSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   lastMessage: String,
//   lastMessageTime: Date,
//   unreadCount: { type: Number, default: 0 },
// }, { timestamps: true });

// module.exports = mongoose.model('Chat', chatSchema);




const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastMessage: String,
  lastMessageTime: Date,
  unreadCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }, // For soft deletion
  deletedBy: [{ // Track who deleted the chat
    userType: { type: String, enum: ['user', 'admin'] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deletedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);