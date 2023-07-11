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

    const gotoLogin = () => {
        window.location.href = "/Login";
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        return () => unsubscribe();
      }, []);

    
    return (
        <div >
            
            {/* <div className="register-buttons">
                <input type='text' placeholder='Enter your email address' onChange={(event) => setRegisterEmail(event.target.value)}></input>
                <input type='password' placeholder='Enter your password' onChange={(event) => setRegisterPassword(event.target.value)}></input>
                <br /><br />
                <button onClick={register} className='register-submit-button'>Register</button>
            </div> */}
            <h3 class="flex justify-center content-center  mb-8 tracking-wider text-gray-500 md:text-lg dark:text-gray-400"> Register with email address</h3>
            
            <div class ="flex justify-center content-center mt-20">
                
                <form class="bg-white shadow-md shadow-cyan-500/50 rounded px-8 pt-6 pb-8 mb-4">
                    
                    <h1 class="flex justify-center content-center mb-8 text-xl font-semibold whitespace-nowrap dark:text-white">Register</h1>
                    
                    <div class="relative mb-6 border-b-2 border-cyan-400" data-te-input-wrapper-init>
                        <input
                        type="text"
                        class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput2"
                        placeholder="Email address" 
                        onChange={(event) => setRegisterEmail(event.target.value)}/>
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
                        onChange={(event) => setRegisterPassword(event.target.value)} />
                        <label
                        for="exampleFormControlInput22"
                        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Password
                        </label>
                    </div>
                    <div className="flex justify-end content-center">
                        <button 
                            type="submit" 
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={register}
                        >
                            Register
                        </button>
                    </div>
                    <p class="mb-0 mt-5 pt-1 text-sm font-semibold">
                    Already have an account?
                    <a
                        href="#!"
                        class="ml-8 text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                        onClick={gotoLogin}
                    >Login</a
                    >
                    </p>
                </form>
            </div>
            
        </div>
    )
}

export default Register;