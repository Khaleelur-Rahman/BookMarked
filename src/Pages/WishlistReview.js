import { useLocation, useNavigate } from 'react-router-dom';
import { trimAndAddDots } from '../components/utils';
import connection from '../backend/connection';
import { collection, addDoc,updateDoc,doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { auth } from '../backend/firebase-config';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

    // const redirect = (address, title, action) => {
    //   const navigate = useNavigate();
    //   navigate(address, {
    //     state : {
    //       title : title,
    //       action : action
    //     },
    //   });
    // };

    async function handleSubmitEditBook(e) {
      e.preventDefault();
    
      const db = connection();
      console.log(state.docId);
    
      try {
        await updateDoc(doc(db, 'ToRead', state.docId), {
          book: state.state,
          title: state.state.volumeInfo.title,
          docId: state.docId,
          notes: notes,
          dateToRead: dateToRead,
          userId: user.uid,
        });
    
        // const navigate = useNavigate();
        // redirect("/Readlist", state.state.volumeInfo.title, "edited")

        // const toastState = {
        //   message: `${state.state.volumeInfo.title} was edited`,
        //   options: {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //   }
        // };
        //       const navigate = useNavigate();

        // You can set the state as a location state before navigating
        // navigate('/Wishlist', { state:  toastState });
    
        console.log("Document successfully updated");
      } catch (error) {
        console.error("Error updating document:", error);
      }
    
      window.location.href = "/Wishlist";
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
    <div className='my-10 flex justify-center items-center'>
  {state ? (
      <div className='text-center'>
        <div className="flex flex-col items-center">
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
          <h3 className='text-lg text-slate-700 dark:text-slate-400 font-bold'>Enter the details below to add to Wishlist:</h3><br />
          <div className='flex justify-center items-center mb-4'>
            <label htmlFor="reviewDateCompleted">Intended date of read:</label>
            <input
              type={inputDateType}
              className='inline border rounded-lg border-black-200 w-28 ml-2'
              onFocus={() => setDateType('date')}
              onBlur={() => setDateType('text')}
              value={dateToRead}
              defaultValue={dateToRead !== "" ? dateToRead : state.bookDate}
              onChange={handleChangeDateCompleted}
              required
            />
          </div>
          <div className='flex justify-center items-center mb-14'>
            <label htmlFor="reviewDescription">Notes:</label>
            <textarea
              className='inline border border-black-200 resize-y rounded-lg ml-2 w-50'
              defaultValue={notes !== "" ? notes : state.notes}
              onChange={handleChangeDescription}
            ></textarea>
          </div>
          <div className='flex justify-center'>
            {state.bookDate === undefined ? (
              <span>
                <Link 
                to={"/Wishlist"}
                state = {{ 
                  type : "new",
                  book : state.state,
                  title :state.state.volumeInfo.title,
                  notes: notes,
                  dateToRead: dateToRead,
                  userId : user.uid,
                }}
                >
                  <button 
                  type="submit" 
                  value="Submit" 
                  className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  // onClick={handleSubmitNewBook}  
                >
                  Add to Wishlist
                </button>
                </Link>
                
              </span>
            ) : (
              <span>
                <Link 
                to="/Wishlist"
                state = {{ 
                  type : "edit",
                  book: state.state,
                  title: state.state.volumeInfo.title,
                  docId: state.docId,
                  notes: notes,
                  dateToRead: dateToRead,
                  userId: user.uid,
                }}
                // role = "button"
                // className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                // onClick={handleSubmitEditBook}
                >
                  <button 
                    type="submit" 
                    value="Submit" 
                    className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    // onClick={handleSubmitEditBook}
                  >
                  Edit Book
                  </button>
                </Link>
              </span>
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


