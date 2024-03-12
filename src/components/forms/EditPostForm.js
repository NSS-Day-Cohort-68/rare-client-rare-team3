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
}
