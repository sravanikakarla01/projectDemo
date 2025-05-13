import { combineReducers } from 'redux';
import roleAssignReducer from './roleAssignReducer';
import departmentReducer from './departmentReducer';
import roleReducer from './roleReducer';

const rootReducer = combineReducers({
  roleAssignments: roleAssignReducer,
  department: departmentReducer,
  role: roleReducer,
});

export default rootReducer;
