import { useEffect, useState } from "react";
import {
  createCategory,
  getAllCategories,
} from "../../services/categoriesService";
import { useNavigate } from "react-router-dom";

export const NewCategory = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [label, setLabel] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAndSetAllCategories();
  }, []);

  const getAndSetAllCategories = () => {
    getAllCategories().then((categories) => {
      setAllCategories(categories);
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const category = {
      label: label,
    };

    createCategory(category).then(navigate("/categories"));
  };

  return (
    <div>
      <fieldset>
        <div className="form-group">
          <label>Label</label>
          <input
            type="text"
            value={label}
            placeholder="Enter name of category..."
            onChange={(event) => {
              setLabel(event.target.value);
            }}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <button onClick={handleCreate}>Save</button>
    </div>
  );
};
