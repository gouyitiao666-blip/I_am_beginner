import React from "react";

const ProgressBar = ({ value }) => {
  return (
    <div className="progress" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <span style={{ width: `${value}%` }} />
    </div>
  );
};

export default ProgressBar;
