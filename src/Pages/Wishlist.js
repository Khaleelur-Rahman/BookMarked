import { collection, getDocs, query,deleteDoc, doc, updateDoc, addDoc } from "firebase/firestore";
import connection from "../backend/connection";
import React, { useEffect, useState } from "react";
import { trimAndAddDots } from "../components/utils";
import { auth } from "../backend/firebase-config";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Wishlist() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = auth.currentUser;
  const {state} = useLocation();

 
  const performUpdate = async () => {
    if (state && state.type==="edit") {
      const db = connection();
      // console.log(state.docId);

      try {
        await updateDoc(doc(db, 'ToRead', state.docId), {
          book: state.book,
          title: state.title,
          docId: state.docId,
          notes: state.notes,
          dateToRead: state.dateToRead,
          userId: user.uid,
        });

        console.log("Document successfully updated");
      } catch (error) {
        console.error("Error updating document:", error);
      }

      toast(`${state.title} was edited`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      } else if (state && state.type === "new") {
        const db = connection();
        const docRef = await addDoc(collection(db, "ToRead"), {
          book : state.book,
          title :state.title,
          notes: state.notes,
          dateToRead: state.dateToRead,
          userId : state.userId
        });
    
          const res = await updateDoc(doc(db,"ToRead",docRef.id), {
            book : state.book,
            title :state.title,
            docId: docRef.id,
            notes: state.notes,
            dateToRead: state.dateToRead,
            userId : state.userId
          });
        console.log("Document written with ID: ", docRef.id);
        toast(`${state.title} was added to Wishlist`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      }
  };

  useEffect(() => {
    performUpdate();
  }, [state]);


  function setLink(url) {
    window.location.href = url;
  }

  async function bookDelete(id,title) {
    const db = connection();
    const res = await deleteDoc(doc(db, "Read",id));
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
                <div onClick={() => bookDelete(doc.data().docId,book.volumeInfo.title)}>
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
      {/* {console.log(state)} */}
      {/* {()=>performEditUpdate} */}
      <div className="flex-grow pb-16">
        <div className="wishlist-header">Wishlist</div>
        <br /><br />
        <div className="wishlist-books">{images}</div>
      </div>
    </div>
  );
}

export default Wishlist;
