import { Link } from "react-router-dom";
import { auth } from "../backend/firebase-config";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserLoggedIn from "../hooks/custom-hooks/useUserLoggedIn";
import useNavigation from "../hooks/custom-hooks/useNavigation";
import routeConstants from "../constants/routeConstants";

export default function Navbar() {
  const user = useUserLoggedIn();
  const navigate = useNavigation();

  const logout = async () => {
    try {
      localStorage.setItem("logoutEmail", user.email);
      await signOut(auth);
    } catch (error) {
      toast.error("Error logging out!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const homepage = () => {
    //Function to faciliate navigation when website title is clicked
    if (user !== null) {
      navigate(routeConstants.BOOK_FORM.path);
    } else {
      navigate(routeConstants.LOGIN.path);
    }
  };

  useEffect(() => {
    //Facilitate profile dropdown functionality
    const profileElement = document.getElementById("profile");
    const dropdown = document.getElementById("profile-dropdown-content");

    function showDropdown() {
      dropdown.style.display = "block";
    }

    function hideDropdown() {
      dropdown.style.display = "none";
    }

    profileElement.addEventListener("mouseenter", showDropdown);
    dropdown.addEventListener("mouseenter", showDropdown);
    profileElement.addEventListener("mouseleave", hideDropdown);
    dropdown.addEventListener("mouseleave", hideDropdown);

    return () => {
      profileElement.removeEventListener("mouseenter", showDropdown);
      dropdown.removeEventListener("mouseenter", showDropdown);
      profileElement.removeEventListener("mouseleave", hideDropdown);
      dropdown.removeEventListener("mouseleave", hideDropdown);
    };
  }, []);

  return (
    <span className="navbar-container">
      <nav data-testid="navbar" className="nav">
        <div className="website-header" onClick={homepage}>
          BookMarked!
        </div>
        <ul className="flex flex-row mr-5">
          <li className="mt-6 whitespace-pre">
            <Link to={routeConstants.BOOK_FORM.path} data-testid="book-search">
              Book Search
            </Link>
          </li>
          <li className="mt-6">
            <Link to={routeConstants.WISHLIST.path} data-testid="wishlist">
              Wishlist
            </Link>
          </li>
          <li className="mt-6">
            <Link to={routeConstants.READ.path} data-testid="readlist">
              Readlist
            </Link>
          </li>
          <li className="ml-2" id="profile" data-testid="profile">
            <a
              href="/BookForm"
              className="profile-drop-button"
              data-testid="profile-icon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                <circle cx="12" cy="10" r="3" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
      <div className="profile-dropdown-content" id="profile-dropdown-content">
        {/*Profile dropdown menu based based on if user is logged in or not*/}
        {user ? (
          <span>
            <li className="profile-dropdown-subitem">{user && user?.email}</li>
          </span>
        ) : (
          <div>
            <li className="profile-dropdown-subitem" data-testid="dropdown1">
              <Link to={routeConstants.LOGIN.path}>Login</Link>
            </li>
          </div>
        )}
        {user ? (
          <div>
            <li className="profile-dropdown-subitem" onClick={logout}>
              <Link to={routeConstants.LOGIN.path}>Logout</Link>
            </li>
          </div>
        ) : (
          <div>
            <li className="profile-dropdown-subitem" data-testid="dropdown2">
              <Link to={routeConstants.REGISTER.path}>Register</Link>
            </li>
          </div>
        )}
      </div>
    </span>
  );
}
