import React from "react";

const SidebarStepper = ({ steps, currentStep, onStepChange }) => {
  return (
    <aside className="sidebar" aria-label="Application steps">
      <div className="sidebar-card">
        <p className="eyebrow">Application progress</p>
        <ol className="stepper">
          {steps.map((step, index) => (
            <li key={step.id} className={index === currentStep ? "active" : ""}>
              <button
                type="button"
                onClick={() => onStepChange(index)}
                aria-current={index === currentStep ? "step" : undefined}
              >
                <span className="step-count">{String(index + 1).padStart(2, "0")}</span>
                <span className="step-title">{step.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
};

export default SidebarStepper;
