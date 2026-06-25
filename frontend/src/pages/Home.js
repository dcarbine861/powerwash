// src/pages/Home.js

import React from "react";
import { Link } from "react-router-dom";
import Reviews from "../components/Reviews";
import SERVICES from "../data/services";
import "./Home.css";

function Home() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-content">
          <h1>Your Home Deserves to Shine</h1>
          <p>
            Professional power washing for houses, driveways, and decks.
            Fast, affordable, and guaranteed results.
          </p>
          <div className="hero-buttons">
            <Link to="/book" className="btn-primary">Book an Appointment</Link>
            <a href="#services" className="btn-secondary">See Our Services</a>
          </div>
        </div>
        <div className="trust-badges">
          <div className="badge">✅ Licensed & Insured</div>
          <div className="badge">⚡ Same-Week Service</div>
          <div className="badge">💯 Satisfaction Guaranteed</div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services">
        <div className="section">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            We use professional-grade equipment to get the job done right.
          </p>

          <div className="services-grid">
            {SERVICES.map((service) => (
              <div key={service.slug} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-footer">
                  <span className="service-price">{service.price}</span>
                  <div className="service-card-links">
                    {/* "Details" links to the detail page */}
                    <Link to={`/services/${service.slug}`} className="service-details-link">
                      Details
                    </Link>
                    <Link to="/book" className="service-book-link">
                      Book →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <h2>Ready for a Cleaner Home?</h2>
        <p>Book online in under 2 minutes. We'll confirm within 24 hours.</p>
        <Link to="/book" className="btn-primary">Schedule Your Wash</Link>
      </section>
    </main>
  );
}

export default Home;
