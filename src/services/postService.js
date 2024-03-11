export const getPostsByUserToken = async (userToken) => {
  return await fetch(
    `http://localhost:9999/posts?user_id=${userToken}&_expand=user`
  ).then((res) => res.json());
};
