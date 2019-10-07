import {RECEIVE_POST, RECEIVE_ALL_POSTS } from '../actions/posts_actions'
import {merge} from 'lodash'

export default (state={}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_POST:
            return merge({}, action.post)
        case RECEIVE_ALL_POSTS: 
            return merge({}, action.posts)
        default:
            return state;
    }
}