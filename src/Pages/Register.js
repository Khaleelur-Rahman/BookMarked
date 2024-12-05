import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebase-config";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";
import useNavigation from "../hooks/custom-hooks/useNavigation";
import DisplayToast from "../components/DisplayToast";
import {
  TOAST_EMAIL_IN_USE,
  TOAST_ERROR,
  TOAST_ERROR_DURING_REGISTRATION,
  TOAST_INVALID_EMAIL,
  TOAST_NOT_EMPTY_EMAIL_AND_PASSWORD,
  TOAST_WEAK_PASSWORD,
} from "../constants/toastConstants";
import { routeConstants } from "../constants/routeConstants";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const navigate = useNavigation();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (registerEmail === "" || registerPassword === "") {
      DisplayToast(TOAST_ERROR, TOAST_NOT_EMPTY_EMAIL_AND_PASSWORD);
    } else {
      createUserWithEmailAndPassword(auth, registerEmail, registerPassword) //create a new user using email and password
        .then((userCredentials) => {
          const user = userCredentials.user;
          localStorage.setItem("registerEmail", user.email);
          navigate(routeConstants.LOGIN.path);
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              DisplayToast(TOAST_ERROR, TOAST_EMAIL_IN_USE(registerEmail));
              break;
            case "auth/invalid-email":
              DisplayToast(TOAST_ERROR, TOAST_INVALID_EMAIL(registerEmail));
              break;
            case "auth/operation-not-allowed":
              DisplayToast(TOAST_ERROR, TOAST_ERROR_DURING_REGISTRATION);
              break;
            case "auth/weak-password":
              DisplayToast(TOAST_ERROR, TOAST_WEAK_PASSWORD);
              break;
            default:
              DisplayToast(TOAST_ERROR, error.message);
              break;
          }
          setRegisterEmail("");
          setRegisterPassword("");
        });
    }
  };

  return (
    <div>
      <h3 className="flex justify-center content-center  mb-8 tracking-wider text-gray-500 md:text-lg dark:text-gray-400">
        Register with email address
      </h3>

      <div className="flex justify-center content-center mt-20">
        <form className="bg-white shadow-md shadow-cyan-500/50 rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="flex justify-center content-center mb-8 text-xl font-semibold whitespace-nowrap dark:text-white">
            Register
          </h1>

          <div
            className="relative mb-6 border-b-2 border-cyan-400"
            data-te-input-wrapper-init
          >
            <input
              type="email"
              id="email"
              value={registerEmail}
              onChange={(event) => setRegisterEmail(event.target.value)}
              className="cursor-text box-border block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="email"
              className="cursor-text absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
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
              pattern="(?=.*\d)(?=.*[\W_]).{7,}"
              title="Password should be of minimum 7 characters. Should have at least one special character and one number."
              value={registerPassword}
              onChange={(event) => setRegisterPassword(event.target.value)}
              className="cursor-text box-border block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="password"
              className="cursor-text absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Password
            </label>
          </div>

          <div className="flex justify-end content-center">
            <Button type="submit" onClick={handleRegister}>
              Register
            </Button>
          </div>

          <p className="mb-0 mt-5 pt-1 text-sm font-semibold">
            Already have an account?
            <a
              href="#!"
              className="text-blue-600 ml-8 text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
              onClick={() => {
                navigate(routeConstants.LOGIN.path);
              }}
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
