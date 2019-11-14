export const requestFriendship = friendship => {
    
    return $.ajax({
        type: "POST",
        url: "api/friendships",
        data: {friendship}
    })
}

export const approveFriendship = friendship => {
    return $.ajax({
        type: "PATCH",
        url: `api/friendships/${friendship.id}`,
        data: {friendship}
    })
}

export const denyFriendship = friendshipId => {
    return $.ajax({
        type: "DELETE",
        url: `api/friendships/${friendshipId}`
    })
}