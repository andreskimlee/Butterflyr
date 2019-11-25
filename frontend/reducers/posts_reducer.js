import {RECEIVE_POST, RECEIVE_ALL_POSTS, DELETE_POST} from '../actions/posts_actions'
import {merge} from 'lodash'
import { RECEIVE_COMMENT } from '../actions/comment_actions';
import { REMOVE_LIKE, RECEIVE_LIKE } from '../actions/like_actions'
import { fromEvent } from 'file-selector';
export default (state=[], action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_POST:
           
            const newPosts = merge({}, state, action.post)
            return newPosts; 
        case RECEIVE_ALL_POSTS:  
            return merge({}, state, action.posts)
        case DELETE_POST: 
            const newState = merge({}, state);
            delete newState[action.id]
            return newState;
        case REMOVE_LIKE:
                const newState2 = merge({}, state);
            if (newState2[Object.values(action.likes)[0].likeable_id].likes) {
                 
                delete newState2[Object.values(action.likes)[0].likeable_id].likes[Object.values(action.likes)[0].id];
                return newState2;
            } else {
                return state; 
            }
                        
        default:
            return state;
    }
}