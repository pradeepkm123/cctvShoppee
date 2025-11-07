//   // routes/wishlist.js
//   const express = require('express');
//   const router = express.Router();
//   const Wishlist = require('../models/Wishlist');
//   const Product = require('../models/Product');

//   // ---------------------------
//   // @route   POST /api/wishlist/add
//   // @desc    Add product to wishlist
//   // ---------------------------
//   router.post('/add', async (req, res) => {
//   const { userId, productId } = req.body;

//   if (!userId || !productId) {
//     return res.status(400).json({ message: 'userId and productId are required' });
//   }

//   try {
//     let wishlist = await Wishlist.findOne({ userId });

//     if (!wishlist) {
//       wishlist = new Wishlist({ userId, products: [] });
//     }

//     const alreadyExists = wishlist.products.some(
//       (id) => id.toString() === productId
//     );

//     if (alreadyExists) {
//       return res.status(400).json({ message: 'Product already in wishlist' });
//     }

//     wishlist.products.push(productId);
//     await wishlist.save();

//     res.status(200).json({ message: 'Product added to wishlist' });
//   } catch (err) {
//     console.error('Error adding to wishlist:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


//   // ---------------------------
//   // @route   POST /api/wishlist/remove
//   // @desc    Remove product from wishlist
//   // ---------------------------
//   router.post('/remove', async (req, res) => {
//     const { userId, productId } = req.body;

//     if (!userId || !productId) {
//       return res.status(400).json({ message: 'userId and productId are required' });
//     }

//     try {
//       const wishlist = await Wishlist.findOne({ userId });

//       if (!wishlist) {
//         return res.status(404).json({ message: 'Wishlist not found' });
//       }

//       const initialLength = wishlist.products.length;

//       wishlist.products = wishlist.products.filter(
//         (id) => id.toString() !== productId
//       );

//       if (wishlist.products.length === initialLength) {
//         return res.status(400).json({ message: 'Product not found in wishlist' });
//       }

//       await wishlist.save();
//       res.status(200).json({ message: 'Product removed from wishlist' });
//     } catch (err) {
//       console.error('Error removing from wishlist:', err);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });

//   // ---------------------------
//   // @route   GET /api/wishlist/:userId
//   // @desc    Get user's wishlist products
//   // ---------------------------
//   router.get('/:userId', async (req, res) => {
//     const { userId } = req.params;

//     if (!userId) {
//       return res.status(400).json({ message: 'userId is required' });
//     }

//     try {
//       const wishlist = await Wishlist.findOne({ userId }).populate('products');

//       if (!wishlist) {
//         return res.status(200).json([]); // return empty array if wishlist doesn't exist
//       }

//       res.status(200).json(wishlist.products);
//     } catch (err) {
//       console.error('Error fetching wishlist:', err);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });

//   module.exports = router;


// routes/wishlist.js
// const express = require('express');
// const router = express.Router();
// const Wishlist = require('../models/Wishlist');


// // Add product to wishlist
// router.post('/add', async (req, res) => {
//   const { userId, productId } = req.body;

//   if (!userId || !productId) {
//     return res.status(400).json({ message: 'userId and productId are required' });
//   }

//   try {
//     let wishlist = await Wishlist.findOne({ userId });

//     if (!wishlist) {
//       wishlist = new Wishlist({ userId, products: [] });
//     }

//     const alreadyExists = wishlist.products.some(
//       (id) => id.toString() === productId
//     );

//     if (alreadyExists) {
//       return res.status(400).json({ message: 'Product already in wishlist' });
//     }

//     wishlist.products.push(productId);
//     await wishlist.save();

//     res.status(200).json({ message: 'Product added to wishlist' });
//   } catch (err) {
//     console.error('Error adding to wishlist:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Remove product from wishlist
// router.post('/remove', async (req, res) => {
//   const { userId, productId } = req.body;

//   if (!userId || !productId) {
//     return res.status(400).json({ message: 'userId and productId are required' });
//   }

//   try {
//     const wishlist = await Wishlist.findOne({ userId });

//     if (!wishlist) {
//       return res.status(404).json({ message: 'Wishlist not found' });
//     }

//     const initialLength = wishlist.products.length;

//     wishlist.products = wishlist.products.filter(
//       (id) => id.toString() !== productId
//     );

//     if (wishlist.products.length === initialLength) {
//       return res.status(400).json({ message: 'Product not found in wishlist' });
//     }

//     await wishlist.save();
//     res.status(200).json({ message: 'Product removed from wishlist' });
//   } catch (err) {
//     console.error('Error removing from wishlist:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Get user's wishlist products
// router.get('/:userId', async (req, res) => {
//   const { userId } = req.params;

//   if (!userId) {
//     return res.status(400).json({ message: 'userId is required' });
//   }

//   try {
//     const wishlist = await Wishlist.findOne({ userId }).populate('products');

//     if (!wishlist) {
//       return res.status(200).json([]); // return empty array if wishlist doesn't exist
//     }

//     res.status(200).json(wishlist.products);
//   } catch (err) {
//     console.error('Error fetching wishlist:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;












const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// Add product to wishlist
router.post('/add', async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: 'userId and productId are required' });
  }

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
    }

    const alreadyExists = wishlist.products.some(
      (id) => id.toString() === productId
    );

    if (alreadyExists) {
      return res.status(200).json({ message: 'Product already in wishlist' });
    }

    wishlist.products.push(productId);
    await wishlist.save();

    res.status(200).json({ message: 'Product added to wishlist' });
  } catch (err) {
    console.error('Error adding to wishlist:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Remove product from wishlist
router.post('/remove', async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: 'userId and productId are required' });
  }

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    const initialLength = wishlist.products.length;

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    if (wishlist.products.length === initialLength) {
      return res.status(400).json({ message: 'Product not found in wishlist' });
    }

    await wishlist.save();
    res.status(200).json({ message: 'Product removed from wishlist' });
  } catch (err) {
    console.error('Error removing from wishlist:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's wishlist products
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate('products');

    if (!wishlist) {
      return res.status(200).json([]); // Return empty array if wishlist doesn't exist
    }

    res.status(200).json(wishlist.products);
  } catch (err) {
    console.error('Error fetching wishlist:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
