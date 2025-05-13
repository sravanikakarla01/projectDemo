export const setSelected = (selectedItems) => ({
    type: "SET_SELECTED",
    payload: selectedItems,
  });
  
  export const setSelected2 = (selectedItems) => ({
    type: "SET_SELECTED2",
    payload: selectedItems,
  });
  
  export const getRoleAssignments = () => dispatch => {
    dispatch({ type: "GET_ROLE_ASSIGNMENTS_REQUEST" });
    fetch("http://localhost:5000/role-assign")
      .then(res => res.json())
      .then(data => dispatch({ type: "GET_ROLE_ASSIGNMENTS_SUCCESS", payload: data }))
      .catch(err => dispatch({ type: "GET_ROLE_ASSIGNMENTS_FAIL", payload: err.message }));
  };
  
  export const updateRoleAssignment = (id, updatedData) => dispatch => {
    fetch(`http://localhost:5000/role-assign/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
    .then(res => res.json())
    .then(() => dispatch(getRoleAssignments()))
    .catch(err => console.error("Error updating:", err));
  };
  
  export const deleteSelectedRoleAssignments = (ids) => dispatch => {
    Promise.all(
      ids.map(id =>
        fetch(`http://localhost:5000/role-assign/${id}`, { method: "DELETE" })
      )
    )
    .then(() => dispatch(getRoleAssignments()))
    .catch(err => console.error("Error deleting:", err));
  };