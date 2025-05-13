import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admission.css"; 

const AdmissionPage = ({ setShowForm }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    class: "",
    section: "",
    guardianName: "",
    contactNumber: "",
    address: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admission Form Submitted:", formData);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false); // close the popup after few seconds
    }, 3000); // 3 seconds
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <div className="text-end">
          <button className="btn-close" onClick={() => setShowForm(false)}></button>
        </div>
        <h4 className="mb-3 text-center">Student Admission Form</h4>

        {submitted ? (
          <div className="alert alert-success text-center">
            🎉 Admission form submitted successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-6">
              <label className="form-label">Full Name</label>
              <input type="text" name="fullName" className="form-control" required value={formData.fullName} onChange={handleChange} />
            </div>

            <div className="col-6">
              <label className="form-label">Date of Birth</label>
              <input type="date" name="dateOfBirth" className="form-control" required value={formData.dateOfBirth} onChange={handleChange} />
            </div>

            <div className="col-6">
              <label className="form-label">Class</label>
              <select name="class" className="form-select" required value={formData.class} onChange={handleChange}>
                <option value="">Select Class</option>
                <option>Nursery</option>
                <option>LKG</option>
                <option>UKG</option>
                <option>I</option>
                <option>II</option>
                <option>III</option>
                <option>IV</option>
                <option>V</option>
                <option>VI</option>
                <option>VII</option>
                <option>VIII</option>
                <option>IX</option>
                <option>X</option>
              </select>
            </div>

            <div className="col-6">
              <label className="form-label">Section</label>
              <input type="text" name="section" className="form-control" required value={formData.section} onChange={handleChange} />
            </div>

            <div className="col-6">
              <label className="form-label">Guardian Name</label>
              <input type="text" name="guardianName" className="form-control" required value={formData.guardianName} onChange={handleChange} />
            </div>

            <div className="col-6">
              <label className="form-label">Contact Number</label>
              <input type="tel" name="contactNumber" className="form-control" required value={formData.contactNumber} onChange={handleChange} />
            </div>

            <div className="col-12">
              <label className="form-label">Address</label>
              <textarea name="address" className="form-control" rows="2" required value={formData.address} onChange={handleChange}></textarea>
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary px-4">Submit</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdmissionPage;



