

export const getCommentByPostId = (postId) => {
    return fetch(`http://localhost:9999/comments?_post_id=${postId}`).then((res) => res.json())
}