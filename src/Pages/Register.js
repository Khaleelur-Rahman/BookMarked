import React, { useState , useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth,i } from 'firebase/auth';
import { auth } from '../backend/firebase-config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'firebase/auth';

function Register () {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        return () => unsubscribe();
      }, []);

      const displayToast = (message) => {
        return (
        toast.error(message, {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        
        })
        )
      }
    

    const register = async (event) => {

        event.preventDefault();

        if(registerEmail === "" || registerPassword === "") {
          displayToast("Email address and password should not be empty!");
        } else {

          createUserWithEmailAndPassword(auth,registerEmail,registerPassword)
              .then((userCredentials) => {
                  const user = userCredentials.user;
                  localStorage.setItem("registerEmail", user.email);
                  window.location.href = "/Login";
              })
              .catch((error) => {
                  switch (error.code) {
                      case 'auth/email-already-in-use':
                        displayToast(`Email address ${registerEmail} already in use.`);
                        break;
                      case 'auth/invalid-email':
                        displayToast(`Email address ${registerEmail} is invalid.`);
                        break;
                      case 'auth/operation-not-allowed':
                        displayToast(`Error during sign up.`);
                        break;
                      case 'auth/weak-password':
                        displayToast('Password should be of minimum 7 characters. Should have at least one special character and one number.');
                        break;
                      default:
                        displayToast(error.message);
                        break;
                    } 
              });
            }
    }

    const gotoLogin = () => {
        window.location.href = "/Login";
    }

    
    return (
        <div >
            
            {/* <div className="register-buttons">
                <input type='text' placeholder='Enter your email address' onChange={(event) => setRegisterEmail(event.target.value)}></input>
                <input type='password' placeholder='Enter your password' onChange={(event) => setRegisterPassword(event.target.value)}></input>
                <br /><br />
                <button onClick={register} className='register-submit-button'>Register</button>
            </div> */}
            <h3 className="flex justify-center content-center  mb-8 tracking-wider text-gray-500 md:text-lg dark:text-gray-400"> Register with email address</h3>
            
            <div className ="flex justify-center content-center mt-20">
                
                <form className="bg-white shadow-md shadow-cyan-500/50 rounded px-8 pt-6 pb-8 mb-4">
                    
                    <h1 className="flex justify-center content-center mb-8 text-xl font-semibold whitespace-nowrap dark:text-white">Register</h1>
                    
                    <div className="relative mb-6 border-b-2 border-cyan-400" data-te-input-wrapper-init>
            <input 
            type="email" 
            id="email" 
            value={registerEmail}
            onChange={(event) => setRegisterEmail(event.target.value)}
            className="box-border block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder=" "
            required 
            />
            <label 
            htmlFor="email" 
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >Email Address</label>
          </div>

          <div className="relative mb-6 border-b-2 border-cyan-400" data-te-input-wrapper-init>
            <input 
            type="password" 
            id="password" 
            pattern="(?=.*\d)(?=.*[\W_]).{7,}" 
            title="Password should be of minimum 7 characters. Should have at least one special character and one number."
            value={registerPassword}
            onChange={(event) => setRegisterPassword(event.target.value)}
            className="box-border block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder=" "
            required 
            />
            <label 
            htmlFor="password" 
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >Password</label>
          </div>

            <div className="flex justify-end content-center">
                 <button 
                    type="submit" 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={register}
                    id="register"
                >
                    Register
                </button>
            </div>

            <p className="mb-0 mt-5 pt-1 text-sm font-semibold">
                Already have an account?
                <a
                    href="#!"
                    className="ml-8 text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                    onClick={gotoLogin}
                >
                Login
                </a>
            </p>
        </form>
    </div>
            
        </div>
    )
}

export default Register;