import { Routes, Route, Outlet } from "react-router-dom"
import { Welcome } from "../Welcome/Welcome"
import { NavBar } from "../nav/Navbar"
import { AllPostsList } from "../posts/AllPostsList"
import { PostDetails } from "../posts/PostDetails"

export const ApplicationViews = () => {
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
          <Route index element={<AllPostsList />} />
          <Route path=":postId" element={<PostDetails />}  />
        </Route>
      </Route>
    </Routes>
  )
}
