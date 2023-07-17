import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import connection from '../backend/connection';
import { collection, addDoc } from 'firebase/firestore';
import {trimAndAddDots} from './utils';
import { Link } from 'react-router-dom';
import { auth } from "../backend/firebase-config";
import { onAuthStateChanged } from 'firebase/auth';
import noBookCoverImage from "../images/No-book-cover.png";



// Api key AIzaSyDXazWuIbPnNRVSTptlWmdEvIJXJ0scUns

function BookForm() {
  const [bookResult, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [author, setAuthor] = useState('');
  const [cantFindAdded, setCantFindAdded] = useState(false);
  const [user, setUser] = useState(null)


  function handleChangeBook(event) {
    setSearchQuery(event.target.value);
  }

  function handleChangeAuthor(event) {
    setAuthor(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}+inauthor:${author}&maxResults=40&printType=books&key=AIzaSyDXazWuIbPnNRVSTptlWmdEvIJXJ0scUns`
      )
      .then((response) => {
        setBooks(response.data.items);
        if (!cantFindAdded) {
          cantFindStatement();
          setCantFindAdded(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });

  }

  function setLink(url) {
    window.location.href = url;
  }

  function resetForm() {
    setSearchQuery('');
    setAuthor('');
    setBooks([]);
    setCantFindAdded(false);
  }

  async function addToRead(book) {
    // const db = connection();
    // const docRef = await addDoc(collection(db, "ToRead"), {
    //   book
    // });
    // console.log("Document written with ID: ", docRef.id);
    window.location.href = "/BookForm/WishlistReview"
  }

  async function addRead(book) {
    // const db = connection();
    // const docRef = await addDoc(collection(db, "Read"), {
    //   book
    // });
    // console.log("Document written with ID: ", docRef.id);
    window.location.href = "/BookForm/ReadlistReview"
  }

  function cantFindStatement() {
    const container = document.getElementById("book-search");
    const statement = document.createElement("div");
    statement.className = "cant-find-statement"
    statement.appendChild(document.createTextNode("Can't find the book you are looking for? Try refining your search :)"));
    container.appendChild(statement);
  }

  const unsubscribe = auth.onAuthStateChanged((user) => {
    if(!user) {
      window.location.href = "/Login";
    }
  });

  // console.log(user);
  
  return (
    // console.log(user);
    !user ? (
      <div id="book-search" className='flex flex-col justify-center items-center'>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <span className="font-bold text-3xl mr-10">Book Search</span>
            <br /><br />
            <div className="form-inputs-and-buttons">
            <div class="relative m-2 border-2 border-cyan-400 rounded-lg" data-te-input-wrapper-init>

              <input
                type="text"
                placeholder=" "
                value={searchQuery}
                onChange={handleChangeBook}
                autoComplete="off"
                id="inputBook"
                class="peer block +-h-[auto] w-5/6 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                required
              ></input>
              <label
              for="inputBook"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
              >Enter Title
            </label>
            </div>
            <div class="relative m-2 border-2 border-cyan-400 rounded-lg" data-te-input-wrapper-init>

              <input
                type="text"
                placeholder=" "
                value={author}
                onChange={handleChangeAuthor}
                class="peer block +-h-[auto] w-5/6 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                autoComplete="off"
                id="inputAuthor"
              ></input>
              <label
                for="inputAuthor"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
                >Enter Author
              </label>
              </div>
              <button type="submit" value="Submit" className="bookform-submit"></button>
              {/* <button type="submit" value="Submit" className="bg-[url('images/searchIcon.png')] bg-gradient-to-r from-purple-500 to-pink-500"></button> */}
              <button type="button" id="reset" onClick={resetForm}></button>
            </div>
          </form>
        </div>
        {bookResult ? (
          <div className="image-container" id="image-container">
            {bookResult.map((book) => (
              
              <div className="book-details" key={book.id}>
                {/* {console.log(book)} */}
                <img
                  className="book-image"
                  src={book.volumeInfo.imageLinks? book.volumeInfo.imageLinks.thumbnail: noBookCoverImage}
                  alt={book.volumeInfo.title}
                />
                <div className="display-book-title">
                  {trimAndAddDots(book.volumeInfo.title)}
                </div>
                <div className="image-links">
                  <Link
                  to={"/BookForm/WishlistReview"} state={{ state: book }}
                  className="add-read"
                  >
                  Add to Wishlist
                  </Link>
                  <br></br>
                  <Link
                    to={"/BookForm/ReadlistReview"} state={{ state: book }}
                    className="add-read"
                  >
                    Add to Readlist
                  </Link> 
                  <br></br>
                  <div className="book-details-link" onClick={() => setLink(book.volumeInfo.infoLink)}>
                    Book Details
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    ) : (
      window.location.href = "/Login"
    )
  );  
}

export default BookForm;
