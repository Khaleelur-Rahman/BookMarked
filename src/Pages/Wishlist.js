import React, { useEffect, useState } from "react";
import { trimAndAddDots } from "../components/utils";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import noBookCoverImage from "../images/No-book-cover.png";
import LoadingSpinner from "../components/LoadingSpinner";
import useUserLoggedIn from "../hooks/custom-hooks/useUserLoggedIn";
import { WISHLIST_TABLE_NAME } from "../constants/commonConstants";
import { deleteBookFromDb, getBooksFromDb, setUrl } from "../backend/functions";
import DisplayToast from "../components/DisplayToast";
import { TOAST_SUCCESS } from "../constants/toastConstants";

function Wishlist() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageChanges, setPageChanges] = useState(0);

  const user = useUserLoggedIn();

  useEffect(() => {
    const fetchData = async () => {
      const filteredSnaps = await getBooksFromDb(WISHLIST_TABLE_NAME, user.uid);
      setBooks(filteredSnaps);
      setIsLoading(false);
    };

    if (user) {
      fetchData();
    }
  }, [user, pageChanges]);

  useEffect(() => {
    const title = localStorage.getItem("bookTitle");
    if (title !== null) {
      const action = localStorage.getItem("action");
      DisplayToast(TOAST_SUCCESS, `${title} was ${action}`);
      localStorage.clear();
      setPageChanges((prevPageChanges) => prevPageChanges + 1);
    }
  }, [pageChanges]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  async function handleDelete(id, title) {
    await deleteBookFromDb(WISHLIST_TABLE_NAME, id, title);
    window.location.reload();
  }


  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow pb-16">
        <div className="wishlist-header">Wishlist</div>
        <br />
        <br />
        <div className="wishlist-books">
          {books.length === 0 ? (
            <div className="text-xl font-medium">
              No books found. Go to book search to add books to wishlist!
            </div>
          ) : (
            <div className="wishlist-books">
              {books.map((doc) => {
                const book = doc.data().book;
                return (
                  <div>
                    <div className="book-details">
                      <img
                        key={doc.id}
                        className="wishlist-books-image"
                        src={
                          book.volumeInfo.imageLinks
                            ? book.volumeInfo.imageLinks.thumbnail
                            : noBookCoverImage
                        }
                        alt={book.volumeInfo?.title}
                      />
                      <div className="text-xl text-slate-800 font-semibold subpixel-antialiased m-3">
                        {trimAndAddDots(book.volumeInfo.title)}
                      </div>
                      <div>Date to read: {doc.data().dateToRead}</div>
                      <div className="image-links">
                        <Link
                          to={"/BookForm/WishlistReview"}
                          state={{
                            state: book,
                            notes: doc.data().notes,
                            bookDate: doc.data().dateToRead,
                            docId: doc.data().docId,
                          }}
                          className="add-read"
                        >
                          View and Edit Description
                        </Link>
                        <br />
                        <div onClick={() => setUrl(book.volumeInfo.infoLink)}>
                          Book Details
                        </div>
                        <div
                          className="mt-6"
                          onClick={() =>handleDelete(doc.data().docId, book.volumeInfo.title)}
                        >
                          Delete
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
