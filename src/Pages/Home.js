// import { useHistory } from 'react-router-dom';
import { auth } from "../backend/firebase-config";
import useAuthState from "../components/custom-hooks/useAuthState"


function Home() {

    const user = useAuthState(auth);

    const handleLogin = () => {
        window.location.href = "/Login";
    };

    const handleRegister = () => {
        window.location.href = "/Register";
    };

    return (
        <div className="flex items-center justify-center mt-10 mb-12">
            <section className="h-screen">
  <div className="flex items-center justify-center">
    <div
      className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
      <div
        className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="w-full"
          alt="Sample image" />
          

        </div>

      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
      <div className="flex flex-col items-center justify-center">
            <div className="font-urban text-xl font-semibold"/> Welcome to BookMarked: Where Your Book World Comes Alive!

            <div /> Discover, Collect, and Review Your Literary Adventures!

            <div /> Unlock the Magic of Books: Register or Login Now!
        </div>


        {user === null ? (
        <div className="text-center lg:text-left my-20 flex flex-row items-center justify-center">
          
          <button
            type="button"
            onClick={handleLogin}
            className="mr-10 inline-block rounded bg-cyan-50 px-7 pb-2.5 pt-3 text-sm font-medium uppercase font-medium leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light">
            Login
          </button>    
          <button
            type="button"
            onClick={handleRegister}
            className="inline-block rounded bg-cyan-50 px-7 pb-2.5 pt-3 text-sm font-medium uppercase font-medium leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light">
            Register
          </button>    
          
          
        </div>    
        ) : (
          <div className="flex justify-center items-center my-20 font-bold">Welcome back {user && user?.email}!</div>
        )} 
      </div>
    </div>
  </div>
</section>
        </div>
    )
}

export default Home;
