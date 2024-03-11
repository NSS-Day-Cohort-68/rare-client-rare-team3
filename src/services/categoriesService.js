export const getAllCategories = () => {
  return fetch(`http://localhost:9999/categories`).then((res) => res.json())
}
