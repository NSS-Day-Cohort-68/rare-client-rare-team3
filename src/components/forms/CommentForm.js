import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createComment, getComments } from "../../services/commentService.js"

export const CommentForm = ({ currentUser }) => {
  const [commentText, setCommentText] = useState("")

  const { postId } = useParams()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const newComment = {
      post_id: postId,
      author_id: currentUser.token,
      content: commentText,
    }

    createComment(newComment).then(() => navigate(`/posts/${postId}/comments`))
  }

  return (
    <div className="add-comment-form-container">
      <form className="add-comment-form" onSubmit={handleSubmit}>
        <header>Add a Comment...</header>
        <fieldset>
          <textarea
            className="comment-textarea"
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value)
            }}
          ></textarea>
        </fieldset>
        <fieldset>
          <button type="submit" className="add-comment-btn">
            Save
          </button>
        </fieldset>
      </form>
    </div>
  )
}
