import { useLocation } from "react-router-dom";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, connectiontoDb } from "../backend/firebase-config";
import noBookCoverImage from "../images/No-book-cover.png";

function WishlistReview() {
  const { state } = useLocation();
  const user = auth.currentUser;

  const [notes, setNotes] = useState("");
  const [dateToRead, setDateToRead] = useState("");

  const [inputDateType, setDateType] = useState("text"); //Display the date as a text and when input is active, change to type date

  function handleChangeDescription(event) {
    setNotes(event.target.value);
  }

  function handleChangeDateCompleted(event) {
    setDateToRead(event.target.value);
  }

  async function handleSubmitNewBook(e) {
    //Add the book and userId to the "Read" list if the book is not already in the database
    e.preventDefault();

    const db = connectiontoDb;
    const docRef = await addDoc(collection(db, "ToRead"), {
      book: state.state,
      title: state.state.volumeInfo.title,
      notes: notes,
      dateToRead: dateToRead,
      userId: user.uid,
    });

    const res = await updateDoc(doc(db, "ToRead", docRef.id), {
      book: state.state,
      title: state.state.volumeInfo.title,
      docId: docRef.id,
      notes: notes,
      dateToRead: dateToRead,
      userId: user.uid,
    });
    localStorage.setItem("bookTitle", state.state.volumeInfo.title);
    localStorage.setItem("action", "added");

    window.location.href = "/Wishlist";
  }

  async function handleSubmitEditBook(e) {
    //Edit the book and userId in the "Read" list if the book is already in the database
    e.preventDefault();

    const db = connectiontoDb;
    const res = await updateDoc(doc(db, "ToRead", state.docId), {
      book: state.state,
      title: state.state.volumeInfo.title,
      docId: state.docId,
      notes: notes,
      dateToRead: dateToRead,
      userId: user.uid,
    });

    localStorage.setItem("bookTitle", state.state.volumeInfo.title);
    localStorage.setItem("action", "edited");

    window.location.href = "/Wishlist";
  }

  useEffect(() => {
    //Handle proper setting of the input fields according to if the book is already in the database or not
    if (state.bookDate !== "" && dateToRead === "") {
      setDateToRead(state.bookDate);
    }
    if (state.notes !== "" && notes === "") {
      setNotes(state.notes);
    }
  }, [state.bookDate, state.notes, dateToRead, notes]);

  return (
    <div className="my-10 flex justify-center items-center">
      {state ? (
        <div className="text-center">
          <div className="flex flex-col items-center">
            <img
              className="h-60 w-40 border-2 border-blue-300 rounded-lg"
              src={
                state.state.volumeInfo.imageLinks
                  ? state.state.volumeInfo.imageLinks.thumbnail
                  : noBookCoverImage
              }
              alt={state.state.volumeInfo.title}
            />
            <div className="text-xl font-bold">
              {state.state.volumeInfo.title}
            </div>
            <div>by {state.state.volumeInfo.authors[0]}</div>
          </div>

          <div className="mt-10 mb-20">
            <form
              onSubmit={
                state.bookDate === undefined
                  ? handleSubmitNewBook
                  : handleSubmitEditBook
              }
            >
              <h3 className="text-lg text-slate-700 dark:text-slate-400 font-bold">
                Enter the details below to add to Wishlist:
              </h3>
              <br />
              <div className="flex justify-center items-center mb-4">
                <label htmlFor="reviewDateCompleted">
                  Intended date of read:
                </label>
                <input
                  type={inputDateType}
                  className="inline border rounded-lg border-black-200 w-28 ml-2"
                  onFocus={() => setDateType("date")}
                  onBlur={() => setDateType("text")}
                  value={dateToRead}
                  defaultValue={dateToRead !== "" ? dateToRead : state.bookDate}
                  onChange={handleChangeDateCompleted}
                  required
                />
              </div>
              <div className="flex justify-center items-center mb-14">
                <label htmlFor="reviewDescription">Notes:</label>
                <textarea
                  className="inline border border-black-200 resize-y rounded-lg ml-2 w-50"
                  defaultValue={notes !== "" ? notes : state.notes}
                  onChange={handleChangeDescription}
                  required
                ></textarea>
              </div>
              <div className="flex justify-center">
                {state.bookDate === undefined ? (
                  <button
                    type="submit"
                    value="Submit"
                    className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to Wishlist
                  </button>
                ) : (
                  <button
                    type="submit"
                    value="Submit"
                    className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Edit Book
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>No book found.</div> //No book found in the database
      )}
    </div>
  );
}

export default WishlistReview;
