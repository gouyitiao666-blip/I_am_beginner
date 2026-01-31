import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <div className="hero">
        <div>
          <p className="eyebrow">Aurora Scholars 2025</p>
          <h1>Support the next generation of global scholars.</h1>
          <p className="hero-copy">
            A streamlined, thoughtful application experience designed for students who want to lead with purpose. Apply in under 30 minutes and save progress anytime.
          </p>
          <div className="hero-actions">
            <Link className="btn primary" to="/login">
              Apply now
            </Link>
            <Link className="btn ghost" to="/application">
              Preview application
            </Link>
          </div>
          <div className="hero-meta">
            <div>
              <strong>6 sections</strong>
              <span>Personal to final review</span>
            </div>
            <div>
              <strong>Autosave</strong>
              <span>Keep every update</span>
            </div>
            <div>
              <strong>Print-ready</strong>
              <span>A4 review mode</span>
            </div>
          </div>
        </div>
        <div className="hero-card">
          <div className="card">
            <h2>Application timeline</h2>
            <ul>
              <li>Open: June 1</li>
              <li>Priority deadline: Aug 30</li>
              <li>Final decision: Nov 15</li>
            </ul>
            <div className="divider" />
            <p className="muted">Questions? Reach out to support@aurorascholars.org.</p>
          </div>
        </div>
      </div>
      <div className="landing-grid">
        <div className="card">
          <h3>Premium guidance</h3>
          <p>Thoughtful prompts help you tell a complete, authentic story.</p>
        </div>
        <div className="card">
          <h3>Accessible by design</h3>
          <p>Keyboard-first navigation, clear labels, and high-contrast states.</p>
        </div>
        <div className="card">
          <h3>Secure drafts</h3>
          <p>Save a draft anytime and pick up exactly where you left off.</p>
        </div>
      </div>
    </section>
  );
};

export default Landing;
