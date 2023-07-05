import { useLocation } from 'react-router-dom';
import { trimAndAddDots } from '../components/utils';
import connection from '../backend/connection';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { auth } from '../backend/firebase-config';

function ReadlistReview() {
  // const location = useLocation();
  const {state} = useLocation();

  const user = auth.currentUser;

  // const [review, setReview] = useState(0);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [dateCompleted, setDateCompleted] = useState('');

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

  async function handleSubmit(e){
      e.preventDefault();

      const db = connection();
      const docRef = await addDoc(collection(db, "Read"), {
      book : state.state,
      description: description,
      rating: rating,
      dateCompleted: dateCompleted,
      userId : user.uid
    });
    console.log("Document written with ID: ", docRef.id);
    window.location.href = "/Read"


    };

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
            <form onSubmit={handleSubmit}>
              <h3>Write your review below to add to Readlist:</h3>
              <label htmlFor="reviewStars">Rating : </label>
              <input 
              type='number' 
              className='reviewStars' 
              min="0" 
              max = "5" 
              step ="0.1" 
              placeholder='0'
              value={rating}
              onChange={handleChangeRating}
              required
              ></input>/5
              <br />
              <label htmlFor = "reviewDateCompleted">Date completed : </label>
              <input 
              type='date' 
              className='reviewDateCompleted'
              value={dateCompleted}
              onChange={handleChangeDateCompleted}
              required
              ></input>
              <br />
              <label htmlFor = "reviewDescription">Description : </label>
              <textarea 
              className='reviewDescription'
              value={description}
              onChange={handleChangeDescription}
              ></textarea>
              <br />
              <button type="submit" value="Submit" className="review-submit">
              Add to Readlist
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

export default ReadlistReview;


