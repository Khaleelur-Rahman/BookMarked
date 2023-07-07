import { useLocation } from 'react-router-dom';
import { trimAndAddDots } from '../components/utils';
import connection from '../backend/connection';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { auth } from '../backend/firebase-config';
// import { Firestore } from 'firebase/firestore';

function ReadlistReview() {
  // const location = useLocation();
  const {state} = useLocation();

  const user = auth.currentUser;

  // const [review, setReview] = useState(0);
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [dateCompleted, setDateCompleted] = useState('');
  const [inputDateType, setDateType] = useState("text");
  const [ratingType, setRatingType] = useState("text");

  function handleChangeRating(event) {
    setRating(event.target.value)
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value)
  }

  function handleChangeDateCompleted(event) {
      setDateCompleted(event.target.value)
    }

  // console.log(state);

  async function handleSubmitNewBook(e) {
      e.preventDefault();

      const db = connection();
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
    console.log("Document written with ID: ", docRef.id);
    window.location.href = "/Read"
  };

  async function handleSubmitEditBook(e) {
    e.preventDefault();

    const db = connection();
    console.log(state.docId);
    const res = await updateDoc(doc(db, 'Read', state.docId), {
      book: state.state,
      title: state.state.volumeInfo.title,
      docId: state.docId,
      description: description,
      rating: rating,
      dateCompleted: dateCompleted,
      userId: user.uid
    });
    window.location.href = "/Read"
    // await db.collection('Read').doc(state.docId).

    console.log("Updated " + res);
  }

  useEffect(() => {
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
    <div className='book-details-review'>
      {state ? (
        <div>
          <div className='readlist-review-column-1'>
            <img
              className="book-image-review"
              src={state.state.volumeInfo.imageLinks?.thumbnail}
              alt={state.state.volumeInfo.title}
            />
            <div className='review-title'>
              {state.state.volumeInfo.title}
            </div>
          </div>

          <div className='readlist-review-column-2'>
          <form onSubmit={state.bookDescription === undefined ? handleSubmitNewBook : handleSubmitEditBook}>
              <h3>Write your review below to add to Readlist:</h3>
              {/* {console.log(rating === "")} */}
            <label htmlFor="reviewStars">Rating: </label>
            <input
              type={ratingType}
              className="reviewStars"
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
              className='reviewDateCompleted'
              // placeholder= {state.bookDate !== '' ? state.bookDate : "Date Completed"}
              onFocus={() => setDateType('date')}
              onBlur={() => setDateType('text')}
              value={dateCompleted}
              defaultValue={dateCompleted !== '' ? dateCompleted : state.bookDate}
              onChange={handleChangeDateCompleted}
              required
              ></input>
              <br />
              <label htmlFor = "reviewDescription">Description : </label>
              {/* <textarea 
              className='reviewDescription'
              value = {description}
              // value={state.bookDescription !== '' ? state.bookDescription : ""}
              defaultValue={state.bookDescription !== "" ? state.bookDescription : ""}
              // placeholder={state.bookDescription !== '' ? state.bookDescription : ""}
              onChange={handleChangeDescription}
              ></textarea> */}
              <textarea
                className="reviewDescription"
                defaultValue={description !== "" ? description : state.bookDescription}
                onChange={handleChangeDescription}
              ></textarea>
              <br />
              <div>
                {state.bookDescription === undefined ? (
                <button type="submit" value="Submit" className="review-submit"> Add to Readlist </button> 
                )
                : (
                <button type="submit" value="Submit" className="review-submit"> Edit Book </button>
                )
                }
              </div>
            </form>
            
          </div>
        </div>
      ) : (
        <div>No book found.</div>
      )}
    </div>
  );
}

export default ReadlistReview;


