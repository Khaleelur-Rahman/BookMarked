import React from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  READ_BOOK_LIST_TYPE,
  WISHLIST_BOOK_LIST_TYPE,
  SEARCH_BOOK_LIST_TYPE,
} from "../constants/commonConstants";
import BookListItemDescription from "../components/BookListItemDescription";
import BookListItemImage from "./BookListItemImage";
import BookListItemLinks from "./BookListItemLinks";
import { routeConstants } from "../constants/routeConstants";

const BookListItem = ({ book, onDelete, listType = SEARCH_BOOK_LIST_TYPE }) => {
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
          path: routeConstants.WISHLIST_REVIEW.path,
          state: { state: book },
        },
        {
          label: "Add to Readlist",
          path: routeConstants.READLIST_REVIEW.path,
          state: { state: book },
        },
      ],
    },
    [WISHLIST_BOOK_LIST_TYPE]: {
      links: [
        {
          label: "View and Edit Description",
          path: routeConstants.WISHLIST_REVIEW.path,
          state: {
            state: book,
            notes: notes,
            bookDate: dateToRead,
            docId: docId,
          },
        },
      ],
    },
    [READ_BOOK_LIST_TYPE]: {
      links: [
        {
          label: "View and Edit Description",
          path: routeConstants.READLIST_REVIEW.path,
          state: {
            state: book,
            rating: rating,
            description: description,
            dateCompleted: dateCompleted,
            docId: docId,
          },
        },
      ],
    },
  };

  const config = navigationConfig[listType];
  const title = volumeInfo.title;

  return (
    <div className="book-details">
      <BookListItemImage
        volumeInfo={volumeInfo}
        title={title}
        listType={listType}
      />

      <BookListItemLinks
        config={config}
        volumeInfo={volumeInfo}
        onDelete={onDelete}
        docId={docId}
      />

      <BookListItemDescription
        title={title}
        description={{ dateToRead, rating }}
        listType={listType}
      />
    </div>
  );
};

export default BookListItem;
