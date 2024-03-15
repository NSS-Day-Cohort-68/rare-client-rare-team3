import { useEffect, useState } from "react";
import { createTag, getAllTags } from "../../services/tagService";
import { useNavigate } from "react-router-dom";

export const TagForm = () => {
  const [allTags, setAllTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const navigate = useNavigate();

  const getAndSetAllTags = () => {
    getAllTags().then((tags) => {
      setAllTags(tags);
    });
  };

  useEffect(() => {
    getAndSetAllTags();
  }, []);

  const handleCreateNewTag = (event) => {
    event.preventDefault();
    const tag = { label: newTag };
    createTag(tag).then(navigate(`/tags`));
  };

  return (
    <div>
      <form>
        <h1>New Tag</h1>
        <fieldset>
          <label>Create New Tag</label>
          <input
            type="text"
            value={newTag}
            placeholder="Enter name of Tag..."
            required
            onChange={(event) => {
              setNewTag(event.target.value);
            }}
          ></input>
        </fieldset>
        <button onClick={handleCreateNewTag}>Save</button>
      </form>
    </div>
  );
};
