import { Link } from "react-router-dom"
import "./Tag.css"
import { useEffect, useState } from "react"
import { editTag } from "../../services/tagService.js"

export const Tag = ({ tag, getAndSetAllTags }) => {
  const [newLabel, setNewLabel] = useState("")

  const handleEditTag = () => {
    const tagPrompt = window.prompt("Edit this tag", `${tag.label}`)

    if (tagPrompt !== null) {
      setNewLabel(tagPrompt)
    }
  }

  useEffect(() => {
    if (newLabel !== "") {
      const editedTag = {
        id: tag.id,
        label: newLabel,
      }

      editTag(editedTag).then(() => {
        getAndSetAllTags()
      })
    }
  }, [newLabel])

  return (
    <div className="tag">
      <button className="tag-settings" onClick={handleEditTag}>
        <i className="fa-solid fa-gear"></i>
      </button>
      <Link>
        <div>
          <ul>{tag.label}</ul>
        </div>
      </Link>
    </div>
  )
}
