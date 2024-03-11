export const getAllCategories = () => {
  return fetch(`http://localhost:9999/categories`).then((res) => res.json())
}

export const updateCategory = (category) => {
  return fetch(`http://localhost:9999/categories?id=${category.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  })
}

export const deleteCategory = (catId) => {
  return fetch(`http://localhost:9999/categories?id=${catId}`, {
    method: "DELETE",
  })
}
