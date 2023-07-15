import { useLocation } from 'react-router-dom';
import { trimAndAddDots } from '../components/utils';
import connection from '../backend/connection';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { auth } from '../backend/firebase-config';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
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

    toast.success (state.state.volumeInfo.title + " was added", {
      position: toast.POSITION.TOP_RIGHT,
    })

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
    toast.success (state.state.volumeInfo.title + " was edited", {
      position: toast.POSITION.TOP_RIGHT,
    })
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
    <div className='my-10 flex justify-center items-center'>
      {state ? (
        <div className='text-center'>
          <div className='flex flex-col items-center'>
            <img
              className="h-60 w-40 border-2 border-blue-300 rounded-lg"
              src={state.state.volumeInfo.imageLinks?.thumbnail}
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
              {/* {console.log(rating === "")} */}
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
                className="inline border border-black-200 resize-y rounded-lg ml-2 w-50"
                defaultValue={description !== "" ? description : state.bookDescription}
                onChange={handleChangeDescription}
              ></textarea>
              <br />
              <div className='mt-8'>
                {state.bookDate === undefined ? (
                  // <Link 
                  // to={"/Wishlist"} 
                  // state = {{state :  }}
                <button 
                  type="submit" 
                  value="Submit" 
                  className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSubmitNewBook}
                > 
                Add to Readlist 
                </button> 
                )
                : (
                <button 
                  type="submit" 
                  value="Submit" 
                  className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSubmitEditBook}
                > 
                Edit Book 
                </button>
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


