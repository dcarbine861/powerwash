// routes/bookings.js

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  getBookingById,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");

// Validation rules for creating a booking
const bookingRules = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty().withMessage("Phone number is required")
    .isMobilePhone().withMessage("Please enter a valid phone number"),

  body("service")
    .notEmpty().withMessage("Service is required")
    .isIn(["House Exterior", "Driveway", "Deck/Patio", "Full Property Package"])
    .withMessage("Invalid service selected"),

  body("date")
    .notEmpty().withMessage("Date is required")
    .isISO8601().withMessage("Please enter a valid date")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("Appointment date must be in the future");
      }
      return true;
    }),

  body("address")
    .trim()
    .notEmpty().withMessage("Address is required")
    .isLength({ min: 5 }).withMessage("Please enter a full address"),
];

router.post("/", bookingRules, validate, createBooking);
router.get("/mine", protect, getMyBookings);
router.patch("/:id/cancel", protect, cancelBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);

module.exports = router;
