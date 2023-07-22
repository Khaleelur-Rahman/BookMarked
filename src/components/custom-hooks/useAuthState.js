import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; 

function useAuthState(auth) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return user;
}

export default useAuthState;