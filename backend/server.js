// server.js — production-ready version

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookingRoutes = require("./routes/bookings");
const reviewRoutes = require("./routes/reviews");
const authRoutes = require("./routes/auth");
const aiRoutes = require("./routes/ai");

const app = express();

// --- CORS ---
// In production, allow requests from your Vercel frontend URL
// In development, allow localhost:3000
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL, // e.g. https://prowash.vercel.app
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
}));

app.use(express.json());

// --- ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ProWash API is running!" });
});

// --- DATABASE + SERVER ---
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
