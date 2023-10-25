import {
  signInWithEmailAndPassword as signIn,
  createUserWithEmailAndPassword as createUser,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { resetUser, setUser } from '@/redux/slices/user.slice';
import { asynchrounousRequest } from '@/utils/api';
import { dateDaysFromNow, deleteCookie, setCookie } from '@/utils/cookies';
import { auth } from '@/utils/firebase';

const googleProvider = new GoogleAuthProvider();

type AuthHook = {
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  createAccountWithEmailAndPassword: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  setAuthenticatedUser: (user: any, token: string) => any;
  getAuthenticatedUser: (userId?: string) => any;
  signInWithGoogle: (newAccount?: boolean) => Promise<void>;
};

const useAuth = (): AuthHook => {
  const router = useRouter();
  const dispatch = useDispatch();

  const getAuthenticatedUser = () =>
    asynchrounousRequest(`users`, {
      query: { userId: (auth.currentUser && auth.currentUser.uid) || '' },
    });

  const setAuthenticatedUser = (user: any, authToken: any) => {
    if (!user) {
      return;
    }

    dispatch(setUser(user));
    setCookie('genius_current_user', user.id, {
      expires: dateDaysFromNow(7),
    });
    if (authToken) {
      setCookie('genius_user_auth_token', authToken, {
        expires: dateDaysFromNow(7),
      });
    }
  };

  const signInWithGoogle = async (newAccount?: boolean) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (newAccount) {
        const { user: dbUser, authToken } = await asynchrounousRequest(
          'users',
          {
            type: 'POST',
            body: {
              id: user.uid,
              email: user.email,
              firstName: '',
              lastName: '',
            },
          }
        );

        console.log('New DB User:', dbUser);
        setAuthenticatedUser(dbUser, authToken);
      } else {
        try {
          const { user: dbUser, authToken } = await getAuthenticatedUser();
          if (!dbUser) {
            throw new Error('User not found in database');
          }
          setAuthenticatedUser(dbUser, authToken);
        } catch (error) {
          console.error('Error fetching user from database:', error);
        }
      }
    } catch (error) {
      console.error('Error signing in with Google', error);
      throw error;
    }
  };

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      await signIn(auth, email, password);
      const { user: dbUser, authToken } = await getAuthenticatedUser();

      if (!dbUser) {
        throw new Error();
      }

      setAuthenticatedUser(dbUser, authToken);
      router.push('/');
    } catch (error) {
      console.error('Error signing in with email and password', error);
      throw error;
    }
  };

  const createAccountWithEmailAndPassword = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const { user } = await createUser(auth, email, password);
      setCookie('genius_current_user', user.uid, {
        expires: dateDaysFromNow(7),
      });

      const { user: dbUser, authToken } = await asynchrounousRequest('users', {
        type: 'POST',
        body: {
          id: user.uid,
          email: user.email,
          firstName,
          lastName,
        },
      });

      setAuthenticatedUser(dbUser, authToken);
      router.push('/');
    } catch (error) {
      console.log({ error });
      console.error('Error creating account with email and password', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      dispatch(resetUser());
      await signOut(auth);
      deleteCookie('genius_current_user');
      deleteCookie('genius_user_auth_token');
      router.push('/');
    } catch (error) {
      console.error('Error signing out', error);
      throw error;
    }
  };

  return {
    signInWithEmailAndPassword,
    createAccountWithEmailAndPassword,
    logout,
    signInWithGoogle,
    getAuthenticatedUser,
    setAuthenticatedUser,
  };
};

export default useAuth;
