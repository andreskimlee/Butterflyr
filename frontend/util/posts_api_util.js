export const createPost = (userId) => {
    return $.ajax({
        method: "POST",
        url: `api/users/${userId}/posts`
    })
}

export const fetchAllPosts = userId => {
    return $.ajax({
        method: "GET",
        url: `api/users/${userId}/posts`
    })
}