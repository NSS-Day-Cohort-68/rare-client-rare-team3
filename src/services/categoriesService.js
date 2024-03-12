export const getAllCategories = () => {
  return fetch(`http://localhost:9999/categories`).then((res) => res.json())
}


export const createCategory = (category) => {
  return fetch(`http://localhost:9999/categories` , {
    method: "POST",
    headers: {
        "Content-Type": "application/json" 
    },
    body: JSON.stringify(category)
    
})
}
export const deleteCategory = (catId) => {
  return fetch(`http://localhost:9999/categories/${catId}`, {
    method: "DELETE",
  })
}
