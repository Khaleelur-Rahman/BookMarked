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
  
    const homepage = () => {
        if(user!==undefined) {
            window.location.href = "/BookForm";
        } else {
            window.location.href = "/Login";
        }
    };

    useEffect(() => {
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

    // function callDropDown() {
      
    //     const profileElement = document.getElementById("profile");
    //     console.log(profileElement)
    //     const dropdown = document.getElementsByClassName("profile-dropdown-content")[0];
      
    //     profileElement.addEventListener("mouseover", showDropdown);
    //     dropdown.addEventListener("mouseover", showDropdown);
    //     profileElement.addEventListener("mouseout", hideDropdown);
    //     dropdown.addEventListener("mouseout", hideDropdown);
      
    //     function showDropdown() {
    //       dropdown.style.display = "block";
    //     }
      
    //     function hideDropdown() {
    //       dropdown.style.display = "none";
    //     }
    // }

    
    
    return (
      <span>
      <nav className="nav">
        <div className="site-title" onClick={homepage}>
          Book Library
        </div>
        <ul>
          <li>
            <Link to={"/BookForm"} >Book Search</Link>
          </li>
          <li>
            <Link to={"/Wishlist"}>Wishlist</Link>
          </li>
          <li>
            <Link to={"/Read"}>Readlist</Link>
          </li>
          <li className="profile" id ="profile">
              <a href="" className="profile-drop-button">
                Profile
              </a>
          </li>
        </ul>
      </nav>
    <div className="profile-dropdown-content" id="profile-dropdown-content">
    {user ? (   <div>
                  <li className="profile-dropdown-subitem">
                    {user && user?.email}
                  </li>
                </div>
                ) : (
                <div>
                  <li className="profile-dropdown-subitem">
                    <Link to={"/Login"}>Login</Link>
                  </li>
                </div>
                )}
                {user ? (
                  <div>
                    <li className="profile-dropdown-subitem">
                       <Link to={"/Login"} onClick={logout}>
                        Logout
                      </Link>
                    </li>
                  </div>
                  
                  ) : (
                  <div>

                    <li className="profile-dropdown-subitem">
                      <Link to={"/Register"}>Register</Link>
                    </li>
                  </div>

                  )}
    </div>
    {/* {Window.onload = callDropDown} */}
    </span>
    // {solve}
    );
    
  }
  
