// models/Booking.js

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // Link to the User who made this booking (optional — guest bookings have no userId)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    service: {
      type: String,
      required: [true, "Service is required"],
      enum: ["House Exterior", "Driveway", "Deck/Patio", "Full Property Package"],
    },

    date: {
      type: Date,
      required: [true, "Date is required"],
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
