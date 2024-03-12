import { useEffect, useState } from "react"
import { getPostsByUserToken } from "../../services/postService"
import { useNavigate } from "react-router-dom"

export const MyPosts = ({ currentUser }) => {
  const [posts, setPosts] = useState([])

  const navigate = useNavigate()

  // Function to format date string to a readable format
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    }
    return new Date(date).toLocaleDateString("en-US", options)
  }

  useEffect(() => {
    // Check if currentUser.token is defined before making the fetch request
    if (currentUser && currentUser.token) {
      getPostsByUserToken(currentUser.token).then((res) => {
        const sortedPosts = res.sort(
          (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
        )
        setPosts(sortedPosts)
      })
    }
  }, [currentUser])

  return (
    <div>
      <h1>My Posts</h1>
      <div className="posts-container">
        {posts.map((post) => {
          return (
            <div key={post.id} className="post-block">
              <h2>{post.title}</h2>
              <p>Category: {post.category.label}</p>
              <p>
                Author: {post.user.first_name} {post.user.last_name}
              </p>
              <p>Date: {formatDate(post.publication_date)}</p>
              <div className="buttons">
                <button
                  className="btn-edit"
                  onClick={() => {
                    navigate(`/edit/${post.id}`)
                  }}
                >
                  ⚙️
                </button>
                <button>🗑</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
