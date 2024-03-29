

export const getCommentByPostId = (postId) => {
    return fetch(`http://localhost:9999/comments?_post_id=${postId}`).then((res) => res.json())
}
export const getComments = () => {
  return fetch(`http://locahost:9999/comments`).then((res) => res.json())
}

export const getCommentsById = (commentId) => {
  return fetch(`http://localhost:9999/comments/${commentId}`).then(
    (res) => res.json()
  )
}

export const createComment = (comment) => {
  return fetch(`http://localhost:9999/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  })
}

export const deleteComment = (commentId) => {
  return fetch(`http://localhost:9999/comments/${commentId}`, {
    method: "DELETE",
  })
}

export const updateComment = (comment) => {
  return fetch(`http://localhost:9999/comments/${comment.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  })
}