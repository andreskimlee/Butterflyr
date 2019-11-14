import * as LIKEUtils from '../util/like_util'

export const RECEIVE_LIKE = 'RECEIVE_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'

export const receiveLike = ({likes}) => {
    
    return {
        type: RECEIVE_LIKE,
        likes
    }
}

export const removeLike = ({likes}) => {
     
    return {
    type: REMOVE_LIKE,
    likes
    }
}

export const createLike = like => dispatch => {
    return LIKEUtils.createLike(like).then(like => dispatch(receiveLike(like)))
}

export const deleteLike = likeId => dispatch => {
    return LIKEUtils.deleteLike(likeId).then(like => dispatch(removeLike(like)))
}
