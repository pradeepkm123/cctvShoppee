// const Supercoin = require('../models/Supercoin');
// const User = require('../models/User');

// exports.getSupercoinBalance = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId);
//     res.json({ balance: user.superCoins });
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// };

// exports.useSupercoins = async (req, res) => {
//   try {
//     const { orderValue } = req.body;
//     const user = await User.findById(req.user.userId);

//     const maxCoinsUsable = Math.floor(orderValue * 0.2);
//     if (user.superCoins < maxCoinsUsable) {
//       throw new Error('Not enough SuperCoins');
//     }

//     user.superCoins -= maxCoinsUsable;
//     await user.save();

//     const supercoinTransaction = new Supercoin({
//       userId: user._id,
//       coins: maxCoinsUsable,
//       transactionType: 'spent',
//     });

//     await supercoinTransaction.save();
//     res.json({ message: 'SuperCoins used successfully', newBalance: user.superCoins });
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// };







const Supercoin = require('../models/Supercoin');
const User = require('../models/User');

exports.getSupercoinBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({ balance: user.superCoins });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Supercoin.find({ userId: req.user.userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.useSupercoins = async (req, res) => {
  try {
    const { orderValue } = req.body;
    const user = await User.findById(req.user.userId);
    const maxCoinsUsable = Math.floor(orderValue * 0.2);
    if (user.superCoins < maxCoinsUsable) {
      throw new Error('Not enough SuperCoins');
    }
    user.superCoins -= maxCoinsUsable;
    await user.save();
    const supercoinTransaction = new Supercoin({
      userId: user._id,
      coins: maxCoinsUsable,
      transactionType: 'spent',
    });
    await supercoinTransaction.save();
    res.json({ message: 'SuperCoins used successfully', newBalance: user.superCoins });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
