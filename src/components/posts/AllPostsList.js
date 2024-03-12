import { useEffect, useState } from "react"
import { deletePost, getAllPosts } from "../../services/postService"
import { Link } from "react-router-dom"
import "./AllPostsList.css"

export const AllPostsList = ({ currentUser }) => {
  const [allPosts, setAllPosts] = useState([])

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

  const getAndSetPosts = () => {
    getAllPosts().then((postsArray) => {
      setAllPosts(postsArray)
    })
  }

  useEffect(() => {
    getAndSetPosts()
  }, [])

  let filteredPosts = allPosts

  if (filteredPosts) {
    filteredPosts = filteredPosts
      .filter((post) => post.approved === 1)
      .sort(
        (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
      )
  }

  const handleDelete = (post) => {
    // Display a confirmation before deleting the post
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    )

    if (isConfirmed) {
      deletePost(post.id).then(() => {
        getAllPosts().then((res) => {
          setAllPosts(res)
        })
      })
    }
  }

  return (
    <div>
      <h1>All Posts</h1>
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-block">
            <h2>
              <Link to={`/posts/${post.id}`}>Title: {post.title}</Link>
            </h2>
            <p>Category: {post.category.label}</p>
            <p>
              Author: {post.user.first_name} {post.user.last_name}
            </p>
            <p>Date: {formatDate(post.publication_date)}</p>
            {currentUser.token === post.user_id ? (
              <button onClick={() => handleDelete(post)}>
                <i className="fa-solid fa-trash-can"></i>
              </button>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
