import {RECEIVE_COMMENT, DELETE_COMMENT} from '../actions/comment_actions'
import {merge} from 'lodash'

export default (state=[], action) => {
    debugger
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_COMMENT:
               
            const newComment = merge({}, state, action.comment)
            return newComment; 
        case DELETE_COMMENT: 
            const newState = merge({}, state);
            delete newState[action.id]
            return newState;
        default:
            return state;
    }
}