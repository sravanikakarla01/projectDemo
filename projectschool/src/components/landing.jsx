import React, { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { FaSearch, FaEdit, FaUserCircle, FaBars, FaSyncAlt } from "react-icons/fa";

import Roles from "./roles";
import RoleAssign from "./roleassign";
import Departments from "./departments";
import HeroCarousel from "./herocarousel";
import AdmissionPage from "./admission";
import ViewRewards from "./viewrewards";
import ClassDetails from "./classdetails";
import EmployeeSalaryTable from './employeeSalaryTable'; // ✅ Already imported
import HolidayList from "./holidayList";

const LandingPage = ({ setPage }) => {
  const [selectedView, setSelectedView] = useState("home");
  const [showForm, setShowForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    fullName: "",
    mobile: "",
  });
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setPage("login");
  }, [setPage]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setPage("login");

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        handleLogout();
      } else {
        const savedProfile = JSON.parse(localStorage.getItem("profile"));
        setUserDetails({
          username: decodedToken.username,
          email: decodedToken.email,
          fullName: savedProfile?.fullName || decodedToken.fullName || decodedToken.username,
          mobile: savedProfile?.mobile || decodedToken.mobile || "",
        });
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      handleLogout();
    }
  }, [handleLogout, setPage]);

  const handleSaveChanges = () => {
    localStorage.setItem("profile", JSON.stringify(userDetails));
    setShowSettings(false);
  };

  const handleCarouselAction = (actionType) => {
    switch (actionType) {
      case "about":
        setSelectedView("about");
        break;
      case "admission":
        setShowForm(true);
        break;
      case "toppers":
        alert("Displaying toppers list...");
        break;
      case "viewrewards":
        setSelectedView("viewrewards");
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    switch (selectedView) {
      case "home":
        return (
          <div className="text-center p-5">
            <h1 className="text-black">Welcome to School Management System</h1>
            <p className="text-black">
              Select a section from the menu to get started.
            </p>
            <HeroCarousel onAction={handleCarouselAction} />
          </div>
        );
      case "roles":
        return <Roles />;
      case "departments":
        return <Departments />;
      case "roleAssign":
        return <RoleAssign />;
      case "admission":
        return <AdmissionPage setSelectedView={setSelectedView} />;
      case "classdetails":
        return <ClassDetails />;
      case "viewrewards":
        return <ViewRewards />;
      case "employeeSalary":
        return <EmployeeSalaryTable />; {/* ✅ Added this case */}
      case "holidayList":
        return <HolidayList />;  
      case "settings":
        return (
          <div className="bg-white p-4 shadow rounded position-relative"
               onMouseLeave={() => setShowSettings(false)}>
            <h3 className="text-center">Edit Profile</h3>
            <div className="mb-2">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={userDetails.fullName}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, fullName: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={userDetails.email} disabled />
            </div>
            <div className="mb-2">
              <label className="form-label">Mobile</label>
              <input
                type="text"
                className="form-control"
                value={userDetails.mobile}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, mobile: e.target.value })
                }
              />
            </div>
            <button className="btn btn-sm btn-success w-100" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`d-flex flex-column flex-md-row${showForm ? " blur-background" : ""}`} style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className="offcanvas offcanvas-start text-bg-dark show position-static"
        tabIndex="-1"
        id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel"
        style={{
          width: "220px",
          background: "linear-gradient(to right, rgb(131, 202, 205))",
        }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasSidebarLabel">Menu</h5>
        </div>
        <div className="offcanvas-body d-flex flex-column gap-3 px-2">
          {/* ✅ Added Employee Salary Table here */}
          {[
            { label: "Home", icon: "house-door-fill", view: "home" },
            { label: "Role", icon: "people-fill", view: "roles" },
            { label: "Departments", icon: "diagram-3-fill", view: "departments" },
            { label: "Role Assignment", icon: "person-plus-fill", view: "roleAssign" },
            { label: "Class Details", icon: "clipboard-data", view: "classdetails" },
            { label: "Employee Salary", icon: "currency-dollar", view: "employeeSalary" }, // New option
            { label: "Holiday List", icon: "calendar2-event", view: "holidayList" }, // ✅ Holiday List button
          ].map(({ label, icon, view }) => (
            <button
              key={view}
              className="btn btn-outline-light d-flex align-items-center gap-2"
              onClick={() => setSelectedView(view)}
              data-bs-dismiss="offcanvas"
            >
              <i className={`bi bi-${icon}`}></i> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        <header className="p-3 d-flex justify-content-between align-items-center text-white shadow" style={{ background: "linear-gradient(to right, #4facfe, #00f2fe)" }}>
          <FaBars className="d-md-none me-3" style={{ cursor: "pointer" }} />
          <div className="input-group w-50">
            <span className="input-group-text bg-white"><FaSearch /></span>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center gap-3 position-relative">
            <FaSyncAlt title="Refresh Home" style={{ cursor: "pointer" }} onClick={() => setSelectedView("home")} />
            <FaEdit title="Edit Profile" style={{ cursor: "pointer" }} onClick={() => { setShowSettings(true); setShowProfileInfo(false); }} />
            <FaUserCircle title="Profile Info" style={{ cursor: "pointer" }} onClick={() => { setShowProfileInfo(true); setShowSettings(false); }} />
            {showProfileInfo && (
              <div
                className="position-absolute top-100 end-0 bg-white text-dark p-3 mt-2 rounded shadow"
                style={{ minWidth: "220px", zIndex: 10 }}
                onMouseLeave={() => setShowProfileInfo(false)}
              >
                <p className="mb-1"><strong>User Name:</strong> {userDetails.fullName}</p>
                <p className="mb-1"><strong>Email:</strong> {userDetails.email}</p>
                <p className="mb-1"><strong>Mobile:</strong> {userDetails.mobile}</p>
                <button className="btn btn-sm btn-outline-danger mt-2" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-grow-1 p-4 bg-light" style={{ overflowY: "auto" }}>
          {renderContent()}
        </main>

        {/* Admission Modal */}
        {showForm && (
          <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
            <div className="bg-white p-4 rounded shadow-lg position-relative" style={{ width: "90%", maxWidth: "700px" }}>
              <button
                className="btn-close position-absolute top-0 end-0 m-2"
                onClick={() => setShowForm(false)}
              ></button>
              <AdmissionPage setShowForm={setShowForm} />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-dark text-white text-center p-3">
          &copy; 2025 Isha International School. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;

