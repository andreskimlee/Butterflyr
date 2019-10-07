import * as POSTUtil from '../utils/post_utils'
export const RECEIVE_POST = "RECEIVE_POST";

export const receivePost = post => ({
    type: RECEIVE_POST,
    post
})

export const createPost = (userId, formData) => dispatch => {
    return POSTUtil.createPost(userId, formData)
        .then( post => dispatch(receivePost(post)))
}

