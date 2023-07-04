import { Link } from "react-router-dom"
import { auth } from "../backend/firebase-config"
import { signOut,  } from "firebase/auth";
import { useState } from "react";


export default function Navbar() {

    const [user,setUser] = useState(auth.user);

    const logout = async () => {
        try {
          await signOut(auth);
          setUser(null);
          console.log("User logged out");
        } catch (error) {
          console.log(error.message);
        }
      }

    const login = () => {
        window.location.href = "/Login"
    }

    const homepage = () => {
        window.location.href = "/"
    }

    return (
        <nav className="nav">
            <div className="site-title" onClick={homepage}>Book Library</div>
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
                {user ?
                <li onClick={logout}>
                    Sign Out
                </li> :
                <li onClick={login}>
                    Login
                </li>
                }   
            </ul>
        </nav>
    )
}
