import * as COMMENTUtil from '../util/comment_util'
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const receiveComment = ({comments}) => {
   
    return {   
    type: RECEIVE_COMMENT,
    comments, 
 }
}

export const deleteComment = ({id}) => ({
    type: DELETE_COMMENT,
    id
})


export const createComment = (postId, comment) => dispatch => {
    return COMMENTUtil.createComment(postId, comment)
        .then( comment => dispatch(receiveComment(comment)))
}


export const deleteCommentOnPost = (comment) => dispatch => {
    return COMMENTUtil.deleteComment(comment)
        .then( comment => dispatch(deleteComment(comment)))
}

