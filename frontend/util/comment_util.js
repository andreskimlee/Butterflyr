export const createComment = (postId, formData) => {
    return $.ajax({
        method: "POST",
        url: `/api/posts/${postId}/comments`, 
        data: formData,
        contentType: false,
        processData: false
    })
}

export const deleteComment = commentId => {
    return $.ajax({
        method: "DELETE",
        url: `/api/comments/${commentId}`
    })
}