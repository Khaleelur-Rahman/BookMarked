import React from "react";
import { setUrl } from "../components/utils";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import noBookCoverImage from "../images/No-book-cover.png";
import { READ_BOOK_LIST_TYPE, WISHLIST_BOOK_LIST_TYPE, SEARCH_BOOK_LIST_TYPE } from "../constants/commonConstants";
import BookListItemDescription from "../components/BookListItemDescription"

function BookListItem({ book, onDelete, listType = WISHLIST_BOOK_LIST_TYPE }) {
  const {
    volumeInfo = {},
    docId,
    rating,
    description,
    dateCompleted,
    notes,
    dateToRead,
  } = book;

  // Determine navigation path and state based on list type
   const navigationConfig = {
     [SEARCH_BOOK_LIST_TYPE]: {
       links: [
         {
           label: "Add to Wishlist",
           path: "/BookForm/WishlistReview",
           state: { state: book },
         },
         {
           label: "Add to Readlist",
           path: "/BookForm/ReadlistReview",
           state: { state: book },
         },
       ],
     },
     [WISHLIST_BOOK_LIST_TYPE]: {
       links: [
         {
           label: "View and Edit Description",
           path: "/BookForm/WishlistReview",
           state: {
             state: book,
             notes: notes,
             bookDate: dateToRead,
             docId: docId
           },
         },
       ],
     },
     [READ_BOOK_LIST_TYPE]: {
       links: [
         {
           label: "View and Edit Description",
           path: "/BookForm/ReadlistReview",
           state: {
            state: book,
             rating: rating,
             description: description,
             dateCompleted: dateCompleted,
             docId: docId
           },
         },
       ],
     },
   };

  const config = navigationConfig[listType];
  const title = volumeInfo.title
  const bookImage = volumeInfo.imageLinks
    ? volumeInfo.imageLinks.thumbnail
    : noBookCoverImage;

  return (
    <div className="book-details">
      <img
        className={`${listType}-books-image`}
        src={bookImage}
        alt={title}
      />

      <BookListItemDescription title = {title} description={{dateToRead, rating}} listType={listType} />

      {/* Dynamic links based on list type */}
        <div className="image-links">
            {config.links && config.links.map((link, index) => (
            <React.Fragment key={index}>
                <Link 
                    to={link.path} 
                    state={link.state} 
                    className="add-read"
                >
                    {link.label}
                </Link>
                {index < config.links.length - 1 && <br />}
            </React.Fragment>
            ))}

            {/* Book details link */}
            {volumeInfo.infoLink && (
            <div 
                className="mt-6"
                onClick={() => setUrl(volumeInfo.infoLink)}
            >
                Book Details
            </div>
            )}

            {/* Delete option for existing list items */}
            {onDelete && (
            <div 
                className="mt-6" 
                onClick={() => onDelete(docId, volumeInfo.title)}
            >
                Delete
            </div>
            )}
        </div>
    </div>
  );
}

export default BookListItem;
