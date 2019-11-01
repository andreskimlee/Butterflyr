import * as COMMENTUtil from '../util/comment_util'
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const receiveComment = ({comment, user}) => {
 debugger 
    return {   
    type: RECEIVE_COMMENT,
    comment, 
    user
 }
}

export const deleteComment = ({id}) => ({
    type: DELETE_COMMENT,
    id
})


export const createComment = (postId, formData) => dispatch => {
    return COMMENTUtil.createComment(postId, formData)
        .then( comment => dispatch(receiveComment(comment)))
}


export const deleteCommentOnPost = (comment) => dispatch => {
    return COMMENTUtil.deleteComment(comment)
        .then( comment => dispatch(deleteComment(comment)))
}

