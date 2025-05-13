// src/components/Department/departmentReducer.js

const initialState = {
    departments: [],
    loading: false,
    error: null,
  };
  
  const departmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case "POST_DEPARTMENT_SUCCESS":
        return { ...state, departments: [...state.departments, action.payload], loading: false,
          error: null, };
      case "GET_DEPARTMENTS_SUCCESS":
        return { ...state, departments: action.payload };
      case "DELETE_DEPARTMENT_SUCCESS":
        return { ...state, departments: state.departments.filter((d) => d.departmentID !== action.payload) };
      case "DELETE_SELECTED_DEPARTMENTS_SUCCESS":
        return {
          ...state,
          departments: state.departments.filter((d) => !action.payload.includes(d.departmentID)),
        };
      case "POST_DEPARTMENT_FAIL":
      case "GET_DEPARTMENTS_FAIL":
      case "DELETE_DEPARTMENT_FAIL":
      case "DELETE_SELECTED_DEPARTMENTS_FAIL":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export default departmentReducer;
  