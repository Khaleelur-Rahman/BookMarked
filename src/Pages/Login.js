import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../backend/firebase-config";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";
import useNavigation from "../hooks/custom-hooks/useNavigation";
import DisplayToast from "../components/DisplayToast";
import {
  TOAST_ERROR,
  TOAST_INCORRECT_PASSWORD,
  TOAST_LOGGED_OUT_SUCCESSFULLY,
  TOAST_NOT_EMPTY_EMAIL_AND_PASSWORD,
  TOAST_REGISTERED_SUCCESSFULLY,
  TOAST_SUCCESS,
  TOAST_USER_NOT_FOUND,
} from "../constants/toastConstants";
import {
  LOGIN_EMAIL_PASSWORD,
  LOGIN_GOOGLE,
} from "../constants/commonConstants";
import useUserLoggedIn from "../hooks/custom-hooks/useUserLoggedIn";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigation();
  const user = useUserLoggedIn();

  if (user) {
    navigate("/BookForm")
  }

  useEffect(() => {
    // To display toast when the user is directed to login page after registration
    const registerEmail = localStorage.getItem("registerEmail");

    // To display toast when the user is directed to login page after logging out
    const logoutEmail = localStorage.getItem("logoutEmail");

    if (registerEmail) {
      DisplayToast(TOAST_SUCCESS, TOAST_REGISTERED_SUCCESSFULLY(registerEmail));
      localStorage.removeItem("registerEmail");
    } else if (logoutEmail) {
      DisplayToast(TOAST_SUCCESS, TOAST_LOGGED_OUT_SUCCESSFULLY(logoutEmail));
      localStorage.removeItem("logoutEmail");
    }
  }, []);

  const handleLogin = async (event, loginMethod) => {
    event.preventDefault();

    try {
      let userCredentials;

      // Different login methods based on the input
      if (loginMethod === LOGIN_EMAIL_PASSWORD) {
        if (loginEmail === "" || loginPassword === "") {
          DisplayToast(TOAST_ERROR, TOAST_NOT_EMPTY_EMAIL_AND_PASSWORD);
          return;
        }

        userCredentials = await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        );
      } else if (loginMethod === LOGIN_GOOGLE) {
        userCredentials = await signInWithPopup(auth, googleProvider);
      } else {
        throw new Error("Invalid login method");
      }

      const user = userCredentials.user;
      localStorage.setItem("loginEmail", user.email);

      navigate("/BookForm");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          DisplayToast(TOAST_ERROR, TOAST_USER_NOT_FOUND);
          break;
        case "auth/wrong-password":
          DisplayToast(TOAST_ERROR, TOAST_INCORRECT_PASSWORD);
          break;
        default:
          DisplayToast(TOAST_ERROR, error.message);
          break;
      }
    }
  };

  const loginWithEmailAndPassword = (event) =>
    handleLogin(event, LOGIN_EMAIL_PASSWORD);

  // For Google login
  const loginWithGoogle = (event) => handleLogin(event, LOGIN_GOOGLE);

  return (
    <div>
      <h3 className="flex justify-center content-center  mb-8 tracking-wider text-gray-500 md:text-lg dark:text-gray-400">
        Login to access the features{" "}
      </h3>
      <div className="flex justify-center content-center mt-20">
        <form className="bg-white shadow-md shadow-cyan-500/50 rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-start items-center justify-center lg:justify-center">
            <p className="mb-0 mr-4 text-lg font-semibold">Login with</p>

            <button
              type="button"
              data-te-ripple-color="light"
              className="mx-1 h-10 w-10 bg-sky-500/50 rounded-full bg-primary uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={loginWithGoogle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
            </button>
          </div>

          <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
              Or
            </p>
          </div>

          <div
            className="relative mb-6 border-b-2 border-cyan-400"
            data-te-input-wrapper-init
          >
            <input
              type="email"
              id="email"
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
              className="box-border block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
              Email Address
            </label>
          </div>

          <div
            className="relative mb-6 border-b-2 border-cyan-400"
            data-te-input-wrapper-init
          >
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
            >
              Password
            </label>
          </div>

          <div className="text-center lg:text-left">
            <div className="flex justify-end content-center">
              <Button
                data-te-ripple-color="light"
                onClick={loginWithEmailAndPassword}
                data-testid="login-button"
              >
                Login
              </Button>
            </div>

            <p className="mb-0 mt-5 pt-1 text-sm font-semibold">
              Don't have an account?
              <a
                href="#!"
                className="text-blue-600 ml-8 text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                onClick={() => navigate("/Register")}
              >
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
