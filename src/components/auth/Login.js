import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../services/userService.js"

export const Login = () => {
  const [email, setEmail] = useState("")

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    loginUser(email).then((foundUser) => {
      if (foundUser.valid === true) {
        localStorage.setItem(
          "rare_user",
          JSON.stringify({
            token: foundUser.token,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid Login")
      }
    })
  }

  return (
    <main>
      <section>
        <h1>Login</h1>
        <form>
          <div>
            <input
              type="email"
              value={email}
              placeholder="email address"
              required
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleLogin}>Sign In</button>
          </div>
        </form>
      </section>
    </main>
  )
}
