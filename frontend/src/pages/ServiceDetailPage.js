// src/pages/ServiceDetailPage.js
// Shows full details for one service, loaded by slug from the URL

import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SERVICES from "../data/services";
import "./ServiceDetailPage.css";

function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  // Find the matching service by slug
  const service = SERVICES.find((s) => s.slug === slug);

  // If slug doesn't match anything, show a 404-style message
  if (!service) {
    return (
      <main className="service-not-found">
        <h2>Service not found</h2>
        <p>We couldn't find that service. Check out all our services below.</p>
        <Link to="/#services" className="btn-primary">View All Services</Link>
      </main>
    );
  }

  return (
    <main className="service-detail-page">

      {/* HERO BANNER */}
      <section className="service-hero">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <div className="service-hero-icon">{service.icon}</div>
        <h1>{service.title}</h1>
        <p className="service-tagline">{service.tagline}</p>
        <div className="service-meta">
          <span className="meta-badge">💰 {service.price}</span>
          <span className="meta-badge">⏱ {service.duration}</span>
        </div>
      </section>

      <div className="service-detail-body">

        {/* DESCRIPTION */}
        <section className="detail-section">
          <h2>About this service</h2>
          <p className="detail-description">{service.description}</p>
        </section>

        {/* WHAT'S INCLUDED */}
        <section className="detail-section">
          <h2>What's included</h2>
          <ul className="includes-list">
            {service.includes.map((item, i) => (
              <li key={i}>
                <span className="include-check">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQs */}
        <section className="detail-section">
          <h2>Common questions</h2>
          <div className="faq-list">
            {service.faqs.map((faq, i) => (
              <div
                key={i}
                className={`faq-item ${openFaq === i ? "faq-open" : ""}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <span className="faq-chevron">{openFaq === i ? "▲" : "▼"}</span>
                </button>
                {openFaq === i && (
                  <p className="faq-answer">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOOK CTA */}
        <section className="detail-cta">
          <div className="cta-card">
            <div>
              <h3>Ready to book {service.title}?</h3>
              <p>Starting {service.price} · Confirmation within 24 hours</p>
            </div>
            <Link
              to={`/book?service=${encodeURIComponent(service.title)}`}
              className="btn-primary cta-book-btn"
            >
              Book Now →
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}

export default ServiceDetailPage;
