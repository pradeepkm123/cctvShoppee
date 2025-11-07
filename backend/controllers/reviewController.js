const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { productId, name, rating, comment } = req.body;
    const newReview = new Review({
      productId,
      name,
      rating,
      comment
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Error saving review' });
  }
};

// Get all reviews for a product
exports.getReviewsByProductId = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
};
