// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/multer');
// const {
//   createCategory,
//   getCategories,
//   updateCategory,
//   deleteCategory,
// } = require('../controllers/categoryController');

// router.get('/', getCategories);
// router.post('/', upload.single('image'), createCategory);
// router.put('/:id', upload.single('image'), updateCategory);
// router.delete('/:id', deleteCategory);

// module.exports = router;



const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer'); // Middleware for handling image upload

// Controller methods
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

// @route   GET /api/categories
// @desc    Get all categories with product count
router.get('/', getCategories);

// @route   POST /api/categories
// @desc    Create a new category
// @access  Protected if needed
router.post('/', upload.single('image'), createCategory);

// @route   PUT /api/categories/:id
// @desc    Update a category by ID
router.put('/:id', upload.single('image'), updateCategory);

// @route   DELETE /api/categories/:id
// @desc    Delete a category by ID
router.delete('/:id', deleteCategory);

module.exports = router;
