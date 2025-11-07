const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('image'), uploadController.createBanner);

module.exports = router;
