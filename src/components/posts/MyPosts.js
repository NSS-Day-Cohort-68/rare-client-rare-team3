import { useEffect, useState } from "react"
import { deletePost, getPostsByUserToken } from "../../services/postService"
import { Link, useNavigate } from "react-router-dom"

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
  }, [currentUser]);

  const handleDelete = (post) => {
    // Display a confirmation before deleting the post
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (isConfirmed) {
      deletePost(post.id).then(() => {
        getPostsByUserToken(currentUser.token).then((res) => {
          const sortedPosts = res.sort(
            (a, b) =>
              new Date(b.publication_date) - new Date(a.publication_date)
          );
          setPosts(sortedPosts);
        });
      });
    }
  };

  return (
    <div>
      <h1>My Posts</h1>
      <div className="posts-container">
        {posts.map((post) => {
          return (
            <div key={post.id} className="post-block">
              <h2>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>{" "}
              </h2>
              <button onClick={() => {
                navigate(`comments/${post.id}`)
              }}> View Comments </button>
              <p>Category: {post.category.label}</p>
              <p>
                Author: {post.user.first_name} {post.user.last_name}
              </p>
              <p>Date: {formatDate(post.publication_date)}</p>
              <button onClick={() => handleDelete(post)}>
                <i className="fa-solid fa-trash-can"></i>
              </button>
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
