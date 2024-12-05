import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BookForm from "../pages/BookForm";
import WishlistReview from "../pages/WishlistReview";
import Wishlist from "../pages/Wishlist";
import ReadlistReview from "../pages/ReadlistReview";
import Read from "../pages/Read";

const routeConstants = {
  HOME: { path: "/", element: <Home /> },
  LOGIN: { path: "/Login", element: <Login /> },
  REGISTER: { path: "/Register", element: <Register /> },
  BOOK_FORM: { path: "/BookForm", element: <BookForm /> },
  WISHLIST_REVIEW: {
    path: "/BookForm/WishlistReview",
    element: <WishlistReview />,
  },
  WISHLIST: { path: "/WishList", element: <Wishlist /> },
  READLIST_REVIEW: {
    path: "/BookForm/ReadlistReview",
    element: <ReadlistReview />,
  },
  READ: { path: "/Read", element: <Read /> },
};

export default routeConstants;
