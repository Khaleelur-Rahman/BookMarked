import React, { useState , useEffect} from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider} from '../backend/firebase-config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthState from "../components/custom-hooks/useAuthState"

function Login () {

    
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const user = useAuthState(auth);

    const login = async (event) => {
      event.preventDefault();

      if(loginEmail === "" || loginPassword === "") {
        displayToastError("Email address and password should not be empty!");
      }
      else {
        try {
          const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
          localStorage.setItem("loginEmail",user.user.email);
            window.location.href = "/BookForm";

        } catch (error) {
          setLoginEmail("");
          setLoginPassword("");

          switch (error.code) {
            case 'auth/user-not-found':
              displayToastError("User not found!");
              break;
            case 'auth/wrong-password':
              displayToastError("Wrong password!");
              break;
            default:
              displayToastError(error.message);
              break;
          }
        }
      }
    }

    const LoginWithGoogle = async (event) => {
        event.preventDefault();

          try {
              const provider = googleProvider;
              const user = await signInWithPopup(auth, provider);
              localStorage.setItem("loginEmail", user.user.email);
              window.location.href = "/BookForm";
          }   catch (error) {
              setLoginEmail("");
              setLoginPassword("");
              switch (error.code) {
                case 'auth/user-not-found':
                  displayToast(`User not found!`);
                  break;
                case 'auth/wrong-password':
                  displayToast(`Wrong password!`);
                  break;
                default:
                  displayToast(error.message);
                  break;
              }
            }
    }

    const gotoResgister = () => {
        window.location.href = "/register";
    }

    const displayToastError = (message) => {
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

    const displayToast = () => {
      if(localStorage.getItem('registerEmail') !== null) {

        const email = localStorage.getItem('registerEmail');

        localStorage.clear();
  
        toast.success(`${email} registered successfully! Please login with your credentials`, {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if(localStorage.getItem('logoutEmail') !== null) {
        const email = localStorage.getItem('logoutEmail');
        
        localStorage.clear();
  
        toast.success(`${email} logged out successfully!`, {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }

    return (
        <div>
        {displayToast()}
        <h3 className ="flex justify-center content-center  mb-8 tracking-wider text-gray-500 md:text-lg dark:text-gray-400">Login to access the features </h3>
        <div className="flex justify-center content-center mt-20">
        <form className="bg-white shadow-md shadow-cyan-500/50 rounded px-8 pt-6 pb-8 mb-4">
          <div
            className="flex flex-start items-center justify-center lg:justify-center">
            <p className="mb-0 mr-4 text-lg font-semibold">Login with</p>

            <button
              type="button"
              data-te-ripple-color="light"
              className="mx-1 h-9 w-9 bg-sky-500/50 rounded-full bg-primary uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={LoginWithGoogle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                  fillRule="evenodd"
                  clipRule="evenodd" />              
              </svg>
            </button>
          </div>

          <div
            className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p
              className="mx-4 mb-0 text-center font-semibold dark:text-white">
              Or
            </p>
          </div>

          <div className="relative mb-6 border-b-2 border-cyan-400" data-te-input-wrapper-init>
            <input 
            type="email" 
            id="email" 
            value={loginEmail}
            onChange={(event) => setLoginEmail(event.target.value)}
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
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
            className="box-border block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder=" "
            required
            />
            <label 
            htmlFor="password" 
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >Password</label>
          </div> 
          
          <div className="text-center lg:text-left">
            <div className="flex justify-end content-center">
              <button
                type="button"
                className="flex justify-center content-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={login}
                data-testid = "login-button"
              >
                Login
              </button>
              </div>


            <p className="mb-0 mt-5 pt-1 text-sm font-semibold">
              Don't have an account?
              <a
                href="#!"
                className="ml-8 text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                onClick={gotoResgister}
              >Register</a
              >
            </p>
          </div>
        </form>
        </div>
      </div>
    );
}


export default Login;