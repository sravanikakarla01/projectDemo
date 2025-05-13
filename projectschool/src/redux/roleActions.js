 export const postRoles = (roleName) => {
  return (dispatch) => {
    fetch("http://localhost:5000/roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roleName }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.message || data.roleId)) {
          dispatch({ type: "POST_ROLE_SUCCESS", payload: data });
          dispatch(getRoleDetails());
        } else {
          dispatch({
            type: "POST_ROLE_FAIL",
            payload: data.message || "Failed to add role",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: "POST_ROLE_FAIL", payload: error.message });
      });
  };
};
 
export const getRoleDetails = () => {
  return (dispatch) => {
    fetch("http://localhost:5000/roles")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "GET_ROLES_SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "GET_ROLES_FAIL", payload: error.message });
      });
  };
};
 
export const deleteRole = (roleId) => {
  return (dispatch) => {
    fetch(`http://localhost:5000/roles/${roleId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        dispatch({ type: "DELETE_ROLE_SUCCESS", payload: roleId });
      })
      .catch((error) => {
        dispatch({ type: "DELETE_ROLE_FAIL", payload: error.message });
      });
  };
};
 
export const deleteSelectedRoles = (roleIds) => {
  return (dispatch) => {
    fetch("http://localhost:5000/roles/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roleIds }),
    })
      .then((res) => res.json())
      .then(() => {
        dispatch({
          type: "DELETE_SELECTED_ROLES_SUCCESS",
          payload: roleIds,
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_SELECTED_ROLES_FAIL",
          payload: error.message,
        });
      });
  };
};
 