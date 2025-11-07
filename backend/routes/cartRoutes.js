// const express = require('express');
// const auth = require('../middleware/auth');
// const User = require('../models/User');
// const Product = require('../models/Product');
// const Cart = require('../models/Cart');
// const router = express.Router();

// router.post('/add', auth, async (req, res) => {
//   const { productId, quantity } = req.body;
//   try {
//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).send('Product not found.');

//     const user = await User.findById(req.user.userId);
//     user.cart = user.cart || [];
//     user.cart.push({ product: productId, quantity });
//     await user.save();

//     res.status(200).send('Product added to cart.');
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// router.get('/', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).populate('cart.product');
//     res.json(user.cart || []);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// router.delete('/remove/:productId', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId);
//     user.cart = user.cart.filter(item => item.product.toString() !== req.params.productId);
//     await user.save();
//     res.status(200).send('Product removed from cart.');
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// router.delete('/clear', auth, async (req, res) => {
//   try {
//     await Cart.deleteMany({ user: req.user.id });
//     res.status(200).json({ success: true, message: 'Cart cleared successfully' });
//   } catch (error) {
//     console.error('Error clearing cart:', error);
//     res.status(500).json({ success: false, message: 'Failed to clear cart' });
//   }
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');

// Protected routes
router.post('/add', auth, addToCart);
router.get('/', auth, getCart);
router.delete('/remove/:productId', auth, removeFromCart);
router.delete('/clear', auth, clearCart);

module.exports = router;
