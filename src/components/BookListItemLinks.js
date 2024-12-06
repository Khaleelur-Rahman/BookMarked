import React from "react";
import { Link } from "react-router-dom";
import { setUrl } from "../utils/utils";

const BookListItemLinks = ({ config, volumeInfo, onDelete, docId }) => {
  return (
    <div className="image-links">
      {config.links &&
        config.links.map((link, index) => (
          <React.Fragment key={index}>
            <Link to={link.path} state={link.state} className="add-read">
              {link.label}
            </Link>
            {index < config.links.length - 1 && <br />}
          </React.Fragment>
        ))}

      {volumeInfo.infoLink && (
        <div className="mt-6" onClick={() => setUrl(volumeInfo.infoLink)}>
          Book Details
        </div>
      )}

      {onDelete && (
        <div className="mt-6" onClick={() => onDelete(docId, volumeInfo.title)}>
          Delete
        </div>
      )}
    </div>
  );
};

export default BookListItemLinks;
