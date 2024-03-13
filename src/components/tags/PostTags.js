import { useEffect, useState } from "react";
import { getAllTags } from "../../services/tagsService";

export const PostTags = ({ post }) => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagManagement, setShowTagManagement] = useState(false);

  useEffect(() => {
    getAllTags().then((res) => {
      setTags(res);
    });
  }, []);

  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((id) => id !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleToggleTagManagement = () => {
    setShowTagManagement(!showTagManagement);
  };

  const handleSave = () => {
    setShowTagManagement(!showTagManagement);
  };

  return (
    <div>
      {!showTagManagement && (
        <div>
          <button onClick={handleToggleTagManagement}>Manage Tags</button>
          <div>my tags</div>
        </div>
      )}

      {showTagManagement && (
        <div>
          {tags.map((t) => (
            <div key={t.id}>
              <label>
                <input
                  type="checkbox"
                  name="tags"
                  value={t.id}
                  checked={selectedTags.includes(t.id)}
                  onChange={() => handleTagSelection(t.id)}
                />
                {t.label}
              </label>
            </div>
          ))}
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};
