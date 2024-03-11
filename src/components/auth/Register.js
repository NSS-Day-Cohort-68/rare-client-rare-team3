import { useState } from "react"
import {
  createUser,
  getUserByEmail,
  getUserByToken,
} from "../../services/userService.js"
import { useNavigate } from "react-router-dom"

export const Register = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

  const navigate = useNavigate()

  const registerNewUser = () => {
    const user = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
    }
    createUser(user).then((createdUser) => {
      if (createdUser) {
        localStorage.setItem(
          "rare_user",
          JSON.stringify({
            token: createdUser.token,
          })
        )
        navigate("/")
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getUserByEmail(email).then((res) => {
      if (Object.keys(res).length !== 0) {
        window.alert("This email is associated to an existing account")
      } else {
        registerNewUser()
      }
    })
  }

  return (
    <main>
      <div>
        <form className="register-form" onSubmit={handleSubmit}>
          <div>
            <h1>RARE</h1>
            <h2>Please Register</h2>
          </div>
          <div className="first-name-div">
            <fieldset>
              <div className="form-group">
                <label>
                  First Name:{" "}
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    placeholder="First Name..."
                    required
                    autoFocus
                    spellCheck={false}
                    className="form-control"
                    onChange={(e) => {
                      setFirstName(e.target.value)
                    }}
                  />
                </label>
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group">
                <label>
                  Last Name:{" "}
                  <input
                    type="text"
                    id="firstName"
                    value={lastName}
                    placeholder="Last Name..."
                    required
                    autoFocus
                    spellCheck={false}
                    className="form-control"
                    onChange={(e) => {
                      setLastName(e.target.value)
                    }}
                  />
                </label>
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group">
                <label>
                  Username:{" "}
                  <input
                    type="text"
                    id="username"
                    value={username}
                    placeholder="Username..."
                    required
                    autoFocus
                    spellCheck={false}
                    className="form-control"
                    onChange={(e) => {
                      setUsername(e.target.value)
                    }}
                  />
                </label>
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group">
                <label>
                  Email:{" "}
                  <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Email Address..."
                    required
                    autoFocus
                    spellCheck={false}
                    className="form-control"
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </label>
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group">
                <button type="submit">Create Account</button>
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </main>
  )
}
