import { Link } from "react-router-dom"
import "./Category.css"
import {
  deleteCategory,
  editCategory,
} from "../../services/categoriesService.js"
import { useState } from "react"

export const Category = ({ category, getAndSetAllCategories }) => {
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

  const handleEditCategory = () => {
    getAndSetAllCategories()

    const categoryPrompt = window.prompt(
      "Edit this category",
      `${category.label}`
    )

    if (categoryPrompt !== null) {
      setNewCategoryLabel(categoryPrompt)
    }

    const editedCategory = {
      id: category.id,
      label: newCategoryLabel,
    }

    editCategory(editedCategory).then(() => {
      getAndSetAllCategories()
    })
  }

  return (
    <div className="category">
      <button
        className="category-settings"
        value={category.id}
        onClick={handleEditCategory}
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
