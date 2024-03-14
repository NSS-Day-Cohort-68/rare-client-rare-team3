export const getAllTags = () => {
  return fetch(`http://localhost:9999/tags`).then((res) => res.json())
}

export const getPostTagsByPostId = (postId) => {
  return fetch(`http://localhost:9999/post_tags?post_id=${postId}`).then(
    (res) => res.json()
  )
}

export const createPostTags = (tag) => {
  return fetch(`http://localhost:9999/post_tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  })
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

export const createTag = (tag) => {
  return fetch("http://localhost:9999/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  })
}

export const deleteTag = (tagId) => {
  return fetch(`http://localhost:9999/tags/${tagId}`, {
    method: "DELETE",
  })
}

export const deletePostTagsByIds = (postTagId) => {
  return fetch(`http://localhost:9999/post_tags_delete/${postTagId}`, {
    method: "DELETE",
  })
}
