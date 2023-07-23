import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { trimAndAddDots } from "../components/utils";
import { auth, connectiontoDb } from "../backend/firebase-config";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import noBookCoverImage from "../images/No-book-cover.png";

function Wishlist() {
  const [images, setImages] = useState([]); //Set images of received books from the database
  const [isLoading, setIsLoading] = useState(true); //Display loading when the backend is fetching data from the database

  function setLink(url) {
    window.location.href = url;
  }

  async function bookDelete(id, title) {
    //Function to delete a book from the database
    const db = connectiontoDb;
    localStorage.setItem("bookTitle", title);
    localStorage.setItem("action", "deleted");
    const res = await deleteDoc(doc(db, "ToRead", id));
    setLink("/Wishlist");
  }

  useEffect(() => {
    //Display all the books in the "Read" database by matching logged in user's id
    const fetchData = async (user) => {
      const db = connectiontoDb;
      const docsSnap = await getDocs(query(collection(db, "ToRead")));
      const imageElements = docsSnap.docs
        .filter((doc) => doc.data().userId === user.uid)
        .map((doc) => {
          const book = doc.data().book;
          return (
            <div>
              <div className="book-details">
                <img
                  key={doc.id}
                  className="wishlist-books-image"
                  src={
                    book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks.thumbnail
                      : noBookCoverImage
                  }
                  alt={book.volumeInfo?.title}
                />
                <div className="text-xl text-slate-800 font-semibold subpixel-antialiased m-3">
                  {trimAndAddDots(book.volumeInfo.title)}
                </div>
                <div>Date to read: {doc.data().dateToRead}</div>
                <div className="image-links">
                  <Link
                    to={"/BookForm/WishlistReview"}
                    state={{
                      state: book,
                      notes: doc.data().notes,
                      bookDate: doc.data().dateToRead,
                      docId: doc.data().docId,
                    }}
                    className="add-read"
                  >
                    View and Edit Description
                  </Link>
                  <br />
                  <div onClick={() => setLink(book.volumeInfo.infoLink)}>
                    Book Details
                  </div>
                  <div
                    className="mt-6"
                    onClick={() =>
                      bookDelete(doc.data().docId, book.volumeInfo.title)
                    }
                  >
                    Delete
                  </div>
                </div>
              </div>
            </div>
          );
        });
      setImages(imageElements);
      setIsLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchData(user);
      } else {
        setIsLoading(false);
        window.location.href = "/Login"; //Return to login page if user is not logged in
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div className="mb-200">Loading...</div>;
  }

  const displayToast = () => {
    if (localStorage.getItem("bookTitle") !== null) {
      const title = localStorage.getItem("bookTitle");
      const action = localStorage.getItem("action");
      localStorage.clear();

      toast(`${title} was ${action}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow pb-16">
        {displayToast()}
        <div className="wishlist-header">Wishlist</div>
        <br />
        <br />
        <div className="wishlist-books">
          {images.length === 0 ? (
            <div className="text-xl font-medium">
              No books found. Go to book search to add books to wishlist!
            </div>
          ) : (
            <div className="wishlist-books">{images}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
