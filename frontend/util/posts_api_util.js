export const createPost = (userId, formData) => {
    return $.ajax({
        method: "POST",
        url: `api/users/${userId}/posts`,
        
        data: formData,
        contentType: false,
        processData: false
    })
}

export const fetchAllPosts = userId => {
    return $.ajax({
        method: "GET",
        url: `api/users/${userId}/posts`
    })
}

export const editPost = post => {
    return $.ajax({
        method: "PATCH",
        url: `api/posts/${post}`,
        data: {post}
    })
}

export const deletePost = post => {
    return $.ajax({
        method: "DELETE",
        url: `api/posts/${post}`
    })
}