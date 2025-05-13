const initialState = {
    roleAssignments: [],
    selected: [],
    selected2: [],
    loading: false,
    error: null,
  };
  
  const roleAssignReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_ROLE_ASSIGNMENTS_REQUEST":
        return { ...state, loading: true };
  
      case "GET_ROLE_ASSIGNMENTS_SUCCESS":
        return { ...state, roleAssignments: action.payload, loading: false, error: null };
  
      case "GET_ROLE_ASSIGNMENTS_FAIL":
        return { ...state, error: action.payload, loading: false };
  
      case "SET_SELECTED":
        return { ...state, selected: [...action.payload] };
  
      case "SET_SELECTED2":
        return { ...state, selected2: [...action.payload] };
  
      default:
        return state;
    }
  };
  
  export default roleAssignReducer;
  
  