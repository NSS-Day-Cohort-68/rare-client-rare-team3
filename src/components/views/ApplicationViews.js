import { Routes, Route, Outlet } from "react-router-dom"
import { Welcome } from "../Welcome/Welcome"

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />}></Route>
    </Routes>
  )
}
