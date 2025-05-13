// src/components/Department/departmentActions.js

export const postDepartment = (departmentName) => {
    return (dispatch) => {
      fetch("http://localhost:5000/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ departmentName }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && (data.message || data.departmentID)) {
            dispatch({ type: "POST_DEPARTMENT_SUCCESS", payload: data });
            dispatch(getDepartments()); 
          } else {
            dispatch({ type: "POST_DEPARTMENT_FAIL", payload: data.message || "Failed to add department" });
          }
        })
        .catch((error) => {
          dispatch({ type: "POST_DEPARTMENT_FAIL", payload: error.message });
        });
    };
  };
  
  export const getDepartments = () => {
    return (dispatch) => {
      fetch("http://localhost:5000/departments")
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "GET_DEPARTMENTS_SUCCESS", payload: data });
        })
        .catch((error) => {
          dispatch({ type: "GET_DEPARTMENTS_FAIL", payload: error.message });
        });
    };
  };
  
  export const deleteDepartment = (departmentID) => {
    return (dispatch) => {
      fetch(`http://localhost:5000/departments/${departmentID}`, { method: "DELETE" })
        .then((res) => res.json())
        .then(() => {
          dispatch({ type: "DELETE_DEPARTMENT_SUCCESS", payload: departmentID });
        })
        .catch((error) => {
          dispatch({ type: "DELETE_DEPARTMENT_FAIL", payload: error.message });
        });
    };
  };
  
  export const deleteSelectedDepartments = (departmentIds) => {
    return (dispatch) => {
      fetch("http://localhost:5000/departments/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ departmentIds }),
      })
        .then((res) => res.json())
        .then(() => {
          dispatch({ type: "DELETE_SELECTED_DEPARTMENTS_SUCCESS", payload: departmentIds });
        })
        .catch((error) => {
          dispatch({ type: "DELETE_SELECTED_DEPARTMENTS_FAIL", payload: error.message });
        });
    };
  };
  