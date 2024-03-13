import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { getPostByPostId } from "../../services/postService"
import "./AllPostsList.css"
import { PostTags } from "../tags/PostTags"

export const PostDetails = ({ currentUser }) => {
  const [post, setPost] = useState({})
  const { postId } = useParams()

  const getAndSetPosts = () => {
    getPostByPostId(postId).then((data) => setPost(data))
  }

  useEffect(() => {
    getAndSetPosts()
  }, [postId])

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

  return (
    <section className="posts-container">
      <div className="post-block">
        <header>
          <h1>{post.title}</h1>
          <div className="tags-container">
            <PostTags post={post} currentUser={currentUser} />
          </div>
        </header>
        <div>By: {post.user?.username}</div>
        <div>
          <h4>{post.content}</h4>
        </div>
        <div>{formatDate(post.publication_date)}</div>
        <div>
          <Link to={"/add_a_comment"}>
            <button>Add a Comment</button>
          </Link>
        </div>
      </div>
    </section>
  )
}
