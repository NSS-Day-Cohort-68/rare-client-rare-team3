import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditPostForm = ({ currentUser }) => {
  const [post, setPost] = useEffect({})
  const { postId } = useParams()
  const navigate = useNavigate()
}
