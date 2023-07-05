import { Link } from "react-router-dom"
import { auth } from "../backend/firebase-config"
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";


export default function Navbar() {
    const [user, setUser] = useState(auth.user);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
          setUser(currentUser);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);
  
    const logout = async () => {
      try {
        await signOut(auth);
        setUser(null);
        console.log("User logged out");
      } catch (error) {
        console.log(error.message);
      }
    };
  
    // const login = () => {
    //     if(user) {
    //         window.location.href = "/BookForm";
    //     } else {
    //         window.location.href = "/Login";
    //     }
    // };
  
    const homepage = () => {
        if(user!==undefined) {
            window.location.href = "/BookForm";
        } else {
            window.location.href = "/Login";
        }
    };
  
    return (
      <nav className="nav">
        <div className="site-title" onClick={homepage}>
          Book Library
        </div>
        <ul>
          <li>
            <Link to={"/BookForm"}>Book Search</Link>
          </li>
          <li>
            <Link to={"/Wishlist"}>Wishlist</Link>
          </li>
          <li>
            <Link to={"/Read"}>Readlist</Link>
          </li>
          <li>
            <div className="profile-dropdown">
              <a href="#" className="profile-drop-button">
                Profile
              </a>
              <div className="profile-dropdown-content">
                {user ? (
                  <>
                    <div>{user && user?.email}</div>
                    <Link to={"/Login"} onClick={logout}>
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={"/Login"}>Login</Link>
                    <Link to={"/Register"}>Register</Link>
                  </>
                )}
              </div>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
  
