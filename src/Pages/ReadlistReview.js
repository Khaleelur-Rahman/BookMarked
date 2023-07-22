import { useLocation } from 'react-router-dom';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { auth ,connectiontoDb } from '../backend/firebase-config';
import noBookCoverImage from "../images/No-book-cover.png";

function ReadlistReview() {
  const {state} = useLocation();   //Receive the state that is passes from the Read.js page

  const user = auth.currentUser;

  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [dateCompleted, setDateCompleted] = useState('');

  const [inputDateType, setDateType] = useState("text");  //Display the date as a text and when input is active, change to type date
  const [ratingType, setRatingType] = useState("text");   //Display the rating as a text and when input is active, change to type number

  function handleChangeRating(event) {
    setRating(event.target.value)
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value)
  }

  function handleChangeDateCompleted(event) {
      setDateCompleted(event.target.value)
    }

  async function handleSubmitNewBook(e) {  //Add the book and userId to the "Read" list if the book is not already in the database 
      e.preventDefault();

      const db = connectiontoDb;
      const docRef = await addDoc(collection(db, "Read"), {
      book : state.state,
      title :state.state.volumeInfo.title,
      description: description,
      rating: rating,
      dateCompleted: dateCompleted,
      userId : user.uid
    });

    const res = await updateDoc(doc(db, 'Read', docRef.id), {
      book: state.state,
      title: state.state.volumeInfo.title,
      docId: docRef.id,
      description: description,
      rating: rating,
      dateCompleted: dateCompleted,
      userId: user.uid
    });

    localStorage.setItem("bookTitle",state.state.volumeInfo.title)
    localStorage.setItem("action", "added");

    window.location.href = "/Read"
  };

  async function handleSubmitEditBook(e) { //Edit the book and userId in the "Read" list if the book is already in the database
    e.preventDefault();

    const db = connectiontoDb;
    const res = await updateDoc(doc(db, 'Read', state.docId), {
      book: state.state,
      title: state.state.volumeInfo.title,
      docId: state.docId,
      description: description,
      rating: rating,
      dateCompleted: dateCompleted,
      userId: user.uid
    });
    localStorage.setItem("bookTitle",state.state.volumeInfo.title)
    localStorage.setItem("action", "edited");

    window.location.href = "/Read"

  }

  useEffect(() => {   //Handle proper setting of the input fields according to if the book is already in the database or not
    if (state.bookDescription !== "" && description === "") {
      setDescription(state.bookDescription);
    }
    if (state.bookDate !== "" &&  dateCompleted === "") {
      setDateCompleted(state.bookDate);
    }
    if (state.bookRating !== "" && rating === "") { 
      setRating(state.bookRating);
    }
  }, [state.bookDescription, , state.bookDate, state.bookRating, rating, dateCompleted, description]);

  return (
    <div className='my-10 flex justify-center items-center'>
      {state ? (
        <div className='text-center'>
          <div className='flex flex-col items-center'>
            <img
              className="h-60 w-40 border-2 border-blue-300 rounded-lg"
              src={state.state.volumeInfo.imageLinks?state.state.volumeInfo.imageLinks.thumbnail: noBookCoverImage}
              alt={state.state.volumeInfo.title}
            />
            <div className='text-xl font-bold'>
              {state.state.volumeInfo.title}
            </div>
            <div>
              by {state.state.volumeInfo.authors[0]}
            </div>
          </div>

          <div className='mt-10 mb-20'>
          <form onSubmit={state.bookDate === undefined ? handleSubmitNewBook : handleSubmitEditBook}>
              <h3 className='text-lg text-slate-700 dark:text-slate-400 font-bold'>Write your review below to add to Readlist:</h3>
            <label htmlFor="reviewStars">Rating: </label>
            <input
              type={ratingType}
              className="inline border rounded-lg border-black-200 w-12 ml-2 m-3"
              min="0"
              max="5"
              step="0.1"
              defaultValue={rating === "" ? rating : state.bookRating}
              value={rating}
              onChange={handleChangeRating}
              onFocus={() => setRatingType('number')}
              onBlur={() => setDateType('text')}
              required
            />/5
              <br />
              <label htmlFor = "reviewDateCompleted">Date completed : </label>
              <input 
              type={inputDateType} 
              className='inline border rounded-lg border-black-200 w-28 ml-2 mb-4'
              onFocus={() => setDateType('date')}
              onBlur={() => setDateType('text')}
              value={dateCompleted}
              defaultValue={dateCompleted !== '' ? dateCompleted : state.bookDate}
              onChange={handleChangeDateCompleted}
              required
              ></input>
              <br />
              <label htmlFor = "reviewDescription">Description : </label>
              <textarea
                className="inline border border-black-200 resize-y rounded-lg ml-2 w-50"
                defaultValue={description !== "" ? description : state.bookDescription}
                onChange={handleChangeDescription}
              ></textarea>
              <br />
              <div className='mt-8'>
                {state.bookDate === undefined ? (
                <button type="submit" value="Submit" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Add to Readlist </button> 
                )
                : (
                <button type="submit" value="Submit" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Edit Book </button>
                )
                }
              </div>
            </form>
            
          </div>
        </div>
      ) : (
        <div>No book found.</div>    //No book found in the database
      )}
    </div>
  );
}

export default ReadlistReview;

