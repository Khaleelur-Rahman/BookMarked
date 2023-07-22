import React from 'react'
import { deleteDoc, doc } from 'firebase/firestore';
import { connectiontoDb } from '../../backend/firebase-config';

async function useDelete(id) {
    
    const db = connectiontoDb;
    // const res = await db.collection('Read').doc(id).delete();
    const res = await deleteDoc(doc(db, "Read",id));
    console.log(res);
}

export default useDelete