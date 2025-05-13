import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import {
  getDepartments,
  postDepartment,
  deleteDepartment,
  deleteSelectedDepartments,
} from "../redux/departmentAction";
import "bootstrap/dist/css/bootstrap.min.css";

const Departments = () => {
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.department);

  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDeptIds, setSelectedDeptIds] = useState([]);
  
  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (!newDepartmentName.trim()) return;
    dispatch(postDepartment(newDepartmentName));
    setNewDepartmentName("");
    setShowAddForm(false);
  };

  const handleCancelAdd = () => {
    setNewDepartmentName("");
    setShowAddForm(false);
  };

  const handleDeleteDepartment = (id) => {
    dispatch(deleteDepartment(id));
  };

  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      setSelectedDeptIds([...selectedDeptIds, id]);
    } else {
      setSelectedDeptIds(selectedDeptIds.filter((deptId) => deptId !== id));
    }
  };

  const handleBulkDelete = () => {
    dispatch(deleteSelectedDepartments(selectedDeptIds));
    setSelectedDeptIds([]);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <h3 className="text-center mb-4">Departments Management</h3>
      

      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
          onMouseOver={(e) => e.currentTarget.classList.add("shadow")}
          onMouseOut={(e) => e.currentTarget.classList.remove("shadow")}
        >
          <FaPlus className="me-1" />
          Add Department
        </button>
      </div>

      {showAddForm && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-start justify-content-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 2000 }}
          onClick={handleCancelAdd}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{ marginTop: "100px", width: "500px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5 className="mb-3">Add New Department</h5>
            <form onSubmit={handleAddDepartment}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Department Name"
                  value={newDepartmentName}
                  onChange={(e) => setNewDepartmentName(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">
                  <FaPlus className="me-2" /> Save
                </button>
                <button type="button" className="btn btn-secondary me-1" onClick={handleCancelAdd}>
                  <FaTimes className="me-2" /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="list-group">
        <div className="list-group-item d-flex align-items-center bg-dark text-white">
          <input
            type="checkbox"
            className="me-2"
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedDeptIds(departments.map((dept) => dept.departmentID));
              } else {
                setSelectedDeptIds([]);
              }
            }}
            checked={departments.length > 0 && selectedDeptIds.length === departments.length}
          />
          <div className="flex-grow-1">
            <strong>Department Name</strong>
          </div>
          <div style={{ width: "80px" }}>
            <strong>Actions</strong>
          </div>
        </div>

        {departments.map((dept) => (
          <div
            key={dept.departmentID}
            className="list-group-item d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onMouseOver={(e) => e.currentTarget.classList.add("bg-light")}
            onMouseOut={(e) => e.currentTarget.classList.remove("bg-light")}
          >
            <input
              type="checkbox"
              className="me-2"
              onChange={(e) => handleCheckboxChange(dept.departmentID, e.target.checked)}
              checked={selectedDeptIds.includes(dept.departmentID)}
            />
            <div className="flex-grow-1">{dept.departmentName}</div>
            <div style={{ width: "80px" }}>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteDepartment(dept.departmentID)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedDeptIds.length > 0 && (
        <div className="mt-3 text-center">
          <button className="btn btn-danger" onClick={handleBulkDelete}>
            Delete Selected
          </button>
        </div>
      )}
    </div>
  );
};

export default Departments;

