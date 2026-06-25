// models/User.js
// Blueprint for a User document stored in MongoDB

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // Full name
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    // Email — must be unique across all users
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    // Hashed password — we NEVER store plain text
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    // Role — "user" for customers, "admin" for staff
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// --- HASH PASSWORD BEFORE SAVING ---
// This runs automatically before every .save() call
userSchema.pre("save", async function (next) {
  // Only hash if the password field was changed (avoids re-hashing on other updates)
  if (!this.isModified("password")) return next();

  // bcrypt salt rounds: 10 is the standard safe value
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- HELPER METHOD ---
// Call user.matchPassword(plainText) to verify a login attempt
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
