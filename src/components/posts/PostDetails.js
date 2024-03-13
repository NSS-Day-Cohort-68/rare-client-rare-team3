import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { getPostByPostId } from "../../services/postService"
import "./AllPostsList.css"

export const PostDetails = () => {
  const [post, setPost] = useState({})
  const { postId } = useParams()

  const getAndSetPosts = () => {
    getPostByPostId(postId).then((data) => setPost(data))
  }

  useEffect(() => {
    getAndSetPosts()
  }, [postId])

  return (
    <section className="posts-container">
      <div className="post-block">
        <header>
          <h1>{post.title}</h1>
        </header>
        <div>By: {post.user?.username}</div>
        <div>
          <h4>{post.content}</h4>
        </div>
        <div>{post.publication_date}</div>
        <div>
          <Link to={"/add_a_comment"}>
            <button>Add a Comment</button>
          </Link>
        </div>
      </div>
    </section>
  )
}
