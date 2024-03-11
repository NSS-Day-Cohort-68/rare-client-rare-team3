export const loginUser = (email) => {
  return fetch(`http://localhost:9999/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then((res) => res.json())
}

export const createUser = (user) => {
  return fetch(`http://localhost:9999/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

export const getUserByToken = (token) => {
  return fetch(`http://localhost:9999/users/${token}`).then((res) => res.json())
}

export const getUserByEmail = (email) => {
  return fetch(`http://localhost:9999/users?email=${email}`).then((res) =>
    res.json()
  )
}
