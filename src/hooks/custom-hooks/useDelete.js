import { deleteDoc, doc } from 'firebase/firestore';
import { connectiontoDb } from '../../backend/firebase-config';


//Function to delete a document from the database
async function useDelete(id) {
    const db = connectiontoDb;
    const res = await deleteDoc(doc(db, "Read",id));
}

export default useDelete