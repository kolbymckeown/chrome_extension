import { useEffect } from 'react';

import useAuth from '@/hooks/use-auth';
import { auth } from '@/utils/firebase';

export default function AuthProvider() {
  const { getAuthenticatedUser, setAuthenticatedUser } = useAuth();

  useEffect(() => {
    console.log('is it on loading?');
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // @ts-ignore
        getAuthenticatedUser().then(({ user: dbUser, authToken }) => {
          setAuthenticatedUser(dbUser, authToken);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
}
