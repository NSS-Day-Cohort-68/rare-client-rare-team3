export const getAllTags = () => {
  return fetch(`http://localhost:9999/tags`).then((res) => res.json())
}

export const editTag = (tag) => {
  return fetch(`http://localhost:9999/tags/${tag.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  })
}
