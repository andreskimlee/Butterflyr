export const RECEIVE_USER = "RECEIVE_USER";
import * as USERUtil from "../util/user_api_util";

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user });



export const fetchUser = id => dispatch => {
    // debugger 
    return USERUtil.fetchUser(id)
        .then(user => dispatch(receiveUser(user)))
}

export const updateUserAction = (userId, formData) => dispatch => {
    return USERUtil.updateUser(userId, formData)
        .then(user => dispatch(receiveUser(user)))
}
