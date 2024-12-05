import {
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { connectiontoDb } from "../backend/firebase-config";
import DisplayToast from "../components/DisplayToast";
import {
  TOAST_ERROR,
  TOAST_ERROR_DELETING_BOOK,
  TOAST_ERROR_FETCHING_BOOKS,
  TOAST_ERROR_UPDATING_BOOK,
  TOAST_ERROR_ADDING_BOOK,
  TOAST_ERROR_BOOK_ALREADY_EXIST,
} from "../constants/toastConstants";

export async function deleteBookFromDb(tableName, id, title) {
  const db = connectiontoDb;
  try {
    await deleteDoc(doc(db, tableName, id));
    localStorage.setItem("bookTitle", title);
    localStorage.setItem("action", "deleted");
  } catch (err) {
    DisplayToast(TOAST_ERROR, TOAST_ERROR_DELETING_BOOK);
  }
}

export async function getBooksFromDb(tableName, id) {
  const db = connectiontoDb;
  try {
    const docsSnap = await getDocs(query(collection(db, tableName)));
    return docsSnap.docs.filter((doc) => doc.data().userId === id);
  } catch (err) {
    DisplayToast(TOAST_ERROR, TOAST_ERROR_FETCHING_BOOKS);
    return [];
  }
}

export async function addBookToDb(tableName, object) {
  const db = connectiontoDb;
  try {
    // Perform a query to check if the book is already present
    const querySnapshot = await getDocs(
      query(collection(db, tableName), where("title", "==", object.title))
    );

    if (!querySnapshot.empty) {
      // If the book is already present, display a toast notification
      DisplayToast(TOAST_ERROR, TOAST_ERROR_BOOK_ALREADY_EXIST);
      return;
    }

    // If the book is not present, add it to the database
    const docRef = await addDoc(collection(db, tableName), object);
    await updateDoc(doc(db, tableName, docRef.id), {
      ...object,
      docId: docRef.id,
    });

    localStorage.setItem("bookTitle", object.title);
    localStorage.setItem("action", "added");
  } catch (err) {
    DisplayToast(TOAST_ERROR, TOAST_ERROR_ADDING_BOOK);
  }
}

export async function updateBookInDb(tableName, id, object) {
  const db = connectiontoDb;
  try {
    await updateDoc(doc(db, tableName, id), object);
    localStorage.setItem("bookTitle", object.title);
    localStorage.setItem("action", "edited");
  } catch (err) {
    DisplayToast(TOAST_ERROR, TOAST_ERROR_UPDATING_BOOK);
  }
}
