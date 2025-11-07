// const mongoose = require('mongoose');

// const SupercoinSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   coins: { type: Number, required: true },
//   transactionType: { type: String, enum: ['earned', 'spent'], required: true },
//   orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
//   date: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Supercoin', SupercoinSchema);



const mongoose = require('mongoose');

const SupercoinSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coins: { type: Number, required: true },
  transactionType: { type: String, enum: ['earned', 'spent'], required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Supercoin', SupercoinSchema);
