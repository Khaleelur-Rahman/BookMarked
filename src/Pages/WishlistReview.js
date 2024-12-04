import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import noBookCoverImage from "../images/No-book-cover.png";
import Button from "../components/Button";
import { WISHLIST_TABLE_NAME } from "../constants/commonConstants";
import { addBookToDb, updateBookInDb } from "../backend/functions";
import useNavigation from "../hooks/custom-hooks/useNavigation";
import useUserLoggedIn from "../hooks/custom-hooks/useUserLoggedIn";
import { UPDATE_OPERATION } from "../constants/commonConstants";

function WishlistReview() {
  const user = useUserLoggedIn();
  const navigate = useNavigation();

  const { state } = useLocation();

  const [bookData, setBookData] = useState({
    docId: "",
    book: "",
    title: "",
    authors: [],
    image: noBookCoverImage,
    notes: "",
    dateToRead: "",
    type: ""
  });

  const [inputDateType, setDateType] = useState("text");

  useEffect(() => {
    if (state) {
      setBookData({
        docId: state.docId || "",
        book: state.state,
        title: state.state.volumeInfo.title,
        authors: state.state.volumeInfo.authors || [],
        image: state.state.volumeInfo.imageLinks?.thumbnail || noBookCoverImage,
        notes: state.notes || "",
        dateToRead: state.bookDate || "",
        type: state.state.type
      });
    }
  }, [state]);

  const handleChangeDescription = (event) => {
    setBookData((prevState) => ({ ...prevState, notes: event.target.value }));
  };

  const handleChangeDateCompleted = (event) => {
    setBookData((prevState) => ({
      ...prevState,
      dateToRead: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const object = {
      book: bookData.book,
      title: bookData.title,
      authors: bookData.authors,
      notes: bookData.notes,
      dateToRead: bookData.dateToRead,
      userId: user.uid,
    };

      bookData.type === UPDATE_OPERATION
        ? await updateBookInDb(WISHLIST_TABLE_NAME, bookData.docId, object)
        : await addBookToDb(WISHLIST_TABLE_NAME, object);

    navigate("/Wishlist");
  };

  return (
    <div className="my-10 flex justify-center items-center">
      {state ? (
        <div className="text-center">
          <div className="flex flex-col items-center">
            <img
              className="h-60 w-40 border-2 border-blue-300 rounded-lg"
              src={bookData.image}
              alt={bookData.title}
            />
            <div className="text-xl font-bold">{bookData.title}</div>
            {bookData.authors.length > 0 && <div>by {bookData.authors[0]}</div>}
          </div>

          <div className="mt-10 mb-20">
            <form onSubmit={handleSubmit}>
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
                  value={bookData.dateToRead}
                  onChange={handleChangeDateCompleted}
                  required
                />
              </div>
              <div className="flex justify-center items-center mb-14">
                <label htmlFor="reviewDescription">Notes:</label>
                <textarea
                  className="inline border border-black-200 resize-y rounded-lg ml-2 w-50"
                  value={bookData.notes}
                  onChange={handleChangeDescription}
                  required
                ></textarea>
              </div>
              <div className="flex justify-center">
                <Button type="submit">
                  {bookData.type === UPDATE_OPERATION ? "Edit Book" : "Add to Wishlist"}
                </Button>
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
