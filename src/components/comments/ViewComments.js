import { useEffect, useState } from "react";
import { getCommentByPostId } from "../../services/commentService";
import { Link, useParams } from "react-router-dom";
import { getPostByPostId } from "../../services/postService";
import "./Comments.css";

export const ViewComments = () => {
  const [postComment, setPostComment] = useState([]);
  const [singlePost, setSinglePost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    getPostByPostId(postId).then((data) => {
      setSinglePost(data);
    });
  }, [postId]);

  useEffect(() => {
    getCommentByPostId(postId).then((data) => {
      setPostComment(data);
    });
  }, [postId]);

  return (
    <div className="comments-container comment-block">
      <div>
        <h2>Comments</h2>
        <span>
          <Link to={`/posts/${singlePost.id}`}>Back to Post</Link>
        </span>
        <h3>{singlePost.title}</h3>
      </div>

      {postComment.map((comment) => {
        return (
          <div key={comment.id} className="comment-block">
            <div>{singlePost.category?.label}</div>
            <div>{comment.content}</div>
            <div>- {comment.author?.username}</div>
            <div>{comment.creation_datetime}</div>
          </div>
        );
      })}
    </div>
  );
};
