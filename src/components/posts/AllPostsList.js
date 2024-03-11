import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/postService"
import "./AllPostsList.css"

export const AllPostsList = () => {
  const [allPosts, setAllPosts] = useState([])

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
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-block">
            <h1><Link to="posts/postId">Title: {post.title}</Link></h1>
            <h2>Category: {post.category.label}</h2>
            <h2>
              Author: {post.user.first_name} {post.user.last_name}
            </h2>
            <h2>Publication Date: {post.publication_date}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}
