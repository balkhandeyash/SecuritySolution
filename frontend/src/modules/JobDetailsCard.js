// JobDetailsCard.js
import React from "react";

const JobDetailsCard = ({ job, onClose }) => {
  return (
    <div className="job-details-card">
      <div className="card-content">
        <h3>{job.title}</h3>
        <p>{job.company}</p>
        <p>{job.location}</p>
        <p className="job-description">{job.description}</p>
        {/* Add more job details as needed */}
      </div>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default JobDetailsCard;
