import React from "react";

const FileUpload = ({ id, label, helper, onChange, accept }) => {
  return (
    <div className="field upload-field">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <label className="upload-box" htmlFor={id}>
        <input id={id} type="file" onChange={onChange} accept={accept} />
        <span>Drag & drop or click to upload</span>
      </label>
      {helper && <p className="field-message">{helper}</p>}
    </div>
  );
};

export default FileUpload;
