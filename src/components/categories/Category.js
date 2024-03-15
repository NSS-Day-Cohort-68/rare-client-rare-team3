import { Link } from "react-router-dom"
import "./Category.css"
import {
  deleteCategory,
  editCategory,
} from "../../services/categoriesService.js"
import { useEffect, useState } from "react"

export const Category = ({ category, getAndSetAllCategories }) => {
  const [newLabel, setNewLabel] = useState("")

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
      setNewLabel(categoryPrompt)
    }
  }

  useEffect(() => {
    if (newLabel !== "") {
      const editedCategory = {
        id: category.id,
        label: newLabel,
      }

      editCategory(editedCategory).then(() => {
        getAndSetAllCategories()
      })
    }
  }, [newLabel])

  return (
    <div className="category">
      <button className="category-settings" onClick={handleEditCategory}>
        <i className="fa-solid fa-gear"></i>
      </button>
      <button className="category-delete" onClick={handleDeleteCategory}>
        <i className="fa-solid fa-trash-can"></i>
      </button>
      <Link>
        <ul className="category-name-link">{category.label}</ul>
      </Link>
    </div>
  )
}
