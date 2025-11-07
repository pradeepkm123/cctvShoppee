// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');
// const upload = require('../middleware/upload');


// const uploadFields = upload.fields([
//   { name: 'images', maxCount: 20 },
//   { name: 'videos', maxCount: 10 },
//   { name: 'brochure', maxCount: 1 },
//   { name: 'specification', maxCount: 1 },
//   { name: 'banner1', maxCount: 1 },
//   { name: 'banner2', maxCount: 1 },
// ]);

// router.post('/', uploadFields, productController.addProduct);
// router.get('/', productController.getAllProducts);
// router.get('/:id', productController.getProductById);
// router.put('/:id', uploadFields, productController.updateProduct);
// router.delete('/:id', productController.deleteProduct);


// module.exports = router;

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');

// Multer upload field definitions
const uploadFields = upload.fields([
  { name: 'images', maxCount: 20 },
  { name: 'videos', maxCount: 10 },
  { name: 'brochure', maxCount: 1 },
  { name: 'specification', maxCount: 1 },
  { name: 'banner1', maxCount: 1 },
  { name: 'banner2', maxCount: 1 },
]);

router.post('/', uploadFields, productController.addProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', uploadFields, productController.updateProduct);

module.exports = router;
