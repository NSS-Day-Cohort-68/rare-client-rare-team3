export const getAllCategories = () => {
  return fetch(`http://localhost:9999/categories`).then((res) => res.json())
}

export const deleteCategory = (catId) => {
  return fetch(`http://localhost:9999/categories/${catId}`, {
    method: "DELETE",
  })
}
