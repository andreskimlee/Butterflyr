import { combineReducers } from 'redux';

import entities from './entities_reducer';
import session from './session_reducer';
import errors from './errors_reducer';
import posts from './posts_reducer';
import modal from './modal_reducer'


const rootReducer = combineReducers({
  entities,
  session,
  errors,
  modal, 
  
});

export default rootReducer;
