import {RECEIVE_POST, RECEIVE_ALL_POSTS, DELETE_POST} from '../actions/posts_actions'
import {merge} from 'lodash'

export default (state=[], action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_POST:
            debugger   
            const newPosts = merge({}, state["posts"], action.post.post)
            return newPosts; 
        case RECEIVE_ALL_POSTS: 
            return merge({}, action.posts)
        case DELETE_POST: 
        const newState = merge({}, state);
        delete newState.posts[Object.values(action.postId.post)[0]["id"]]
        return newState;
        default:
            return state;
    }
}