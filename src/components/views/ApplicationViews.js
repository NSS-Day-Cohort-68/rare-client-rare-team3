import { Routes, Route, Outlet } from "react-router-dom"
import { Welcome } from "../Welcome/Welcome"
import { NavBar } from "../../nav/Navbar"

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
        }>
        <Route index element={<Welcome />} />
      </Route>
    </Routes>
  )
}
