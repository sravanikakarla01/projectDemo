// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FaTrash, FaPlus, FaTimes } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";

// // Import action creators
// import { getRoleDetails, postRoles, deleteRole, deleteSelectedRoles } from "../redux/roleActions";

// // Roles component
// const Roles = () => {
//   const dispatch = useDispatch();
//   const [newRoleName, setNewRoleName] = useState("");
//   const [selectedRoleIds, setSelectedRoleIds] = useState([]);
//   const [showAddForm, setShowAddForm] = useState(false);

//   // Getting state from Redux store
//   const { roles, saveSuccess, saveFailed } = useSelector((state) => state.role);

//   // Fetch roles on initial render
//   useEffect(() => {
//     dispatch(getRoleDetails());
//   }, [dispatch]);

//   // Handle role creation
//   const handleAddRole = (e) => {
//     e.preventDefault();
//     if (!newRoleName.trim()) return;
//     dispatch(postRoles(newRoleName));
//     setNewRoleName(""); // Reset after adding
//     setShowAddForm(false); // Close form after submission
//   };

//   // Handle deletion of a single role
//   const handleDeleteRole = (roleId) => {
//     dispatch(deleteRole(roleId));
   
//   };

//   // Handle checkbox change for bulk deletion
//   const handleCheckboxChange = (roleId, checked) => {
//     if (checked) {
//       setSelectedRoleIds([...selectedRoleIds, roleId]);
//     } else {
//       setSelectedRoleIds(selectedRoleIds.filter((id) => id !== roleId));
//     }
//   };

//   // Handle bulk deletion of selected roles
//   const handleBulkDelete = () => {
//     if (selectedRoleIds.length > 0) {
//       dispatch(deleteSelectedRoles(selectedRoleIds));
//       setSelectedRoleIds([]);
//      // Reset selected IDs after deletion
//     }
//   };

//   return (
//     <div className="container mt-2" style={{ maxWidth: "700px" }}>
//       <h3 className="text-center mb-2">Roles Management</h3>

//       {/* Success/Error Message */}
//       {saveSuccess && <div className="alert alert-success mt-2">Role saved successfully!</div>}
//       {saveFailed && <div className="alert alert-danger mt-2">Failed to save role. Please try again.</div>}

//       {/* Add Role Button */}
//       <div className="d-flex justify-content-end mb-3">
//         <button
//           className="btn btn-primary"
//           onClick={() => setShowAddForm(true)}
//           onMouseOver={(e) => e.currentTarget.classList.add("shadow")}
//           onMouseOut={(e) => e.currentTarget.classList.remove("shadow")}
//         >
//           <FaPlus className="me-1" />
//           Add Role
//         </button>
//       </div>

//       {/* Add Role Form Overlay */}
//       {showAddForm && (
//         <div
//           className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-start justify-content-center"
//           style={{
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             zIndex: 2000,
//           }}
//           onClick={() => setShowAddForm(false)}
//         >
//           <div
//             className="bg-white p-4 rounded shadow"
//             style={{ marginTop: "100px", width: "500px" }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h5 className="mb-3">Add New Role</h5>
//             <form onSubmit={handleAddRole}>
//               <div className="mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Role Name"
//                   value={newRoleName}
//                   onChange={(e) => setNewRoleName(e.target.value)}
//                 />
//               </div>
//               <div className="d-flex justify-content-end">
//                 <button type="submit" className="btn btn-primary me-2">
//                   <FaPlus className="me-1" /> Save
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setShowAddForm(false)}
//                 >
//                   <FaTimes className="me-1" /> Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Roles List (List group instead of table) */}
//       <div className="list-group">
//         <div className="list-group-item d-flex align-items-center bg-dark text-white">
//           <input
//             type="checkbox"
//             className="me-2"
//             onChange={(e) => {
//               if (e.target.checked) {
//                 setSelectedRoleIds(roles.map((role) => role.roleID));
//               } else {
//                 setSelectedRoleIds([]);
//               }
//             }}
//             checked={roles.length > 0 && selectedRoleIds.length === roles.length}
//           />
//           <div className="flex-grow-1">
//             <strong>Role Name</strong>
//           </div>
//           <div style={{ width: "80px" }}>
//             <strong>Actions</strong>
//           </div>
//         </div>

//         {roles.map((role) => (
//           <div
//             key={role.roleID}
//             className="list-group-item d-flex align-items-center"
//             style={{ cursor: "pointer" }}
//             onMouseOver={(e) => e.currentTarget.classList.add("bg-light")}
//             onMouseOut={(e) => e.currentTarget.classList.remove("bg-light")}
//           >
//             <input
//               type="checkbox"
//               className="me-2"
//               onChange={(e) =>
//                 handleCheckboxChange(role.roleID, e.target.checked)
//               }
//               checked={selectedRoleIds.includes(role.roleID)}
//             />
//             <div className="flex-grow-1">{role.roleName}</div>
//             <div style={{ width: "80px" }}>
//               <button
//                 className="btn btn-danger btn-sm"
//                 onClick={() => handleDeleteRole(role.roleID)}
//               >
//                 <FaTrash />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Bulk Delete Button */}
//       {selectedRoleIds.length > 0 && (
//         <div className="mt-3">
//           <button className="btn btn-danger" onClick={handleBulkDelete}>
//             Delete Selected Roles
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };
// export default Roles;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { getRoleDetails, postRoles, deleteRole, deleteSelectedRoles } from "../redux/roleActions";
import { isAdmin } from "./auth"; // ✅ RBAC utility

const Roles = () => {
  const dispatch = useDispatch();
  const [newRoleName, setNewRoleName] = useState("");
  const [selectedRoleIds, setSelectedRoleIds] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const { roles, saveSuccess, saveFailed } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(getRoleDetails());
  }, [dispatch]);

  const handleAddRole = (e) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;
    dispatch(postRoles(newRoleName));
    setNewRoleName("");
    setShowAddForm(false);
  };

  const handleDeleteRole = (roleId) => {
    dispatch(deleteRole(roleId));
  };

  const handleCheckboxChange = (roleId, checked) => {
    if (checked) {
      setSelectedRoleIds([...selectedRoleIds, roleId]);
    } else {
      setSelectedRoleIds(selectedRoleIds.filter((id) => id !== roleId));
    }
  };

  const handleBulkDelete = () => {
    if (selectedRoleIds.length > 0) {
      dispatch(deleteSelectedRoles(selectedRoleIds));
      setSelectedRoleIds([]);
    }
  };

  return (
    <div className="container mt-2" style={{ maxWidth: "700px" }}>
      <h3 className="text-center mb-2">Roles Management</h3>

      {saveSuccess && <div className="alert alert-success mt-2">Role saved successfully!</div>}
      {saveFailed && <div className="alert alert-danger mt-2">Failed to save role. Please try again.</div>}

      {/* Add Role Button (admin only) */}
      {isAdmin() && (
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
            onMouseOver={(e) => e.currentTarget.classList.add("shadow")}
            onMouseOut={(e) => e.currentTarget.classList.remove("shadow")}
          >
            <FaPlus className="me-1" />
            Add Role
          </button>
        </div>
      )}

      {/* Add Role Form Overlay */}
      {showAddForm && isAdmin() && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-start justify-content-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 2000 }}
          onClick={() => setShowAddForm(false)}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{ marginTop: "100px", width: "500px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5 className="mb-3">Add New Role</h5>
            <form onSubmit={handleAddRole}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Role Name"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">
                  <FaPlus className="me-1" /> Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddForm(false)}
                >
                  <FaTimes className="me-1" /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Roles List */}
      <div className="list-group">
        <div className="list-group-item d-flex align-items-center bg-dark text-white">
          {isAdmin() && (
            <input
              type="checkbox"
              className="me-2"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedRoleIds(roles.map((role) => role.roleID));
                } else {
                  setSelectedRoleIds([]);
                }
              }}
              checked={roles.length > 0 && selectedRoleIds.length === roles.length}
            />
          )}
          <div className="flex-grow-1">
            <strong>Role Name</strong>
          </div>
          {isAdmin() && <div style={{ width: "80px" }}><strong>Actions</strong></div>}
        </div>

        {roles.map((role) => (
          <div
            key={role.roleID}
            className="list-group-item d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onMouseOver={(e) => e.currentTarget.classList.add("bg-light")}
            onMouseOut={(e) => e.currentTarget.classList.remove("bg-light")}
          >
            {isAdmin() && (
              <input
                type="checkbox"
                className="me-2"
                onChange={(e) =>
                  handleCheckboxChange(role.roleID, e.target.checked)
                }
                checked={selectedRoleIds.includes(role.roleID)}
              />
            )}
            <div className="flex-grow-1">{role.roleName}</div>
            {isAdmin() && (
              <div style={{ width: "80px" }}>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteRole(role.roleID)}
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bulk Delete Button */}
      {isAdmin() && selectedRoleIds.length > 0 && (
        <div className="mt-3">
          <button className="btn btn-danger" onClick={handleBulkDelete}>
            Delete Selected Roles
          </button>
        </div>
      )}
    </div>
  );
};

export default Roles;
