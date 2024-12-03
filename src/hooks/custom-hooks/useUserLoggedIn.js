import useNavigation from "./useNavigation";
import { useEffect } from "react";
import { auth } from "../../backend/firebase-config";

const useUserLoggedIn = () => {
    const navigate = useNavigation();

    useEffect(() => {
      // Check if user is logged in
      auth.onAuthStateChanged((user) => {
        if (!user) {
          navigate("/Login");
        }
      });
    }, []);
}

export default useUserLoggedIn;