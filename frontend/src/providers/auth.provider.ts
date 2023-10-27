import { useEffect } from 'react';

import useAuth from '@/hooks/use-auth';
import { auth } from '@/utils/firebase';
import { setNoUserFound } from '@/redux/slices/user.slice';
import { useDispatch } from 'react-redux';

export default function AuthProvider() {
  const { getAuthenticatedUser, setAuthenticatedUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // @ts-ignore
        getAuthenticatedUser().then(({ user: dbUser, authToken }) => {
          setAuthenticatedUser(dbUser, authToken);
        });
      } else {
        dispatch(setNoUserFound());
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
}
