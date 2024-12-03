import useNavigation from "./useNavigation";
import { useEffect, useState } from "react";
import { auth } from "../../backend/firebase-config";

const useUserLoggedIn = () => {
  const navigate = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        navigate("/Login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return user;
};

export default useUserLoggedIn;
