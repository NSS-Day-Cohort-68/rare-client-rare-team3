import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPostByPostId, updatePost } from "../../services/postService"
import { getAllCategories } from "../../services/categoriesService"

export const EditPostForm = () => {
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
    // Extract the name and value properties from the event target
    const { name, value } = event.target

    // Check if the changed input is the category dropdown
    if (name === "category_id") {
      // Update the currentCategoryId state with the new value
      setCurrentCategoryId(Number(value))
    } else {
      // For other input fields (title, content, image_url), update the post state
      setPost((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }
  // This function is triggered when the user clicks the "Save" button in the form.
  const handleUpdate = (event) => {
    // Prevent the default form submission behavior, which would cause a page reload.
    event.preventDefault()
    // Create a new object by spreading the properties of the current 'post' object.
    // Update the 'category_id' property with the 'currentCategoryId'.
    const changedPostObj = { ...post, category_id: currentCategoryId }
    // Call the 'updatePost' function, passing the modified post object.
    // The 'updatePost' function sends a PUT request to update the post on the server.
    // After the request is complete, it returns a promise.
    updatePost(changedPostObj)
      // Once the update is successful, navigate to the post details page for the updated post.
      .then(() => getPostByPostId(postId))
      .then((updatedPost) => {
        navigate(`/posts/${updatedPost.id}`)
      })
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
          style={{
            height: "150px",
            width: "400px",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            verticalAlign: "top",
            lineHeight: "normal",
            textAlign: "start",
            margin: "5px",
          }}
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
      <button onClick={handleUpdate}>Save</button>
      <button
        onClick={() => {
          navigate(`/myPosts`)
        }}
      >
        Cancel
      </button>
    </form>
  )
}
