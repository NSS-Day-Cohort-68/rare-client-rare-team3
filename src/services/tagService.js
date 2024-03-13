export const getAllTags = () => {
  return fetch(`http://localhost:9999/tags`).then((res) => res.json())
}

export const createTag = (tag) => {
  return fetch("http://localhost:9999/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  })
}
