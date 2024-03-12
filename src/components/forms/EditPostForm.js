import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPostByPostId, updatePost } from "../../services/postService"
import { getAllCategories } from "../../services/categoriesService"

export const EditPostForm = ({ currentUser }) => {
  const [post, setPost] = useState({})
  const [currentCategoryId, setCurrentCategoryId] = useState(null)
  const [categories, setCategories] = useState([])
  const { postId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getPostByPostId(postId).then((post) => {
      setPost(post)
      setCurrentCategoryId(post.category_id)
    })
    getAllCategories().then((categories) => {
      setCategories(categories)
    })
  }, [postId])

  const handleInputChange = (event) => {
    const stateCopy = { ...post }
    stateCopy[event.target.name] = event.target.value
    setPost(stateCopy)
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    const changedPostObj = { ...post, category_id: currentCategoryId }
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
        <label>Category:</label>
        <select
          name="category_id"
          value={currentCategoryId}
          onChange={handleInputChange}
        >
          <option value={null}>Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </fieldset>
      <fieldset>
        <label>Header Image Url:</label>
        <input
          type="text"
          name="image_url"
          value={post.image_url}
          onChange={handleInputChange}
        ></input>
      </fieldset>
    </form>
  )
}
