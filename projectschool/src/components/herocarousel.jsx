import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HeroCarousel = ({ onAction }) => {
  return (
    <div id="heroCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
      <div className="carousel-inner rounded shadow">

        {/* 1. School Block */}
        <div className="carousel-item active">
          <img src="/class1.png" className="d-block w-100" alt="School Block" style={{ height: "400px", objectFit: "cover" }} />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
            <h5>About Our School</h5>
            <p>Get to know Isha International School better.</p>
            <button className="btn btn-primary" onClick={() => onAction("about")}>Learn More</button>
          </div>
        </div>

        {/* 2. Admin Block */}
        <div className="carousel-item">
          <img src="/class2.jpg" className="d-block w-100" alt="Admin Block" style={{ height: "400px", objectFit: "cover" }} />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
            <h5>Admissions Open</h5>
            <p>Apply now for the academic year.</p>
            <button className="btn btn-success" onClick={() => onAction("admission")}>Apply Now</button>
          </div>
        </div>

        {/* 3. Toppers */}
        <div className="carousel-item">
          <img src="/class3.jpg" className="d-block w-100" alt="Toppers" style={{ height: "400px", objectFit: "cover" }} />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
            <h5>Our Proud Toppers</h5>
            <p>Celebrate the achievements of our top students.</p>
            <button className="btn btn-warning" onClick={() => onAction("toppers")}>View Toppers</button>
          </div>
        </div>

        {/* 4. Sports */}
        <div className="carousel-item">
          <img src="/class4.jpg" className="d-block w-100" alt="Sports" style={{ height: "400px", objectFit: "cover" }} />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
            <h5>Sports Achievements</h5>1Q    
            <p>Explore our national & state level sports awards.</p>
            <button className="btn btn-info" onClick={() => onAction("viewrewards")}>View Awards</button>
          </div>
        </div>

      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>1qDEG 
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HeroCarousel;
