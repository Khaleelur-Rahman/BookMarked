import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import { connectiontoDb } from "../backend/firebase-config";
import DisplayToast from "../components/DisplayToast";
import {
  TOAST_ERROR,
  TOAST_ERROR_DELETING_BOOK,
  TOAST_ERROR_FETCHING_BOOKS,
} from "../constants/toastConstants";

export async function deleteBookFromDb(tableName, id, title) {
  const db = connectiontoDb;
  localStorage.setItem("bookTitle", title);
  localStorage.setItem("action", "deleted");
  try {
    await deleteDoc(doc(db, tableName, id));
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

