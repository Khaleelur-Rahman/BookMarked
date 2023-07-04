import { collection, getDocs, query } from "firebase/firestore";
import connection from "../backend/connection";
import React, { useEffect, useState } from "react";
import { trimAndAddDots } from "../components/utils";
import { auth } from "../backend/firebase-config";

function Wishlist() {

  const [images, setImages] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    async function fetchData() {
      if(user) { 
      const db = connection();
      const docsSnap = await getDocs(query(collection(db, "ToRead")));
        const imageElements = docsSnap.docs.map((doc) => {
        if(doc.data().userId === user.uid) {
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
              <div>{trimAndAddDots(book.volumeInfo.title)}</div>
              <div>Date to read : {doc.data().dateToRead}</div>
              </div>
          </div>
          );
        }
      });
    setImages(imageElements);
      }
      else {
        window.location.href = "/Login";
      }
  }

    fetchData();
  }, []);

  return (
    <div className="wishist-component">
        <div className="wishlist-header">Wishlist</div><br/><br/>
        <div className="wishlist-books">{images}</div>;
    </div>
  )
}

export default Wishlist;

