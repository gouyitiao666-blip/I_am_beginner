import React from "react";

const Skeleton = ({ lines = 3 }) => {
  return (
    <div className="skeleton" aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <span key={index} className="skeleton-line" />
      ))}
    </div>
  );
};

export default Skeleton;
