import { Routes, Route, Outlet } from "react-router-dom";
import { Welcome } from "../Welcome/Welcome";
import { MyPosts } from "../posts/MyPosts";
import { useEffect, useState } from "react";
import { NavBar } from "../../nav/Navbar";
import { AllPostsList } from "../posts/AllPostsList";
import { PostForm } from "../forms/PostForm";
import { CategoriesList } from "../categories/CategoriesList.js";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localRareUser = localStorage.getItem("rare_user");
    const rareUserObject = JSON.parse(localRareUser);

    setCurrentUser(rareUserObject);
  }, []);

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
        </Route>
        <Route path="myPosts" element={<MyPosts currentUser={currentUser} />} />
        <Route
          path="newPost"
          element={<PostForm currentUser={currentUser} />}
        />
        <Route path="categories" element={<CategoriesList />} />
      </Route>
    </Routes>
  );
};
