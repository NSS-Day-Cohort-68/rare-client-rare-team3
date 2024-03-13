import { Routes, Route, Outlet } from "react-router-dom"
import { Welcome } from "../Welcome/Welcome"
import { MyPosts } from "../posts/MyPosts"
import { useEffect, useState } from "react"
import { NavBar } from "../nav/Navbar"
import { AllPostsList } from "../posts/AllPostsList"
import { CategoriesList } from "../categories/CategoriesList.js"
import { PostDetails } from "../posts/PostDetails"
import { NewCategory } from "../categories/NewCategory.js"
import { PostForm } from "../forms/PostForm.js"
import { EditPostForm } from "../forms/EditPostForm.js"
import { TagsList } from "../tags/TagsList.js"
import { TagForm } from "../forms/TagForm.js"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localRareUser = localStorage.getItem("rare_user")
    const rareUserObject = JSON.parse(localRareUser)

    setCurrentUser(rareUserObject)
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="posts">
          <Route index element={<AllPostsList currentUser={currentUser} />} />
          <Route path=":postId" element={<PostDetails />} />
        </Route>
        <Route path="myPosts" element={<MyPosts currentUser={currentUser} />} />
        <Route
          path="newPost"
          element={<PostForm currentUser={currentUser} />}
        />
        <Route path="categories" element={<CategoriesList />} />
        <Route path="newCategory" element={<NewCategory />} />
        <Route path="tags" element={<TagsList />} />
        <Route path="newTag" element={<TagForm />} />
        <Route
          path="edit/:postId"
          element={<EditPostForm currentUser={currentUser} />}
        ></Route>
      </Route>
    </Routes>
  )
}
