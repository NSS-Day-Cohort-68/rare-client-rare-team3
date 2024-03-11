import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/postService"
import "./AllPostsList.css"

export const AllPostsList = () => {
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

  return (
    <div>
      <h1>All Posts</h1>
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-block">
            <h2>Title: {post.title}</h2>
            <p>Category: {post.category.label}</p>
            <p>
              Author: {post.user.first_name} {post.user.last_name}
            </p>
            <p>Date: {formatDate(post.publication_date)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
