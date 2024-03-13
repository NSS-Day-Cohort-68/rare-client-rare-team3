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
      <h2 className="tag">Tags</h2>
      <button
        onClick={() => {
          navigate("/newTag")
        }}
      >
        Create Category
      </button>
      <article>
        {allTags.map((tag) => {
          return (
            <Tag tag={tag} getAndSetAllTags={getAndSetAllTags} key={tag.id} />
          )
        })}
      </article>
    </div>
  )
}
