export const getAllPosts = () => {
  return fetch(`http://localhost:9999/posts`).then((res) => res.json())
}

export const getPostByPostId = (id) => {
  return fetch(`http://localhost:9999/posts/${id}`).then((res) => res.json())
}