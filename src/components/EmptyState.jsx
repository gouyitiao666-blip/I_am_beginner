import React from "react";

const EmptyState = ({ title, description, actionLabel, onAction }) => {
  return (
    <div className="empty-state" role="note">
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && (
        <button type="button" className="btn ghost" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
