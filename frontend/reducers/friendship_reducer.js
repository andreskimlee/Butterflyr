import { FRIEND_REQUEST, DENY_REQUEST} from "../actions/friendship_actions"
import {merge} from 'lodash'
export default function friendshipReducer (state={}, action) {
    Object.freeze(state); 
    switch (action.type) {
        case FRIEND_REQUEST: 
            return merge(action.friendship);
        case DENY_REQUEST: 
            // debugger 
            return state;   
        default:
            return state; 
    }
}