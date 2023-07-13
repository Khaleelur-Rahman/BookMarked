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
        <div className="flex items-center justify-center mt-10">
            {/* <div className="home-title">
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
                )} */}
            <section class="h-screen">
  <div class="flex items-center justify-center">
    <div
      class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
      <div
        class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="w-full"
          alt="Sample image" />
          

        </div>

      <div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
      <div class="flex flex-col items-center justify-center">
            <div className="font-urban text-xl font-semibold"/> Welcome to BookMarked: Where Your Book World Comes Alive!

            <div /> Discover, Collect, and Review Your Literary Adventures!

            <div /> Unlock the Magic of Books: Register or Login Now!
        </div>

        <div class="text-center lg:text-left mt-10 flex flex-row items-center justify-center">
          <button
            type="button"
            onClick={handleLogin}
            class="mr-10 inline-block rounded bg-cyan-50 px-7 pb-2.5 pt-3 text-sm font-medium uppercase font-medium leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light">
            Login
          </button>    
          <button
            type="button"
            onClick={handleRegister}
            class="inline-block rounded bg-cyan-50 px-7 pb-2.5 pt-3 text-sm font-medium uppercase font-medium leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light">
            Register
          </button>    
        </div>     
      </div>
    </div>
  </div>
</section>
        </div>
    )
}

export default Home;
