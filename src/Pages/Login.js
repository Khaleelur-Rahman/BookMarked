import React, { useState , useEffect} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup} from 'firebase/auth';
import { auth, googleProvider} from '../backend/firebase-config';

function Login () {

    
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        return () => unsubscribe();
      }, []);

    const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
          console.log(user);
        } catch (error) {
          console.log(error.message);
        }
      }

    const LoginWithGoogle = async () => {
        try {
            const provider = googleProvider;
            const user = await signInWithPopup(auth, provider);
            console.log(user);
        }   catch (error) {
            console.log(error.message);
        }
    }

    const gotoResgister = () => {
        window.location.href = "/register";
    }

    return (
        <div>
            <h3>Login User : </h3>
            <input type='text' placeholder='Enter your email address' onChange={(event) => setLoginEmail(event.target.value)}></input>
            <input type='password' placeholder='Enter your password' onChange={(event) => setLoginPassword(event.target.value)}></input>
            <br />
            <button onClick={login}>Login</button>
            <button onClick={LoginWithGoogle}>Login with google</button>
            <br />
            <button onClick={gotoResgister}>Register</button>

        </div>
    );
}

export default Login;