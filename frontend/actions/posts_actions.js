import * as POSTUtil from '../util/posts_api_util'
export const RECEIVE_POST = "RECEIVE_POST";
export const RECEIVE_ALL_POSTS = "RECEIVE_ALL_POSTS"
export const DELETE_POST = "DELETE_POST";

export const receivePost = ({post}) => ({
    type: RECEIVE_POST,
    post
})

export const deletePost = ({id}) => ({
    type: DELETE_POST,
    id
})


export const receiveAllPosts = ({ posts, user }) => {
    
    return {
    type: RECEIVE_ALL_POSTS,
    posts, 
    user
 }
}

export const createPost = (userId, formData) => dispatch => {
    return POSTUtil.createPost(userId, formData)
        .then( post => dispatch(receivePost(post)))
}

export const deleteUsersPost = (post) => dispatch => {
    return POSTUtil.deletePost(post)
        .then( post => dispatch(deletePost(post)))
}


export const editUsersPost = (post) => dispatch => {
    return POSTUtil.editPost(post)
        .then( post => dispatch(receivePost(post)))
}


export const getUsersPosts = (userId) => dispatch => {
    return POSTUtil.fetchAllPosts(userId).then(posts => dispatch(receiveAllPosts(posts)))
}
