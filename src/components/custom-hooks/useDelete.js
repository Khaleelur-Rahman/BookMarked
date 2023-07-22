import { deleteDoc, doc } from 'firebase/firestore';
import { connectiontoDb } from '../../backend/firebase-config';

async function useDelete(id) {
    const db = connectiontoDb;
    const res = await deleteDoc(doc(db, "Read",id));
}

export default useDelete