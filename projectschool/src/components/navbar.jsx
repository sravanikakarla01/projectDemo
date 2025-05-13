import React from "react";
import { FaSearch, FaCog, FaUserCircle } from "react-icons/fa";

const Navbar = ({
  selectedView,
  setSelectedView,
  searchTerm,
  setSearchTerm,
  setShowSettings,
  setShowProfileInfo
}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a className="navbar-brand fw-bold" href="#">Isha International School</a>

      {/* Hamburger Toggle Button */}
      <button
        className="navbar-toggler elementor-menu-toggle"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible Nav Items */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className={`nav-link ${selectedView === "home" ? "active" : ""}`} onClick={() => setSelectedView("home")} href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${selectedView === "roles" ? "active" : ""}`} onClick={() => setSelectedView("roles")} href="#">Roles</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${selectedView === "roleAssign" ? "active" : ""}`} onClick={() => setSelectedView("roleAssign")} href="#">Role Assignment</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${selectedView === "departments" ? "active" : ""}`} onClick={() => setSelectedView("departments")} href="#">Departments</a>
          </li>
        </ul>

        {/* Search and Profile Icons */}
        <div className="d-flex align-items-center gap-3">
          <div className="input-group">
            <span className="input-group-text bg-white"><FaSearch /></span>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <FaCog
            size={20}
            style={{ cursor: "pointer", color: "white" }}
            onClick={() => {
              setShowProfileInfo(false);
              setShowSettings(prev => !prev);
            }}
          />
          <FaUserCircle
            size={20}
            style={{ cursor: "pointer", color: "white" }}
            onClick={() => {
              setShowSettings(false);
              setShowProfileInfo(prev => !prev);
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
