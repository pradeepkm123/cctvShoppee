// const express = require('express');
// const { getUser } = require('../controllers/userController');
// const auth = require('../middleware/auth')

// const router = express.Router();

// // Define the route for getting user data
// router.get('/me', auth, getUser);

// module.exports = router;


const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Protected Route to Fetch User Data
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('wishlist')
      .populate('orders')
      .populate('cart.product');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout Endpoint
router.post('/logout', (req, res) => {
  // In a stateless JWT setup, logout is typically handled client-side by removing the token
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
