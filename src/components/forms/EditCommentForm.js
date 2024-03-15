import { useEffect, useState } from "react";
import { getCommentsById, updateComment } from "../../services/commentService";
import { useNavigate, useParams } from "react-router-dom";
import { getPostByPostId } from "../../services/postService";

export const EditCommentForm = () => {
  const [comment, setComment] = useState({});
  const [post, setPost] = useState({});

  const navigate = useNavigate();

  const { postId } = useParams();
  const { commentId } = useParams();

  useEffect(() => {
    getPostByPostId(postId).then((post) => {
      setPost(post);
    });
  }, [postId]);

  useEffect(() => {
    getCommentsById(commentId).then((data) => {
      setComment(data);
      console.log(commentId);
    });
  }, [commentId]);

  const handleSave = (event) => {
    event.preventDefault();

    const editComment = {
      id: comment.id,
      content: comment.content,
    };

    updateComment(editComment).then(() => {
      navigate(`/posts/${post.id}/comments`);
    });
  };

  return (
    <form>
      <h1>Edit Comment</h1>
      <div>
        <fieldset>
          <label>Content Body:</label>
          <textarea
            type="text"
            name="content"
            value={comment.content}
            style={{
              height: "150px",
              width: "400px",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              verticalAlign: "top",
              lineHeight: "normal",
              textAlign: "start",
              margin: "5px",
            }}
            onChange={(event) => {
              const copy = { ...comment };
              copy.content = event.target.value;
              setComment(copy);
            }}
          ></textarea>

          <div>
            <button onClick={handleSave}>Save</button>
            <button
              onClick={() => {
                navigate(`/posts/${post.id}/comments`);
              }}
            >
              Cancel
            </button>
          </div>
        </fieldset>
      </div>
    </form>
  );
};
