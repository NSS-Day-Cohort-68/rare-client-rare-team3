import { useEffect, useState } from "react"
import {
  getAllTags,
  createPostTags,
  getPostTagsByPostId,
} from "../../services/tagService"
import { useParams } from "react-router-dom"

export const PostTags = ({ currentUser, post }) => {
  const [tags, setTags] = useState([])
  const [postTags, setPostTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [showTagManagement, setShowTagManagement] = useState(false)

  const { postId } = useParams()

  useEffect(() => {
    getAllTags().then((res) => {
      setTags(res)
    })
  }, [])

  useEffect(() => {
    getPostTagsByPostId(postId).then((res) => {
      setPostTags(res)
    })
  }, [postId])

  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((id) => id !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleToggleTagManagement = () => {
    setShowTagManagement(!showTagManagement)
  }

  const handleSave = () => {
    // Check if there are selected tags
    if (selectedTags.length > 0) {
      // Filter out the selected tags that are already existing post tags
      const newTags = selectedTags.filter((st) => {
        return !postTags.some((pt) => pt.tag_id === st.id)
      })

      // Only create new post tags if there are selected tags that are not already existing
      if (newTags.length > 0) {
        const postTagsToCreate = newTags.map((st) => ({
          post_id: postId,
          tag_id: st.id,
        }))

        createPostTags(postTagsToCreate).then(() => {
          // After creating new post tags, fetch updated post tags
          getPostTagsByPostId(postId).then((res) => {
            setPostTags(res)
          })
        })
      }
    }

    setShowTagManagement(!showTagManagement)
  }

  return (
    <div>
      {/* Render "Manage Tags" button only if the current user wrote the post*/}
      {currentUser.token === post.user_id && !showTagManagement && (
        <div>
          <button onClick={handleToggleTagManagement}>Manage Tags</button>
        </div>
      )}

      {!showTagManagement && (
        <div>
          {/* Check if post tags array is not empty before mapping */}
          {postTags.length > 0 &&
            postTags.map((pt) => <div key={pt.id}>{pt.tag.label}</div>)}
        </div>
      )}

      {/* Show below when user clicks the manage tags button*/}
      {showTagManagement && (
        <div>
          {tags.map((t) => (
            <div key={t.id}>
              <label>
                <input
                  type="checkbox"
                  name="tags"
                  value={t}
                  checked={selectedTags.includes(t)}
                  onChange={() => handleTagSelection(t)}
                />
                {t.label}
              </label>
            </div>
          ))}
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  )
}
