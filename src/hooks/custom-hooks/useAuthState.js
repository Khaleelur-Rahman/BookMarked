import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

//Hook to return the current user object whenever the authentication state changes.
function useAuthState(auth) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return user;
}

export default useAuthState;
