import { collection, getDocs, query } from "firebase/firestore";
import connection from "../backend/connection";
import React, { useEffect, useState } from "react";
import { trimAndAddDots } from "../components/utils";
import { auth } from "../backend/firebase-config";

function Read() {
  const [images, setImages] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    async function fetchData() {
      if(user) {
      const db = connection();
      const docsSnap = await getDocs(query(collection(db, "Read")));

      const imageElements = docsSnap.docs.map((doc) => {
        if(doc.data().userId === user.uid) {
          const book = doc.data().book;
          return (
          <div className="book-details">
            <img
              key={doc.id}
              className="read-books-image"
              src={book.volumeInfo?.imageLinks?.thumbnail}
              alt={book.volumeInfo?.title}
            />
            <div>{trimAndAddDots(book.volumeInfo.title)}</div>
            <div>{doc.data().rating} / 5</div>
          </div>
          );
        }
      });

      setImages(imageElements);
    } else {
      window.location.href = "/Login";
    }
  }

    fetchData();
  }, []);

  return (
    <div className="read-component">
        <div className="read-header">Readlist</div><br/><br/>
        <div className="read-books">{images}</div>
    </div>
  )
}

export default Read;
