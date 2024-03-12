import { Link } from "react-router-dom"
import "./Category.css"
import { deleteCategory } from "../../services/categoriesService.js"

export const Category = ({ category, getAndSetAllCategories }) => {
  const handleDeleteCategory = () => {
    getAndSetAllCategories()

    const confirmDelete = window.confirm(
      `Are you sure you want to\ndelete this category?`
    )

    if (confirmDelete) {
      deleteCategory(category.id).then(() => {
        getAndSetAllCategories()
      })
    } else {
      return null
    }
  }

  return (
    <div className="category">
      <button className="category-settings">
        <i className="fa-solid fa-gear"></i>
      </button>
      <button
        className="category-delete"
        value={category.id}
        onClick={handleDeleteCategory}
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
      <Link>
        <div className="category-name-link">{category.label}</div>
      </Link>
    </div>
  )
}
