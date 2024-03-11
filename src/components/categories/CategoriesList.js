import { useEffect, useState } from "react"
import { getAllCategories } from "../../services/categoriesService.js"

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

  return <>Categories List</>
}
