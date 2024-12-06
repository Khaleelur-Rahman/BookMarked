import React from "react";
import noBookCoverImage from "../images/No-book-cover.png";

const BookListItemImage = ({ volumeInfo, title, listType }) => {
  const bookImage = volumeInfo.imageLinks
    ? volumeInfo.imageLinks.thumbnail
    : noBookCoverImage;

  return (
    <img className={`${listType}-books-image`} src={bookImage} alt={title} />
  );
};

export default BookListItemImage;
