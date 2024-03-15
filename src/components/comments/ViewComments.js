import { useEffect, useState } from "react";
import {
  deleteComment,
  getCommentByPostId,
} from "../../services/commentService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPostByPostId } from "../../services/postService";
import "./Comments.css";

export const ViewComments = ({ currentUser }) => {
  const [postComment, setPostComment] = useState([]);
  const [singlePost, setSinglePost] = useState({});
  const { postId } = useParams();

  const navigate = useNavigate();

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

  const handleDelete = (comment) => {
    // Display a confirmation before deleting the post
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (isConfirmed) {
      deleteComment(comment.id).then(() => {
        getCommentByPostId(postId).then((res) => {
          setPostComment(res);
        });
      });
    }
  };

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
            {/*the button below will only show on comments the current user made */}
            {currentUser.token === comment.author_id && (
              <button onClick={() => handleDelete(comment)}>
                <i className="fa-solid fa-trash-can"></i>
              </button>
            )}
            {currentUser.token === comment.author_id && (
              <button
                onClick={() => {
                  navigate(`/posts/${singlePost.id}/editComment/${comment.id}`);
                }}
              >
                Edit Comment
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
