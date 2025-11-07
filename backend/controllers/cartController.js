// const User = require('../models/User');

// /**
//  * @desc Add a product to the user's cart
//  * @route POST /api/cart/add
//  * @access Private
//  */
// exports.addToCart = async (req, res) => {
//   try {
//     const { userId, productId, quantity } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const existingItemIndex = user.cart.findIndex(
//       (item) => item.product.toString() === productId
//     );

//     if (existingItemIndex > -1) {
//       user.cart[existingItemIndex].quantity += quantity;
//     } else {
//       user.cart.push({ product: productId, quantity });
//     }

//     await user.save();
//     res.status(200).json({ message: 'Product added to cart', cart: user.cart });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };


// /**
//  * @desc Get user's cart items
//  * @route GET /api/cart
//  * @access Private
//  */
// exports.getCart = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).populate('cart.product');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json(user.cart);
//   } catch (error) {
//     console.error('Get cart error:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// /**
//  * @desc Remove a product from user's cart
//  * @route DELETE /api/cart/remove/:productId
//  * @access Private
//  */
// exports.removeFromCart = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const initialCartLength = user.cart.length;
//     user.cart = user.cart.filter(
//       (item) => item.product.toString() !== productId
//     );

//     if (user.cart.length === initialCartLength) {
//       return res.status(404).json({ message: 'Product not found in cart' });
//     }

//     await user.save();

//     const updatedUser = await User.findById(req.user._id).populate('cart.product');

//     res.status(200).json({
//       message: 'Product removed from cart',
//       cart: updatedUser.cart,
//     });
//   } catch (error) {
//     console.error('Remove from cart error:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


const User = require('../models/User');

/**
 * @desc Add or update a product in the user's cart
 * @route POST /api/cart/add
 * @access Private
 */
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = user.cart || [];

    const existingIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingIndex > -1) {
      // If quantity becomes zero or negative, remove item
      const newQty = user.cart[existingIndex].quantity + quantity;
      if (newQty <= 0) {
        user.cart.splice(existingIndex, 1);
      } else {
        user.cart[existingIndex].quantity = newQty;
      }
    } else if (quantity > 0) {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    const updatedUser = await User.findById(req.user.userId).populate('cart.product');
    res.status(200).json({ message: 'Cart updated', cart: updatedUser.cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc Get user's cart
 * @route GET /api/cart
 * @access Private
 */
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('cart.product');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user.cart || []);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc Remove a product from user's cart
 * @route DELETE /api/cart/remove/:productId
 * @access Private
 */
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const initialLength = user.cart.length;
    user.cart = user.cart.filter((item) => item.product.toString() !== productId);

    if (user.cart.length === initialLength) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    await user.save();
    const updatedUser = await User.findById(req.user.userId).populate('cart.product');
    res.status(200).json({ message: 'Product removed', cart: updatedUser.cart });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc Clear user's cart
 * @route DELETE /api/cart/clear
 * @access Private
 */
exports.clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = [];
    await user.save();
    res.status(200).json({ success: true, message: 'Cart cleared successfully', cart: [] });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ success: false, message: 'Failed to clear cart', error: error.message });
  }
};
