import { collection, getDocs, query, deleteDoc, doc, updateDoc, addDoc} from "firebase/firestore";
import connection from "../backend/connection";
import React, { useEffect, useState } from "react";
import { trimAndAddDots } from "../components/utils";
import { auth } from "../backend/firebase-config";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Read() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = auth.currentUser;
  const {state} = useLocation();

  const performUpdate = async () => {
    if (state && state.type==="edit") {
      const db = connection();
      // console.log(state.docId);

      try {
        await updateDoc(doc(db, 'Read', state.docId), {
          book: state.book,
          title: state.title,
          docId: state.docId,
          description: state.description,
          rating: state.rating,
          dateCompleted: state.dateCompleted,
          userId: state.userId,
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

       const docRef = await addDoc(collection(db, "Read"), {
          book : state.book,
          title :state.title,
          description: state.description,
          rating: state.rating,
          dateCompleted: state.dateCompleted,
          userId : state.userId
        });

    const res = await updateDoc(doc(db, 'Read', docRef.id), {
      book: state.book,
      title: state.title,
      docId: docRef.id,
      description: state.description,
      rating: state.rating,
      dateCompleted: state.dateCompleted,
      userId: user.uid
    });
          console.log("Document written with ID: ", docRef.id);
          toast(`${state.title} was added to Readlist`, {
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
    // const res = await db.collection('Read').doc(id).delete();
    const res = await deleteDoc(doc(db, "Read",id));
    console.log(res);
    setLink("/Read");
  }

  useEffect(() => {
    const fetchData = async (user) => {
      const db = connection();
      const docsSnap = await getDocs(query(collection(db, "Read")));
      const imageElements = docsSnap.docs
        .filter((doc) => doc.data().userId === user.uid)
        .map((doc) => {
          const book = doc.data().book;
          // console.log(doc.data());
          return (
            <div className="book-details">
              <img
                key={doc.id}
                className="read-books-image"
                src={book.volumeInfo?.imageLinks?.thumbnail}
                alt={book.volumeInfo?.title}
              />
              <div className="text-xl text-slate-800 font-semibold subpixel-antialiased m-3">{trimAndAddDots(book.volumeInfo.title)}</div>
              <div className="text-lg ">Rating : {doc.data().rating} / 5</div>
              <div className="image-links"> 
                <Link
                    to={"/BookForm/ReadlistReview"} state={{ state: book, bookRating: doc.data().rating, bookDescription: doc.data().description, bookDate: doc.data().dateCompleted, docId: doc.data().docId}}
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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow pb-16">
        <div className="read-header">Readlist</div>
        <br /><br />
        <div className="read-books">{images}</div>
      </div>
    </div>
  );
}

export default Read;
