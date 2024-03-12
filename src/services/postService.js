export const getPostsByUserToken = async (userToken) => {
  return await fetch(
    `http://localhost:9999/posts?user_id=${userToken}&_expand=user`
  ).then((res) => res.json());
};

export const getAllPosts = () => {
  return fetch(`http://localhost:9999/posts`).then((res) => res.json())
}

export const createPost = (post) => {
  return fetch("http://localhost:9999/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then((res) => res.json());
};

export const deletePost = (postId) => {
  return fetch(`http://localhost:9999/posts/${postId}`, {
    method: "DELETE",
  });
};

export const getPostByPostId = (id) => {
  return fetch(`http://localhost:9999/posts/${id}`).then((res) => res.json())
}