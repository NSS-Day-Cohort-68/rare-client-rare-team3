import { useEffect, useState } from "react";
import { deletePost, getAllPosts } from "../../services/postService";
import { Link } from "react-router-dom"
import "./AllPostsList.css";

export const AllPostsList = ({ currentUser }) => {
  const [allPosts, setAllPosts] = useState([]);

  const getAndSetPosts = () => {
    getAllPosts().then((postsArray) => {
      setAllPosts(postsArray);
    });
  };

  useEffect(() => {
    getAndSetPosts();
  }, []);

  let filteredPosts = allPosts;

  if (filteredPosts) {
    filteredPosts = filteredPosts
      .filter((post) => post.approved === 1)
      .sort(
        (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
      );
  }

  const handleDelete = (post) => {
    // Display a confirmation before deleting the post
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (isConfirmed) {
      deletePost(post.id).then(() => {
        getAllPosts().then((res) => {
          setAllPosts(res);
        });
      });
    }
  };

  return (
    <div>
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-block">
            <h1><Link to={`/posts/${post.id}`}>Title: {post.title}</Link></h1>
            <h2>Category: {post.category.label}</h2>
            <h2>
              Author: {post.user.first_name} {post.user.last_name}
            </h2>
            <h2>Publication Date: {post.publication_date}</h2>
            {currentUser.token === post.user_id ? (
              <button onClick={() => handleDelete(post)}>
                <i className="fa-solid fa-trash-can"></i>
              </button>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
