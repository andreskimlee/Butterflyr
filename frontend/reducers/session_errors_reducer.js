import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER,
    RECEIVE_SIGN_UP_ERRORS,
  } from '../actions/session_actions';
  
  export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
      case RECEIVE_SESSION_ERRORS:
        return action.errors.session_errors;
      case RECEIVE_CURRENT_USER:
        return [];
      default:
        return state;
    }
  };
  