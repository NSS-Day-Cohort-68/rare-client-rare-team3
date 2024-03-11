import { useEffect, useState } from "react"
import { getAllCategories } from "../../services/categoriesService.js"
import { Category } from "./Category.js"

export const CategoriesList = () => {
  const [allCategories, setAllCategories] = useState([])

  useEffect(() => {
    getAndSetAllCategories()
  }, [])

  const getAndSetAllCategories = () => {
    getAllCategories().then((categories) => {
      setAllCategories(categories)
    })
  }

  return (
    <div className="categories-container">
      <h2>Categories</h2>
      <article>
        {allCategories.map((category) => {
          return <Category category={category} key={category.id} />
        })}
      </article>
    </div>
  )
}
