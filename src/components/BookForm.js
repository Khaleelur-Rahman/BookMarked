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

  
  return (
    user !== undefined ? (
      <div id="book-search">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <span className="header">Book Search</span>
            <br /><br />
            <div className="form-inputs-and-buttons">
              <input
                type="text"
                placeholder="Enter book"
                value={searchQuery}
                onChange={handleChangeBook}
                autoComplete="off"
                id="input"
                required
              ></input>
              <input
                type="text"
                placeholder="Enter author"
                value={author}
                onChange={handleChangeAuthor}
                autoComplete="off"
                id="input"
              ></input>
              <button type="submit" value="Submit" className="bookform-submit"></button>
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
                <div className="display-book-title">{trimAndAddDots(book.volumeInfo.title)}</div>
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
                    Details
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
