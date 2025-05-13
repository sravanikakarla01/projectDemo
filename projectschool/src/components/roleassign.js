import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getRoleAssignments,
  updateRoleAssignment,
  deleteSelectedRoleAssignments,
  setSelected
} from '../redux/roleAssignActions';
import { getRoleDetails } from '../redux/roleActions';
import { getDepartments } from '../redux/departmentAction';
import {
  selectRoleAssignments,
  selectDepartments,
  selectRoleDetails,
  selectLoadingAssignments,
  selectLoadingDepartments,
  selectLoadingRoles
} from '../redux/selectors';

const RoleAssign = () => {
  const dispatch = useDispatch();

  const [selectedIds, setSelectedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formDept, setFormDept] = useState('');
  const [formRole, setFormRole] = useState('');

  const roleAssignments = useSelector(selectRoleAssignments);
  const departments = useSelector(selectDepartments);
  const roleDetails = useSelector(selectRoleDetails);
  const loadingAssignments = useSelector(selectLoadingAssignments);
  const loadingDepartments = useSelector(selectLoadingDepartments);
  const loadingRoles = useSelector(selectLoadingRoles);

  useEffect(() => {
    dispatch(getRoleAssignments());
    dispatch(getDepartments());
    dispatch(getRoleDetails());
  }, [dispatch]);

  console.log("Departments from Redux:", departments);
  console.log("Roles from Redux:", roleDetails);

  const handleCheckboxChange = id => {
    setSelectedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      dispatch(setSelected(next));
      return next;
    });
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length) {
      dispatch(deleteSelectedRoleAssignments(selectedIds));
      setSelectedIds([]);
      dispatch(setSelected([]));
    }
  };

  const openEditModal = item => {
    dispatch(getDepartments());
    dispatch(getRoleDetails());
    setEditingItem(item);
    setFormDept(item.department || '');
    setFormRole(item.roleName || '');
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingItem) {
      dispatch(updateRoleAssignment(editingItem.id, {
        department: formDept,
        roleName: formRole
      }));
    }
    setShowModal(false);
    setEditingItem(null);
  };

  if (loadingDepartments || loadingRoles || loadingAssignments) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Role Assignments</h3>

      <button
        className="btn btn-danger mb-2"
        onClick={handleDeleteSelected}
        disabled={!selectedIds.length}
      >
        Delete Selected
      </button>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Select</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roleAssignments.map(item => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </td>
              <td>{item.username}</td>
              <td>{item.department || 'Unassigned'}</td>
              <td>{item.roleName || 'Unassigned'}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => openEditModal(item)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" style={{ position: 'relative', zIndex: 2 }}>
              <div className="modal-header">
                <h5 className="modal-title">Edit Assignment</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <select
                    className="form-select"
                    value={formDept}
                    onChange={e => setFormDept(e.target.value)}
                  >
                    <option value="">Select dept</option>
                    {departments.map(d => (
                      <option key={d.departmentID} value={d.departmentName}>
                        {d.departmentName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    value={formRole}
                    onChange={e => setFormRole(e.target.value)}
                  >
                    <option value="">Select role</option>
                    {roleDetails.map(r => (
                      <option key={r.roleID || r.roleId} value={r.roleName}>
                        {r.roleName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleAssign;






