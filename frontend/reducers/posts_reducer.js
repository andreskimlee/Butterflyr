import {RECEIVE_POST} from '../actions/posts_actions'
import {merge} from 'lodash'

export default (state={}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_POST:
            return merge({}, action.post)
        default:
            return state;
    }
}