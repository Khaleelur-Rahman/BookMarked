import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import DisplayToast from "../components/DisplayToast";
import {
  TOAST_BOOK_NOT_FOUND,
  TOAST_ERROR,
  TOAST_LOGGED_IN_SUCCESSFULLY,
  TOAST_SUCCESS,
} from "../constants/toastConstants";
import {
  API_PATH,
  SEARCH_BOOK_LIST_TYPE,
  ADD_OPERATION,
} from "../constants/commonConstants";
import useUserLoggedIn from "../hooks/custom-hooks/useUserLoggedIn";
import BookListItem from "../components/BookListItem";
import LoadingSpinner from "../components/LoadingSpinner";

function BookForm() {
  const [bookResult, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useUserLoggedIn();

  useEffect(() => {
    // Display toast on successful login
    const loginEmail = localStorage.getItem("loginEmail");
    if (loginEmail !== null) {
      localStorage.clear();
      DisplayToast(TOAST_SUCCESS, TOAST_LOGGED_IN_SUCCESSFULLY(loginEmail));
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    // Clear previous results and load spinner
    setBooks([]);
    setIsLoading(true);

    //Fetch api results from google books endpoint using api key
    axios
      .get(API_PATH(searchQuery, author))
      .then((response) => {
        if (response.data.totalItems === 0) {
          DisplayToast(TOAST_ERROR, TOAST_BOOK_NOT_FOUND);
          resetForm();
        } else {
          const filteredBooks = response.data.items.filter(
            (book) => book.id && book.volumeInfo.title
          );
          setBooks(filteredBooks);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        DisplayToast(TOAST_ERROR, "Error fetching books: " + error.message);
        resetForm();
      });
  }

  function resetForm() {
    setSearchQuery("");
    setAuthor("");
    setBooks([]);
  }

  return (
    <div>
      <div
        id="book-search"
        className="flex flex-col justify-center items-center"
      >
        <div className="form">
          <form onSubmit={handleSubmit}>
            <span className="font-bold text-2xl mr-10">Book Search</span>
            <br />
            <br />
            <div className="form-inputs-and-buttons">
              <div
                className="relative m-2 border-2 border-cyan-400 rounded-lg"
                data-te-input-wrapper-init
              >
                <input
                  type="text"
                  placeholder=" "
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  autoComplete="off"
                  id="inputBook"
                  className="cursor-text peer block +-h-[auto] w-5/6 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  required
                ></input>
                <label
                  htmlFor="inputBook"
                  className="cursor-text absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
                >
                  Enter Title
                </label>
              </div>
              <div
                className="relative m-2 border-2 border-cyan-400 rounded-lg"
                data-te-input-wrapper-init
              >
                <input
                  type="text"
                  placeholder=" "
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                  className="cursor-text peer block +-h-[auto] w-5/6 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  autoComplete="off"
                  id="inputAuthor"
                ></input>
                <label
                  htmlFor="inputAuthor"
                  className="cursor-text absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
                >
                  Enter Author
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  value="Submit"
                  className="bookform-submit"
                  data-testid="bookform-submit"
                ></button>
                <button
                  type="button"
                  id="reset"
                  onClick={resetForm}
                  data-testid="bookform-reset"
                ></button>
              </div>
            </div>
          </form>
        </div>
        {isLoading && <LoadingSpinner />}
        <div
          className="image-container"
          id="image-container"
          data-testid="bookform-results"
        >
          {bookResult.map((book) => (
            <BookListItem
              key={book.id}
              book={{ ...book, type: ADD_OPERATION }}
              listType={SEARCH_BOOK_LIST_TYPE}
            />
          ))}
        </div>
        {bookResult.length > 0 && (
          <div className="mb-20 text-xl font-bold">
            Can't find the book you are looking for? Try refining your search.
          </div>
        )}
      </div>
    </div>
  );
}

export default BookForm;
