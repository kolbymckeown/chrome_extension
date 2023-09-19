import { useEffect } from 'react';

import useAuth from '@/hooks/use-auth';
import { auth } from '@/utils/firebase';

export default function AuthProvider() {
  const { getAuthenticatedUser, setAuthenticatedUser } = useAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Delay fetching by 1 second to allow for the user to be created in the database
        // TODO: Find a better way to do this
        setTimeout(() => {
          // @ts-ignore
          getAuthenticatedUser().then(({ user: dbUser, authToken }) => {
            setAuthenticatedUser(dbUser, authToken);
          });
        }, 1000);
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
}
