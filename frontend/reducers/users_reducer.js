import {RECEIVE_USER} from '../actions/user_actions';
import { merge } from 'lodash'

const usersReducer = (state = {}, action) => {
  Object.freeze(state); 
  switch(action.type) {
    case RECEIVE_USER:
      return merge({}, action.user);
    default:
      return state;
  }
};

export default usersReducer;
