export const createLike = like => {
    // debugger 
    return $.ajax({
        type: "POST",
        url: "api/likes",
        data: like
    })
}

export const deleteLike = like => {
    return $.ajax({
        type: "DELETE",
        url: `api/likes/${like.id}`,
        data: like
    })
}
