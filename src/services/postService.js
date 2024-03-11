export const getAllPosts = () => {
  return fetch(`http://localhost:9999/posts`).then((res) => res.json())
}
