const initialState = {
    roles: [],
    saveSuccess: false,
    saveFailed: false,
    fetchRolesDataSuccess: false,
    fetchRolesDataFail: false,
    deleteSuccess: false,
    deleteFailed: false,
};

const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case "POST_ROLE_SUCCESS":
            return {
                ...state,
                roles: [...state.roles, action.payload],
                saveSuccess: true,
                saveFailed: false,
            };
        case "GET_ROLES_SUCCESS":
            return {
                ...state,
                roles: action.payload,
                fetchRolesDataSuccess: true,
                fetchRolesDataFail: false,
            };
        case "GET_ROLES_FAIL":
            return { ...state, fetchRolesDataFail: true, fetchRolesDataSuccess: false };
        case "DELETE_ROLE_SUCCESS":
            return {
                ...state,
                roles: state.roles.filter((role) => role.roleID !== action.payload),
                deleteSuccess: true,
                deleteFailed: false,
            };
        case "DELETE_SELECTED_ROLES_SUCCESS":
            return {
                ...state,
                roles: state.roles.filter((role) => !action.payload.ids.includes(role.roleID)),
                deleteSuccess: true,
                deleteFailed: false,
            };
        case "POST_ROLE_FAIL":
            return { ...state, saveFailed: true, saveSuccess: false };
        case "DELETE_ROLE_FAIL":
            return { ...state, deleteFailed: true, deleteSuccess: false };    
        case "DELETE_SELECTED_ROLES_FAIL":
            return { ...state, deleteFailed: true, deleteSuccess: false };
        default:
            return state;
    }
};

export default roleReducer;

