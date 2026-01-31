import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => onClose(), 2800);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      {message}
      <button type="button" onClick={onClose} aria-label="Dismiss notification">
        ×
      </button>
    </div>
  );
};

export default Toast;
