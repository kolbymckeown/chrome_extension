import { useEffect } from 'react';

import useAuth from '@/hooks/use-auth';
import { auth } from '@/utils/firebase';

export default function AuthProvider() {
  const { getAuthenticatedUser, setAuthenticatedUser } = useAuth();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // @ts-ignore
        getAuthenticatedUser().then(({ user: dbUser, authToken }) => {
          setAuthenticatedUser(dbUser, authToken);
        });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return null;
}
