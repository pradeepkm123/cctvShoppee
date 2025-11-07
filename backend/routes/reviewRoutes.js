const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// POST route to create a new review
router.post('/reviews', reviewController.createReview);

// GET route to fetch reviews by product ID
router.get('/reviews/:productId', reviewController.getReviewsByProductId);

module.exports = router;
