// toast types
export const TOAST_SUCCESS = "success";
export const TOAST_ERROR = "error";
export const TOAST_INFO = "info";

// toast messages for password
export const TOAST_INCORRECT_PASSWORD = "Incorrect password!";
export const TOAST_PASSWORD_REQUIRED = "Password is required!";
export const TOAST_WEAK_PASSWORD =
  "Password should be of minimum 7 characters. Should have at least one special character and one number.";

// toast messages for email
export const TOAST_EMAIL_REQUIRED = "Email Address is required!";
export const TOAST_EMAIL_IN_USE = (email) =>
  `Email address ${email} is already in use!`;
export const TOAST_INVALID_EMAIL = (email) =>
  `Email Address ${email} is invalid!`;

// toast messages for invalid op
export const TOAST_USER_NOT_FOUND =
  "User not found! Try using a different email and password.";
export const TOAST_ERROR_DURING_REGISTRATION =
  "Error during registration, try again!";
export const TOAST_NOT_EMPTY_EMAIL_AND_PASSWORD =
  "Email address and password should not be empty!";
export const TOAST_ERROR_DELETING_BOOK = "Error deleting book! Try again!";
export const TOAST_ERROR_FETCHING_BOOKS = "Error fetching books! Try again!";
export const TOAST_ERROR_ADDING_BOOK = "Error adding book! Try again";
export const TOAST_ERROR_UPDATING_BOOK = "Error editing book! Try again";
export const TOAST_ERROR_BOOK_ALREADY_EXIST =
  "Error adding book! Book already exists!";

// toast messages for valid op
export const TOAST_REGISTERED_SUCCESSFULLY = (email) =>
  `${email} registered successfully! Please login with your credentials!`;
export const TOAST_LOGGED_IN_SUCCESSFULLY = (email) =>
  `${email} logged in successfully!`;
export const TOAST_LOGGED_OUT_SUCCESSFULLY = (email) =>
  `${email} logged out successfully!`;

// toast messages for book search results
export const TOAST_BOOK_NOT_FOUND = "Book not found! Try refining your search!";
