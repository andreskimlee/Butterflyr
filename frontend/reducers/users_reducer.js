import {RECEIVE_ALL_POSTS} from '../actions/posts_actions';
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
import { RECEIVE_USER } from '../actions/user_actions';
import { merge } from 'lodash'


const usersReducer = (state = {}, action) => {
  Object.freeze(state); 
  switch(action.type) {
    case RECEIVE_ALL_POSTS:
      return merge({}, state, action.user);
    case RECEIVE_CURRENT_USER:
      return merge({}, state, {[action.user.id]: action.user}); 
    case RECEIVE_USER:  
      let newState = merge({}, state[action.user.id], action.user)
      return merge({}, state, { [action.user.id] : newState})  
    default:
      return state;
  }
};

export default usersReducer;
