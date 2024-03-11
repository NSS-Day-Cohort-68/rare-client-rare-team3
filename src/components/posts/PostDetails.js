import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostByPostId } from "../../services/postService";
import "./AllPostsList.css";

export const PostDetails = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();

  const getAndSetPosts = () => {
    getPostByPostId(postId).then((data) => setPost(data));
  };

  useEffect(() => {
    getAndSetPosts();
  }, [postId]);

  return (
    <section className="posts-container">
      <div className="post-block">
        <header>
          <h1>{post.title}</h1>
        </header>
        <div>
          <h4>{post.content}</h4>
        </div>
        <div>{post.publication_date}</div>
      </div>
    </section>
  );
};
