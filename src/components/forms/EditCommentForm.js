import { useEffect, useState } from "react";
import { getCommentByPostId } from "../../services/commentService";

export const EditCommentForm = () => {
  const [comment, setComment] = useState({});
  const [content, setContent] = useState("");

  useEffect(() => {
    getCommentByPostId()
  })

  return (
    <fieldset>
      <label>Content Body:</label>
      <textarea
        type="text"
        name="content"
        value={post.content}
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
        onChange={handleInputChange}
      ></textarea>
    </fieldset>
  );
};
