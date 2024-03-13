

export const getAllTags = () => {
    return fetch(`http://localhost:9999/tags`).then((res) => res.json())
}