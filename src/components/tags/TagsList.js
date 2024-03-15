import { useEffect, useState } from "react"
import { getAllTags } from "../../services/tagService"
import { Tag } from "./Tag"
import "./Tag.css"
import { useNavigate } from "react-router-dom"

export const TagsList = () => {
  const [allTags, setAllTags] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getAndSetAllTags()
  }, [])

  const getAndSetAllTags = () => {
    getAllTags().then((tags) => {
      setAllTags(tags)
    })
  }

  return (
    <div>
      <h1>Tags</h1>
      <button
        onClick={() => {
          navigate("/newTag")
        }}
      >
        Create Tag
      </button>
      <article>
        {allTags
          .slice()
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((tag) => {
            return (
              <Tag tag={tag} getAndSetAllTags={getAndSetAllTags} key={tag.id} />
            )
          })}
      </article>
    </div>
  )
}
