import * as POSTUtil from '../util/posts_api_util'
export const RECEIVE_POST = "RECEIVE_POST";
export const RECEIVE_ALL_POSTS = "RECEIVE_ALL_POSTS"


export const receivePost = post => ({
    type: RECEIVE_POST,
    post
})

export const receiveAllPosts = posts => ({
    type: RECEIVE_ALL_POSTS,
    posts 
})

export const createPost = (userId, post) => dispatch => {
    return POSTUtil.createPost(userId, post)
        .then( post => dispatch(receivePost(post)))
}

export const getUsersPosts = (userId) => dispatch => {
    return POSTUtil.fetchAllPosts(userId).then(posts => dispatch(receiveAllPosts(posts)))
}
