import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoryService";

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
            required
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
          <button className="form-btn">Save</button>
        </div>
      </fieldset>
    </form>
  );
};
