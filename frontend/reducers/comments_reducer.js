import {RECEIVE_COMMENT, DELETE_COMMENT} from '../actions/comment_actions'
import {merge} from 'lodash'
import {RECEIVE_ALL_POSTS} from '../actions/posts_actions'

export default (state=[], action) => { 
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_COMMENT: 
            const newComment = merge({}, state, action.comments)
            return newComment; 
        case DELETE_COMMENT: 
            const newState = merge({}, state);
            delete newState[action.id]
            return newState;
        default:
            return state;
    }
}