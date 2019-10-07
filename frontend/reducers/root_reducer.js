import { combineReducers } from 'redux';

import entities from './entities_reducer';
import session from './session_reducer';
import errors from './errors_reducer';
import users from './users_reducer'; 

const rootReducer = combineReducers({
  entities,
  session,
  users,
  errors,
});

export default rootReducer;
