import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../services/userService.js"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [test, setTest] = useState({})

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    loginUser(email).then((res) => {
      setTest(res.json())
    })
  }

  return (
    <main>
      <section>
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
            <button onClick={handleLogin}>BUTTON</button>
          </div>
        </form>
      </section>
    </main>
  )
}
