export const createPost = (userId) => {
    return $.ajax({
        method: "POST",
        url: `api/users/${userId}/posts`
    })
}