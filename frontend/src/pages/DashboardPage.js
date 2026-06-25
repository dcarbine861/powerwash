// src/pages/DashboardPage.js
// Shows the logged-in user's bookings with status badges and cancel option

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./DashboardPage.css";

const STATUS_COLORS = {
  Pending:   { bg: "#fff8e1", color: "#b56a00", label: "⏳ Pending" },
  Confirmed: { bg: "#e8f5e9", color: "#1b7a34", label: "✅ Confirmed" },
  Completed: { bg: "#e3f2fd", color: "#1255a0", label: "🏁 Completed" },
  Cancelled: { bg: "#fce4ec", color: "#b71c1c", label: "✖ Cancelled" },
};

function DashboardPage() {
  const { user, token, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(null); // id of booking being cancelled

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  // Fetch this user's bookings
  useEffect(() => {
    if (!token) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setBookings(data.bookings);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Could not load your bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    setCancelling(id);

    try {
      const res = await fetch(`/api/bookings/${id}/cancel`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        // Update the status in local state without refetching
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "Cancelled" } : b))
        );
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Could not cancel booking. Please try again.");
    } finally {
      setCancelling(null);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short", year: "numeric", month: "short", day: "numeric",
    });

  if (!isLoggedIn) return null;

  return (
    <main className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>My Bookings</h1>
          <p>Welcome back, {user?.name}. Here are all your appointments.</p>
        </div>
        <Link to="/book" className="dashboard-book-btn">+ Book New Service</Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="dashboard-empty">
          <div className="dashboard-spinner" />
          <p>Loading your bookings…</p>
        </div>
      )}

      {/* Error */}
      {error && <div className="dashboard-error">{error}</div>}

      {/* Empty state */}
      {!loading && !error && bookings.length === 0 && (
        <div className="dashboard-empty">
          <div className="empty-icon">📋</div>
          <h3>No bookings yet</h3>
          <p>You haven't booked any services. Ready to get started?</p>
          <Link to="/book" className="dashboard-book-btn">Book Your First Service</Link>
        </div>
      )}

      {/* Bookings list */}
      {!loading && bookings.length > 0 && (
        <div className="bookings-list">
          {bookings.map((booking) => {
            const statusStyle = STATUS_COLORS[booking.status] || STATUS_COLORS.Pending;
            const canCancel = booking.status === "Pending" || booking.status === "Confirmed";

            return (
              <div key={booking._id} className="booking-card">
                {/* Card header: service + status badge */}
                <div className="booking-card-header">
                  <h3 className="booking-service">{booking.service}</h3>
                  <span
                    className="booking-status-badge"
                    style={{ background: statusStyle.bg, color: statusStyle.color }}
                  >
                    {statusStyle.label}
                  </span>
                </div>

                {/* Details grid */}
                <div className="booking-details">
                  <div className="booking-detail">
                    <span className="detail-label">📅 Date</span>
                    <span>{formatDate(booking.date)}</span>
                  </div>
                  <div className="booking-detail">
                    <span className="detail-label">📍 Address</span>
                    <span>{booking.address}</span>
                  </div>
                  <div className="booking-detail">
                    <span className="detail-label">📞 Phone</span>
                    <span>{booking.phone}</span>
                  </div>
                  <div className="booking-detail">
                    <span className="detail-label">🗓 Booked on</span>
                    <span>{formatDate(booking.createdAt)}</span>
                  </div>
                  {booking.notes && (
                    <div className="booking-detail booking-detail-full">
                      <span className="detail-label">📝 Notes</span>
                      <span>{booking.notes}</span>
                    </div>
                  )}
                </div>

                {/* Cancel button — only for pending/confirmed */}
                {canCancel && (
                  <div className="booking-card-footer">
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel(booking._id)}
                      disabled={cancelling === booking._id}
                    >
                      {cancelling === booking._id ? "Cancelling…" : "Cancel booking"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default DashboardPage;
