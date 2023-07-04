import React, { useState , useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup} from 'firebase/auth';
import { auth, googleProvider} from '../backend/firebase-config';

function Authentication() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        return () => unsubscribe();
      }, []);
  
    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth,registerEmail,registerPassword);
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }
  
    const login = async () => {
      try {
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(user);
      } catch (error) {
        console.log(error.message);
      }
    }
  
    const logout = async () => {
      try {
        await signOut(auth);
        setUser(null);
      } catch (error) {
        console.log(error.message);
      }
    }

   const LoginWithGoogle = async () => {
    try {
      const provider = googleProvider;
      const user = await signInWithPopup(auth, provider);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
        <div>
            <h3>Register User : </h3>
            <input type='text' placeholder='Enter your email address' onChange={(event) => setRegisterEmail(event.target.value)}></input>
            <input type='password' placeholder='Enter your password' onChange={(event) => setRegisterPassword(event.target.value)}></input>

            <button onClick={register}>Create User</button>
        </div>

        <div>
            <h3>Login User : </h3>
            <input type='text' placeholder='Enter your email address' onChange={(event) => setLoginEmail(event.target.value)}></input>
            <input type='password' placeholder='Enter your password' onChange={(event) => setLoginPassword(event.target.value)}></input>

            <button onClick={login}>Login</button>
            <button onClick={LoginWithGoogle}>Sign in with google</button>
        </div>

        <h2>User logged in :</h2> 
        {user && user?.email}
        {console.log(user?.uid)}
        <br />
        <button onClick={logout}>Sign Out</button>
    </div>
  )
}

export default Authentication