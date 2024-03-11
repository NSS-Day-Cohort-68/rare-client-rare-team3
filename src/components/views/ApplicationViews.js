import { Routes, Route, Outlet } from "react-router-dom";
import { Welcome } from "../Welcome/Welcome";
import { MyPosts } from "../posts/MyPosts";
import { useEffect, useState } from "react";
import { NavBar } from "../../nav/Navbar";
import { AllPostsList } from "../posts/AllPostsList"

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
          <Route index element={<AllPostsList />} />
        </Route>
        <Route path="myPosts" element={<MyPosts currentUser={currentUser} />} />
      </Route>
    </Routes>
  );
};
