export const createComment = (comment) => {
  return fetch(`http://localhost:9999/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  })
}
