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
        {/* //     <h3 className="login-header">Login to access the features </h3>
        //     <div className="login-buttons">
        //       <div className="login">
        //         <input type='text' placeholder='Enter your email address' onChange={(event) => setLoginEmail(event.target.value)}></input>
        //         <input type='password' placeholder='Enter your password' onChange={(event) => setLoginPassword(event.target.value)}></input>
        //         <button onClick={login}>Login</button>
        //       </div>
        //       <div className="login-other-functions">
        //         <button onClick={LoginWithGoogle} className="login-with-google"></button>
        //         <button onClick={gotoResgister}>Register</button>
        //       </div>
        //     </div> */}

        
        <h3 class ="flex justify-center content-center  mb-8 tracking-wider text-gray-500 md:text-lg dark:text-gray-400">Login to access the features </h3>
        <div class="flex justify-center content-center mt-20">
        {/* <h3 className="login-header">Login to access the features </h3> */}
        <form class="bg-white shadow-md shadow-cyan-500/50 rounded px-8 pt-6 pb-8 mb-4">
          <div
            class="flex flex-start items-center justify-center lg:justify-center">
            <p class="mb-0 mr-4 text-lg font-semibold">Login with</p>

            <button
              type="button"
              data-te-ripple-color="light"
              class="mx-1 h-9 w-9 bg-sky-500/50 rounded-full bg-primary uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={LoginWithGoogle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mx-auto h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                  fill-rule="evenodd"
                  clip-rule="evenodd" />              
              </svg>
            </button>
          </div>

          <div
            class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p
              class="mx-4 mb-0 text-center font-semibold dark:text-white">
              Or
            </p>
          </div>

          <div class="relative mb-6 border-b-2 border-cyan-400" data-te-input-wrapper-init>
            <input
              type="text"
              class="peer block +-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput2"
              placeholder="Email address" 
              onChange={(event) => setLoginEmail(event.target.value)}/>
            <label
              for="exampleFormControlInput2"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >Email address
            </label>
          </div>

          <div class="relative mb-6 border-b-2 border-cyan-400" data-te-input-wrapper-init>
            <input
              type="password"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput22"
              placeholder="Password" 
              onChange={(event) => setLoginPassword(event.target.value)}/>
            <label
              for="exampleFormControlInput22"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >Password
            </label>
          </div>
          <div class="text-center lg:text-left">
            <div className="flex justify-end content-center">
              <button
                type="button"
                className="flex justify-center content-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Login
              </button>
              </div>


            <p class="mb-0 mt-5 pt-1 text-sm font-semibold">
              Don't have an account?
              <a
                href="#!"
                class="ml-8 text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
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