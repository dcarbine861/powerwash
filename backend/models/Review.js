// models/Review.js
// Blueprint for customer reviews stored in MongoDB

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    // Reviewer's name
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    // Star rating from 1 to 5
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },

    // Their written review
    comment: {
      type: String,
      required: [true, "Review comment is required"],
      trim: true,
    },

    // Which service they used
    service: {
      type: String,
      required: [true, "Service is required"],
      enum: ["House Exterior", "Driveway", "Deck/Patio", "Full Property Package"],
    },

    // Whether the review is approved to show on site (admin controls this)
    approved: {
      type: Boolean,
      default: true, // Set to false if you want to manually approve each one
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
