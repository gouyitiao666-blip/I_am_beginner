import React from "react";

const PrintView = () => {
  return (
    <section className="print-view">
      <div className="print-header">
        <div>
          <h1>Aurora Scholars Application</h1>
          <p className="muted">Print-ready review copy</p>
        </div>
        <button type="button" className="btn ghost" onClick={() => window.print()}>
          Print this page
        </button>
      </div>

      <div className="print-sheet">
        <div className="print-section">
          <h2>Personal Information</h2>
          <div className="print-grid">
            <div>
              <span>Applicant</span>
              <p>Jordan Lee</p>
            </div>
            <div>
              <span>Date of birth</span>
              <p>12 Feb 2004</p>
            </div>
            <div>
              <span>Location</span>
              <p>Singapore</p>
            </div>
            <div>
              <span>Phone</span>
              <p>+65 555 4200</p>
            </div>
          </div>
        </div>

        <div className="print-section">
          <h2>Family & Financial</h2>
          <div className="print-grid">
            <div>
              <span>Household size</span>
              <p>4</p>
            </div>
            <div>
              <span>Income range</span>
              <p>$25k - $50k</p>
            </div>
          </div>
          <p className="print-note">Applicant notes: First-generation college student, supporting siblings.</p>
        </div>

        <div className="print-section">
          <h2>Education</h2>
          <div className="print-grid">
            <div>
              <span>Institution</span>
              <p>National University</p>
            </div>
            <div>
              <span>Program</span>
              <p>Computer Science</p>
            </div>
            <div>
              <span>Graduation year</span>
              <p>2026</p>
            </div>
            <div>
              <span>GPA</span>
              <p>3.82 / 4.0</p>
            </div>
          </div>
        </div>

        <div className="print-section">
          <h2>Achievements</h2>
          <ul className="print-list">
            <li>Regional science fair finalist (2024)</li>
            <li>Mentor for STEM outreach program</li>
            <li>Student council treasurer</li>
          </ul>
        </div>

        <div className="print-section">
          <h2>Essays</h2>
          <div className="print-essay">
            <h3>Why do you deserve this scholarship?</h3>
            <p>
              I am committed to building equitable technology solutions for under-resourced communities. This scholarship would
              allow me to continue my research on accessible learning tools and expand community programs I lead.
            </p>
          </div>
          <div className="print-essay">
            <h3>Impact you hope to create</h3>
            <p>
              My goal is to launch a regional network of learning hubs that provide mentorship, tools, and career pathways for
              high school students who aspire to study STEM fields.
            </p>
          </div>
        </div>

        <div className="print-section">
          <h2>Documents</h2>
          <div className="print-grid">
            <div>
              <span>Transcript</span>
              <p>uploaded</p>
            </div>
            <div>
              <span>Recommendation letter</span>
              <p>uploaded</p>
            </div>
            <div>
              <span>Resume</span>
              <p>uploaded</p>
            </div>
          </div>
        </div>

        <footer className="print-footer">
          <p>Applicant signature: ____________________________</p>
          <p>Date: ____________________</p>
        </footer>
      </div>
    </section>
  );
};

export default PrintView;
