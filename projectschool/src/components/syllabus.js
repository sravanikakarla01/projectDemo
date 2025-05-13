import React from "react";

const SyllabusCard = ({ className, description, image }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border-0 syllabus-card">
        <img
          src={image}
          className="card-img-top"
          alt={`${className} syllabus`}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold text-primary">{className}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SyllabusCard;
