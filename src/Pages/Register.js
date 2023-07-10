import React, { useState , useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../backend/firebase-config';

function Register () {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [user, setUser] = useState(null);
    

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth,registerEmail,registerPassword);
            // console.log(user);
            window.location.href = "/BookForm";
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        return () => unsubscribe();
      }, []);

    
    return (
        <div>
            <h3 className= "register-header"> Register with email address</h3>
            <div className="register-buttons">
                <input type='text' placeholder='Enter your email address' onChange={(event) => setRegisterEmail(event.target.value)}></input>
                <input type='password' placeholder='Enter your password' onChange={(event) => setRegisterPassword(event.target.value)}></input>
                <br /><br />
                <button onClick={register} className='register-submit-button'>Register</button>
            </div>
            
        </div>
    )
}

export default Register;