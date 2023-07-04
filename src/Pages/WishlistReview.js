import { useLocation } from 'react-router-dom';
import { trimAndAddDots } from '../components/utils';
import connection from '../backend/connection';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { auth } from '../backend/firebase-config';

function WishlistReview() {
  // const location = useLocation();
  const {state} = useLocation();

  const user = auth.currentUser;

  // const [review, setReview] = useState(0);
  // const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [dateToRead, setDateToRead] = useState('');

  function handleChangeDescription(event) {
    setNotes(event.target.value)
  }

  function handleChangeDateCompleted(event) {
      setDateToRead(event.target.value)
    }

  // console.log(state);

  async function handleSubmit(e){
      e.preventDefault();

      const db = connection();
      const docRef = await addDoc(collection(db, "ToRead"), {
      book : state.state,
      notes: notes,
      dateToRead: dateToRead,
      userId : user.uid
    });
    console.log("Document written with ID: ", docRef.id);
    window.location.href = "/Wishlist"
    };

  return (
    <div className='book-details-review'>
      {state ? (
        <div>
          <div className='review-column-1'>
            <img
              className="book-image-review"
              src={state.state.volumeInfo.imageLinks?.thumbnail}
              alt={state.state.volumeInfo.title}
            />
            <div className='review-title'>
              {state.state.volumeInfo.title}
            </div>
          </div>

          <div className='review-column-1'>
            <form onSubmit={handleSubmit}>
              <h2>Enter the details below :</h2>
              <label htmlFor = "reviewDateCompleted">Intended date of read : </label>
              <input 
              type='date' 
              className='reviewDateCompleted'
              value={dateToRead}
              onChange={handleChangeDateCompleted}
              required
              ></input>
              <br />
              <label htmlFor = "reviewDescription">Notes : </label>
              <textarea 
              className='reviewDescription'
              value={notes}
              onChange={handleChangeDescription}
              ></textarea>
              <br />
              <button type="submit" value="Submit" className="review-submit">
              Add to Wishlist
              </button>
            </form>
            
          </div>
        </div>
      ) : (
        <div>No book found.</div>
      )}
    </div>
  );
}

export default WishlistReview;


