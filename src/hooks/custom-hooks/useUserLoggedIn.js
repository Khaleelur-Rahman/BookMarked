import useNavigation from "./useNavigation";
import { useEffect, useState } from "react";
import { auth } from "../../backend/firebase-config";
import { routeConstants } from "../../constants/routeConstants";

const useUserLoggedIn = () => {
  const navigate = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        navigate(routeConstants.LOGIN.path);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return user;
};

export default useUserLoggedIn;
