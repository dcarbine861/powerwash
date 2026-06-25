// src/components/Reviews.js
// Shows customer reviews fetched from the backend
// Also includes a form to submit a new review

import React, { useState, useEffect } from "react";
import "./Reviews.css";

// Helper to render star icons based on rating number
function StarRating({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? "star filled" : "star"}>
          ★
        </span>
      ))}
    </div>
  );
}

function Reviews() {
  // State for storing the list of reviews from the database
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for the "leave a review" form
  const [form, setForm] = useState({
    name: "",
    rating: 5,
    comment: "",
    service: "House Exterior",
  });

  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [submitting, setSubmitting] = useState(false);

  // Fetch reviews from the backend when the component loads
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error("Failed to load reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update form state as user types
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit the new review to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        // Reset form
        setForm({ name: "", rating: 5, comment: "", service: "House Exterior" });
        // Reload reviews to show the new one
        fetchReviews();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="reviews-section">
      <div className="section">
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-subtitle">Real reviews from real homeowners</p>

        {/* Review Cards */}
        {loading ? (
          <p className="loading-text">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="loading-text">No reviews yet. Be the first!</p>
        ) : (
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review._id} className="review-card">
                <StarRating rating={review.rating} />
                <p className="review-comment">"{review.comment}"</p>
                <div className="review-footer">
                  <span className="review-name">— {review.name}</span>
                  <span className="review-service">{review.service}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Leave a Review Form */}
        <div className="review-form-wrapper">
          <h3>Leave a Review</h3>

          {submitStatus === "success" && (
            <div className="alert alert-success">
              ✅ Thanks for your review! It's now live.
            </div>
          )}
          {submitStatus === "error" && (
            <div className="alert alert-error">
              ❌ Something went wrong. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  required
                />
              </div>

              <div className="form-group">
                <label>Service Used</label>
                <select name="service" value={form.service} onChange={handleChange}>
                  <option>House Exterior</option>
                  <option>Driveway</option>
                  <option>Deck/Patio</option>
                  <option>Full Property Package</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Rating (1–5 stars)</label>
              <select name="rating" value={form.rating} onChange={handleChange}>
                <option value={5}>⭐⭐⭐⭐⭐ — Excellent</option>
                <option value={4}>⭐⭐⭐⭐ — Good</option>
                <option value={3}>⭐⭐⭐ — Okay</option>
                <option value={2}>⭐⭐ — Poor</option>
                <option value={1}>⭐ — Terrible</option>
              </select>
            </div>

            <div className="form-group">
              <label>Your Review</label>
              <textarea
                name="comment"
                value={form.comment}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your experience..."
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
