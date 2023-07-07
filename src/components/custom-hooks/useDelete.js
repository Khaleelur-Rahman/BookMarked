import React from 'react'
import { deleteDoc, doc } from 'firebase/firestore';
import connection from '../../backend/connection';

async function useDelete(id) {
    
    const db = connection();
    // const res = await db.collection('Read').doc(id).delete();
    const res = await deleteDoc(doc(db, "Read",id));
    console.log(res);
}

export default useDelete