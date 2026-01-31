import React, { useEffect, useMemo, useState } from "react";
import SidebarStepper from "../components/SidebarStepper.jsx";
import InputField from "../components/InputField.jsx";
import SelectField from "../components/SelectField.jsx";
import FileUpload from "../components/FileUpload.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import Skeleton from "../components/Skeleton.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Toast from "../components/Toast.jsx";
import { autosaveApplication, submitApplication } from "../mockApi.js";

const initialData = {
  personal: {
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    location: "",
  },
  family: {
    householdSize: "",
    incomeRange: "",
    guardianName: "",
    supportNotes: "",
  },
  education: {
    institution: "",
    program: "",
    graduationYear: "",
    gpa: "",
  },
  achievements: {
    list: [],
    leadership: "",
  },
  essays: {
    motivation: "",
    impact: "",
  },
  documents: {
    transcript: "",
    recommendation: "",
    resume: "",
    consent: false,
  },
};

const steps = [
  { id: "personal", label: "Personal Info" },
  { id: "family", label: "Family & Financial" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "essays", label: "Essays" },
  { id: "documents", label: "Documents & Review" },
];

const Application = () => {
  const [formData, setFormData] = useState(initialData);
  const [currentStep, setCurrentStep] = useState(0);
  const [autosaveStatus, setAutosaveStatus] = useState("All changes saved");
  const [toast, setToast] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return undefined;
    setAutosaveStatus("Saving...");
    const timer = setTimeout(async () => {
      try {
        await autosaveApplication(formData);
        setAutosaveStatus(`Saved just now`);
      } catch (err) {
        setAutosaveStatus("Autosave failed. Retry soon.");
      }
    }, 900);
    return () => clearTimeout(timer);
  }, [formData, loading]);

  const progressValue = useMemo(() => Math.round(((currentStep + 1) / steps.length) * 100), [currentStep]);

  const updateSection = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    const nextErrors = {};
    if (currentStep === 0 && !formData.personal.firstName) {
      nextErrors.firstName = "First name is required.";
    }
    if (currentStep === 0 && !formData.personal.lastName) {
      nextErrors.lastName = "Last name is required.";
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSaveDraft = async () => {
    setAutosaveStatus("Saving draft...");
    try {
      await autosaveApplication(formData);
      setAutosaveStatus("Draft saved");
      setToast("Draft saved successfully.");
    } catch (err) {
      setAutosaveStatus("Draft save failed");
    }
  };

  const handleSubmit = async () => {
    setAutosaveStatus("Submitting...");
    try {
      const result = await submitApplication(formData);
      setAutosaveStatus("Submitted");
      setToast(`Application submitted. Confirmation: ${result.confirmation}`);
    } catch (err) {
      setAutosaveStatus("Submission failed");
      setToast(err.message);
    }
  };

  const addAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        list: [
          ...prev.achievements.list,
          `New achievement ${prev.achievements.list.length + 1}`,
        ],
      },
    }));
  };

  return (
    <section className="application">
      <SidebarStepper steps={steps} currentStep={currentStep} onStepChange={setCurrentStep} />
      <div className="form-panel">
        <div className="form-header">
          <div>
            <p className="eyebrow">Scholarship application</p>
            <h1>{steps[currentStep].label}</h1>
          </div>
          <div className="autosave">
            <span>{autosaveStatus}</span>
            <button type="button" className="btn ghost" onClick={handleSaveDraft}>
              Save draft
            </button>
          </div>
        </div>

        <ProgressBar value={progressValue} />
        <p className="progress-label">Step {currentStep + 1} of {steps.length}</p>

        {loading ? (
          <div className="card">
            <Skeleton lines={5} />
          </div>
        ) : (
          <div className="card">
            {currentStep === 0 && (
              <div className="form-grid">
                <InputField
                  id="firstName"
                  label="First name"
                  value={formData.personal.firstName}
                  onChange={(event) => updateSection("personal", "firstName", event.target.value)}
                  error={errors.firstName}
                  required
                />
                <InputField
                  id="lastName"
                  label="Last name"
                  value={formData.personal.lastName}
                  onChange={(event) => updateSection("personal", "lastName", event.target.value)}
                  error={errors.lastName}
                  required
                />
                <InputField
                  id="dob"
                  label="Date of birth"
                  type="date"
                  value={formData.personal.dob}
                  onChange={(event) => updateSection("personal", "dob", event.target.value)}
                  helper="We only use this to verify eligibility."
                />
                <InputField
                  id="phone"
                  label="Phone"
                  type="tel"
                  value={formData.personal.phone}
                  onChange={(event) => updateSection("personal", "phone", event.target.value)}
                />
                <InputField
                  id="location"
                  label="City, Country"
                  value={formData.personal.location}
                  onChange={(event) => updateSection("personal", "location", event.target.value)}
                />
              </div>
            )}

            {currentStep === 1 && (
              <div className="form-grid">
                <InputField
                  id="guardian"
                  label="Primary guardian name"
                  value={formData.family.guardianName}
                  onChange={(event) => updateSection("family", "guardianName", event.target.value)}
                />
                <SelectField
                  id="household"
                  label="Household size"
                  value={formData.family.householdSize}
                  onChange={(event) => updateSection("family", "householdSize", event.target.value)}
                  options={[
                    { value: "", label: "Select" },
                    { value: "1-2", label: "1-2" },
                    { value: "3-4", label: "3-4" },
                    { value: "5+", label: "5+" },
                  ]}
                />
                <SelectField
                  id="income"
                  label="Annual household income"
                  value={formData.family.incomeRange}
                  onChange={(event) => updateSection("family", "incomeRange", event.target.value)}
                  options={[
                    { value: "", label: "Select" },
                    { value: "<25k", label: "Under $25k" },
                    { value: "25-50k", label: "$25k - $50k" },
                    { value: "50-100k", label: "$50k - $100k" },
                    { value: ">100k", label: "Above $100k" },
                  ]}
                />
                <InputField
                  id="support"
                  label="Family financial context"
                  value={formData.family.supportNotes}
                  onChange={(event) => updateSection("family", "supportNotes", event.target.value)}
                  placeholder="Share anything you'd like reviewers to know."
                  multiline
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="form-grid">
                <InputField
                  id="institution"
                  label="Institution"
                  value={formData.education.institution}
                  onChange={(event) => updateSection("education", "institution", event.target.value)}
                />
                <InputField
                  id="program"
                  label="Program / Major"
                  value={formData.education.program}
                  onChange={(event) => updateSection("education", "program", event.target.value)}
                />
                <InputField
                  id="gradYear"
                  label="Expected graduation year"
                  value={formData.education.graduationYear}
                  onChange={(event) => updateSection("education", "graduationYear", event.target.value)}
                  placeholder="2026"
                />
                <InputField
                  id="gpa"
                  label="Current GPA"
                  value={formData.education.gpa}
                  onChange={(event) => updateSection("education", "gpa", event.target.value)}
                  helper="Use your latest official GPA."
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="form-grid">
                {formData.achievements.list.length === 0 ? (
                  <EmptyState
                    title="No achievements added"
                    description="Highlight awards, leadership, or volunteer work to strengthen your profile."
                    actionLabel="Add an achievement"
                    onAction={addAchievement}
                  />
                ) : (
                  <div className="tag-list">
                    {formData.achievements.list.map((item) => (
                      <span key={item} className="tag">{item}</span>
                    ))}
                  </div>
                )}
                <button type="button" className="btn ghost" onClick={addAchievement}>
                  Add achievement
                </button>
                <InputField
                  id="leadership"
                  label="Leadership roles"
                  value={formData.achievements.leadership}
                  onChange={(event) => updateSection("achievements", "leadership", event.target.value)}
                  placeholder="Student council, mentorship, clubs"
                />
              </div>
            )}

            {currentStep === 4 && (
              <div className="form-grid">
                <InputField
                  id="motivation"
                  label="Essay: Why do you deserve this scholarship?"
                  value={formData.essays.motivation}
                  onChange={(event) => updateSection("essays", "motivation", event.target.value)}
                  placeholder="Maximum 300 words"
                  multiline
                />
                <InputField
                  id="impact"
                  label="Essay: Impact you hope to create"
                  value={formData.essays.impact}
                  onChange={(event) => updateSection("essays", "impact", event.target.value)}
                  placeholder="Maximum 300 words"
                  multiline
                />
              </div>
            )}

            {currentStep === 5 && (
              <div className="form-grid">
                <FileUpload
                  id="transcript"
                  label="Academic transcript"
                  helper="PDF up to 10MB"
                  accept=".pdf"
                  onChange={(event) => updateSection("documents", "transcript", event.target.files[0]?.name || "")}
                />
                <FileUpload
                  id="recommendation"
                  label="Recommendation letter"
                  helper="PDF or DOCX"
                  accept=".pdf,.doc,.docx"
                  onChange={(event) => updateSection("documents", "recommendation", event.target.files[0]?.name || "")}
                />
                <FileUpload
                  id="resume"
                  label="Resume / CV"
                  helper="PDF preferred"
                  accept=".pdf"
                  onChange={(event) => updateSection("documents", "resume", event.target.files[0]?.name || "")}
                />
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={formData.documents.consent}
                    onChange={(event) => updateSection("documents", "consent", event.target.checked)}
                  />
                  <span>I certify that the information provided is accurate.</span>
                </label>

                <div className="review-panel">
                  <h3>Review & Submit</h3>
                  <p className="muted">Preview your application before submission in the print view.</p>
                  <button type="button" className="btn primary" onClick={handleSubmit}>
                    Submit application
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn ghost" onClick={handlePrev} disabled={currentStep === 0}>
            Previous
          </button>
          {currentStep < steps.length - 1 && (
            <button type="button" className="btn primary" onClick={handleNext}>
              Next step
            </button>
          )}
        </div>
      </div>
      <Toast message={toast} onClose={() => setToast("")} />
    </section>
  );
};

export default Application;
