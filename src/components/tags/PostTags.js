import { useEffect, useState } from "react"
import {
  getAllTags,
  createPostTags,
  getPostTagsByPostId,
  deletePostTagsByIds,
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
    getPostTagsByPostId(postId).then((res) => {
      setPostTags(res)
      setSelectedTags(res.map((pt) => pt.tag_id)) // Extract tag IDs and set as selectedTags
    })
  }, [postId])

  const handleTagSelection = (tagId) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tagId)) {
        return prevSelectedTags.filter((id) => id !== tagId)
      } else {
        return [...prevSelectedTags, tagId]
      }
    })
  }

  const handleToggleTagManagement = () => {
    setShowTagManagement(!showTagManagement)
  }

  const handleSave = () => {
    // Check if there are selected tags
    if (selectedTags.length > 0) {
      // Filter out the selected tags that are already existing post tags
      const newTags = selectedTags.filter((st) => {
        return !postTags.some((pt) => pt.tag_id === st)
      })

      // Only create new post tags if there are selected tags that are not already existing
      if (newTags.length > 0) {
        const postTagsToCreate = newTags.map((st) => ({
          post_id: postId,
          tag_id: st,
        }))

        createPostTags(postTagsToCreate).then(() => {
          // After creating new post tags, fetch updated post tags
          getPostTagsByPostId(postId).then((res) => {
            setPostTags(res)
            // Extract tag IDs from postTags and set them as selectedTags
            const tagIds = res.map((pt) => pt.tag_id)
            setSelectedTags(tagIds)
          })
        })
      }
    }

    // Filter out the deselected tags that were previously associated with the post
    const removedTags = postTags.filter(
      (pt) => !selectedTags.includes(pt.tag_id)
    )

    // If there are removed tags, delete them from the database
    if (removedTags.length > 0) {
      const removedTagIds = removedTags.map((rt) => rt.id)
      console.log(removedTags)
      removedTagIds.map((tag) => {
        deletePostTagsByIds(tag).then(() => {
          // After deleting removed tags, fetch updated post tags
          getPostTagsByPostId(postId).then((res) => {
            setPostTags(res)
            // Extract tag IDs from postTags and set them as selectedTags
            const tagIds = res.map((pt) => pt.tag_id)
            setSelectedTags(tagIds)
          })
        })
      })
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
                  value={t.id}
                  checked={selectedTags.includes(t.id)}
                  onChange={() => handleTagSelection(t.id)}
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
