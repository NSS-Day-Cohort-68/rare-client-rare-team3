import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPostById, updatePost } from "../../services/postService"

export const EditPostForm = ({ currentUser }) => {
  const [post, setPost] = useEffect({})
  const { postId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getPostById(postId).then((post) => {
      setPost(post)
    })
  }, [postId])

  const handleInputChange = (event) => {
    const stateCopy = { ...post }
    stateCopy[event.target.name] = event.target.value
    setPost(stateCopy)
  }

  const handleUpdate = (event) => {
    const changedPostObj = structuredClone(post)
    updatePost(changedPostObj)
  }

  return (
    <form>
      <fieldset>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleInputChange}
        ></input>
      </fieldset>
      <fieldset>
        <label>Content Body:</label>
        <textarea
          type="text"
          name="content"
          value={post.content}
          onChange={handleInputChange}
        ></textarea>
      </fieldset>
      <fieldset>
        <label></label>
      </fieldset>
    </form>
  )
}
