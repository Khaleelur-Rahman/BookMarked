import React, { useState } from "react";
import axios from "axios";
import "../assets/index.css";
import { trimAndAddDots } from "../components/utils";
import { Link } from "react-router-dom";
import { auth } from "../backend/firebase-config";
import noBookCoverImage from "../images/No-book-cover.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookForm() {
  const [bookResult, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [author, setAuthor] = useState("");
  const [cantFindAdded, setCantFindAdded] = useState(false);
  const [user, setUser] = useState(null);

  function handleChangeBook(event) {
    setSearchQuery(event.target.value); //handle book title input changes
  }

  function handleChangeAuthor(event) {
    setAuthor(event.target.value); //handle book author input changes
  }

  function handleSubmit(event) {
    event.preventDefault();

    //Fetch api results from google books endpoint using api key
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}+inauthor:${author}&maxResults=40&printType=books&key=${process.env.REACT_APP_GOOGLEBOOKS_API_KEY}`
      )
      .then((response) => {
        setBooks(response.data.items);
        if (!cantFindAdded) {
          cantFindStatement(); //cannot find any books based on form inputs
          setCantFindAdded(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }

  function setLink(url) {
    window.location.href = url;
  }

  function resetForm() {
    setSearchQuery("");
    setAuthor("");
    setBooks([]);
    setCantFindAdded(false);
  }

  function cantFindStatement() {
    const container = document.getElementById("book-search");
    const statement = document.createElement("div");
    statement.className = "cant-find-statement";
    statement.appendChild(
      document.createTextNode(
        "Can't find the book you are looking for? Try refining your search :)"
      )
    ); //cannot find book statement added to document
    container.appendChild(statement);
  }

  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "/Login"; //If user is not logged in, book search input will not be displayed and will be redirected to login page
    }
  });

  const displayToast = () => {
    if (localStorage.getItem("loginEmail") !== null) {
      //successful login

      const email = localStorage.getItem("loginEmail");
      localStorage.clear();

      toast.success(`${email} logged in successfully!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return !user ? (
    <div>
      {displayToast()}
      <div
        id="book-search"
        className="flex flex-col justify-center items-center"
      >
        <div className="form">
          <form onSubmit={handleSubmit}>
            <span className="font-bold text-3xl mr-10">Book Search</span>
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
                  onChange={handleChangeBook}
                  autoComplete="off"
                  id="inputBook"
                  className="peer block +-h-[auto] w-5/6 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  required
                ></input>
                <label
                  htmlFor="inputBook"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
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
                  onChange={handleChangeAuthor}
                  className="peer block +-h-[auto] w-5/6 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  autoComplete="off"
                  id="inputAuthor"
                ></input>
                <label
                  htmlFor="inputAuthor"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
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
        {bookResult ? (
          <div
            className="image-container"
            id="image-container"
            data-testid="bookform-results"
          >
            {bookResult.map((book) => (
              <div className="book-details" key={book.id}>
                <img
                  className="book-image"
                  src={
                    book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks.thumbnail
                      : noBookCoverImage
                  }
                  alt={book.volumeInfo.title} //display book image
                />
                <div className="display-book-title">
                  {trimAndAddDots(book.volumeInfo.title)}
                </div>
                <div className="image-links">
                  {" "}
                  {/*Contains links to add book to either readlist,wishlist or to book details on a specific website */}
                  <Link
                    to={"/BookForm/WishlistReview"}
                    state={{ state: book }}
                    className="add-read"
                  >
                    Add to Wishlist
                  </Link>
                  <br></br>
                  <Link
                    to={"/BookForm/ReadlistReview"}
                    state={{ state: book }}
                    className="add-read"
                  >
                    Add to Readlist
                  </Link>
                  <br></br>
                  <div
                    className="book-details-link"
                    onClick={() => setLink(book.volumeInfo.infoLink)}
                  >
                    Book Details
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    (window.location.href = "/Login") //If user is not logged in, book search input will not be displayed and will be redirected to login page
  );
}

export default BookForm;
