// AddRoles.js
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  postRoles,
  getRoleDetails,
  deleteRole,
  deleteSelectedRoles,
} from "./roleActions";

const AddRoles = ({
  show,
  onClose,
  onSave,
  postRoles,
  getRoleDetails,
  deleteRole,
  deleteSelectedRoles,
  roles,
}) => {
  const [formData, setFormData] = useState({ roleName: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    getRoleDetails();
  }, [getRoleDetails]);

  const handleChange = (value, key) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postRoles(formData.roleName);
      setMessage("Role saved successfully!");
      setError(false);
      setFormData({ roleName: "" });
      onSave && onSave(formData.roleName);

      setTimeout(() => {
        onClose && onClose();
        setMessage("");
      }, 1500);
    } catch (err) {
      setError(true);
      setMessage("Something went wrong!");
    }
  };

  const handleDeleteRole = (roleID) => {
    deleteRole(roleID);
  };

  const handleDeleteSelectedRoles = () => {
    deleteSelectedRoles(selectedRoles);
    setSelectedRoles([]);
  };

  const handleRoleSelect = (roleID) => {
    setSelectedRoles((prev) =>
      prev.includes(roleID) ? prev.filter((id) => id !== roleID) : [...prev, roleID]
    );
  };

  return (
    <div>
      <h3>Add New Role</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.roleName}
          onChange={(e) => handleChange(e.target.value, "roleName")}
          placeholder="Role Name"
          required
        />
        <button type="submit">Save Role</button>
      </form>

      <h3>Roles List</h3>
      <ul>
        {roles.map((role) => (
          <li key={role.roleID}>
            <input
              type="checkbox"
              checked={selectedRoles.includes(role.roleID)}
              onChange={() => handleRoleSelect(role.roleID)}
            />
            {role.roleName}
            <button onClick={() => handleDeleteRole(role.roleID)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={handleDeleteSelectedRoles} disabled={selectedRoles.length === 0}>
        Delete Selected Roles
      </button>

      {message && <p style={{ color: error ? "red" : "green" }}>{message}</p>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  roles: state.role.roles,
});

const mapDispatchToProps = {
  postRoles,
  getRoleDetails,
  deleteRole,
  deleteSelectedRoles,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoles);
