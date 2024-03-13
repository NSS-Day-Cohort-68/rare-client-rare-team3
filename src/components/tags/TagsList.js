import { useEffect, useState } from "react";
import { getAllTags } from "../../services/tagService";
import { Tag } from "./Tag";
import "./Tag.css"


export const TagsList = () => {
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    getAndSetAllTags();
  }, []);

  const getAndSetAllTags = () => {
    getAllTags().then((tags) => {
      setAllTags(tags);
    });
  };

  return (
    <div>
      <h2 className="tag">Tags</h2>
      <article>
        {allTags.map((tag) => {
          return (
            <Tag
              tag={tag}
              getAndSetAllTags={getAndSetAllTags}
              key={tag.id}
            />
          );
        })}
      </article>
    </div>
  );
};
