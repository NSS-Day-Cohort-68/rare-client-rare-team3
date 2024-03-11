import { useEffect, useState } from "react";
import { getPostsByUserToken } from "../../services/postService";

export const MyPosts = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);

    // Function to format date string to a readable format
    const formatDate = (date) => {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short",
      };
      return new Date(date).toLocaleDateString("en-US", options);
    };

  useEffect(() => {
    // Check if currentUser.token is defined before making the fetch request
    if (currentUser && currentUser.token) {
      getPostsByUserToken(currentUser.token).then((res) => {
        setPosts(res);
      });
    }
  }, [currentUser]);

  return (
    <div>
      <h1>My Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>
              Author: {post.user.first_name} {post.user.last_name}
            </p>
            <p>Category: {post.category.label}</p>
            <p>Date: {formatDate(post.publication_date)}</p>
          </div>
        );
      })}
    </div>
  );
};
