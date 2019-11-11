import {RECEIVE_POST, RECEIVE_ALL_POSTS, DELETE_POST} from '../actions/posts_actions'
import {merge} from 'lodash'
import { RECEIVE_COMMENT } from '../actions/comment_actions';
import { REMOVE_LIKE, RECEIVE_LIKE } from '../actions/like_actions'
import { fromEvent } from 'file-selector';
export default (state=[], action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_POST:
            // debugger   
            const newPosts = merge({}, state, action.post)
            return newPosts; 
        case RECEIVE_ALL_POSTS: 
            return merge({}, state, action.posts)
        case DELETE_POST: 
            const newState = merge({}, state);
            delete newState[action.id]
            return newState;
        case RECEIVE_COMMENT:
            const newComments = merge({}, state, action.comment)
            return newComments 
        case REMOVE_LIKE:
            const newState2 = merge({}, state)
            delete newState2[Object.values(action.likes)[0].likeable_id].likes[Object.values(action.likes)[0].id]
            return newState2               
        default:
            return state;
    }
}