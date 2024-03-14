import { useEffect, useState } from "react";
import { getCommentByPostId } from "../../services/commentService";
import { useParams } from "react-router-dom";
import { getPostByPostId } from "../../services/postService";
import "./Comments.css";

export const PostComments = () => {
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
    <div>
      <h2>Comments</h2>

      {postComment.map((comment) => {
        return (
          <div key={comment.id} className="comment">
            <div className="comment-block">{singlePost.category?.label}</div>
            <div>{comment.content}</div>
            <div>
              - {comment.author?.first_name} {comment.author?.last_name}
            </div>
            {/* <div>{comment.creation_date}</div> */}
          </div>
        );
      })}
    </div>
  );
};
