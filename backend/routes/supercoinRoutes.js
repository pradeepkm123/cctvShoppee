// // routes/supercoinRoutes.js
// const express = require('express');
// const router = express.Router();
// const supercoinController = require('../controllers/supercoinController');
// const authMiddleware = require('../middleware/authMiddleware');

// router.get('/balance', authMiddleware.authenticate, supercoinController.getSupercoinBalance);
// router.post('/use', authMiddleware.authenticate, supercoinController.useSupercoins);

// module.exports = router;




const express = require('express');
const router = express.Router();
const Supercoin = require('../models/Supercoin');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Use SuperCoins
router.post('/use', authMiddleware.authenticate, async (req, res) => {
  try {
    const { orderValue, coinsUsed } = req.body;
    const user = await User.findById(req.user.userId);

    if (user.superCoins < coinsUsed) {
      return res.status(400).json({ success: false, message: 'Insufficient SuperCoins' });
    }

    user.superCoins -= coinsUsed;
    await user.save();

    const supercoinTransaction = new Supercoin({
      userId: user._id,
      coins: coinsUsed,
      transactionType: 'spent',
    });

    await supercoinTransaction.save();

    res.json({
      success: true,
      message: 'SuperCoins used successfully',
      newBalance: user.superCoins,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Earn SuperCoins
router.post('/earn', authMiddleware.authenticate, async (req, res) => {
  try {
    const { orderValue, isPlusMember, orderId } = req.body;
    const user = await User.findById(req.user.userId);

    // Calculate SuperCoins earned (e.g., 2% for regular users, 4% for Plus members)
    const coinsEarned = isPlusMember
      ? Math.min(Math.floor(orderValue / 100) * 4, 100)
      : Math.min(Math.floor(orderValue / 100) * 2, 50);

    user.superCoins += coinsEarned;
    await user.save();

    const supercoinTransaction = new Supercoin({
      userId: user._id,
      coins: coinsEarned,
      transactionType: 'earned',
      orderId,
    });

    await supercoinTransaction.save();

    res.json({
      success: true,
      message: 'SuperCoins earned successfully',
      newBalance: user.superCoins,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get SuperCoins Balance
router.get('/balance', authMiddleware.authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({ balance: user.superCoins });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get SuperCoins Transaction History
router.get('/transactions', authMiddleware.authenticate, async (req, res) => {
  try {
    const transactions = await Supercoin.find({ userId: req.user.userId })
      .sort({ date: -1 }) // Sort by most recent first
      .populate('orderId', 'orderNumber'); // Optionally populate order details

    res.json(transactions);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
