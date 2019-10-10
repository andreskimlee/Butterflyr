import {RECEIVE_ALL_POSTS} from '../actions/posts_actions';
import { merge } from 'lodash'

const usersReducer = (state = {}, action) => {
  Object.freeze(state); 
  switch(action.type) {
    case RECEIVE_ALL_POSTS:
      return merge({}, state, action.user);
    default:
      return state;
  }
};

export default usersReducer;
