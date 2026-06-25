// src/pages/BookingPage.js
// Booking form — attaches JWT so the booking is linked to the logged-in user

import React, { useState } from "react";
import AIAssistant from "../components/AIAssistant";
import { useAuth } from "../context/AuthContext";
import "./BookingPage.css";

function BookingPage() {
  const { token } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "House Exterior",
    date: "",
    address: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAIServiceSelect = (serviceName) => {
    setForm((prev) => ({ ...prev, service: serviceName }));
    document.getElementById("booking-form-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    // Build headers — include token if logged in so booking is linked to the user
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers,
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        setForm({ name: "", email: "", phone: "", service: "House Exterior", date: "", address: "", notes: "" });
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="booking-page">
      <div className="booking-header">
        <h1>Book Your Power Wash</h1>
        <p>Fill out the form below and we'll confirm your appointment within 24 hours.</p>
      </div>

      <div className="booking-container">
        <div style={{ gridColumn: "1 / -1" }}>
          <AIAssistant onServiceSelect={handleAIServiceSelect} />
        </div>

        {submitStatus === "success" && (
          <div className="alert alert-success" style={{ gridColumn: "1 / -1" }}>
            🎉 Booking submitted! We'll contact you shortly to confirm your appointment.
          </div>
        )}
        {submitStatus === "error" && (
          <div className="alert alert-error" style={{ gridColumn: "1 / -1" }}>
            ❌ {errorMessage}
          </div>
        )}

        <form id="booking-form-section" onSubmit={handleSubmit} className="booking-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input id="name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Smith" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input id="email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input id="phone" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" required />
            </div>
            <div className="form-group">
              <label htmlFor="service">Service *</label>
              <select id="service" name="service" value={form.service} onChange={handleChange} required>
                <option>House Exterior</option>
                <option>Driveway</option>
                <option>Deck/Patio</option>
                <option>Full Property Package</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Preferred Date *</label>
              <input id="date" type="date" name="date" value={form.date} onChange={handleChange} min={today} required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Property Address *</label>
              <input id="address" type="text" name="address" value={form.address} onChange={handleChange} placeholder="123 Main St, Your City, UT" required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Additional Notes (optional)</label>
            <textarea id="notes" name="notes" value={form.notes} onChange={handleChange} rows={4} placeholder="Anything we should know? Gate codes, pets, specific areas of concern..." />
          </div>

          <button type="submit" className="btn-primary booking-submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Request Appointment"}
          </button>
          <p className="form-note">* Required fields. We'll send a confirmation to your email.</p>
        </form>

        <div className="booking-info">
          <h3>What to Expect</h3>
          <ol>
            <li>Submit your booking request</li>
            <li>We'll confirm within 24 hours via email</li>
            <li>Our team arrives on your chosen date</li>
            <li>Enjoy your spotless property!</li>
          </ol>
          <div className="info-badges">
            <div className="info-badge">🔒 No payment required to book</div>
            <div className="info-badge">📅 Easy rescheduling available</div>
            <div className="info-badge">⭐ 5-star rated service</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookingPage;
