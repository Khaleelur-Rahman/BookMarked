import React, { useEffect, useState } from "react";
import { trimAndAddDots } from "../components/utils";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import noBookCoverImage from "../images/No-book-cover.png";
import LoadingSpinner from "../components/LoadingSpinner";
import useUserLoggedIn from "../hooks/custom-hooks/useUserLoggedIn";
import { READLIST_TABLE_NAME } from "../constants/commonConstants";
import { deleteBookFromDb, getBooksFromDb, setUrl } from "../backend/functions";
import DisplayToast from "../components/DisplayToast";
import { TOAST_SUCCESS } from "../constants/toastConstants";

function Read() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageChanges, setPageChanges] = useState(0);

    const user = useUserLoggedIn();

    useEffect(() => {
      const fetchData = async () => {
        const filteredSnaps = await getBooksFromDb(
          READLIST_TABLE_NAME,
          user.uid
        );
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
      await deleteBookFromDb(READLIST_TABLE_NAME, id, title);
      window.location.reload();
    }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow pb-16">
        <div className="read-header">Readlist</div>
        <br />
        <br />
        <div className="read-books">
          {books.length === 0 ? (
            <div className="text-xl font-medium">
              No books found. Go to book search to add books to Readlist!
            </div>
          ) : (
            <div className="read-books">
              {books.map((doc) => {
                const book = doc.data().book;
                return (
                  <div className="book-details">
                    <img
                      key={doc.id}
                      className="read-books-image"
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
                    <div className="text-lg ">
                      Rating : {doc.data().rating} / 5
                    </div>
                    <div className="image-links">
                      {/*Contains all the links to perform functions such as to edit description, view book details and delete the book*/}
                      <Link
                        to={"/BookForm/ReadlistReview"}
                        state={{
                          state: book,
                          bookRating: doc.data().rating,
                          bookDescription: doc.data().description,
                          bookDate: doc.data().dateCompleted,
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
                        onClick={() => handleDelete(doc.data().docId, book.volumeInfo.title)}
                      >
                        Delete
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

export default Read;
