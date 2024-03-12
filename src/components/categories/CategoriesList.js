import { useEffect, useState } from "react"
import { getAllCategories } from "../../services/categoriesService.js"
import { Category } from "./Category.js"
import { useNavigate } from "react-router-dom"

export const CategoriesList = () => {
  const [allCategories, setAllCategories] = useState([])

  const navigate = useNavigate()

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
      <span><button onClick={() => {navigate("/newCategory")}}>Create Category</button></span>
      <article>
        {allCategories.map((category) => {
          return <Category category={category} key={category.id} />
        })}
      </article>
    </div>
  )
}
