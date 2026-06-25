// routes/reviews.js

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { getReviews, createReview } = require("../controllers/reviewController");
const validate = require("../middleware/validate");

// Validation rules for submitting a review
const reviewRules = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required"),

  body("rating")
    .notEmpty().withMessage("Rating is required")
    .isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),

  body("comment")
    .trim()
    .notEmpty().withMessage("Review comment is required")
    .isLength({ min: 10 }).withMessage("Comment must be at least 10 characters"),
];

router.get("/", getReviews);
router.post("/", reviewRules, validate, createReview);

module.exports = router;
