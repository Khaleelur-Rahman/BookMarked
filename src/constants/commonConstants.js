export const LOGIN_GOOGLE = "google"
export const LOGIN_EMAIL_PASSWORD = "email_and_password"

export const API_PATH = (searchQuery, author) => 
  `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}+inauthor:${author}&maxResults=40&printType=books&key=${process.env.REACT_APP_GOOGLEBOOKS_API_KEY}`;

export const READLIST_TABLE_NAME = "Read"
export const WISHLIST_TABLE_NAME = "ToRead"

export const READ_BOOK_LIST_TYPE = "read"
export const WISHLIST_BOOK_LIST_TYPE = "wishlist"
export const SEARCH_BOOK_LIST_TYPE = "search"

export const ADD_OPERATION = "add"
export const UPDATE_OPERATION = "update"
