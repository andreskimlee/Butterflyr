import * as FRIENDUtil from "../util/friendship_util"

export const FRIEND_REQUEST = 'FRIEND_REQUEST'
export const DENY_REQUEST = 'DENY_REQUEST'

const RECEIVE_FRIENDSHIP = "RECEIVE_FRIENDSHIP"

export const receiveFriendship = friendship => { 
    return {
        type: RECEIVE_FRIENDSHIP,
        friendship
    }
}

export const deleteFriendship = friendship => {
 return {
    type: REMOVE_FRIENDSHIP,
 }
}

export const requestFriendship = friendship => dispatch => {
    debugger 
    return FRIENDUtil.requestFriendship(friendship).then(friendship => dispatch(receiveFriendship(friendship)))}

export const approveFriendship = friendship => dispatch => {
    return FRIENDSHIPUtils.approveFriendship(friendship).then(friendship => dispatch(receiveFriendship(friendship)))}

export const denyFriendship = friendship => dispatch => {
    return FRIENDSHIPUtils.denyFriendship(friendship).then(friendship => dispatch(removeFriendship(friendship)))}

