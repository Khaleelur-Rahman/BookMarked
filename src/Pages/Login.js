import React, { useState , useEffect} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup} from 'firebase/auth';
import { auth, googleProvider} from '../backend/firebase-config';
import useGoBackHistory from '../components/custom-hooks/useGoBackHistory';
import { useNavigate } from "react-router-dom";

function Login () {

    
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        return () => unsubscribe();
      }, []);

    const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
          // console.log(user);
          // console.log(navigate(-1));
          navigate(-1);
        } catch (error) {
          console.log(error.message);
        }
        // window.location.href = () => useGoBackHistory;
      }

    const LoginWithGoogle = async () => {
        try {
            const provider = googleProvider;
            const user = await signInWithPopup(auth, provider);
            // console.log(user);
            navigate(-1);
        }   catch (error) {
            console.log(error.message);
        }
    }

    const gotoResgister = () => {
        window.location.href = "/register";
    }

    return (
        <div>
            <h3 className="login-header">Login to access the features </h3>
            <div className="login-buttons">
              <div className="login">
                <input type='text' placeholder='Enter your email address' onChange={(event) => setLoginEmail(event.target.value)}></input>
                <input type='password' placeholder='Enter your password' onChange={(event) => setLoginPassword(event.target.value)}></input>
                <button onClick={login}>Login</button>
              </div>
              <div className="login-other-functions">
                <button onClick={LoginWithGoogle} className="login-with-google"></button>
                <button onClick={gotoResgister}>Register</button>
              </div>
            </div>

        </div>
    );
}

export default Login;