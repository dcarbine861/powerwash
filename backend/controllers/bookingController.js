// controllers/bookingController.js
// All business logic for creating and managing bookings

const jwt = require("jsonwebtoken");
const Booking = require("../models/Booking");

// POST /api/bookings
const createBooking = async (req, res) => {
  try {
    // Attach userId if a valid token is present (guest bookings are also allowed)
    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      try {
        const decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (_) {
        // Invalid token — fall through as guest
      }
    }

    const booking = new Booking({ ...req.body, userId });
    const savedBooking = await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking submitted successfully!",
      booking: savedBooking,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET /api/bookings/mine
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/bookings/:id/cancel
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (booking.userId?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorised to cancel this booking" });
    }

    if (booking.status === "Completed") {
      return res.status(400).json({ success: false, message: "Cannot cancel a completed booking" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({ success: true, message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/bookings/:id
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createBooking, getMyBookings, cancelBooking, getAllBookings, getBookingById };
