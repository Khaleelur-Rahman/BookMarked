import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import noBookCoverImage from "../images/No-book-cover.png";
import useNavigation from "../hooks/custom-hooks/useNavigation";
import { addBookToDb, updateBookInDb } from "../backend/functions";
import { READLIST_TABLE_NAME } from "../constants/commonConstants";
import useUserLoggedIn from "../hooks/custom-hooks/useUserLoggedIn";
import Button from "../components/Button";
import { UPDATE_OPERATION } from "../constants/commonConstants";
import { formatDate } from "../utils/utils";
import { routeConstants } from "../constants/routeConstants";

function ReadlistReview() {
  const user = useUserLoggedIn();
  const navigate = useNavigation();

  const { state } = useLocation();

  const [bookData, setBookData] = useState({
    docId: "",
    book: "",
    title: "",
    authors: [],
    image: noBookCoverImage,
    description: "",
    rating: "",
    dateCompleted: "",
    type: "",
  });

  const [ratingType, setRatingType] = useState("text");

  useEffect(() => {
    if (state) {
      setBookData({
        docId: state.docId || "",
        book: state.state,
        title: state.state.volumeInfo.title,
        authors: state.state.volumeInfo.authors || [],
        image: state.state.volumeInfo.imageLinks?.thumbnail || noBookCoverImage,
        description: state.description || "",
        rating: state.rating || "",
        dateCompleted: state.dateCompleted
          ? formatDate(state.dateCompleted, "yyyy-mm-dd")
          : "",
        type: state.state.type || "",
      });
    }
  }, [state]);

  const handleChangeRating = (event) => {
    setBookData((prevState) => ({ ...prevState, rating: event.target.value }));
  };

  const handleChangeDescription = (event) => {
    setBookData((prevState) => ({
      ...prevState,
      description: event.target.value,
    }));
  };

  const handleChangeDateCompleted = (event) => {
    setBookData((prevState) => ({
      ...prevState,
      dateCompleted: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const object = {
      book: bookData.book,
      title: bookData.title,
      authors: bookData.authors,
      description: bookData.description,
      dateCompleted: formatDate(bookData.dateCompleted, "dd/MM/yyyy"),
      rating: bookData.rating,
      userId: user.uid,
    };

    bookData.type === UPDATE_OPERATION
      ? await updateBookInDb(READLIST_TABLE_NAME, bookData.docId, object)
      : await addBookToDb(READLIST_TABLE_NAME, object);

    navigate(routeConstants.READ.path);
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
                Write your review below to add to Readlist:
              </h3>
              <label htmlFor="reviewStars">Rating: </label>
              <input
                type={ratingType}
                className="inline border rounded-lg border-black-200 w-12 ml-2 m-3"
                min="0"
                max="5"
                step="0.1"
                value={bookData.rating}
                onChange={handleChangeRating}
                onFocus={() => setRatingType("number")}
                onBlur={() => setRatingType("text")}
                required
              />
              /5
              <br />
              <label htmlFor="reviewDateCompleted">Date completed : </label>
              <input
                type="date"
                className="inline border rounded-lg border-black-200 w-28 ml-2 mb-4"
                value={bookData.dateCompleted}
                onChange={handleChangeDateCompleted}
                required
              ></input>
              <br />
              <div className="flex justify-center items-center mb-14">
                <label htmlFor="reviewDescription">Review:</label>
                <textarea
                  id="reviewDescription"
                  className="inline border border-black-200 resize-y rounded-lg ml-2 w-50"
                  value={bookData.description}
                  onChange={handleChangeDescription}
                ></textarea>
              </div>
              <div className="flex justify-center">
                <Button type="submit">
                  {bookData.type === UPDATE_OPERATION
                    ? "Edit Book"
                    : "Add to Readlist"}
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

export default ReadlistReview;
