import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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
        <form className="login-form">
          <div className="form-div">
            <fieldset>
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  placeholder="email address"
                  required
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </fieldset>
            <fieldset>
              <div for-group>
                <button onClick={handleLogin}>BUTTON</button>
              </div>
            </fieldset>
            <div className="register-link">
              <Link to="/register">Not a member yet?</Link>
            </div>
          </div>
        </form>
      </section>
    </main>
  )
}
