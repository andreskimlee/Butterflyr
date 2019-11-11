import { RECEIVE_LIKE, REMOVE_LIKE} from "../actions/like_actions"
import {merge} from 'lodash'
export default function friendshipReducer (state={}, action) {
    Object.freeze(state); 
    switch (action.type) {
        case RECEIVE_LIKE: 
            return merge({}, state, action.likes);
        case REMOVE_LIKE:   
            const newState = merge({}, state);
            delete newState[Object.values(action.likes)[0].id]
            return newState;
        default:
            return state; 
    }
}