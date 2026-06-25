// controllers/reviewController.js
// All business logic for fetching and submitting reviews

const Review = require("../models/Review");

// GET /api/reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/reviews
const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    const savedReview = await review.save();

    res.status(201).json({
      success: true,
      message: "Thank you for your review!",
      review: savedReview,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getReviews, createReview };
