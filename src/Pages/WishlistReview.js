import { useLocation } from 'react-router-dom';
import { trimAndAddDots } from '../components/utils';
import connection from '../backend/connection';
import { collection, addDoc,updateDoc,doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { auth } from '../backend/firebase-config';

function WishlistReview() {
  // const location = useLocation();
  const {state} = useLocation();

  const user = auth.currentUser;

  // const [review, setReview] = useState(0);
  // const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [dateToRead, setDateToRead] = useState('');
  const [inputDateType, setDateType] = useState("text");

  function handleChangeDescription(event) {
    setNotes(event.target.value)
  }

  function handleChangeDateCompleted(event) {
      setDateToRead(event.target.value)
    }

  // console.log(state);

  async function handleSubmitNewBook(e){
      e.preventDefault();

      const db = connection();
      const docRef = await addDoc(collection(db, "ToRead"), {
      book : state.state,
      title :state.state.volumeInfo.title,
      notes: notes,
      dateToRead: dateToRead,
      userId : user.uid
    });

      const res = await updateDoc(doc(db,"ToRead",docRef.id), {
        book : state.state,
        title :state.state.volumeInfo.title,
        docId: docRef.id,
        notes: notes,
        dateToRead: dateToRead,
        userId : user.uid
      });
    console.log("Document written with ID: ", docRef.id);
    window.location.href = "/Wishlist"
    };

    async function handleSubmitEditBook(e) {
      e.preventDefault();
  
      const db = connection();
      console.log(state.docId);
      const res = await updateDoc(doc(db, 'ToRead', state.docId), {
        book : state.state,
        title :state.state.volumeInfo.title,
        docId: state.docId,
        notes: notes,
        dateToRead: dateToRead,
        userId : user.uid
      });
      window.location.href = "/Wishlist"
      // await db.collection('Read').doc(state.docId).
  
      console.log("Updated " + res);
    }

    useEffect(() => {
      if(state.bookDate !== "" && dateToRead === "") {
        setDateToRead(state.bookDate);
      } 
      if (state.notes !== "" && notes === "") {
        setNotes(state.notes);
      }
    },[state.bookDate, state.notes, dateToRead, notes]);

  return (
    <div className='book-details-review'>
      {state ? (
        <div>
          <div className='wishlist-review-column-1'>
            <img
              className="book-image-review"
              src={state.state.volumeInfo.imageLinks?.thumbnail}
              alt={state.state.volumeInfo.title}
            />
            <div className='review-title'>
              {state.state.volumeInfo.title}
            </div>
          </div>

          <div className='wishlist-review-column-2'>
          <form onSubmit={state.bookDate === undefined ? handleSubmitNewBook : handleSubmitEditBook}>
              <h3>Enter the details below to add to Wishlist:</h3>
              <label htmlFor = "reviewDateCompleted">Intended date of read : </label>
              <input 
              type={inputDateType} 
              className='reviewDateCompleted'
              onFocus={() => setDateType('date')}
              onBlur={() => setDateType('text')}
              value={dateToRead}
              defaultValue={dateToRead !== "" ? dateToRead : state.bookDate}
              onChange={handleChangeDateCompleted}
              required
              ></input>
              <br />
              <label htmlFor = "reviewDescription">Notes : </label>
              <textarea 
              className='reviewDescription'
              defaultValue={notes !== "" ? notes : state.notes}
              onChange={handleChangeDescription}
              ></textarea>
              <br />
              <div>
                {state.bookDate === undefined ? (
                    <button type="submit" value="Submit" className="review-submit">
                    Add to Wishlist
                    </button>
                    ) : (
                    <button type="submit" value="Submit" className="review-submit">
                    Edit Book
                    </button>
                  )}
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

export default WishlistReview;


