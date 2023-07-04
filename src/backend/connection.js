import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

export default function connection() {

    const firebaseConfig = {
        apiKey: "AIzaSyBg30U9BLiwKrWpQxsqZdoNEif_947nGqw",
        authDomain: "booklibrary-919a0.firebaseapp.com",
        projectId: "booklibrary-919a0",
        storageBucket: "booklibrary-919a0.appspot.com",
        messagingSenderId: "1094807566860",
        appId: "1:1094807566860:web:81adc42e02b2c24073cc29",
        measurementId: "G-L35FY2RY15"
    }
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return db;
}