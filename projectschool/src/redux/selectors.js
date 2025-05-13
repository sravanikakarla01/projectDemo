import { createSelector } from 'reselect';

// ✅ Updated base slice selectors to match the keys used in rootReducer.js
const selectRoleAssignState   = state => state.roleAssignments; // previously: roleAssign
const selectDepartmentsState  = state => state.department;       // previously: departments
const selectRoleDetailsState  = state => state.role;            // previously: roleDetails

// ✅ Memoized selectors
export const selectRoleAssignments = createSelector(
  [ selectRoleAssignState ],
  roleAssign => roleAssign?.roleAssignments || []
);

export const selectDepartments = createSelector(
  [ selectDepartmentsState ],
  deptState => deptState?.departments || []
);

export const selectRoleDetails = createSelector(
  [ selectRoleDetailsState ],
  roleState => roleState?.roles || []
);

// ✅ Loading flags
export const selectLoadingAssignments = createSelector(
  [ selectRoleAssignState ],
  roleAssign => roleAssign?.loading || false
);

export const selectLoadingDepartments = createSelector(
  [ selectDepartmentsState ],
  deptState => deptState?.loading || false
);

export const selectLoadingRoles = createSelector(
  [ selectRoleDetailsState ],
  roleState => roleState?.loading || false
);
