import React from "react";

const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  helper,
  error,
  required,
  multiline = false,
  ...rest
}) => {
  const FieldTag = multiline ? "textarea" : "input";

  return (
    <div className="field">
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <FieldTag
        id={id}
        className={`field-input ${multiline ? "field-textarea" : ""} ${error ? "field-error" : ""}`}
        type={multiline ? undefined : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={helper || error ? `${id}-help` : undefined}
        required={required}
        rows={multiline ? 4 : undefined}
        {...rest}
      />
      {(helper || error) && (
        <p id={`${id}-help`} className={error ? "field-message error" : "field-message"}>
          {error || helper}
        </p>
      )}
    </div>
  );
};

export default InputField;
