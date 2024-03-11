import { Link } from "react-router-dom"
import "./Category.css"

const handleEditCategory = () => {}

const handleDeleteCategory = () => {}

export const Category = ({ category }) => {
  return (
    <div className="category" value>
      <button className="category-settings">
        <i class="fa-solid fa-gear"></i>
      </button>
      <button className="category-delete">
        <i class="fa-solid fa-trash-can"></i>
      </button>
      <Link>
        <div className="category-name-link">{category.label}</div>
      </Link>
    </div>
  )
}
