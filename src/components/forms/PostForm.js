import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoryService";
import { createPost } from "../../services/postService";

export const PostForm = ({ currentUser }) => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [content, setContent] = useState("");
  const [chosenCatId, setChosenCatId] = useState(0);

  useEffect(() => {
    getAllCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  const handleSaveClick = () => {
    // Check if all required fields are filled in or selected. Display error message if not
    if (!title || !content || chosenCatId === 0) {
      alert("Please enter a title, article content, and select a category.");
      return;
    }

    const post = {
      user_id: currentUser.token,
      category_id: chosenCatId,
      title: title,
      publication_date: null,
      image_url: imageURL || null,
      content: content,
      approved: null,
    };

    createPost(post).then((res) => {
      //Add navigation to the post details page of the created post
      //Like this navigate(`/posts/${res.id}`)
    });
  };

  return (
    <form className="post">
      <h1 className="form-header">New Post</h1>
      <fieldset>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            onChange={(event) => {
              setImageURL(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Article content"
            required
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
        </div>
        <div>
          <select
            id="category"
            required
            onChange={(event) => {
              setChosenCatId(parseInt(event.target.value));
            }}
          >
            <option value="0">Add a category...</option>
            {categories.map((cat) => {
              return (
                <option value={cat.id} key={cat.id}>
                  {cat.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <button className="form-btn" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      </fieldset>
    </form>
  );
};
