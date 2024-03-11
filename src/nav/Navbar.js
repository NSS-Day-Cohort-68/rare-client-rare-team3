import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <ul className="navbar">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/posts">All Posts</Link>
        </li>
        <li className="navbar-item">
          <Link to="/myPosts">My Posts</Link>
        </li>

        {localStorage.getItem("rare_user") ? (
          <li className="navbar-item navbar-logout">
            <Link
              className="navbar-link"
              to=""
              onClick={() => {
                localStorage.removeItem("rare_user");
                navigate("/", { replace: true });
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
  );
};
