import { Link } from "react-router-dom"
import "./Category.css"
import { deleteCategory } from "../../services/categoriesService.js"
import { useState } from "react"

export const Category = ({ category, getAndSetAllCategories }) => {
  const [prompt, setPrompt] = useState(category.label)
  const [newCategoryLabel, setNewCategoryLabel] = useState(category.label)

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

  const testWindowPrompt = () => {
    const windowPrompt = window.prompt(
      "This is a test prompt",
      `${category.label}`
    )

    if (windowPrompt !== null) {
      console.log("User entered: " + windowPrompt)
      setPrompt(windowPrompt)
    } else {
      console.log("User clicked Cancel")
    }
  }

  return (
    <div className="category">
      <button
        className="category-settings"
        value={category.id}
        onClick={testWindowPrompt}
      >
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
