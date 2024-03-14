import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Navbar.css"

export const NavBar = () => {
  const navigate = useNavigate()

  const toggleNavbar = () => {
    const navbarCollapse = document.getElementById("navbar-collapse")
    navbarCollapse.classList.toggle("show")
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-toggler-container">
          <button className="navbar-toggler" onClick={toggleNavbar}>
            <i className="fa-solid fa-bars"> R a r e</i>
          </button>
        </div>
        <div className="navbar-collapse" id="navbar-collapse">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/posts">All Posts</Link>
            </li>
            <li className="navbar-item">
              <Link to="/myPosts">My Posts</Link>
            </li>
            <li className="navbar-item">
              <Link to="/newPost">New Post</Link>
            </li>
            <li className="navbar-item">
              <Link to="/categories">Categories</Link>
            </li>
            <li className="navbar-item">
              <Link to="/tags">Tags </Link>
            </li>
            {localStorage.getItem("rare_user") ? (
              <li className="navbar-item navbar-logout">
                <Link
                  className="navbar-link"
                  to=""
                  onClick={() => {
                    localStorage.removeItem("rare_user")
                    navigate("/", { replace: true })
                  }}
                >
                  Logout
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
