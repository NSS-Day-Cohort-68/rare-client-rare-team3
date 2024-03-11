import { Routes, Route, Outlet } from "react-router-dom"
import { Welcome } from "../Welcome/Welcome"
import { AllPostsList } from "../posts/AllPostsList"

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={<AllPostsList />}></Route>
    </Routes>
  )
}
