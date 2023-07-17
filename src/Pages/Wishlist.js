import { collection, getDocs, query,deleteDoc, doc } from "firebase/firestore";
import connection from "../backend/connection";
import React, { useEffect, useState } from "react";
import { trimAndAddDots } from "../components/utils";
import { auth } from "../backend/firebase-config";
import { Link } from "react-router-dom";


function Wishlist() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function setLink(url) {
    window.location.href = url;
  }

  async function bookDelete(id) {
    const db = connection();
    // const res = await db.collection('Read').doc(id).delete();
    const res = await deleteDoc(doc(db, "ToRead",id));
    console.log(res);
    setLink("/Wishlist");
  }

  useEffect(() => {
    const fetchData = async (user) => {
      const db = connection();
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
                  src={book.volumeInfo?.imageLinks?.thumbnail}
                  alt={book.volumeInfo?.title}
                />
                <div className="text-xl text-slate-800 font-semibold subpixel-antialiased m-3">{trimAndAddDots(book.volumeInfo.title)}</div>
                <div>Date to read: {doc.data().dateToRead}</div>
                <div className="image-links">
                <Link
                    to={"/BookForm/WishlistReview"} state={{ state: book, notes: doc.data().notes, bookDate: doc.data().dateToRead, docId: doc.data().docId}}
                    className="add-read"
                    >
                    View and Edit Description
                </Link>
                <br />
                <div onClick={() => setLink(book.volumeInfo.infoLink)}>
                    Book Details
                </div>
                <div onClick={() => bookDelete(doc.data().docId)}>
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
        window.location.href = "/Login";
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div className="mb-200">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow pb-16">
        <div className="wishlist-header">Wishlist</div>
        <br /><br />
        <div className="wishlist-books">{images}</div>
      </div>
    </div>
  );
}

export default Wishlist;