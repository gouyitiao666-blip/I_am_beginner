import React from "react";

const SelectField = ({ id, label, value, onChange, options, helper, error, required }) => {
  return (
    <div className="field">
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <select
        id={id}
        className={`field-input ${error ? "field-error" : ""}`}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={helper || error ? `${id}-help` : undefined}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {(helper || error) && (
        <p id={`${id}-help`} className={error ? "field-message error" : "field-message"}>
          {error || helper}
        </p>
      )}
    </div>
  );
};

export default SelectField;
