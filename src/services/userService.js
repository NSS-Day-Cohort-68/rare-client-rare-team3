export const loginUser = (email) => {
  return fetch(`http://localhost:9999/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  })
}
