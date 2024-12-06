import LoadingSpinner from "../components/LoadingSpinner";
import { useMemo, Suspense } from "react";
import useUserLoggedIn from "../hooks/custom-hooks/useUserLoggedIn";

const Home = () => {
  const user = useUserLoggedIn();

  const homePageContent = useMemo(() => {
    return (
      <div className="flex justify-center items-center my-20 font-bold text-2xl text-center">
        Welcome back {user?.displayName || ""}!
      </div>
    );
  }, [user]);

  return (
    <div className="flex items-center justify-center mt-10 mb-12">
      <section className="h-screen">
        <div className="flex items-center justify-center">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="BookMarked webapp icon"
              />
            </div>

            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <div className="flex flex-col items-center justify-center">
                <div className="font-urban text-lg font-lg text-center">
                  Welcome to BookMarked: Where Your Book World Comes Alive!
                </div>

                <div className="font-urban text-lg font-lg text-center">
                  Discover, Collect, and Review Your Literary Adventures!
                </div>

                <div className="font-urban text-lg font-lg text-center">
                  Unlock the Magic of Books: Register or Login Now!
                </div>
              </div>

              <Suspense fallback={<LoadingSpinner />}>
                <div className="text-center lg:text-left my-20 flex flex-row items-center justify-center">
                  {homePageContent}
                </div>
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
