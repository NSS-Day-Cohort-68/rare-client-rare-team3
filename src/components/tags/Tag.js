
import { Link } from "react-router-dom";
import "./Tag.css"


export const Tag = ({ tag }) => {
  return (
    <div >
      <Link>
        <div>
          <ul>{tag.label}</ul>
        </div>
      </Link>
    </div>
  );
};
