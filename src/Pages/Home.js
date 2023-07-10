// import { useHistory } from 'react-router-dom';
import { auth } from "../backend/firebase-config";
import { useState, useEffect } from "react";

function Home() {
    const [user, setUser] = useState(auth.user);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
          setUser(currentUser);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);
    // const history = useHistory();

    const handleLogin = () => {
        window.location.href = "/Login";
    };

    const handleRegister = () => {
        window.location.href = "/Register";
    };

    return (
        <div className="home">
            <div className="home-title">
                Welcome to your very own book management system, where you can add books that interest you to read in the future or add books that you have already read with your own customized review. Sign in or register to better manage your book world!!
            </div>
            <br />
                {user === null ? (
                <div className="home-page-buttons">
                    <div className="login-home-button" onClick={handleLogin}>Login</div>
                    <div className="register-home-button" onClick={handleRegister}>Register</div>
                </div>
                ) : (
                <div>Hello {user && user?.email} !</div>
                )}
        </div>
    )
}

export default Home;
