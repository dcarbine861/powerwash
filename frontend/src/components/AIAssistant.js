// src/components/AIAssistant.js
// "Not sure what to book?" panel — user describes their situation,
// AI recommends the best service and pre-fills the booking form

import React, { useState } from "react";
import "./AIAssistant.css";

function AIAssistant({ onServiceSelect }) {
  const [open, setOpen] = useState(false);
  const [situation, setSituation] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (situation.trim().length < 5) return;
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch("/api/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Something went wrong.");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Could not reach the AI assistant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    // Pre-fill the service dropdown on the parent BookingPage
    onServiceSelect(result.service);
    setOpen(false);
  };

  return (
    <div className="ai-assistant">
      {/* Toggle button */}
      <button
        className="ai-toggle-btn"
        onClick={() => { setOpen(!open); setResult(null); setError(""); }}
        aria-expanded={open}
      >
        <span className="ai-icon">✨</span>
        {open ? "Close assistant" : "Not sure what to book? Ask AI"}
      </button>

      {/* Panel */}
      {open && (
        <div className="ai-panel">
          <h3 className="ai-panel-title">AI Booking Assistant</h3>
          <p className="ai-panel-subtitle">
            Describe your situation and we'll recommend the right service for you.
          </p>

          <textarea
            className="ai-textarea"
            rows={3}
            placeholder="e.g. My driveway has a big oil stain and my deck looks green with mildew. Haven't cleaned either in 2 years."
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
          />

          <button
            className="ai-ask-btn"
            onClick={handleAsk}
            disabled={loading || situation.trim().length < 5}
          >
            {loading ? (
              <span className="ai-loading">
                <span className="ai-spinner" /> Thinking…
              </span>
            ) : (
              "Get recommendation →"
            )}
          </button>

          {/* Error */}
          {error && <p className="ai-error">{error}</p>}

          {/* Result */}
          {result && (
            <div className="ai-result">
              <div className="ai-result-service">
                <span className="ai-result-label">Recommended service</span>
                <span className="ai-result-name">{result.service}</span>
              </div>

              <p className="ai-result-reason">{result.reason}</p>

              <div className="ai-result-tip">
                <span className="ai-tip-icon">💡</span>
                <span>{result.tips}</span>
              </div>

              <button className="ai-apply-btn" onClick={handleApply}>
                Apply this to my booking ✓
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AIAssistant;
