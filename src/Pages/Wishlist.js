import React, { useEffect, useState, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/LoadingSpinner";
import useUserLoggedIn from "../hooks/custom-hooks/useUserLoggedIn";
import { WISHLIST_BOOK_LIST_TYPE, WISHLIST_TABLE_NAME } from "../constants/commonConstants";
import { deleteBookFromDb, getBooksFromDb } from "../backend/functions";
import DisplayToast from "../components/DisplayToast";
import { TOAST_SUCCESS } from "../constants/toastConstants";
import BookListItem from "../components/BookListItem";


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

  const handleDelete = useCallback(async (id, title) => {
    await deleteBookFromDb(WISHLIST_TABLE_NAME, id, title);
    window.location.reload();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
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
                return (
                  <BookListItem
                    key={doc.id}
                    book={{
                      ...doc.data().book,
                      notes: doc.data().notes,
                      dateToRead: doc.data().dateToRead,
                      docId: doc.data().docId,
                    }}
                    onDelete={handleDelete}
                    listType={WISHLIST_BOOK_LIST_TYPE}
                  />
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
