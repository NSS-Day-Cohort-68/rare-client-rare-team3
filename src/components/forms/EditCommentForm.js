import { useEffect, useState } from "react";
import { getCommentByPostId, updateComment } from "../../services/commentService";
import { useParams } from "react-router-dom";

export const EditCommentForm = () => {
  const [comment, setComment] = useState({});
  const [currentCategoryId, setCurrentCategoryId] = useState(null)
  const [categories, setCategories] = useState([])
  const [post, setPost] = useState({})
  const [content, setContent] = useState("");

  const {postId} = useParams()

  useEffect(() => {
    getPostByPostId(postId).then((post) => {
      setPost(post)
      setCurrentCategoryId(post.category_id)
    })
    getAllCategories().then((categories) => {
      setCategories(categories)
    })
  }, [postId])

  useEffect(() => {
    getCommentByPostId().then((data) => {
      setComment(data);
    });
  });

  const handleSave = (event) => {
    event.preventDefault();

    const editComment = {
      id: comment.id,
      post_id: comment.post_id,
      author_id: comment.author_id,
      content: comment.content,
      creation_datetime: comment.creation_datetime,
    };

    updateComment(editComment).then(() => {
      navigate(`/myPosts`);
    });
  };

  return (
    <div>
      <fieldset>
        <label>Subject:</label>
        <select
          name="category_id"
          value={currentCategoryId}
          onChange={handleInputChange}
        >
          <option value={null}>Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </fieldset>
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
      </fieldset>
      <button className="form-btn btn-primary" onClick={handleSave}>
        Save Comment
      </button>
    </div>
  );
};
